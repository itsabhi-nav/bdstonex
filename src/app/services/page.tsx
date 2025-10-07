'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ServicesPage() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Dynamic import to ensure client-side only
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)
      ScrollTrigger.refresh()
    }
    
    initGSAP().catch(console.error)
  }, [])

  const services = [
    {
      title: "Kitchen Countertops",
      description: "Transform your kitchen with premium granite countertops that combine beauty, durability, and functionality. Our expert team ensures perfect installation and finishing.",
      icon: "🏠",
      features: ["Heat Resistant", "Easy Maintenance", "Luxury Finish"]
    },
    {
      title: "Bathroom Vanities",
      description: "Create elegant bathroom spaces with our custom granite vanities. Perfect for master bathrooms, guest bathrooms, and powder rooms.",
      icon: "🛁",
      features: ["Water Resistant", "Stain Proof", "Elegant Design"]
    },
    {
      title: "Flooring Solutions",
      description: "Durable granite flooring that withstands heavy traffic while maintaining its natural beauty. Perfect for high-traffic areas and luxury spaces.",
      icon: "🏢",
      features: ["Heavy Duty", "Slip Resistant", "Long Lasting"]
    },
    {
      title: "Commercial Projects",
      description: "Large-scale granite installations for hotels, offices, restaurants, and commercial spaces. We handle projects of any size with professional efficiency.",
      icon: "🏨",
      features: ["Bulk Supply", "Fast Installation", "Quality Assurance"]
    },
    {
      title: "Custom Fabrication",
      description: "Bespoke granite solutions tailored to your specific requirements. From unique shapes to intricate designs, we bring your vision to life.",
      icon: "⚙️",
      features: ["Custom Design", "Precision Cut", "Unique Solutions"]
    },
    {
      title: "Maintenance & Care",
      description: "Professional maintenance services to keep your granite surfaces looking pristine. Regular care ensures longevity and beauty.",
      icon: "🔧",
      features: ["Regular Cleaning", "Sealing", "Repair Services"]
    }
  ]

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
              Our Services
            </h1>
            <p 
              className="text-large text-neutral-600 max-w-4xl mx-auto mb-8 leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Comprehensive stone solutions for residential and commercial projects. 
              From kitchen countertops to large-scale installations, we deliver excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20my%20stone%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                Get Free Quote
              </a>
            <Link
              href="/collection"
              className="btn-secondary px-8 py-4"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
              }}
            >
              View Portfolio
            </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Services Grid */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card p-8 text-center group"
              >
                <div className="text-5xl mb-6">{service.icon}</div>
                <h3 
                  className="heading-3 text-center mb-4"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                  }}
                >{service.title}</h3>
                <p 
                  className="text-neutral-600 text-center mb-6 leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >{service.description}</p>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => {
                    // Define icons for each feature
                    const getFeatureIcon = (feature: string) => {
                      switch (feature.toLowerCase()) {
                        case 'heat resistant': return '🔥'
                        case 'easy maintenance': return '🧽'
                        case 'luxury finish': return '✨'
                        case 'water resistant': return '💧'
                        case 'stain proof': return '🛡️'
                        case 'elegant design': return '🎨'
                        case 'heavy duty': return '💪'
                        case 'slip resistant': return '🦶'
                        case 'long lasting': return '⏰'
                        case 'bulk supply': return '📦'
                        case 'fast installation': return '⚡'
                        case 'quality assurance': return '✅'
                        case 'custom design': return '🎯'
                        case 'precision cut': return '✂️'
                        case 'unique solutions': return '💡'
                        case 'professional cleaning': return '🧹'
                        case 'periodic maintenance': return '🔄'
                        case 'expert consultation': return '👨‍💼'
                        default: return '⭐'
                      }
                    }
                    
                    return (
                      <div 
                        key={featureIndex} 
                        className="flex items-center text-neutral-600"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                        }}
                      >
                        <span className="text-lg mr-3">{getFeatureIcon(feature)}</span>
                      {feature}
                    </div>
                    )
                  })}
                </div>
                <Link 
                  href={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                  className="btn-secondary w-full"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional CTA Section */}
      <section className="section bg-neutral-50">
        <div className="container text-center">
          <div className="card p-12 max-w-4xl mx-auto">
            <h2 
              className="heading-2 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              Ready to Start Your Project?
            </h2>
            <p 
              className="text-large text-neutral-600 mb-8 max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Get a free consultation and quote for your stone project. Our experts will help you 
              choose the perfect solution for your needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20get%20a%20free%20consultation%20for%20my%20stone%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-8 py-4"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                Get Free Consultation
              </a>
              <a 
                href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20call%20you%20about%20my%20stone%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                📞 WhatsApp: +91 9887971903
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
