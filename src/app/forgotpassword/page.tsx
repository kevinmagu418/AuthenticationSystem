'use client';

import { useState } from 'react';
import { InputField } from '@/components/form/InputField';
//import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  //const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setMessage('Check your email for a reset link');
      setEmail('');
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Forgot Password</h1>
        <p className="text-sm text-white-500 text-center">
          Enter your email and we’ll send you a password reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
          />

          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-[var(--light-green)] text-black rounded font-medium hover:opacity-90 transition disabled:opacity-50"
              disabled={loading || !email}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center text-sm text-[var(--light-green)] font-semibold">
            {message}
          </p>
        )}

        <p className="text-sm text-center text-gray-500">
          Remember your password?{' '}
          <a href="/login" className="text-[var(--light-green)] underline font-extrabold text-xl">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
