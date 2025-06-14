'use client';

import { signIn } from 'next-auth/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from 'next/link';

import { useState } from 'react';
import { InputField } from '@/components/form/InputField';
import { PasswordRules } from './passwordrules';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username,setUsername]=useState('');
  const passwordsMatch = password === confirmPassword;

  const toggleVisibility = () => setShowPassword((prev) => !prev);
  const router = useRouter();


const handleSubmit=async(e:React.FormEvent)=>{

//prevent resubmission  on reload
    e.preventDefault();

//ensure the password match before submission


    if (!passwordsMatch) return;

setLoading(true);

try {
      const res = await fetch('/api/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password,username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      alert('Account created successfully!');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      // Optional: auto sign in or redirect
      // signIn('credentials', { email, password });
router.push('/phone-number'); // <-- Add this line
    } catch (error) {
      if (error instanceof Error) {
    alert(error.message);
  } else {
    alert('An unexpected error occurred.');
  }
    } finally {
      setLoading(false);// code that runs no matter what (cleanup, resetting states, etc.)
}
    }
  




  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create an account</h1>

        {/* Social Buttons */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => signIn('github',{ callbackUrl: '/phone-number' })}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <GitHubIcon className="mr-2" color="secondary" /> GitHub
            </button>
            <button
              onClick={() => signIn('facebook',{ callbackUrl: '/phone-number' })}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <FacebookIcon className="mr-2" color="secondary" /> Facebook
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => signIn('google',{ callbackUrl: '/phone-number' })}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <GoogleIcon className="mr-2" color="secondary" /> Google
            </button>
          </div>
        </div>

        {/* OR */}
        <div className="text-center text-gray-500">or</div>

        {/* Email & Password */}
        <form onSubmit={handleSubmit} className="space-y-4">
         <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
          />

         
          <InputField
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
          />

          {/* Password Field */}
          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* Confirm Password */}
          <div className="relative">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm password"
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
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </button>
          </div>

          <PasswordRules password={password} />

          {/* Submit */}
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-[var(--light-green)] text-black rounded font-medium hover:opacity-90 transition disabled:opacity-50"
              disabled={!passwordsMatch || loading }
            >
                {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>

        {/* Terms and Sign In */}
        <p className="text-sm text-center text-gray-500">
          By signing up you agree to our{' '}
          <a href="#" className="underline">
            terms of service
          </a>{' '}
          and{' '}
          <a href="#" className="underline">
            privacy policy
          </a>
          .
        </p>
        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--light-green)] underline font-extrabold text-xl">
            Sign in
          </Link>
        </p>

        {/* Footer */}
        <p className="text-xs text-center text-gray-600">
          This site is protected by hCaptcha. Its{' '}
          <Link href="#" className="text-[var(--light-green)] underline font-extrabold text-xl">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <a href="#" className="underline">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </div>
    </div>
  );
}
