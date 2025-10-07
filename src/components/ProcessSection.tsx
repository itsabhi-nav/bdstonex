'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your vision, requirements, and budget to understand your project needs.',
      icon: '💬'
    },
    {
      step: '02', 
      title: 'Design & Selection',
      description: 'Our experts help you choose the perfect granite and create detailed design plans.',
      icon: '🎨'
    },
    {
      step: '03',
      title: 'Precision Fabrication',
      description: 'State-of-the-art machinery cuts and polishes your granite to exact specifications.',
      icon: '⚙️'
    },
    {
      step: '04',
      title: 'Professional Installation',
      description: 'Our certified installers ensure perfect placement with seamless finishing.',
      icon: '🔧'
    },
    {
      step: '05',
      title: 'Quality Assurance',
      description: 'Final inspection and care instructions to maintain your granite\'s beauty.',
      icon: '✅'
    }
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isMobile || prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // Simple title animation
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

      // Lightweight steps animation
      const stepsChildren = stepsRef.current?.children
      if (stepsChildren) {
        gsap.fromTo(stepsChildren,
        { 
          opacity: 0, 
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
            once: true
          }
        }
        )
      }

      // Simple hover effects for desktop only
      if (stepsRef.current?.children && !isMobile) {
        Array.from(stepsRef.current.children).forEach((step) => {
          step.addEventListener('mouseenter', () => {
            gsap.to(step, {
              y: -5,
              scale: 1.02,
              duration: 0.2,
              ease: "power2.out"
            })
          })
          
          step.addEventListener('mouseleave', () => {
            gsap.to(step, {
              y: 0,
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            })
          })
        })
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="heading-2 mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}
          >
            Our Process
          </h2>
          <p 
            className="text-large text-neutral-600 max-w-3xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}
          >
            From initial consultation to final installation, we ensure every step is executed 
            with precision and care to deliver exceptional results.
          </p>
        </div>

        {/* Professional Process Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-200 via-accent-300 to-accent-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="group relative card p-8 text-center z-10"
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center text-neutral-900 font-bold shadow-lg">
                  {step.step}
                </div>
                
                {/* Icon */}
                <div className="text-5xl mb-6 mt-4">
                  {step.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="heading-3">
                    {step.title}
                  </h3>
                  
                  <p 
                    className="text-neutral-600 leading-relaxed"
                    style={{
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional CTA Section */}
        <div className="text-center mt-20">
          <div className="card p-12 max-w-4xl mx-auto">
            <h3 
              className="heading-2 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              Ready to Start Your Project?
            </h3>
            <p 
              className="text-large text-neutral-600 mb-8 max-w-2xl mx-auto"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
              }}
            >
              Experience our proven process and transform your space with premium stone solutions. 
              Get a free consultation today and see the difference quality makes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a 
                href="https://wa.me/919887971903?text=Hi%20BD%20StoneX,%20I%20would%20like%20to%20get%20a%20free%20consultation%20for%20my%20stone%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-5 "
              >
                Get Free Consultation
              </a>
              <Link 
                href="/services"
                className="btn-secondary px-10 py-5 "
              >
                View Our Services
              </Link>
            </div>
            
            {/* Professional Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-neutral-200 pt-8">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent-600">20+</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >Combined Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent-600">2,500+</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >Projects Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent-600">100%</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
