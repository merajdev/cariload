// /api/auth/logout.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Perform any server-side logout operations here, if needed.
    return NextResponse.json({
      message: 'User logged out successfully',
      success: true,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
