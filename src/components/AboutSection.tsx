'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      // Skip all scroll-triggered animations on mobile for smooth scrolling
      return
    }

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
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Text reveal animation with stagger
      if (textRef.current?.children) {
        gsap.fromTo(textRef.current.children,
          { 
            opacity: 0, 
            x: -100,
            rotationY: 45
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Stats animation with 3D cards
      if (statsRef.current?.children) {
        gsap.fromTo(statsRef.current.children,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.8,
            rotationY: 45
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Animate individual stat numbers with counting effect
      const statNumbers = statsRef.current?.querySelectorAll('.stat-number')
      statNumbers?.forEach((stat, index) => {
        const finalValue = stat.textContent
        const numericValue = parseInt(finalValue?.replace(/\D/g, '') || '0')
        
        gsap.fromTo(stat,
          { 
            opacity: 0, 
            scale: 0.5,
            rotation: -180
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Counting animation
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            delay: index * 0.2 + 0.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        )
      })

      // 3D hover effects for stats
      const statCards = statsRef.current?.querySelectorAll('.stat-card')
      statCards?.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            rotationY: 5,
            rotationX: 5,
            scale: 1.05,
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

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-neutral-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={textRef} className="space-y-8">
            <h2 
              ref={titleRef}
              className="heading-2"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              About BD Stonex - Leading Granite & Marble Suppliers in Rajasthan
            </h2>
            
            <div 
              className="space-y-6 text-neutral-600 leading-relaxed"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)'
              }}
            >
              <p className="">
                Founded in 2024, BD Stonex brings together decades of experience and a fresh perspective. 
                From raw granite sourcing to precision finishing, we are dedicated to delivering excellence 
                that stands the test of time.
              </p>
              
              <p>
                Our leadership team brings over 58 years of combined experience in the granite and marble industry. 
                With expertise spanning from traditional craftsmanship to modern innovation, we work directly with 
                quarries and suppliers to source the finest materials and ensure consistent quality.
              </p>
              
              <p>
                From initial consultation to final installation, we maintain the highest standards of service and quality. 
                Our precision marking and finishing expertise, combined with strong supplier relationships, allows us 
                to deliver custom solutions that meet the most demanding specifications.
              </p>

              <div className="pt-4">
                <a 
                  href="/about"
                  className="btn-primary inline-block text-center"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>

          {/* Professional Stats */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            <div className="card p-8 text-center">
              <div className="stat-number text-4xl font-bold text-accent-600 mb-2">58+</div>
              <div 
                className="text-neutral-600 font-medium"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >Years Combined Experience</div>
            </div>
            
            <div className="card p-8 text-center">
              <div className="stat-number text-4xl font-bold text-accent-600 mb-2">2024</div>
              <div 
                className="text-neutral-600 font-medium"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >Founded</div>
            </div>
            
            <div className="card p-8 text-center">
              <div className="stat-number text-4xl font-bold text-accent-600 mb-2">4</div>
              <div 
                className="text-neutral-600 font-medium"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >Expert Leadership</div>
            </div>
            
            <div className="card p-8 text-center">
              <div className="stat-number text-4xl font-bold text-accent-600 mb-2">100%</div>
              <div 
                className="text-neutral-600 font-medium"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >Quality Commitment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}