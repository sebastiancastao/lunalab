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
  title: "LunaLab - Premier Software Agency",
  description: "We are a premier software agency specializing in cutting-edge web applications, mobile solutions, and digital transformations that elevate your business.",
  keywords: "software agency, web development, mobile apps, digital transformation, UI/UX design",
  authors: [{ name: "LunaLab Team" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "LunaLab - Premier Software Agency",
    description: "Crafting digital excellence with cutting-edge technology solutions",
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
