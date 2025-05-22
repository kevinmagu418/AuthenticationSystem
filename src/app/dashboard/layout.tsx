// app/signupform/layout.tsx
'use client';

import Header from '@/components/header';
import { ReactNode } from 'react';

export default function SignupFormLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-black'>
      <Header />
      <main style={{ padding: '1rem' }}>{children}</main>
    </div>
  );
}
