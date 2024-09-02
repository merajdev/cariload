import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user.model';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email, password }: { email: string; password: string } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1d',
    });

    return NextResponse.json({ success: true, token, role: user.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'An error occurred during login' }, { status: 400 });
  }
}
