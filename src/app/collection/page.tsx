'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { GraniteItem } from '@/lib/store'
import LoadingSpinner from '@/components/LoadingSpinner'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CollectionPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const [graniteCollection, setGraniteCollection] = useState<GraniteItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/marbles')
        const data = await res.json().catch(() => ({}))
        setGraniteCollection(data.marbles || [])
      } catch {
        setGraniteCollection([])
      } finally { setLoading(false) }
    }
    load()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, rotationX: 45 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Grid animation with stagger
      const gridChildren = gridRef.current ? Array.from(gridRef.current.children) : []
      gsap.fromTo(gridChildren as Element[],
        { 
          opacity: 0, 
          y: 80, 
          rotationY: 45,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // 3D hover effects for cards
      if (gridRef.current?.children) {
        Array.from(gridRef.current.children).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              rotationY: 5,
              rotationX: 5,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            })
          })
          
          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              rotationY: 0,
              rotationX: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            })
          })
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Removed unused handleBuyNow function

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Header />
      
      {/* Professional Hero Section */}
      <section 
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          background: `
            linear-gradient(135deg, #fafafa 0%, #ffffff 25%, #f8fafc 50%, #ffffff 75%, #f1f5f9 100%),
            radial-gradient(circle at 20% 80%, rgba(242, 117, 10, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(242, 117, 10, 0.02) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(71, 85, 105, 0.02) 0%, transparent 50%)
          `
        }}
      >
        {/* Stone-Based Professional Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Stone texture overlay */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                radial-gradient(circle at 25% 25%, rgba(71, 85, 105, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(107, 114, 128, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 10%, rgba(55, 65, 81, 0.06) 0%, transparent 50%)
              `,
              backgroundSize: '200px 200px, 150px 150px, 180px 180px'
            }}
          ></div>
          
          {/* Stone slab patterns */}
          <div className="absolute inset-0 opacity-8">
            {/* Large stone slab */}
            <div className="absolute top-20 left-10 w-80 h-60 border-2 border-neutral-300/30 rounded-lg transform rotate-3"></div>
            <div className="absolute top-32 left-16 w-72 h-48 bg-gradient-to-br from-neutral-200/20 to-neutral-300/10 rounded-lg transform rotate-3"></div>
            
            {/* Medium stone slabs */}
            <div className="absolute top-40 right-20 w-64 h-40 border-2 border-accent-300/40 rounded-lg transform -rotate-2"></div>
            <div className="absolute top-48 right-24 w-56 h-32 bg-gradient-to-br from-accent-100/30 to-accent-200/20 rounded-lg transform -rotate-2"></div>
            
            {/* Small stone elements */}
            <div className="absolute bottom-32 left-32 w-40 h-32 border border-primary-300/30 rounded-lg transform rotate-1"></div>
            <div className="absolute bottom-40 left-36 w-32 h-24 bg-gradient-to-br from-primary-100/25 to-primary-200/15 rounded-lg transform rotate-1"></div>
            
            {/* Corner stone accents */}
            <div className="absolute top-16 right-16 w-24 h-16 border border-accent-400/40 rounded transform rotate-45"></div>
            <div className="absolute bottom-16 left-16 w-20 h-12 border border-primary-400/30 rounded transform -rotate-12"></div>
          </div>

          {/* Stone texture patterns */}
          <div className="absolute inset-0 opacity-6">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 40%, rgba(71, 85, 105, 0.02) 50%, transparent 60%),
                  linear-gradient(-45deg, transparent 40%, rgba(107, 114, 128, 0.015) 50%, transparent 60%)
                `,
                backgroundSize: '100px 100px'
              }}
            ></div>
          </div>
          
          {/* Stone grain patterns */}
          <div className="absolute inset-0 opacity-4">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(55, 65, 81, 0.01) 2px,
                    rgba(55, 65, 81, 0.01) 4px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(71, 85, 105, 0.008) 2px,
                    rgba(71, 85, 105, 0.008) 4px
                  )
                `
              }}
            ></div>
          </div>

          {/* Professional stone elements */}
          <div className="absolute inset-0 opacity-10">
            {/* Stone counter edge */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-neutral-300 via-accent-300 to-neutral-300"></div>
            
            {/* Stone measurement lines */}
            <div className="absolute top-1/3 left-20 w-1 h-32 bg-accent-400/30"></div>
            <div className="absolute top-1/2 right-20 w-24 h-1 bg-primary-400/30"></div>
            <div className="absolute bottom-1/3 left-1/2 w-1 h-20 bg-accent-500/25"></div>
          </div>

          {/* Subtle stone shadows */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-24 left-12 w-76 h-56 bg-gradient-to-br from-black/5 to-transparent rounded-lg transform rotate-3"></div>
            <div className="absolute top-44 right-16 w-60 h-36 bg-gradient-to-br from-black/4 to-transparent rounded-lg transform -rotate-2"></div>
            <div className="absolute bottom-36 left-28 w-36 h-28 bg-gradient-to-br from-black/6 to-transparent rounded-lg transform rotate-1"></div>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="text-center">
            <h1 
              ref={titleRef}
              className="heading-1 mb-8"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)'
              }}
            >
              Our Stone Collection
            </h1>
            <p 
              className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Discover our premium collection of granite and natural stone varieties from around the world. 
              Each piece is carefully selected for its unique beauty and exceptional quality.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Collection Grid */}
      <section ref={sectionRef} className="section bg-white">
        <div className="container">
          {loading ? (
            <LoadingSpinner label="Loading collection..." />
          ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {graniteCollection.map((granite) => (
              <Link
                key={granite.id}
                href={`/collection/${granite.id}`}
                className="group card overflow-hidden flex flex-col"
              >
                {/* Professional Stone Image */}
                <div className="relative h-64 overflow-hidden">
                  {granite.images && granite.images[0]?.url ? (
                    <Image src={granite.images[0].url} alt={granite.name} fill className="object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300" />
                  )}
                  <div className="absolute top-4 left-4">
                    <span 
                      className={`px-3 py-1 rounded-full ${
                        granite.category === 'premium' ? 'bg-accent-100 text-accent-700' :
                        granite.category === 'standard' ? 'bg-primary-100 text-primary-700' :
                        'bg-neutral-100 text-neutral-700'
                      }`}
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                      }}
                    >
                      {granite.category.charAt(0).toUpperCase() + granite.category.slice(1)}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span 
                      className={`px-3 py-1 rounded-full ${
                        granite.availability === 'in-stock' ? 'bg-green-100 text-green-700' :
                        granite.availability === 'limited' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                      }}
                    >
                      {granite.availability === 'in-stock' ? 'In Stock' :
                       granite.availability === 'limited' ? 'Limited' : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                {/* Professional Stone Content */}
                <div className="p-6 flex flex-col">
                  <h3 
                    className="heading-3 mb-2"
                    style={{
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                    }}
                  >
                    {granite.name}
                  </h3>
                  
                  <p 
                    className="text-neutral-500 mb-3"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >
                    📍 Origin: {granite.specifications.origin}
                  </p>
                  
                  <p 
                    className="text-neutral-600 mb-4 leading-relaxed"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >
                    {granite.description}
                  </p>

                  {/* Professional Pricing */}
                  <div className="mb-4">
                    <span 
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-neutral-100 text-neutral-600 font-semibold"
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                      }}
                    >
                      <span>Contact for pricing</span>
                      <span 
                        className="hidden sm:inline text-neutral-500"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                        }}
                      >• Free consultation & quote</span>
                    </span>
                  </div>

                  {/* Professional Action Button */}
                  <div 
                    className="mt-2 w-full py-3 bg-neutral-800 text-white font-semibold rounded-lg text-center hover:bg-neutral-900 transition-colors cursor-pointer"
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    }}
                  >
                    View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
          )}

          {/* Professional CTA Section */}
          <div className="mt-16 text-center">
            <div className="card p-8 max-w-4xl mx-auto">
              <h3 
                className="heading-2 mb-4"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >
                Can&apos;t Find What You&apos;re Looking For?
              </h3>
              <p 
                className="text-neutral-600 mb-6"
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                }}
              >
                We have access to hundreds of stone varieties from around the world. 
                Contact us to discuss your specific requirements and we&apos;ll help you find the perfect stone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('https://wa.me/919887971903', '_blank')}
                  className="btn-primary px-8 py-4"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                  }}
                >
                  💬 WhatsApp Us
                </button>
                <button
                  onClick={() => window.open('tel:+919887971903', '_self')}
                  className="btn-secondary px-8 py-4"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                  }}
                >
                  📞 Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
