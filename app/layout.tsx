import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrossMatic | Client Dashboard",
  description: "Ihre wöchentlichen Leads von CrossMatic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} min-h-dvh bg-background`}>
      <body className="min-h-dvh bg-background">{children}</body>
    </html>
  );
}
