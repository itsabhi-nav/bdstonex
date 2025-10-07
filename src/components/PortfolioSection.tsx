'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: "Luxury Kitchen Renovation",
      category: "Residential",
      location: "Beverly Hills, CA",
      description: "Complete kitchen transformation with premium granite countertops and custom island design.",
      image: "/portfolio/kitchen-1.jpg",
      features: ["Premium Granite", "Custom Island", "Modern Design"]
    },
    {
      title: "Hotel Lobby Installation",
      category: "Commercial",
      location: "Las Vegas, NV",
      description: "Large-scale granite flooring and wall cladding for luxury hotel lobby.",
      image: "/portfolio/hotel-1.jpg",
      features: ["Large Scale", "Premium Finish", "Durable"]
    },
    {
      title: "Master Bathroom Suite",
      category: "Residential",
      location: "Malibu, CA",
      description: "Elegant bathroom vanity and shower surround with custom granite fabrication.",
      image: "/portfolio/bathroom-1.jpg",
      features: ["Custom Design", "Water Resistant", "Luxury Finish"]
    },
    {
      title: "Restaurant Kitchen",
      category: "Commercial",
      location: "San Francisco, CA",
      description: "Commercial-grade granite countertops for high-traffic restaurant kitchen.",
      image: "/portfolio/restaurant-1.jpg",
      features: ["Heat Resistant", "Easy Clean", "Durable"]
    },
    {
      title: "Office Building Lobby",
      category: "Commercial",
      location: "Los Angeles, CA",
      description: "Corporate headquarters lobby with premium granite flooring and reception desk.",
      image: "/portfolio/office-1.jpg",
      features: ["Professional", "High Traffic", "Modern Design"]
    },
    {
      title: "Custom Home Bar",
      category: "Residential",
      location: "Newport Beach, CA",
      description: "Bespoke granite bar top with integrated lighting and custom edge profile.",
      image: "/portfolio/bar-1.jpg",
      features: ["Custom Fabrication", "Integrated Lighting", "Unique Design"]
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

      // Portfolio items animation with stagger
      const portfolioChildren = portfolioRef.current?.children
      if (portfolioChildren) {
        gsap.fromTo(portfolioChildren,
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
            trigger: portfolioRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
        )
      }

      // 3D hover effects for portfolio items
      if (portfolioRef.current?.children) {
        Array.from(portfolioRef.current.children).forEach((item) => {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              y: -10,
              rotationY: 5,
              rotationX: 5,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            })
          })
          
          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-enhanced"
          >
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our showcase of completed projects. From residential kitchens to commercial spaces, 
            see how we&apos;ve transformed spaces with premium granite solutions.
          </p>
        </div>

        <div ref={portfolioRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group glass-enhanced rounded-2xl overflow-hidden hover-3d transition-all duration-300 transform-3d"
            >
              {/* Project Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">🏗️</div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 gradient-text">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">
                  📍 {project.location}
                </p>
                
                <p className="text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.map((feature, featureIndex) => (
                    <span 
                      key={featureIndex}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-black font-semibold rounded-full hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 transform group-hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Stats */}
        <div className="mt-16">
          <div className="glass-enhanced rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 gradient-text text-center">
              Project Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">$2M+</div>
                <div className="text-sm text-gray-400">Total Project Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-sm text-gray-400">Commercial Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">450+</div>
                <div className="text-sm text-gray-400">Residential Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="glass-enhanced rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 gradient-text">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Let us bring your vision to life with our premium granite solutions. 
              Get a free consultation and see how we can transform your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-black font-bold rounded-full hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 hover-3d">
                Start Your Project
              </button>
              <button className="px-8 py-4 border-2 border-emerald-500 text-emerald-400 font-bold rounded-full hover:bg-emerald-500 hover:text-black transition-all duration-300 hover-3d">
                View Full Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
