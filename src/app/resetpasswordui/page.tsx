'use client';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { InputField } from '@/components/form/InputField';
import { PasswordRules } from '../signupform/passwordrules';
import { passwordRules } from '../../../lib/passwordRules';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  interface TokenPayload {
    email: string;
    exp: number;
    iat: number;
  }

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setEmail(decoded.email);
      } catch (err) {
        console.error(err);
        setMessage('Invalid or expired token.');
      }
    }
  }, [token]);

  const toggleVisibility = () => setShowPassword((prev) => !prev);

  const passwordsMatch = newPassword === confirmPassword;
  const passwordPassesRules = passwordRules.every((rule) => rule.test(newPassword));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (!email || !token) {
      setMessage('Missing reset token or email');
      return;
    }

    if (!passwordsMatch) {
      setMessage('Passwords do not match');
      return;
    }

    if (!passwordPassesRules) {
      setMessage('Password does not meet the required rules');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setMessage('Password reset successfully. You can now log in.');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Reset Password</h1>
        <p className="text-sm text-white-500 text-center">Enter your new password below.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password Field with Toggle */}
          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pr-10 w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
            </button>
          </div>

          {/* Confirm Password Field with Toggle */}
          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`pr-10 w-full bg-black border ${
                confirmPassword.length > 0
                  ? passwordsMatch
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-gray-600'
              } rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]`}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
            </button>
          </div>

          {/* Password rule feedback */}
          <PasswordRules password={newPassword} />

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={
                loading || !newPassword || !confirmPassword || !passwordsMatch || !passwordPassesRules
              }
              className="px-6 py-2 bg-[var(--light-green)] text-black rounded font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center text-sm text-[var(--light-green)] font-semibold">{message}</p>
        )}

        <p className="text-sm text-center text-gray-500">
          Back to{' '}
          <a href="/login" className="text-[var(--light-green)] underline font-extrabold text-xl">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
