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

const BASE_URL = "https://www.luna-lab.pro";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Luna Lab — Software for small teams with large orbits",
    template: "%s — Luna Lab",
  },
  description:
    "Luna Lab is a remote studio building web applications, AI agents, automations and mobile apps for small businesses ready to leave the ground.",
  keywords: "software agency, web development, mobile apps, AI agents, automations, AI automation studio",
  authors: [{ name: "Luna Lab" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Luna Lab — Software for small teams with large orbits",
    description:
      "Remote studio building web apps, AI agents, automations and mobile apps for small businesses.",
    url: BASE_URL,
    siteName: "Luna Lab",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luna Lab — Software for small teams with large orbits",
    description:
      "Remote studio building web apps, AI agents, automations and mobile apps for small businesses.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Luna Lab",
  url: BASE_URL,
  description:
    "Luna Lab is a remote studio building web applications, AI agents, automations and mobile apps for small businesses.",
  serviceType: [
    "Web application development",
    "AI agent development",
    "Business process automation",
    "Mobile app development",
  ],
  areaServed: "Worldwide",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
