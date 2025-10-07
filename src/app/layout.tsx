import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import StructuredData from "@/components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'BD Stonex - #1 Premium Granite & Marble Suppliers in Rajasthan | Kitchen Countertops, Bathroom Vanities',
  description: 'Leading granite & marble suppliers in Rajasthan since 2024. Premium kitchen countertops, bathroom vanities, flooring solutions. 43+ years combined experience. Free consultation & installation. Call +91 98879 71903',
  keywords: 'granite suppliers Rajasthan, marble suppliers Ajmer, kitchen countertops Kishangarh, bathroom vanities, granite flooring, marble tiles, natural stone Rajasthan, BD Stonex, granite fabrication, stone installation, premium granite, luxury marble, commercial stone projects, residential stone solutions, granite exporters India, marble manufacturers, stone consultation, free granite quote, granite showroom Kishangarh, marble showroom Ajmer, granite countertops near me, marble suppliers near me',
  authors: [{ name: 'BD Stonex Team' }],
  creator: 'BD Stonex',
  publisher: 'BD Stonex',
  metadataBase: new URL('https://bdstonex.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BD Stonex - Premium Granite & Marble Suppliers in Rajasthan | Free Consultation',
    description: 'Leading granite & marble suppliers in Rajasthan. Premium kitchen countertops, bathroom vanities, flooring. 43+ years experience. Free consultation. Call +91 98879 71903',
    url: 'https://bdstonex.com',
    siteName: 'BD Stonex',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'BD Stonex - Premium Granite & Marble Solutions in Rajasthan',
      },
    ],
    locale: 'en_IN',
    type: 'website',
    countryName: 'India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BD Stonex - Premium Granite & Marble Suppliers in Rajasthan',
    description: 'Leading granite & marble suppliers. Premium countertops, vanities, flooring. 43+ years experience. Free consultation.',
    images: ['/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Construction & Building Materials',
  classification: 'Granite and Marble Suppliers',
  applicationName: 'BD Stonex',
  generator: 'Next.js',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f2750a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" className="scroll-smooth">
        <head>
          <StructuredData />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-neutral-900`}
        >
          {children}
          <FloatingActions />
        </body>
    </html>
  );
}
