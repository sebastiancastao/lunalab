import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Luna Lab — Software for small teams with large orbits",
  description:
    "Luna Lab is a remote studio building web applications, AI agents, automations and mobile apps for small businesses ready to leave the ground.",
  keywords: "software agency, web development, mobile apps, AI agents, automations",
  authors: [{ name: "Luna Lab" }],
  openGraph: {
    title: "Luna Lab — Software for small teams with large orbits",
    description:
      "Remote studio building web apps, AI agents, automations and mobile apps for small businesses.",
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
        className={`${instrumentSerif.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
