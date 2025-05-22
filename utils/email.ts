import { PASSWORD_RESET_REQUEST_TEMPLATE } from './emailtemplate';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your App Password
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpasswordui?token=${token}`;

  const mailOptions = {
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password',
    html:PASSWORD_RESET_REQUEST_TEMPLATE(resetUrl),
      
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset email sent to', email);
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw new Error('Failed to send reset email');
  }
};
