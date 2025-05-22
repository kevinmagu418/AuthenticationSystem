// utils/sendOTP.ts
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID!;

const client = twilio(accountSid, authToken);

export const sendOTP = async (phoneNumber: string) => {
  try {
    const verification = await client.verify.v2.services(verifySid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });

    return verification.status; // "pending"
  } catch (error:unknown) {

  const err = error as { message?: string };


        console.error('Error sending OTP:', err?.message || error);

    throw new Error('Failed to send OTP: ' + error);
  }
};
