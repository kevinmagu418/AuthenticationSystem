// app/api/auth/verifyotp/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "../../../../../lib/connectdb";
import User from "../../../../../models/usermanagement";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID!;

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("AuthToken")?.value;

  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { otpCode, phoneNumber } = await req.json();

    await dbConnect();

    const verificationCheck = await client.verify.v2.services(verifySid).verificationChecks.create({
      to: phoneNumber,
      code: otpCode,
    });

    if (verificationCheck.status !== "approved") {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.isPhoneVerified = true;
    await user.save();

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ message: "OTP verification failed" }, { status: 500 });
  }
}
