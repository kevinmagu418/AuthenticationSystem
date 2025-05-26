
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { AuthProvider } from "@/context/AuthContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], 
});

export const metadata: Metadata = {
  title: "AuthenticationApp",
  description: "Advancednextjs authentication system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={`${roboto.variable} antialiased`}
      >
        {/*setting up sessionprovider in ur app */}
     <main><Providers><AuthProvider>{children}</AuthProvider></Providers> </main>
      </body>
    </html>
  );
}
