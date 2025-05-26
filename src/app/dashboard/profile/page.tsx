'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Divider,
  Link,
} from '@mui/material';

export default function ProfilePage() {
  const [username, setUsername] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated submission
    console.log('Profile updated:', { username, image });
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match.");
      return;
    }
    // Simulated password change
    console.log('Password changed:', { oldPassword, newPassword });
    alert('Password changed successfully!');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Your Profile
      </Typography>

      <Typography variant="body2" mb={3}>
        Keep your profile up to date. By using this service, you agree to our{' '}
        <Link href="/terms" target="_blank">Terms of Service</Link> and{' '}
        <Link href="/privacy" target="_blank">Privacy Policy</Link>.
      </Typography>

      {/* Profile Update Section */}
      <form onSubmit={handleProfileSubmit}>
        <Stack spacing={3} mb={5}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={preview ?? ''} sx={{ width: 72, height: 72 }} />
            <Button variant="contained" component="label">
              Upload Image
              <input hidden accept="image/*" type="file" onChange={handleImageChange} />
            </Button>
          </Box>

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Save Profile
          </Button>
        </Stack>
      </form>

      <Divider sx={{ my: 4 }} />

      {/* Password Change Section */}
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>

      <form onSubmit={handlePasswordChange}>
        <Stack spacing={3}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" variant="outlined" color="secondary">
            Update Password
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
