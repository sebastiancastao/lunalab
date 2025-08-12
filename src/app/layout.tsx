import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luna Lab — Nearshore & AI Assistants",
  description: "Luna Lab: nearshore software and AI assistants with code to implement AI in business processes.",
  keywords: "luna lab, nearshore, software agency, ai assistants, web development, mobile apps, digital transformation, UI/UX design",
  authors: [{ name: "Luna Lab" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Luna Lab — Nearshore & AI Assistants",
    description: "Digital excellence with nearshore teams and practical AI assistants",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
