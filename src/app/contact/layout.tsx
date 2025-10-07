import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact BD Stonex - Granite & Marble Suppliers in Kishangarh, Rajasthan | Free Consultation',
  description: 'Contact BD Stonex for premium granite & marble solutions in Kishangarh, Rajasthan. Free consultation, custom fabrication, installation services. Call +91 98879 71903 or visit our showroom.',
  keywords: 'contact BD Stonex, granite suppliers Kishangarh, marble suppliers Rajasthan, granite showroom, marble showroom, free granite consultation, granite quote, stone installation contact',
  openGraph: {
    title: 'Contact BD Stonex - Granite & Marble Suppliers in Rajasthan',
    description: 'Contact us for premium granite & marble solutions. Free consultation, custom fabrication, installation services. Call +91 98879 71903.',
    url: 'https://bdstonex.com/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
