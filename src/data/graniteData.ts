export interface GraniteData {
  id: number
  name: string
  description: string
  color: string
  pattern: string
  price: string
  features: string[]
  applications: string[]
  finishes?: string[]
  specifications: {
    origin: string
    hardness: string
    finish: string
    thickness: string
  }
  images: string[]
  category: 'premium' | 'standard' | 'budget'
  availability: 'in-stock' | 'limited' | 'out-of-stock'
}

export const graniteCollection: GraniteData[] = [
  {
    id: 1,
    name: 'Absolute Black',
    description: 'Deep, rich black granite with subtle mineral flecks that create a sophisticated and timeless appearance.',
    color: 'bg-gray-900',
    pattern: 'from-gray-800 to-black',
    price: 'Contact us for best pricing',
    features: [
      'Heat Resistant',
      'Stain Proof', 
      'Easy Maintenance',
      'Scratch Resistant',
      'Non-porous Surface'
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Commercial Spaces',
      'Outdoor Applications'
    ],
    specifications: {
      origin: 'India',
      hardness: 'Mohs Scale: 6-7',
      finish: 'Polished',
      thickness: '2cm, 3cm available'
    },
    images: ['/granite/absolute-black-1.jpg', '/granite/absolute-black-2.jpg'],
    category: 'premium',
    availability: 'in-stock'
  },
  {
    id: 2,
    name: 'Blue Pearl',
    description: 'Stunning blue-gray granite with silver and bronze flecks that shimmer like stars in the night sky.',
    color: 'bg-blue-900',
    pattern: 'from-blue-800 to-slate-900',
    price: 'Contact us for best pricing',
    features: [
      'Unique Color Pattern',
      'Heat Resistant',
      'Stain Proof',
      'Easy Maintenance',
      'Durable Surface'
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Wall Cladding',
      'Decorative Features'
    ],
    specifications: {
      origin: 'Norway',
      hardness: 'Mohs Scale: 6-7',
      finish: 'Polished',
      thickness: '2cm, 3cm available'
    },
    images: ['/granite/blue-pearl-1.jpg', '/granite/blue-pearl-2.jpg'],
    category: 'premium',
    availability: 'in-stock'
  },
  {
    id: 3,
    name: 'Carrara White',
    description: 'Classic white marble with elegant gray veining that brings timeless sophistication to any space.',
    color: 'bg-gray-100',
    pattern: 'from-gray-200 to-white',
    price: 'Contact us for best pricing',
    features: [
      'Classic Elegance',
      'Heat Resistant',
      'Stain Resistant',
      'Easy Maintenance',
      'Timeless Appeal'
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Fireplace Surrounds',
      'Decorative Panels'
    ],
    specifications: {
      origin: 'Italy',
      hardness: 'Mohs Scale: 3-4',
      finish: 'Polished',
      thickness: '2cm, 3cm available'
    },
    images: ['/granite/carrara-white-1.jpg', '/granite/carrara-white-2.jpg'],
    category: 'premium',
    availability: 'in-stock'
  },
  {
    id: 4,
    name: 'Emerald Pearl',
    description: 'Green granite with shimmering pearl-like flecks that create a luxurious and unique appearance.',
    color: 'bg-green-900',
    pattern: 'from-green-800 to-emerald-900',
    price: 'Contact us for best pricing',
    features: [
      'Unique Green Color',
      'Pearl-like Flecks',
      'Heat Resistant',
      'Stain Proof',
      'Easy Maintenance'
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Commercial Spaces',
      'Outdoor Features'
    ],
    specifications: {
      origin: 'Norway',
      hardness: 'Mohs Scale: 6-7',
      finish: 'Polished',
      thickness: '2cm, 3cm available'
    },
    images: ['/granite/emerald-pearl-1.jpg', '/granite/emerald-pearl-2.jpg'],
    category: 'premium',
    availability: 'in-stock'
  },
  {
    id: 5,
    name: 'Red Dragon',
    description: 'Bold red granite with dramatic veining patterns that make a powerful statement in any design.',
    color: 'bg-red-900',
    pattern: 'from-red-800 to-red-900',
    price: 'Contact us for best pricing',
    features: [
      'Bold Red Color',
      'Dramatic Veining',
      'Heat Resistant',
      'Stain Proof',
      'Statement Piece'
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Commercial Spaces',
      'Decorative Features'
    ],
    specifications: {
      origin: 'Brazil',
      hardness: 'Mohs Scale: 6-7',
      finish: 'Polished',
      thickness: '2cm, 3cm available'
    },
    images: ['/granite/red-dragon-1.jpg', '/granite/red-dragon-2.jpg'],
    category: 'premium',
    availability: 'in-stock'
  },
  {
    id: 6,
    name: 'Bianco Carrara',
    description: 'Premium white marble with subtle gray veining, perfect for creating elegant and sophisticated spaces.',
    color: 'bg-gray-50',
    pattern: 'from-gray-100 to-white',
    price: 'Contact us for best pricing',
    features: [
      'Premium White',
      'Subtle Veining',
      'Heat Resistant',
      'Stain Resistant',
      'Luxury Finish'
    ],
    applications: [
      'Kitchen Countertops',
      'Bathroom Vanities',
      'Flooring',
      'Fireplace Surrounds',
      'Luxury Interiors'
    ],
    specifications: {
      origin: 'Italy',
      hardness: 'Mohs Scale: 3-4',
      finish: 'Polished',
      thickness: '2cm, 3cm available'
    },
    images: ['/granite/bianco-carrara-1.jpg', '/granite/bianco-carrara-2.jpg'],
    category: 'premium',
    availability: 'in-stock'
  }
]

// Get first 3 items for homepage showcase
export const getHomepageGranite = () => graniteCollection.slice(0, 3)

// Get granite by ID
export const getGraniteById = (id: number) => graniteCollection.find(granite => granite.id === id)

// Get all granite
export const getAllGranite = () => graniteCollection
