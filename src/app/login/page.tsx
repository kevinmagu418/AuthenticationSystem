'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';
import { InputField } from '@/components/form/InputField';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setShowPassword(prev => !prev);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert(data.message || 'Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    setLoading(false);
    alert('Something went wrong');
  }
   
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Welcome Back</h1>

        {/* Social Buttons */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <GitHubIcon className="mr-2" color="secondary" /> GitHub
            </button>
            <button
              onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <FacebookIcon className="mr-2" color="secondary" /> Facebook
            </button>
          </div>
          <div>
            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <GoogleIcon className="mr-2" color="secondary" /> Google
            </button>
          </div>
        </div>

        {/* OR */}
        <div className="text-center text-gray-500">or</div>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
          />

          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="pr-10 w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2"
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              disabled={loading}
              className="px-6 py-2 bg-[var(--light-green)] text-black rounded font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <Link href="/register" className="text-[var(--light-green)] underline font-bold">
            Sign up
          </Link>
        </p>

        <p className="text-xs text-center text-gray-600">
          This site is protected by hCaptcha. Its{' '}
          <Link href="#" className="text-[var(--light-green)] underline font-bold">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="#" className="underline">
            Terms of Service
          </Link>{' '}
          apply.
        </p>
      </div>
    </div>
  );
}
