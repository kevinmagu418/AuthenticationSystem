import { NextResponse } from 'next/server';
import cloudinary from '../../../../lib/cloudinary';

export async function GET() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: 'profile_images' },
    process.env.APISECRET!
  );

  return NextResponse.json({
    signature,
    timestamp,
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.APIKEYCLOUDINARY,
  });
}
