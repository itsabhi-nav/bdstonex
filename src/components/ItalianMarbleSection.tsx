'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ItalianMarbleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const marbleFeatures = [
    {
      icon: '🇮🇹',
      title: 'Authentic Italian Heritage',
      description: 'Sourced directly from Italy\'s most prestigious quarries with centuries of tradition.'
    },
    {
      icon: '✨',
      title: 'Unmatched Quality',
      description: 'Renowned worldwide for its exceptional durability, beauty, and timeless elegance.'
    },
    {
      icon: '🎨',
      title: 'Unique Patterns',
      description: 'Each slab features distinctive veining and colors that cannot be replicated.'
    },
    {
      icon: '💎',
      title: 'Luxury Finish',
      description: 'Perfect for high-end residential and commercial projects requiring premium materials.'
    }
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isMobile || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            once: true
          }
        }
      )

      // Content animation
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            once: true
          }
        }
      )

      // Image animation
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            once: true
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="heading-2 mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}
          >
            Premium Italian Marble Collection
          </h2>
          <p 
            className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}
          >
            Discover the timeless elegance of authentic Italian marble, handpicked from the world&apos;s most prestigious quarries. 
            Experience luxury that has adorned palaces and monuments for centuries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="card p-8">
              <h3 
                className="heading-3 mb-6"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >
                Why Italian Marble?
              </h3>
              <p 
                className="text-neutral-600 mb-8 leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                Italian marble represents the pinnacle of natural stone luxury. Known for its exceptional quality, 
                unique veining patterns, and unmatched durability, Italian marble has been the choice of architects 
                and designers worldwide for creating extraordinary spaces.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {marbleFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div>
                      <h4 
                        className="font-semibold text-neutral-900 mb-2"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                        }}
                      >
                        {feature.title}
                      </h4>
                      <p 
                        className="text-neutral-600 text-sm"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="card p-8 bg-gradient-to-r from-accent-50 to-primary-50 border border-accent-200">
              <h4 
                className="heading-3 mb-4 text-center"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >
                Explore Our Complete Collection
              </h4>
              <p 
                className="text-neutral-600 text-center mb-6"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                For a comprehensive selection of Italian marble varieties, premium finishes, and expert guidance, 
                visit our specialized marble website.
              </p>
              <div className="text-center">
                <a 
                  href="https://suranastonex.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary px-8 py-4 inline-flex items-center gap-2"
                >
                  <span>Visit Surana StoneX</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Image/Visual */}
          <div ref={imageRef} className="relative">
            <div className="relative">
              {/* Surana StoneX Image - Clickable */}
              <a 
                href="https://suranastonex.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl relative overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src="/suranastonex.png" 
                    alt="Surana StoneX - Premium Italian Marble Collection"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🏛️</div>
                        <h4 
                          className="font-bold mb-1"
                          style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                          }}
                        >
                          Surana StoneX
                        </h4>
                        <p 
                          className="opacity-90"
                          style={{
                            fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                          }}
                        >
                          Premium Italian Marble Collection
                        </p>
                        <div className="mt-3 opacity-80">
                          <span className="text-sm">Click to explore →</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                🇮🇹
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                ✨
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-4xl mx-auto">
            <h4 
              className="heading-3 mb-4"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
              }}
            >
              Need More Information?
            </h4>
            <p 
              className="text-neutral-600 mb-6"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)'
              }}
            >
              Our marble specialists are available to help you choose the perfect Italian marble for your project. 
              Contact us for personalized consultation and detailed specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20get%20a%20consultation%20about%20Italian%20marble%20for%20my%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-6 py-3"
              >
                Get Consultation
              </a>
              <a 
                href="https://suranastonex.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 inline-flex items-center gap-2"
              >
                <span>View Full Collection</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
