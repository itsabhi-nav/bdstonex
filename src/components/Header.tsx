'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )

      // Logo animation
      gsap.fromTo(logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, delay: 0.2, ease: "back.out(1.7)" }
      )

      // Navigation items animation
      const navChildren = navRef.current?.children
      if (navChildren) {
        gsap.fromTo(navChildren,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.4, ease: "power2.out" }
        )
      }

      // Keep header static - no scroll effects
    }, headerRef)

    return () => ctx.revert()
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Collection', href: '/collection' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden">
                <img 
                  src="/logo.jpeg" 
                  alt="BD Stonex - Premium Granite & Marble Suppliers in Rajasthan, Kishangarh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span 
                  className="font-bold text-neutral-900 leading-tight"
                  style={{
                    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)'
                  }}
                >
                  BD Stonex
                </span>
                <span 
                  className="text-accent-600 font-medium leading-tight"
                  style={{
                    fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)'
                  }}
                >
                  Premium Granite
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-neutral-600 hover:text-accent-600 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20my%20stone%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-600 hover:text-accent-600 transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border border-neutral-200 rounded-lg mt-2 shadow-lg">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-3 py-2 text-neutral-600 hover:text-accent-600 hover:bg-accent-50 rounded-md transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="#contact"
                  className="block w-full text-center px-4 py-2 btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
