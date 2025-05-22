import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/usermanagement';
import dbConnect from '../../../../../lib/connectdb';
import { sendPasswordResetEmail } from '../../../../../utils/email';

export async function POST(req: Request) {
  try {
    const { email} = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email and token required' }, { status: 400 });
    }

await dbConnect();

const token = jwt.sign(
  { email }, // payload
  process.env.RESET_PASSWORD_SECRET!, // secret
  { expiresIn: '15m' }
);
const user =await User.findOne({email});
 user.resetToken=token;
 user.resetTokenExpiry=new Date(Date.now() + 15 * 60 * 1000) ;
user.save();

    await sendPasswordResetEmail(email, token);

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
