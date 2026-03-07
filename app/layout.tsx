import type { Metadata } from "next";
import { Geist, Italiana } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartComponent";
import { Suspense } from "react";
import CartFetcher from "@/components/CartFetcher";
import CartComponent from "@/components/CartComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const italiana = Italiana({
  weight: "400",
  variable: "--font-italiana",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopify Headless 2026",
  description: "Next.js 16 + Zustand + Shopify",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${italiana.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <CartFetcher />
        </Suspense>

        <Navbar />
        <CartComponent />
        {children}
      </body>
    </html>
  );
}
