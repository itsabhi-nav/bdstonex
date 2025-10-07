'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
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

      // Form animation with stagger
      gsap.fromTo(formRef.current,
        { 
          opacity: 0, 
          x: -100,
          rotationY: 45
        },
        {
          opacity: 1,
          x: 0,
          rotationY: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Info animation with 3D effect
      gsap.fromTo(infoRef.current,
        { 
          opacity: 0, 
          x: 100,
          rotationY: -45
        },
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

      // Animate form fields on focus
      const formFields = formRef.current?.querySelectorAll('input, textarea, select')
      formFields?.forEach(field => {
        field.addEventListener('focus', () => {
          gsap.to(field, {
            scale: 1.02,
            y: -2,
            duration: 0.3,
            ease: "power2.out"
          })
        })
        
        field.addEventListener('blur', () => {
          gsap.to(field, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      })

      // Animate contact info cards
      const contactCards = infoRef.current?.querySelectorAll('.contact-card')
      contactCards?.forEach((card, index) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            y: 30, 
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // 3D hover effect
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            rotateY: 5,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          })
        })
      })

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

  return (
    <section ref={sectionRef} className="section bg-neutral-50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="heading-2 mb-6"
          >
            Get In Touch
          </h2>
          <p className="text-large text-neutral-600 max-w-2xl mx-auto">
            Ready to start your project? Contact our team for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Professional Contact Form */}
          <div ref={formRef} className="card p-8">
            <h3 className="heading-3 mb-8">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-700 font-medium mb-2">Name *</label>
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
                  <label className="block text-neutral-700 font-medium mb-2">Email *</label>
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
                  <label className="block text-neutral-700 font-medium mb-2">Phone</label>
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
                  <label className="block text-neutral-700 font-medium mb-2">Project Type</label>
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
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-2">Message *</label>
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
            <div className="contact-card card p-8">
              <h3 className="heading-3 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">📍</span>
                  </div>
                  <div>
                    <h4 className="text-neutral-900 font-semibold">Address</h4>
                    <p className="text-neutral-600">Khasara No. 991/777, Plot No. 13<br />Near Khatoli High School, Khatoli Road<br />Tehsil Kishangarh, District-Ajmer (Raj.) 305 801</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">📞</span>
                  </div>
                  <div>
                    <h4 className="text-neutral-900 font-semibold">Phone</h4>
                    <p className="text-neutral-600">(555) 123-GRANITE</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">✉️</span>
                  </div>
                  <div>
                    <h4 className="text-neutral-900 font-semibold">Email</h4>
                    <p className="text-neutral-600">info@bdgranite.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold">🕒</span>
                  </div>
                  <div>
                    <h4 className="text-neutral-900 font-semibold">Hours</h4>
                    <p className="text-neutral-600">Mon-Fri: 8AM-6PM<br />Sat: 9AM-4PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-card glass rounded-2xl p-8 transform-3d" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
            }}>
              <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-3">
                  <span className="text-brand-primary">✓</span>
                  <span>Free consultation and quote</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-brand-primary">✓</span>
                  <span>25+ years of experience</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-brand-primary">✓</span>
                  <span>Premium quality materials</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-brand-primary">✓</span>
                  <span>Expert installation team</span>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-brand-primary">✓</span>
                  <span>Lifetime warranty</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}