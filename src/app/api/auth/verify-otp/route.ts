// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/user.model';
import Owner from '@/models/owner.model';

export async function POST(req: NextRequest) {
  const { email, role, otp } = await req.json();
  await connectToDatabase();

  // Find the user with the email
  const user =  role === 'owner' ? await Owner.findOne({ email }) :  await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' });
  }

  // Check if OTP is valid and not expired
  if (user.otp !== otp) {
    return NextResponse.json({ success: false, message: 'Invalid OTP' });
  }
  if (new Date() > user.otpExpiry!) {
    return NextResponse.json({ success: false, message: 'OTP has expired' });
  }

  // Verify the email and remove OTP
  user.emailVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  return NextResponse.json({ success: true });
}
