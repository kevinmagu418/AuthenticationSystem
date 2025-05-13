
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import dbConnect from "../../lib/connectdb";
import Providers from "@/components/providers";

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
  await dbConnect(); //will connect once on ssr

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased`}
      >

        {/*setting up sessionprovider in ur app */}
     <main><Providers>{children}</Providers> </main>


      
      </body>
    </html>
  );
}
