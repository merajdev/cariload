import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user.model';

export async function POST(req: Request) {
  await dbConnect();

  const { name, email, role, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });
    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'An unknown error occurred' }), { status: 400 });
    }
  }
}
