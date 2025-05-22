import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { sendOTP } from "../../../../../utils/sentOtp";
import dbConnect from "../../../../../lib/connectdb";
import User from "../../../../../models/usermanagement";
export async function POST(req: Request) {
     const cookieStore =await cookies(); // 
  const token = cookieStore.get("AuthToken")?.value;



    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
//destructure phone  no
    const {phoneNumber } = await req.json();
    await dbConnect();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

  
    await sendOTP(phoneNumber); // Send via Twilio

    user.phoneNumber = phoneNumber;
    await user.save();//object is  fully mutable u dont have to pass as parameters, it persists the change
                    //unlike create
    return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json({ message: "Failed to send OTP" }, { status: 500 });
  }
}
