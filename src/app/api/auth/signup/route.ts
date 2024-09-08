import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer'
import dbConnect from '@/lib/mongodb';
import User from '@/models/user.model';
import Owner from '@/models/owner.model';

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();


export async function POST(req: Request) {
  await dbConnect();


  try {
    const { name, email, role, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate and send OTP
    const verifyOtp = generateOtp();
    const otpExpiry = new Date(Date.now() + 60 * 60 * 1000); // OTP valid for 1 hour
    console.log(email, name, password, role, verifyOtp, otpExpiry);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Cari Load - OTP for Signup',
      text: `Your OTP is: ${verifyOtp}`,
    });

    if (role == 'user') {
      const newUser = await User.create({
        name,
        email,
        role,
        password: hashedPassword,
        otp: verifyOtp,
        otpExpiry: otpExpiry,
        emailVerified: false,
      });

      return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
    }

    if(role == 'owner'){
      const newOwner = await Owner.create({
        name,
        email,
        role,
        password: hashedPassword,
        otp: verifyOtp,
        otpExpiry: otpExpiry,
        emailVerified: false,
      });
      return new Response(JSON.stringify({ success: true, user: newOwner }), { status: 201 });
    }

  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'An unknown error occurred' }), { status: 400 });
    }
  }
}