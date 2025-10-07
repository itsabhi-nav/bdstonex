import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Granite Collection in Rajasthan | Kitchen Countertops, Bathroom Vanities | BD Stonex',
  description: 'Explore our premium granite collection in Rajasthan. Kitchen countertops, bathroom vanities, flooring tiles. Premium quality granite slabs with custom fabrication. Free consultation. Call +91 98879 71903',
  keywords: 'granite collection Rajasthan, marble collection Kishangarh, premium granite slabs, kitchen countertops, bathroom vanities, granite tiles, marble tiles, natural stone collection, granite showroom, marble showroom',
  openGraph: {
    title: 'Premium Granite Collection in Rajasthan | BD Stonex',
    description: 'Explore our premium granite collection. Kitchen countertops, bathroom vanities, flooring tiles. Premium quality with custom fabrication.',
    url: 'https://bdstonex.com/collection',
  },
  alternates: {
    canonical: '/collection',
  },
}

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
