import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getProfileData } from "@/utils/firebaseUtils";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Aqib",
  description: "Creative director",
  icons: {
    icon: "/favicon.ico",
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profileData = await getProfileData() as UserData | undefined;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: profileData?.backgroundColor ?? '#000000'}}
      >
        <main>
         {children}
        </main>
      </body>
    </html>
  );
}
