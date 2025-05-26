'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
  Divider,
} from '@mui/material';

export default function SupportPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, message });
    alert('Support request submitted!');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Contact Support
      </Typography>

      <Typography variant="body2" mb={3}>
        Need help? Fill out the form below or reach us directly via the provided contact details.
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* Contact Form */}
        <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Send us a message
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Your Name"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Your Email"
                type="email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Message"
                multiline
                rows={4}
                fullWidth
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </form>
        </Paper>

        {/* Contact Details */}
        <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>
            📧 Email: <strong>support@example.com</strong>
          </Typography>
          <Typography>
            ☎️ Phone: <strong>+1 (555) 123-4567</strong>
          </Typography>
          <Typography>
            🕒 Working Hours: <strong>Mon - Fri, 9:00 AM - 5:00 PM</strong>
          </Typography>
          <Typography mt={2}>
            We usually respond within 24 hours. For urgent issues, call our support hotline.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
}
