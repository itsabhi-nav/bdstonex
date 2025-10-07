'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function BlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const postsRef = useRef<HTMLDivElement>(null)

  const blogPosts = [
    {
      title: "The Ultimate Guide to Choosing Granite Countertops",
      excerpt: "Discover everything you need to know about selecting the perfect granite for your kitchen. From color selection to maintenance tips.",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Design Tips",
      image: "/blog/granite-guide.jpg",
      author: "Sarah Johnson"
    },
    {
      title: "Granite vs Quartz: Which is Right for Your Home?",
      excerpt: "Compare the pros and cons of granite and quartz countertops to make an informed decision for your kitchen renovation.",
      date: "December 10, 2024",
      readTime: "7 min read",
      category: "Comparison",
      image: "/blog/granite-vs-quartz.jpg",
      author: "Michael Chen"
    },
    {
      title: "Maintaining Your Granite: Care Tips for Longevity",
      excerpt: "Learn the best practices for cleaning and maintaining your granite surfaces to keep them looking pristine for years.",
      date: "December 5, 2024",
      readTime: "4 min read",
      category: "Maintenance",
      image: "/blog/granite-maintenance.jpg",
      author: "Emily Rodriguez"
    },
    {
      title: "Trending Granite Colors for 2025",
      excerpt: "Explore the latest granite color trends and how to incorporate them into your modern home design.",
      date: "November 28, 2024",
      readTime: "6 min read",
      category: "Trends",
      image: "/blog/granite-trends.jpg",
      author: "David Thompson"
    },
    {
      title: "Commercial Granite Applications: Beyond Countertops",
      excerpt: "Discover innovative ways to use granite in commercial spaces, from flooring to architectural features.",
      date: "November 20, 2024",
      readTime: "8 min read",
      category: "Commercial",
      image: "/blog/commercial-granite.jpg",
      author: "Lisa Wang"
    },
    {
      title: "The Science Behind Granite Formation",
      excerpt: "Dive deep into the geological processes that create these beautiful natural stones we use in our homes.",
      date: "November 15, 2024",
      readTime: "9 min read",
      category: "Education",
      image: "/blog/granite-formation.jpg",
      author: "Robert Martinez"
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

      // Blog posts animation with stagger
      const postsChildren = postsRef.current?.children
      if (postsChildren) {
        gsap.fromTo(postsChildren,
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
            trigger: postsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
        )
      }

      // 3D hover effects for blog cards
      if (postsRef.current?.children) {
        Array.from(postsRef.current.children).forEach((card) => {
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
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text-enhanced"
          >
            Latest Insights
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights from the world of granite and natural stone. 
            Our expert team shares valuable knowledge to help you make informed decisions.
          </p>
        </div>

        <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="group glass-enhanced rounded-2xl overflow-hidden hover-3d transition-all duration-300 transform-3d"
            >
              {/* Blog Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl opacity-50">📰</div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>By {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 gradient-text group-hover:text-emerald-400 transition-colors duration-300">
                  {post.title}
                </h3>
                
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                
                <button className="group/btn flex items-center text-emerald-500 hover:text-emerald-400 transition-colors duration-300">
                  <span className="mr-2">Read More</span>
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16">
          <div className="glass-enhanced rounded-2xl p-8 max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4 gradient-text">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Subscribe to our newsletter for the latest granite trends, maintenance tips, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-black/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-black font-semibold rounded-lg hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 hover-3d">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Blog Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-sm text-gray-400">Articles Published</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">10K+</div>
            <div className="text-sm text-gray-400">Monthly Readers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">95%</div>
            <div className="text-sm text-gray-400">Reader Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">Weekly</div>
            <div className="text-sm text-gray-400">New Content</div>
          </div>
        </div>
      </div>
    </section>
  )
}
