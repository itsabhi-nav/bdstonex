'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { GraniteItem } from '@/lib/store'
import LoadingSpinner from '@/components/LoadingSpinner'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GraniteDetailPage() {
  const params = useParams()
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Constants requested to remain the same for all detail pages
  const constantFeatures = [
    'Unique Color Pattern',
    'Heat Resistant',
    'Stain Proof',
    'Easy Maintenance',
    'Durable Surface'
  ]
  const constantApplications = [
    'Kitchen Countertops',
    'Bathroom Vanities',
    'Flooring',
    'Wall Cladding',
    'Decorative Features'
  ]
  const constantSpecs = {
    hardness: 'Mohs Scale: 6-7',
    finish: 'Polished',
    thickness: '2cm, 3cm available'
  }

  const graniteId = parseInt(params?.id as string)
  const [granite, setGranite] = useState<GraniteItem | null>(null)
  const [related, setRelated] = useState<GraniteItem[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/marbles', { cache: 'no-store' })
        const data = await res.json()
        const items: GraniteItem[] = data.marbles || []
        const found = items.find(x => x.id === String(graniteId)) || null
        setGranite(found)
        setRelated(items.filter(x => x.id !== String(graniteId)).slice(0, 3))
      } catch {
        setGranite(null)
        setRelated([])
      } finally { setLoading(false) }
    }
    load()
  }, [graniteId])

  // Run animations after render; hook must be called every render to preserve order
  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, scale: 0.8, rotationY: 45 },
          { opacity: 1, scale: 1, rotationY: 0, duration: 1.2, ease: "back.out(1.7)",
            scrollTrigger: { trigger: imageRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          }
        )
      }

      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1, stagger: 0.15, ease: "power2.out",
            scrollTrigger: { trigger: contentRef.current, start: "top 80%", toggleActions: "play none none reverse" }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [granite])

  if (loading) {
    return <LoadingSpinner label="Loading details..." />
  }

  if (!granite) {
    return (
      <main className="min-h-screen bg-white text-neutral-900 flex flex-col items-center justify-center pt-20">
        <Header />
        <div className="text-center py-20">
          <h1 className="heading-1 mb-4">Stone Not Found</h1>
          <p className="text-large text-neutral-600 mb-8">The stone you are looking for does not exist.</p>
          <Link 
            href="/collection" 
            className="btn-primary px-8 py-4"
            style={{
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
            }}
          >
            View All Collection
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

 

  const handleBuyNow = () => {
    const message = `Hi, I'm interested in ${granite.name} granite. Please provide more details and pricing.`;
    const whatsappUrl = `https://wa.me/919887971903?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  const handleCallNow = () => {
    window.open('tel:+919887971903', '_self');
  }

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />
      
      {/* Professional Hero Section */}
      <section className="pt-28 pb-10 bg-gradient-to-br from-neutral-50 to-white">
        <div className="container">
          {/* Professional Breadcrumbs */}
          <nav className=" text-neutral-500 mb-6">
            <Link href="/collection" className="hover:text-accent-600">Collection</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{granite.name}</span>
          </nav>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="heading-1">
              {granite.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1  rounded-full ${
                granite.category === 'premium' ? 'bg-accent-100 text-accent-700' :
                granite.category === 'standard' ? 'bg-primary-100 text-primary-700' :
                'bg-neutral-100 text-neutral-700'
              }`}>
                {granite.category.charAt(0).toUpperCase() + granite.category.slice(1)}
              </span>
              <span className={`px-3 py-1  rounded-full ${
                granite.availability === 'in-stock' ? 'bg-green-100 text-green-700' :
                granite.availability === 'limited' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {granite.availability === 'in-stock' ? 'In Stock' : granite.availability === 'limited' ? 'Limited' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <p className="mt-4 text-large text-neutral-600 max-w-4xl leading-relaxed">
            {granite.description}
          </p>
        </div>
      </section>

      <section ref={sectionRef} className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Media/Gallery */}
            <div ref={imageRef} className="lg:col-span-7 space-y-4">
              <Gallery images={(granite.images || []).map(img => img.url)} name={granite.name} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <SpecCard label="Origin" value={granite.specifications.origin} />
                <SpecCard label="Hardness" value={constantSpecs.hardness} />
                <SpecCard label="Finish" value={constantSpecs.finish} />
                <SpecCard label="Thickness" value={constantSpecs.thickness} />
              </div>
            </div>

            {/* Details + CTA (Sticky on desktop) */}
            <div ref={contentRef} className="lg:col-span-5 space-y-8 lg:sticky lg:top-28 h-fit">
              {/* Professional Features */}
              <div>
                <h3 className="heading-2 mb-6">Key Features</h3>
                <ul className="space-y-3  text-neutral-600">
                  {constantFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-accent-500 mr-3 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Professional Applications */}
              <div>
                <h3 className="heading-2 mb-6">Applications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {constantApplications.map((app, i) => (
                    <div key={i} className="flex items-center p-3 bg-neutral-100 rounded-lg">
                      <span className="text-accent-500 mr-3">•</span>
                      <span className="text-neutral-700">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Removed duplicate specs block as requested */}

              {/* Professional Contact & Buy Section */}
              <div className="card p-8">
                <h3 className="heading-3 mb-4">Ready to Purchase?</h3>
                <p className="text-neutral-600 mb-6">
                  Contact us for the best pricing and free consultation. Our experts will help you choose the perfect stone for your project.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleBuyNow}
                    className="btn-primary px-6 py-4 "
                  >
                    💬 WhatsApp Us
                  </button>
                  <button
                    onClick={handleCallNow}
                    className="btn-secondary px-6 py-4 "
                  >
                    📞 Call Now
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <span className=" font-bold text-accent-600">{granite.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Related Items */}
      <section className="section bg-neutral-50">
        <div className="container">
          <h2 className="heading-2 mb-8">You might also like</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(item => (
              <Link key={item.id} href={`/collection/${item.id}`} className="card overflow-hidden block group">
                <div className="relative h-44">
                  <Image src={(item.images && item.images[0]?.url) || '/granite/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className=" font-semibold group-hover:text-accent-600 transition-colors">{item.name}</h3>
                    <span className=" px-2 py-1 rounded-full bg-accent-100 text-accent-700">{item.category.charAt(0).toUpperCase()+item.category.slice(1)}</span>
                  </div>
                  <p className=" text-neutral-600 line-clamp-2">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

// Reusable components for gallery and spec cards
function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const imgs = images && images.length > 0 ? images : ['/granite/placeholder.jpg']
  return (
    <div className="space-y-3">
      <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden card">
        <Image src={imgs[active]} alt={`${name} image`} fill sizes="(max-width:768px) 100vw, 60vw" className="object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-3 overflow-x-auto">
        {imgs.map((img: string, i: number) => (
          <button key={i} onClick={() => setActive(i)} className={`relative h-20 rounded-xl overflow-hidden border-2 ${active===i ? 'border-accent-500' : 'border-neutral-200'}`}>
            <Image src={img} alt={`${name} ${i+1}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4 text-center">
      <div className="text-neutral-500  uppercase tracking-wide">{label}</div>
      <div className="text-neutral-900 font-semibold mt-1">{value}</div>
    </div>
  )
}