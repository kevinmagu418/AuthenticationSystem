"use client";
import {
  Box,
  TextField,
  Button,
  Typography,
  
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import Image from 'next/image'; 
import Link from 'next/link';
import { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    
      const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
      });
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$%^&*])[A-Za-z\d!$%^&*]{8,}$/;
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      };
      const [showPassword, setShowPassword] = useState(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      
      const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
      const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);
      
      const validate = () => {
        const newErrors = {
          email: '',
          password: '',
          confirmPassword: ''
        };
    
        if (!emailRegex.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address.';
        }
    
        if (!passwordRegex.test(formData.password)) {
          newErrors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.';
        }
    
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match.';
        }
        setErrors(newErrors);

        // Return true if no errors exist
        return Object.values(newErrors).every((error) => error === '');
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
          // Submit form
          console.log('Form is valid, submit the data!');
        }
      };





  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--mpesa-green)] py-6 px-4">
      <Box className="w-full max-w-sm p-8 bg-white shadow-xl rounded-xl">
        
        <div className="flex items-center flex-col justify-center mb-6">
          <Image
            src="/authlogo.png"
            alt="AuthSecure Logo"
            width={150}
            height={100}
            className="mb-2"
          />
          <div className="flex items-center">
            <PersonAddIcon sx={{ fontSize: 25, color: 'black', mr: 1 }} />
            <Typography variant="h6" className="text-center text-foreground">
              Register
            </Typography>
          </div>
        </div>

 <form  onSubmit={handleSubmit} className="space-y-4 mb-6">
  <TextField
    label="Full Name"
    variant="standard"
    fullWidth
    sx={{ input: { color: 'var(--mpesa-dark)' } }}
    onChange={handleChange}
  />
  <TextField
    label="Username"
    variant="standard"
    fullWidth
    sx={{ input: { color: 'var(--mpesa-dark)' } }}
    onChange={handleChange}

  />
   <TextField
 label="Email"
 type="email"
 variant="standard"
 fullWidth
  name="email"
  value={formData.email}
 onChange={handleChange}
  error={!!errors.email}
  helperText={errors.email}
  sx={{ input: { color: 'var(--mpesa-dark)' } }}
          />
  <TextField
  label="Password"
  type={showPassword ? 'text' : 'password'}
  variant="standard"
  fullWidth
  name="password"
  value={formData.password}
  onChange={handleChange}
  error={!!errors.password}
  helperText={errors.password}
  sx={{ input: { color: 'var(--mpesa-dark)' } }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={togglePasswordVisibility} edge="end">
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
<TextField
  label="Confirm Password"
  type={showConfirmPassword ? 'text' : 'password'}
  variant="standard"
  fullWidth
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  error={!!errors.confirmPassword}
  helperText={errors.confirmPassword}
  sx={{ input: { color: 'var(--mpesa-dark)' } }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }}
/>
  <Box mt={3}>
    <Button
      fullWidth
      variant="contained"
      type="submit"
      sx={{ backgroundColor: 'var(--mpesa-green)', py: 1.5, fontWeight: 'bold' }}
    >
      Register
    </Button>
  </Box>
</form>

<Box className="flex justify-center">
  <Link href="/login" passHref>
    <Typography
      variant="body2"
      className="text-[var(--mpesa-charcoal)] font-semibold hover:underline hover:text-black transition"
    >
      Already have an account? Login
    </Typography>
  </Link>
</Box>


       

        
      </Box>
    </div>
  );
}
