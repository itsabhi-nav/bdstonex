import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About BD Stonex - Leading Granite & Marble Suppliers in Rajasthan | 43+ Years Experience',
  description: 'Learn about BD Stonex team - Mr. Manish Surana, Mr. Jai Ram Thakan, and Mr. Kavya Surana. 43+ years combined experience in granite and marble industry. Founded in 2024, Kishangarh, Rajasthan.',
  keywords: 'about BD Stonex, granite team Rajasthan, marble experts Kishangarh, Manish Surana, Jai Ram Thakan, Kavya Surana, granite company history, stone industry experience',
  openGraph: {
    title: 'About BD Stonex - Leading Granite & Marble Suppliers in Rajasthan',
    description: 'Meet our expert team with 43+ years combined experience in granite and marble industry. Founded in 2024 in Kishangarh, Rajasthan.',
    url: 'https://bdstonex.com/about',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
