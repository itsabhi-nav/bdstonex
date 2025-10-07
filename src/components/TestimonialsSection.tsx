'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Homeowner",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "BD Stonex transformed our kitchen into a masterpiece. The quality and craftsmanship exceeded our expectations. The team was professional, punctual, and delivered exactly what they promised.",
      project: "Kitchen Renovation",
      image: "/1.png"
    },
    {
      name: "Priya Sharma",
      role: "Restaurant Owner",
      location: "Delhi, NCR",
      rating: 5,
      text: "We needed durable granite for our commercial kitchen. BD Stonex provided the perfect solution with their premium quality stone and expert installation. Highly recommend their services.",
      project: "Commercial Kitchen",
      image: "/3.png"
    },
    {
      name: "Amit Patel",
      role: "Interior Designer",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "Working with BD Stonex has been a pleasure. Their attention to detail and commitment to quality makes them my go-to choice for all granite projects. The results are always stunning.",
      project: "Luxury Home Design",
      image: "/2.png"
    }
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, rotationX: 45 },
        { 
          opacity: 1, 
          y: 0, 
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

      // Testimonials animation with stagger
      const testimonialsChildren = testimonialsRef.current?.children
      if (testimonialsChildren) {
        gsap.fromTo(testimonialsChildren,
        { 
          opacity: 0, 
          y: 80, 
          rotationY: 45,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
        )
      }

      // 3D hover effects for testimonial cards
      if (testimonialsRef.current?.children) {
        Array.from(testimonialsRef.current.children).forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -10,
              rotationY: 5,
              rotationX: 5,
              scale: 1.02,
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
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="heading-2 mb-6"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}
          >
            Client Testimonials
          </h2>
          <p 
            className="text-large text-neutral-600 max-w-3xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}
          >
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about 
            their BD Stonex experience.
          </p>
        </div>

        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card p-8"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote 
                className="text-neutral-700 mb-6 leading-relaxed"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              >
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Project Type */}
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-sm rounded-full">
                  {testimonial.project}
                </span>
              </div>

              {/* Client Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                  <div 
                    className="text-neutral-600"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >{testimonial.role}</div>
                  <div 
                    className="text-neutral-500"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="card p-8 max-w-4xl mx-auto">
            <h3 className="heading-3 mb-8">
              Trusted by Industry Leaders
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">500+</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">98%</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">20+</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Combined Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-600 mb-2">24/7</div>
                <div 
                  className="text-neutral-600"
                  style={{
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                  }}
                >Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
