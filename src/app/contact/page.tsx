'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactPage() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project: '',
    message: ''
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(formRef.current,
        { opacity: 0, y: 50, rotationX: 45 },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Info animation
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 50, rotationY: 45 },
        { 
          opacity: 1, 
          x: 0, 
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will contact you soon.')
  }

  const handlePhoneCall = () => {
    window.open('https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20call%20you%20about%20my%20stone%20project.', '_blank')
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/919887971903', '_blank')
  }

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
              className="heading-1 mb-8"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)'
              }}
            >
              Get In Touch
            </h1>
            <p 
              className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Ready to transform your space with premium stone? Contact us today for a free consultation 
              and quote. Our experts are here to help you choose the perfect solution.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="section bg-gradient-to-br from-slate-200 via-blue-50 to-gray-200 relative overflow-hidden">
        {/* Dark Stone Pattern Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23334155' fill-opacity='0.3'%3E%3Crect x='0' y='0' width='50' height='50'/%3E%3Crect x='50' y='50' width='50' height='50'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Large Prominent Stone Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-slate-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-72 h-72 opacity-40">
          <div className="w-full h-full bg-gradient-to-tr from-slate-500 to-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 opacity-25">
          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-slate-400 rounded-2xl blur-2xl transform rotate-45"></div>
        </div>
        
        {/* Additional Stone Textures */}
        <div className="absolute top-20 left-20 w-32 h-32 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-blue-300 to-slate-400 rounded-xl blur-xl transform -rotate-12"></div>
        </div>
        <div className="absolute bottom-20 right-20 w-40 h-40 opacity-30">
          <div className="w-full h-full bg-gradient-to-tr from-slate-400 to-blue-300 rounded-xl blur-xl transform rotate-12"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Professional Contact Form */}
            <div ref={formRef} className="card p-8">
              <h2 
                className="heading-2 mb-8"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-neutral-700 font-medium mb-2"
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                      }}
                    >Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-accent-500 focus:outline-none transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-neutral-700 font-medium mb-2"
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                      }}
                    >Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-accent-500 focus:outline-none transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-neutral-700 font-medium mb-2"
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                      }}
                    >Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-accent-500 focus:outline-none transition-all duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label 
                      className="block text-neutral-700 font-medium mb-2"
                      style={{
                        fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                      }}
                    >Project Type</label>
                    <select
                      name="project"
                      value={formData.project}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:border-accent-500 focus:outline-none transition-all duration-300"
                    >
                      <option value="">Select project type</option>
                      <option value="kitchen">Kitchen Countertops</option>
                      <option value="bathroom">Bathroom Vanity</option>
                      <option value="flooring">Flooring</option>
                      <option value="fireplace">Fireplace Surround</option>
                      <option value="outdoor">Outdoor Features</option>
                      <option value="commercial">Commercial Project</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label 
                    className="block text-neutral-700 font-medium mb-2"
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    }}
                  >Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:border-accent-500 focus:outline-none transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-4 "
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Professional Contact Information */}
            <div ref={infoRef} className="space-y-8">
              <div className="card p-8">
                <h3 
                  className="heading-2 mb-8"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                  }}
                >Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📍</span>
                    </div>
                    <div>
                      <h4 
                        className="text-neutral-900 font-semibold"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                        }}
                      >Address</h4>
                      <p 
                        className="text-neutral-600"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Khasara No. 991/777, Plot No. 13<br />Near Khatoli High School, Khatoli Road<br />Tehsil Kishangarh, District-Ajmer (Raj.) 305 801</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">📞</span>
                    </div>
                    <div>
                      <h4 
                        className="text-neutral-900 font-semibold"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                        }}
                      >Phone</h4>
                      <p 
                        className="text-neutral-600"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >+91 9887971903</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">✉️</span>
                    </div>
                    <div>
                      <h4 
                        className="text-neutral-900 font-semibold"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                        }}
                      >Email</h4>
                      <p 
                        className="text-neutral-600"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >info@bdstonex.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">🕒</span>
                    </div>
                    <div>
                      <h4 
                        className="text-neutral-900 font-semibold"
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                        }}
                      >Hours</h4>
                      <p 
                        className="text-neutral-600"
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                        }}
                      >Mon-Fri: 8AM-6PM<br />Sat: 9AM-4PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Quick Contact Buttons */}
              <div className="card p-8">
                <h3 
                  className="heading-3 mb-6"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                  }}
                >Quick Contact</h3>
                <div className="space-y-4">
                  <button
                    onClick={handlePhoneCall}
                    className="w-full btn-primary py-3 "
                  >
                    📞 WhatsApp: +91 9887971903
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full btn-secondary py-3 "
                  >
                    💬 WhatsApp Us
                  </button>
                </div>
              </div>

              {/* Professional Why Choose Us */}
              <div className="card p-8">
                <h3 
                  className="heading-3 mb-6"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                  }}
                >Why Choose Us?</h3>
                <ul 
                  className="space-y-3 text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                <li className="flex items-center space-x-3">
                    <span className="text-accent-500">✓</span>
                    <span>Free consultation and quote</span>
                  </li>
                <li className="flex items-center space-x-3">
                    <span className="text-accent-500">✓</span>
                    <span>20+ years of experience</span>
                  </li>
                <li className="flex items-center space-x-3">
                    <span className="text-accent-500">✓</span>
                    <span>Premium quality materials</span>
                  </li>
                <li className="flex items-center space-x-3">
                    <span className="text-accent-500">✓</span>
                    <span>Expert installation team</span>
                  </li>
                <li className="flex items-center space-x-3">
                    <span className="text-accent-500">✓</span>
                    <span>Lifetime warranty</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
