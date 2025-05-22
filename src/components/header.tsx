'use client';

import { Box } from '@mui/material';
import Image from 'next/image';
import SignOutButton from './signout';


export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        width: '100%',
        minHeight: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        py: 1,
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: 'black',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/authlogo.png"
          alt="Auth Logo"
          width={40}
          height={40}
          style={{ objectFit: 'contain' }}
        />
      </Box>

      {/* Sign out button */}
      <SignOutButton />
    </Box>
  );
}
