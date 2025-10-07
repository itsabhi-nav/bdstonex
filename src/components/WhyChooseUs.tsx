'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    icon: '🏆',
    title: 'Premium Quality',
    description: 'We source only the finest granite from trusted quarries worldwide, ensuring exceptional quality and durability.'
  },
  {
    icon: '⚡',
    title: 'Fast Installation',
    description: 'Our expert team delivers quick and efficient installation with minimal disruption to your daily routine.'
  },
  {
    icon: '🎨',
    title: 'Custom Design',
    description: 'From concept to completion, we create bespoke solutions that perfectly match your vision and space.'
  },
  {
    icon: '🛡️',
    title: 'Lifetime Warranty',
    description: 'We stand behind our work with comprehensive warranties that protect your investment for years to come.'
  },
  {
    icon: '💎',
    title: 'Expert Craftsmanship',
    description: 'Our skilled artisans combine traditional techniques with modern technology for flawless results.'
  },
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'Complimentary delivery and installation services for all orders within our service area.'
  }
]

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

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

      // Features animation with 3D cards
      const featureCards = featuresRef.current?.querySelectorAll('.feature-card')
      featureCards?.forEach((card, index) => {
        gsap.fromTo(card,
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
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )

        // Icon animation with 3D rotation
        const icon = card.querySelector('.feature-icon')
        gsap.fromTo(icon,
          { 
            opacity: 0, 
            scale: 0,
            rotate: -180,
            rotationX: 90
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.1 + 0.3,
            ease: "back.out(1.7)",
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
            y: -15,
            rotateY: 5,
            rotateX: 5,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out"
          })
          
          gsap.to(icon, {
            scale: 1.3,
            rotate: 15,
            rotationY: 10,
            duration: 0.4,
            ease: "power2.out"
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          })
          
          gsap.to(icon, {
            scale: 1,
            rotate: 0,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out"
          })
        })

        // Disable continuous floating animations to prevent scroll blocking
        // Static icons for better performance
      })

      // Bottom CTA animation
      const ctaSection = sectionRef.current?.querySelector('.cta-section')
      if (ctaSection) {
        gsap.fromTo(ctaSection,
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaSection,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <h2 
          ref={titleRef}
          className="heading-2 text-center mb-16"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
          }}
        >
          Why Choose BD Stonex?
        </h2>

        <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card card p-8 text-center group"
            >
              <div className="text-6xl mb-6">
                {feature.icon}
              </div>
              
              <h3 className="heading-3 mb-4">
                {feature.title}
              </h3>
              
              <p 
                className="text-neutral-600 leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Professional CTA Section */}
        <div className="cta-section text-center mt-16">
          <div className="card p-12 max-w-4xl mx-auto">
            <h3 
              className="heading-2 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              Ready to Transform Your Space?
            </h3>
            <p 
              className="text-large text-neutral-600 mb-8"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Let our experts help you choose the perfect stone solution for your project
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
              
              <a 
                href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20schedule%20a%20consultation%20for%20my%20stone%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-4"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}