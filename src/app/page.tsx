'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import GraniteShowcase from '@/components/GraniteShowcase'
import ItalianMarbleSection from '@/components/ItalianMarbleSection'
import SEOOptimization from '@/components/SEOOptimization'
import ProcessSection from '@/components/ProcessSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import Footer from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    // Disable all GSAP animations to prevent scroll blocking
    // The individual components will handle their own lightweight animations
    return
  }, [])

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <SEOOptimization />
      <Header />
      <HeroSection />
      <AboutSection />
      <GraniteShowcase />
      <ItalianMarbleSection />
      <ProcessSection />
      <TestimonialsSection />
      <WhyChooseUs />
      <Footer />
    </main>
  )
}