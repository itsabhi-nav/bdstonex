import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Granite & Marble Services in Rajasthan | Kitchen Countertops, Bathroom Vanities, Flooring | BD Stonex',
  description: 'Professional granite & marble services in Rajasthan. Kitchen countertops, bathroom vanities, flooring solutions, commercial projects, custom fabrication. Free consultation & installation. Call +91 98879 71903',
  keywords: 'granite services Rajasthan, marble services Kishangarh, kitchen countertops, bathroom vanities, granite flooring, commercial stone projects, custom fabrication, granite installation, marble installation, stone maintenance',
  openGraph: {
    title: 'Granite & Marble Services in Rajasthan | BD Stonex',
    description: 'Professional granite & marble services. Kitchen countertops, bathroom vanities, flooring solutions. Free consultation & installation.',
    url: 'https://bdstonex.com/services',
  },
  alternates: {
    canonical: '/services',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
