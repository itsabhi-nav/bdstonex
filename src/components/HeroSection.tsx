'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simple entrance animations without ScrollTrigger
    const tl = gsap.timeline({ delay: 0.2 })
      
      tl.fromTo(titleRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      )
      .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4"
      )
      .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3"
    )

  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24"
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


      {/* Stone-Themed Professional Content */}
      <div className="relative text-center px-4 max-w-6xl mx-auto" style={{ zIndex: 10 }}>
        {/* Stone-themed decorative element */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 opacity-60">
          <div className="w-8 h-1 bg-gradient-to-r from-transparent to-accent-500 rounded-full"></div>
          <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
          <div className="w-8 h-1 bg-gradient-to-l from-transparent to-accent-500 rounded-full"></div>
        </div>
        
        {/* Stone-inspired title with original font style */}
        <div className="relative mb-4 md:mb-6">
        <h1 
          ref={titleRef}
            className="heading-1 text-neutral-900 mb-2"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #334155 50%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)'
            }}
          >
            Premium Granite & Marble Solutions in Rajasthan
        </h1>
          {/* Stone texture accent */}
          <div className="absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 w-16 md:w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-400 to-transparent rounded-full opacity-70"></div>
        </div>
        
        <p 
          ref={subtitleRef}
          className="text-large text-neutral-700 mb-6 md:mb-8 max-w-4xl mx-auto px-4"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
          }}
        >
          Leading granite & marble suppliers in Rajasthan. Premium kitchen countertops, bathroom vanities, flooring solutions with 43+ years combined experience. Free consultation & installation.
        </p>
        
        
        {/* Mobile-responsive stone-themed CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 md:mb-16 px-4">
          <Link 
            href="/collection"
            className="btn-primary w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group inline-block text-center"
          >
            <span className="relative z-10">View Our Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          
          <a 
            href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20schedule%20a%20consultation%20for%20my%20stone%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full sm:w-auto px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-semibold hover:shadow-lg transition-all duration-300 relative group inline-block text-center"
          >
            <span className="relative z-10">Schedule Consultation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent-50 to-accent-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
          </a>
        </div>

        {/* Mobile-responsive Stone-Themed Professional Stats Section */}
        <div className="relative px-4">
          {/* Stone slab background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-100/80 via-white/90 to-neutral-100/80 rounded-xl md:rounded-2xl border-2 border-neutral-200/50 shadow-xl"></div>
          
          {/* Stone texture overlay */}
          <div 
            className="absolute inset-0 rounded-xl md:rounded-2xl opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(45deg, transparent 48%, rgba(71, 85, 105, 0.03) 50%, transparent 52%),
                linear-gradient(-45deg, transparent 48%, rgba(107, 114, 128, 0.02) 50%, transparent 52%)
              `,
              backgroundSize: '20px 20px'
            }}
          ></div>
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
            <div className="text-center group relative">
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border border-accent-400/30 rounded transform rotate-45 opacity-50"></div>
              <div className="relative">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">2,500+</div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-400 rounded-full opacity-70"></div>
              </div>
              <div className="text-xs sm:text-sm text-neutral-700 font-medium">Projects Completed</div>
            </div>
            
            <div className="text-center group relative">
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border border-primary-400/30 rounded transform rotate-45 opacity-50"></div>
              <div className="relative">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-400 rounded-full opacity-70"></div>
              </div>
              <div className="text-xs sm:text-sm text-neutral-700 font-medium">Combined Experience</div>
            </div>
            
            <div className="text-center group relative">
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border border-accent-400/30 rounded transform rotate-45 opacity-50"></div>
              <div className="relative">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent-500 rounded-full opacity-70"></div>
              </div>
              <div className="text-xs sm:text-sm text-neutral-700 font-medium">Stone Varieties</div>
          </div>
            
            <div className="text-center group relative">
              <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border border-primary-400/30 rounded transform rotate-45 opacity-50"></div>
              <div className="relative">
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full opacity-70"></div>
          </div>
              <div className="text-xs sm:text-sm text-neutral-700 font-medium">Satisfaction Rate</div>
          </div>
          </div>
          
          {/* Stone edge accent */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent rounded-full"></div>
        </div>

      </div>

      {/* Enhanced Professional Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer">
        <div className="w-6 h-10 border-2 border-accent-400 rounded-full flex justify-center group-hover:border-accent-500 transition-colors duration-300">
          <div className="w-1 h-3 bg-accent-500 rounded-full mt-2 animate-bounce group-hover:bg-accent-600 transition-colors duration-300"></div>
        </div>
      </div>
    </section>
  )
}