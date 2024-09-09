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

    if (!name || !email || !role || !password) {
      return new Response(JSON.stringify({ success: false, error: 'All fields are required' }), { status: 400 });
    }

    if (!['user', 'owner'].includes(role)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid role' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyOtp = generateOtp();
    const otpExpiry = new Date(Date.now() + 60 * 60 * 1000);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, error: 'Email already exists' }), { status: 400 });
    }

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

    let newUser;
    if (role === 'user') {
      newUser = await User.create({
        name,
        email,
        role,
        password: hashedPassword,
        otp: verifyOtp,
        otpExpiry,
        emailVerified: false,
      });
    } else if (role === 'owner') {
      newUser = await Owner.create({
        name,
        email,
        role,
        password: hashedPassword,
        otp: verifyOtp,
        otpExpiry,
        emailVerified: false,
      });
    }

    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });

  } catch (error) {
    console.error(error); // Log error for debugging
    return new Response(JSON.stringify({ success: false, error: error }), { status: 400 });
  }
}
