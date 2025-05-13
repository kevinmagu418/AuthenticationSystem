"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Typography } from "@mui/material";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--mpesa-green)] flex flex-col items-center justify-center px-6 py-12 text-center">
      <Image
        src="/authlogo.png"
        alt="AuthSecure Logo"
        width={120}
        height={120}
        className="mb-6"
      />

      <Typography variant="h3" className="text-white font-bold mb-4">
        Welcome to AuthSecure
      </Typography>

      <Typography variant="subtitle1" className="text-white mb-10 max-w-md p-8">
        A secure and modern authentication system with Face ID, Fingerprint,social logins and password options. Built for speed, security, and ease of use.
      </Typography>

      <div className="flex gap-4">
        <Link href="/login">
          <Button
            variant="contained"
            sx={{ backgroundColor: "white", color: "var(--mpesa-green)", fontWeight: "bold"}}
          >
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            variant="outlined"
            sx={{
              borderColor: "white",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "white", color: "var(--mpesa-green)" },
            }}
          >
            Register
          </Button>
        </Link>
       
      </div>
    </div>
  );
}
