// utils/generateTokenAndSetCooki
import { NextResponse } from "next/server";

import jwt from 'jsonwebtoken';


export const  generateTokenAndSetCookie = (userId: string) => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not defined');

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
const res = NextResponse.json(
    { message: "User created successfully", userId },
    { status: 201 }
  );


  res.cookies.set('AuthToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // seconds
    path: '/',
  });

  return res;
};
