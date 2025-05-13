'use client';

import { signIn } from 'next-auth/react';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';// placeholder
import { useState } from 'react';
import { InputField } from '@/components/form/InputField';
import { PasswordRules } from './passwordrules';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold text-center">Create an account</h1>

        {/* Social Buttons */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <button
              onClick={() => signIn('github')}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <GitHubIcon className="mr-2" color="secondary" /> GitHub
            </button>
            <button
              onClick={() => signIn('facebook')}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <FacebookIcon className="mr-2" color='secondary'/> Facebook
            </button>
          </div>
          <div className="flex gap-2">
            
            <button
              onClick={() => signIn('google')}
              className="w-full flex items-center justify-center border border-gray-600 py-2 rounded hover:bg-gray-800 transition"
            >
              <GoogleIcon className="mr-2" color='secondary' /> Google
            </button>
          </div>
        </div>

        {/* OR */}
        <div className="text-center text-gray-500">or</div>

        {/* Email & Password */}
        <div className="space-y-4">
          <InputField
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
          />
          <InputField
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--mpesa-green)]"
          
          />
      <PasswordRules  password={password}/>
 
    <div className='flex justify-center'>

    <button className="px-6 py-2 bg-[var(--light-green)] text-black rounded font-medium hover:opacity-90 transition">
            Create Account
          </button>

     </div>


        </div>

        {/* Terms and Sign in */}
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
          <a href="#" className="text-[var(--light-green)] underline font-extrabold text-xl">
            Sign in
          </a>
        </p>

        {/* Footer */}
        <p className="text-xs text-center text-gray-600">
          This site is protected by hCaptcha. Its{' '}
          <a href="#" className="underline">
            Privacy Policy
          </a>{' '}
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
