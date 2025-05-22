import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "../../../../../models/usermanagement";
import dbConnect from "../../../../../lib/connectdb";
import { generateTokenAndSetCookie } from "../../../../../utils/generateTokenandSetCookie";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

    // Generate JWT token and set cookie
    const response = generateTokenAndSetCookie(user._id.toString());
    return response;
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json({ message: "Sign-in failed" }, { status: 500 });
  }
}
