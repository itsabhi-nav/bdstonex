'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import LoadingSpinner from '@/components/LoadingSpinner'
import type { GraniteItem } from '@/lib/store'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function GraniteShowcase() {
  const [graniteSlabs, setGraniteSlabs] = useState<GraniteItem[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/marbles', { cache: 'no-store' })
        const data = await res.json()
        const items: GraniteItem[] = data.marbles || []
        setGraniteSlabs(items.filter(x => x.featured).slice(0, 3))
      } catch {
        setGraniteSlabs([])
      } finally { setLoading(false) }
    }
    load()
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const ctx = gsap.context(() => {
      // Title animation with 3D effect
      gsap.fromTo(titleRef.current,
        { 
          opacity: 0, 
          y: 100, 
          scale: 0.8,
          rotationX: 45
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

      // Cards animation with 3D rotation
      const cards = cardsRef.current?.querySelectorAll('.granite-card')
      cards?.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 100, 
            rotateY: 45,
            scale: 0.8,
            rotationX: 30
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // 3D hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -20,
            rotateY: 10,
            rotateX: 5,
            scale: 1.05,
            duration: 0.5,
            ease: "power2.out"
          })
          
          // Animate the granite slab inside
          const slab = card.querySelector('.granite-slab')
          gsap.to(slab, {
            rotateY: 15,
            rotateX: 10,
            scale: 1.1,
            duration: 0.5,
            ease: "power2.out"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          })
          
          const slab = card.querySelector('.granite-slab')
          gsap.to(slab, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          })
        })

        // Disable continuous rotation animations to prevent scroll blocking
        // Static granite slabs for better performance
      })

      // Disable parallax effects to prevent scroll blocking
      // Static background for better performance

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-neutral-50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="heading-2"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}
          >
            Featured Stone Collection
          </h2>
          <p 
            className="text-large text-neutral-600 max-w-2xl mx-auto mt-4"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}
          >
            Discover our curated selection of premium granite and natural stone varieties
          </p>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading featured collection..." />
        ) : (
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {graniteSlabs.slice(0, 3).map((slab) => (
            <Link
              key={slab.id}
              href={`/collection/${slab.id}`}
              className="card p-6 group block"
            >
              {/* Professional Image Display */}
              <div className="relative mb-6 h-48 rounded-lg overflow-hidden">
                {/* Status Badges */}
                <div className="absolute top-3 left-3 z-10">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    slab.category === 'premium' ? 'bg-accent-100 text-accent-700' :
                    slab.category === 'standard' ? 'bg-primary-100 text-primary-700' :
                    'bg-neutral-100 text-neutral-700'
                  }`}>
                    {slab.category.charAt(0).toUpperCase() + slab.category.slice(1)}
                  </span>
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-3 py-1 text-xs rounded-full ${
                    slab.availability === 'in-stock' ? 'bg-green-100 text-green-700' :
                    slab.availability === 'limited' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {slab.availability === 'in-stock' ? 'In Stock' : slab.availability === 'limited' ? 'Limited' : 'Out of Stock'}
                  </span>
                </div>
                {slab.images && slab.images[0]?.url ? (
                  <Image src={slab.images[0].url} alt={slab.name} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300" />
                )}
              </div>

              <div className="space-y-4">
                <h3 className="heading-3">
                  {slab.name}
                </h3>
                <p 
                  className="text-neutral-600 leading-relaxed line-clamp-3"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  {slab.description}
                </p>
                <div className="border-t border-neutral-200 pt-4 flex justify-between items-center">
                  <span 
                    className="text-white bg-accent-500 px-3 py-1 rounded-full font-medium"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >
                    Contact for Pricing
                  </span>
                  <div 
                    className="text-accent-600 font-semibold group-hover:text-accent-700 transition-colors"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >
                    View Details →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}

        {/* Professional Call to Action */}
        <div className="text-center mt-16">
          <Link href="/collection" className="btn-primary px-12 py-4 ">
            View Complete Collection
          </Link>
        </div>
      </div>
    </section>
  )
}