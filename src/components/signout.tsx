'use client';

import { Button } from '@mui/material';
import { signOut,useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
 const router=useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    if (session) {
      // User logged in via NextAuth
      signOut({ callbackUrl: '/' });
    } else {
      // User logged in via custom JWT
      await fetch('/api/auth/signout');
      router.push('/');
    }
  };
  return (
    <Button
      onClick={handleSignOut}
      color="primary"
      variant="contained"
      sx={{
        px: 3,
        py: 1.5,
        fontSize: '1rem',
        borderRadius: '8px',
        textTransform: 'none',
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#1976d2', // slightly darker blue
        },
        '@media (max-width:600px)': {
          width: '100%',
          fontSize: '0.9rem',
        },
      }}
    >
      Sign Out
    </Button>
  );
}
