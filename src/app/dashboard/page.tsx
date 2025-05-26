'use client';

import { Typography, Paper } from '@mui/material';

export default function DashboardHome() {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, Kevin!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        This is your dashboard overview. Use the menu to navigate to different sections like your profile, support, or biometrics.
      </Typography>
    </Paper>
  );
}
