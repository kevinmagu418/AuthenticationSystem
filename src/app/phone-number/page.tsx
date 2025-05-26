"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
//import { useSession } from 'next-auth/react';
//import { useEffect } from 'react';
//import { useRouter } from 'next/navigation';

export default function PhoneNumberForm() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+254");
  const router=useRouter();
  const countryOptions = [
    { code: "+254", flag: "🇰🇪" },
    { code: "+1", flag: "🇺🇸" },
    { code: "+44", flag: "🇬🇧" },
    { code: "+91", flag: "🇮🇳" },
  ];

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Phone submitted:", countryCode + phone);

  try {
    const res = await fetch("/api/auth/phoneOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        phoneNumber: countryCode + phone,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("OTP sent successfully");

        localStorage.setItem("userPhoneNumber", countryCode + phone);
      router.push('/confirmOtp');
      // Optional: Redirect or show success toast
    } else {
      console.error("Error sending OTP:", data.message);
    }

} catch (error) {
    console.error("Request failed:", error);
  }







  };
//for  already existing  phone no for sesseion users

 //const { data: session } = useSession();
 // const router = useRouter();

  //useEffect(() => {
   // if (session?.user?.phoneNumber) {
      // If phone number already exists, redirect away
   //   router.push('/dashboard');
   // }
  //}, [session]);




  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          What&#39;s your phone number?
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500 bg-gray-50">
            <span className="mr-2 text-lg">
              {countryOptions.find((opt) => opt.code === countryCode)?.flag}
            </span>

            <select
              className="bg-transparent text-sm text-gray-700 outline-none pr-2"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryOptions.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.flag} {opt.code}
                </option>
              ))}
            </select>

            <span className="mx-2 text-gray-400">|</span>

            <input
              type="tel"
              placeholder="Enter phone number"
              className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

<button
  type="submit"
  onClick={handleSubmit}
  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[var(--mpesa-green)] text-white rounded-xl text-sm font-medium transition transform active:scale-95"
>
            <span className=" text-white text-base">send</span>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
