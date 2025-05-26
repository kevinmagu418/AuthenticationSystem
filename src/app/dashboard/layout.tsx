"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  CircularProgress,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { useAuth } from '@/context/AuthContext';

const drawerWidth = 240;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();

  // ✅ Always run this hook, but conditionally redirect inside
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  // While loading, show spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // After loading, if not authenticated show message (just a fallback)
  if (!isAuthenticated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Redirecting to login...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItemButton component={Link} href="/dashboard/profile">
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton component={Link} href="/dashboard/support">
            <ListItemIcon><SupportAgentIcon /></ListItemIcon>
            <ListItemText primary="Support" />
          </ListItemButton>

          <ListItemButton component={Link} href="/dashboard/biometrics">
            <ListItemIcon><FingerprintIcon /></ListItemIcon>
            <ListItemText primary="Biometrics" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
