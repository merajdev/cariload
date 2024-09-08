import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import Owner from '@/models/owner.model';

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password }: { email: string; password: string } = await req.json();

    const user = await User.findOne({ email }) ||  await Owner.findOne({email});

    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // If the user's email is not verified, send OTP and prompt verification
    if (!user.emailVerified) {
      const verifyOtp = generateOtp();
      user.otp = verifyOtp;
      user.otpExpiry = new Date(Date.now() + 60 * 60 * 1000); // OTP valid for 1 hour
      await user.save();

      // Send the OTP email
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Cari Load - OTP for Email Verification',
        text: `Your OTP for verifying your email is: ${verifyOtp}`,
      });

      return NextResponse.json({
        success: false,
        error: 'Email not verified. An OTP has been sent to your email for verification.',
      }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate token after successful login
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    return NextResponse.json({ success: true, token, role: user.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'An error occurred during login' }, { status: 400 });
  }
}
