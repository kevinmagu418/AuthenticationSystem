// app/api/reset-password/route.ts
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../../../lib/connectdb';
import User from '../../../../../models/usermanagement';
// import db from '@/lib/db';

export async function PUT(req: Request) {
  const { email, token, newPassword } = await req.json();

  if (!email || !token || !newPassword) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
await dbConnect();
  // Verify token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET!);

if (typeof decoded === 'string' || !('email' in decoded)) {
  throw new Error('Invalid token payload');
}

const emailFromToken = (decoded as JwtPayload).email;
const user= await User.findOne({email:emailFromToken});
if (user.resetToken !== token) {
  return NextResponse.json({ error: 'Token mismatch or already used' }, { status: 401 });
}
  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // ✅ Update user password in DB
  user.password = hashedPassword;
user.resetToken = undefined; 
   await user.save(); 
   
  return NextResponse.json({ message: 'Password has been reset successfully' });
}


   catch (error) {

    console.error("invalid or epired token",error)
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
}