'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      title: "Kitchen Countertops",
      description: "Premium granite countertops that transform your kitchen into a culinary masterpiece. Heat-resistant, durable, and stunning.",
      icon: "🏠",
      features: ["Heat Resistant", "Easy Maintenance", "Luxury Finish"]
    },
    {
      title: "Bathroom Vanities",
      description: "Elegant granite vanities that add sophistication to your bathroom. Water-resistant and easy to clean.",
      icon: "🛁",
      features: ["Water Resistant", "Stain Proof", "Elegant Design"]
    },
    {
      title: "Flooring Solutions",
      description: "Durable granite flooring that withstands heavy traffic while maintaining its natural beauty for decades.",
      icon: "🏢",
      features: ["Heavy Duty", "Slip Resistant", "Long Lasting"]
    },
    {
      title: "Commercial Projects",
      description: "Large-scale granite installations for hotels, offices, and commercial spaces with professional installation.",
      icon: "🏨",
      features: ["Bulk Supply", "Fast Installation", "Quality Assurance"]
    },
    {
      title: "Custom Fabrication",
      description: "Bespoke granite solutions tailored to your specific requirements and architectural vision.",
      icon: "⚙️",
      features: ["Custom Design", "Precision Cut", "Unique Solutions"]
    },
    {
      title: "Maintenance & Care",
      description: "Professional maintenance services to keep your granite surfaces looking pristine for years to come.",
      icon: "🔧",
      features: ["Regular Cleaning", "Sealing", "Repair Services"]
    }
  ]

  useEffect(() => {
    if (typeof window === 'undefined') return

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

      // Cards animation with stagger
      const cardsChildren = cardsRef.current?.children
      if (cardsChildren) {
        gsap.fromTo(cardsChildren,
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
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
        )
      }

      // 3D hover effects for cards
      if (cardsRef.current?.children) {
        Array.from(cardsRef.current.children).forEach((card) => {
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
    <section ref={sectionRef} className="section bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="heading-2 mb-6"
          >
            Our Services
          </h2>
          <p className="text-large text-neutral-600 max-w-3xl mx-auto">
            From residential kitchens to commercial spaces, we provide comprehensive stone solutions 
            tailored to your unique needs and vision.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card p-8 text-center group"
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              
              <h3 className="heading-3 text-center mb-4">
                {service.title}
              </h3>
              
              <p className="text-neutral-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center text-sm text-neutral-500">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>
              
              <a 
                href={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                className="btn-secondary w-full"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>

        {/* Professional CTA Section */}
        <div className="text-center mt-20">
          <div className="card p-12 max-w-4xl mx-auto">
            <h3 className="heading-2 mb-6">
              Ready to Transform Your Space?
            </h3>
            <p className="text-large text-neutral-600 mb-8 max-w-2xl mx-auto">
              Get a free consultation and quote for your stone project. Our experts will help you 
              choose the perfect solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services"
                className="btn-primary px-8 py-4 "
              >
                View All Services
              </Link>
              <Link 
                href="/collection"
                className="btn-secondary px-8 py-4 "
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
