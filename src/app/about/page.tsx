'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
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

  const teamMembers = [
    {
      name: "Mr. Manish Surana",
      position: "Founder & Head of Operations",
      experience: "23+ Years",
      description: "With over 23 years of experience in the granite and marble industry, Mr. Manish Surana laid the foundation of BD Stonex. Beginning his career as a supplier, he built deep relationships across the stone supply network and developed a strong understanding of quality sourcing, logistics, and client satisfaction. His dedication to integrity and excellence continues to guide our company's growth and reputation.",
      initials: "MS"
    },
    {
      name: "Mr. Jai Ram Thakan",
      position: "Cofounder & Production Head",
      experience: "20+ Years",
      description: "A seasoned professional with 20+ years of hands-on experience as a marker, Mr. Jai Ram Thakan brings unmatched technical precision and craftsmanship to BD Stonex. His keen eye for detail, marking accuracy, and finishing expertise ensure that every slab leaving our factory meets the highest quality standards.",
      initials: "JRT"
    },
    {
      name: "Mr. Kavya Surana",
      position: "Head of Growth & Innovation",
      experience: "Next Gen Leader",
      description: "Representing the new generation of leadership at BD Stonex, Kavya is committed to integrating modern business practices with the company's long-standing values. He focuses on strategic growth, digital transformation, and customer-centric innovation, ensuring BD Stonex continues to evolve while maintaining its legacy of trust and quality.",
      initials: "KS"
    }
  ]

  const milestones = [
    {
      year: "1999",
      title: "Company Founded",
      description: "BD Stonex was established with a mission to provide premium granite solutions."
    },
    {
      year: "2005",
      title: "First Major Contract",
      description: "Secured our first large-scale commercial project, establishing our reputation in the industry."
    },
    {
      year: "2010",
      title: "Facility Expansion",
      description: "Expanded our fabrication facility with state-of-the-art equipment and technology."
    },
    {
      year: "2015",
      title: "Award Recognition",
      description: "Received the 'Best Granite Contractor' award from the National Stone Association."
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description: "Launched our digital consultation platform and 3D visualization tools."
    },
    {
      year: "2024",
      title: "25th Anniversary",
      description: "Celebrating 25 years of excellence with over 5,000 completed projects."
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
              About BD Stonex
            </h1>
            <p 
              className="text-large text-neutral-600 max-w-4xl mx-auto leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Crafting excellence in stone for over two decades. Discover our story, our team, 
              and our commitment to bringing you the finest stone solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Our Story */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 
                className="heading-2 mb-8"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >
                Our Story
              </h2>
              <div 
                className="space-y-6 text-neutral-600 leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                <p>
                  Founded in 2024, BD Stonex brings together decades of experience and a fresh perspective. 
                  From raw granite sourcing to precision finishing, we are dedicated to delivering excellence 
                  that stands the test of time.
                </p>
                <p>
                  What started as a passion for quality craftsmanship has grown into one of the most 
                  respected granite companies in the industry. With over 43 years of combined experience 
                  among our leadership team, we bring deep expertise in quality sourcing, precision marking, 
                  and innovative business practices.
                </p>
                <p>
                  Today, we&apos;re proud to have established strong relationships across the stone supply 
                  network and continue to serve our customers with the perfect blend of traditional 
                  craftsmanship and modern innovation. Each project represents our dedication to excellence 
                  and our belief that every space deserves the finest materials.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="card p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h3 
                    className="heading-3 mb-4"
                    style={{
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                    }}
                  >Our Mission</h3>
                  <p 
                    className="text-neutral-600 mb-6"
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    }}
                  >
                    To deliver exceptional granite and marble solutions through precision craftsmanship, 
                    quality sourcing, and unwavering commitment to customer satisfaction, while maintaining 
                    the highest standards of integrity and excellence.
                  </p>
                  <h3 
                    className="heading-3 mb-4"
                    style={{
                      fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                    }}
                  >Our Vision</h3>
                  <p 
                    className="text-neutral-600"
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    }}
                  >
                    To be the premier destination for premium stone solutions, combining decades of 
                    traditional expertise with modern innovation to create spaces that stand the test of time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Team Section */}
      <section className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 
              className="heading-2 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              Meet Our Team
            </h2>
            <p 
              className="text-large text-neutral-600 max-w-3xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Meet our leadership team, bringing together over 58 years of combined experience 
              in granite and marble industry, from traditional craftsmanship to modern innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="card p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-neutral-900 font-bold text-2xl">
                    {member.initials}
                  </span>
                </div>
                <h3 
                  className="heading-3 mb-2"
                  style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                  }}
                >{member.name}</h3>
                <p 
                  className="text-accent-600 font-semibold mb-2"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >{member.position}</p>
                <p 
                  className="text-neutral-500 mb-4"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >{member.experience}</p>
                <p 
                  className="text-neutral-600 leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Professional Values Section */}
      <section className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 
              className="heading-2 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              Our Values
            </h2>
            <p 
              className="text-large text-neutral-600 max-w-3xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              The core principles that drive our commitment to excellence, integrity, and innovation 
              in every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 
                className="heading-3 mb-4"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >Precision Craftsmanship</h3>
              <p 
                className="text-neutral-600"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                With decades of experience in marking and finishing, we ensure every slab meets 
                the highest quality standards through meticulous attention to detail.
              </p>
            </div>
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 
                className="heading-3 mb-4"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >Trust & Integrity</h3>
              <p 
                className="text-neutral-600"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                Built on decades of strong relationships with suppliers and customers, we maintain 
                the highest standards of integrity in every business interaction.
              </p>
            </div>
            <div className="card p-8 text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 
                className="heading-3 mb-4"
                style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
                }}
              >Innovation & Growth</h3>
              <p 
                className="text-neutral-600"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                Combining traditional craftsmanship with modern business practices and digital 
                transformation to ensure continuous growth and evolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
