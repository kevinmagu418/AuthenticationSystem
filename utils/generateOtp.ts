import crypto from 'crypto';

export function generateOtp(length: number = 5): string {
  const otp = crypto.randomInt(10000, 99999).toString();
  return otp.padStart(length, '0');
}