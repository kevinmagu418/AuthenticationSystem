"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function OtpVerificationForm() {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();



  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleSubmit = useCallback(async () => {
    const otpString = otp.join("");
    console.log(otpString);
    if (otpString.length !== 6) {
      setError("Please enter a correct digit code");
      return;
    }
 const userPhoneNumber = localStorage.getItem("userPhoneNumber");
  if (!userPhoneNumber) {
    setError("Phone number not found. Please restart verification.");
    router.push("/phone-number");
    return;
  }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpCode: otpString,phoneNumber:userPhoneNumber }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "OTP verification failed");
      }

      toast.success("OTP verified successfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      router.push("/dashboard");
      localStorage.removeItem("userPhoneNumber");

    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Verification failed";
      setError(message);
      toast.error(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  }, [otp, router]);

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [otp, handleSubmit]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        if (i < 6) {
          newOtp[i] = pasteData[i];
        }
      }
      setOtp(newOtp);
      if (pasteData.length === 6) {
        handleSubmit();
      } else {
        inputRefs.current[pasteData.length]?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--mpesa-green)] px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 text-center">
          Enter Verification Code
        </h2>
        <p className="text-gray-600 text-sm mb-6 text-center">
          We sent a 6-digit code to your phone
        </p>

        <div className="flex justify-center space-x-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              disabled={isSubmitting}
              className={`w-12 h-12 rounded-full border-2 text-center text-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                error ? "border-red-500" : "border-gray-300"
              } ${isSubmitting ? "bg-gray-100" : "bg-white"}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <button
            type="button"
            className="text-green-600 font-medium hover:underline focus:outline-none"
            onClick={() => toast.info("Resending OTP...")}
          >
            Resend
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
