import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonus - Premium Audio Equipment",
  description:
    "High end headphones, earphones, speakers, and audio accessories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-zinc-50 font-sans antialiased dark:bg-zinc-900`}
      >
        <Header />
        <main className="w-full flex-1 bg-white dark:bg-black">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
