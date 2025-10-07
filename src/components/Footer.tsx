'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Simple fade-in animation for footer
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 overflow-hidden">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-5">
          <div
          className="absolute inset-0"
            style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.02) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(255, 255, 255, 0.01) 50%, transparent 60%)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Stone-themed decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Top stone accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent"></div>
        
        {/* Corner stone elements */}
        <div className="absolute top-8 left-8 w-16 h-2 bg-gradient-to-r from-accent-400 to-transparent rounded-full opacity-30"></div>
        <div className="absolute top-8 right-8 w-16 h-2 bg-gradient-to-l from-accent-400 to-transparent rounded-full opacity-30"></div>
        <div className="absolute bottom-8 left-8 w-12 h-1 bg-gradient-to-r from-primary-400 to-transparent rounded-full opacity-40"></div>
        <div className="absolute bottom-8 right-8 w-12 h-1 bg-gradient-to-l from-primary-400 to-transparent rounded-full opacity-40"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            
            {/* Company Information */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                {/* Logo/Brand */}
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden mr-4">
                    <img 
                      src="/logo.jpeg" 
                      alt="BD Stonex Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 
                      className="font-bold text-white"
                      style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)'
                      }}
                    >BD Stonex</h3>
                    <p 
                      className="text-accent-400 font-medium"
                      style={{
                        fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                      }}
                    >Manufacturer & Supplier of Quality Granite Slabs & Tiles</p>
                  </div>
                </div>
                
                {/* Company Description */}
                <p 
                  className="text-neutral-300 mb-8 leading-relaxed max-w-lg"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  Founded in 2024, BD Stonex brings together decades of experience and a fresh perspective. 
                  From raw granite sourcing to precision finishing, we deliver exceptional quality and craftsmanship 
                  with over 58 years of combined leadership experience.
                </p>


                {/* Social Media Links */}
            <div className="flex space-x-4">
                  <a href="#" className="group w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="group w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="group w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="group w-12 h-12 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
            </div>
          </div>

          {/* Quick Links */}
            <div>
              <h4 
                className="font-bold text-white mb-6 relative"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li><a 
                  href="/about" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  About Us
                </a></li>
                <li><Link 
                  href="/collection" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Our Collection
                </Link></li>
                <li><Link 
                  href="/services" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Services
                </Link></li>
                <li><a 
                  href="/contact" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Contact
                </a></li>
                <li><a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Portfolio
                </a></li>
            </ul>
          </div>

          {/* Services */}
            <div>
              <h4 
                className="font-bold text-white mb-6 relative"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >
                Our Services
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent-500 rounded-full"></div>
              </h4>
              <ul className="space-y-3">
                <li><a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Kitchen Countertops
                </a></li>
                <li><a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Bathroom Vanities
                </a></li>
                <li><a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Stone Flooring
                </a></li>
                <li><a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Fireplace Surrounds
                </a></li>
                <li><a 
                  href="#" 
                  className="text-neutral-300 hover:text-accent-400 transition-colors duration-300 flex items-center group"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  <div className="w-1 h-1 bg-accent-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  Custom Design
                </a></li>
            </ul>
            </div>

          {/* Contact Info */}
          <div>
            <h4 
              className="font-bold text-white mb-6 relative"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
              }}
            >
              Contact Info
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent-500 rounded-full"></div>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span 
                  className="text-neutral-300"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >Khasara No. 991/777, Plot No. 13, Near Khatoli High School, Khatoli Road, Tehsil Kishangarh, District-Ajmer (Raj.) 305 801</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span 
                  className="text-neutral-300"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >+91 98879 71903</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span 
                  className="text-neutral-300"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >info@bdstonex.com</span>
              </div>
            </div>
          </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-700 bg-neutral-950">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p 
                  className="text-neutral-400"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >
            © 2024 BD Stonex. All rights reserved.
          </p>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="w-1 h-1 bg-accent-500 rounded-full"></div>
                  <span 
                    className="text-neutral-500"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >Professional Stone Solutions</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-end space-x-6">
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-accent-400 transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Privacy Policy</a>
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-accent-400 transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Terms of Service</a>
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-accent-400 transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Cookie Policy</a>
                <a 
                  href="#" 
                  className="text-neutral-400 hover:text-accent-400 transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Sitemap</a>
              </div>
            </div>
          </div>
        </div>

        {/* Created By Section */}
        <div className="border-t border-neutral-800 bg-neutral-950/50">
          <div className="container mx-auto px-4 py-4">
            <div className="text-center">
              <p 
                className="text-neutral-400"
                style={{
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                }}
              >
                Created by{' '}
                <a 
                  href="https://dubeyabhinav.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-300 font-semibold transition-colors duration-300 underline decoration-accent-400/30 hover:decoration-accent-300/60"
                >
                  Abhinav Dubey
                </a>
                {' '}with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}