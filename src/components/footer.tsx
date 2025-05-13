"use client";


export default function Footer() {
  return (
    <footer className="bg-white border-t shadow-inner text-[var(--mpesa-charcoal)] py-6 mt-10">
      
      {/* Bottom text */}
      <p className="text-center text-xs text-gray-500 mt-4">
        &copy; {new Date().getFullYear()} AuthSecure. All rights reserved.
      </p>
    </footer>
  );
}
