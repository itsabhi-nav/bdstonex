'use client'

import { useMemo } from 'react'
import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Service = {
  slug: string
  title: string
  icon: string
  summary: string
  benefits: string[]
  process: string[]
  applications: string[]
  finishes: string[]
  faqs: { q: string; a: string }[]
}

const SERVICES: Service[] = [
  {
    slug: 'kitchen-countertops',
    title: 'Kitchen Countertops',
    icon: '🏠',
    summary: 'Premium granite countertops that combine beauty, durability, and functionality for modern kitchens.',
    benefits: [
      'Heat, scratch, and stain resistance with professional sealing',
      'Custom edge profiles (eased, bullnose, ogee, bevel)',
      'Seam-minimized installation by certified fabricators',
      'Wide selection of curated granite slabs',
    ],
    process: [
      'Consultation & Design: understand your layout, appliances, and style',
      'Templating: precision laser measurements for a perfect fit',
      'Fabrication: CNC cutting, polishing, and edge profiling',
      'Installation: careful placement, seaming, and finishing',
      'Sealing & Care Guide: final protection and maintenance tips',
    ],
    applications: ['Islands & Peninsulas', 'Perimeter Counters', 'Full-Height Backsplashes', 'Waterfall Ends'],
    finishes: ['Polished', 'Honed (Matte)', 'Leathered'],
    faqs: [
      { q: 'How do I maintain the surface?', a: 'Wipe daily with pH-neutral cleaner and reseal annually depending on use.' },
      { q: 'Do you provide sink and hob cutouts?', a: 'Yes, all cutouts and faucet holes are fabricated in-house to spec.' },
    ],
  },
  {
    slug: 'bathroom-vanities',
    title: 'Bathroom Vanities',
    icon: '🛁',
    summary: 'Elegant vanities designed for moisture-heavy environments with long-lasting performance.',
    benefits: [
      'Moisture-resistant sealing and easy-clean finishes',
      'Custom sizes, backsplashes, and integrated sink options',
      'Luxurious look that elevates any bathroom style',
      'Durable surface ideal for daily routines',
    ],
    process: ['Measure & Design', 'Material Selection', 'Fabrication', 'Installation', 'Final Inspection'],
    applications: ['Master Vanity', 'Double Vanity', 'Powder Room', 'Make-up Counter'],
    finishes: ['Polished', 'Honed'],
    faqs: [
      { q: 'Is granite safe around water?', a: 'Absolutely. With proper sealing, granite resists water and common bathroom products.' },
      { q: 'Can you match existing cabinetry?', a: 'Yes, we coordinate sizes and colors to complement your cabinetry.' },
    ],
  },
  {
    slug: 'flooring-solutions',
    title: 'Flooring Solutions',
    icon: '🏢',
    summary: 'Timeless granite flooring built to withstand heavy traffic while retaining natural beauty.',
    benefits: ['High abrasion resistance', 'Slip-resistant finishes available', 'Thermal mass for natural cooling', 'Easy to clean'],
    process: ['Site Assessment', 'Subfloor Prep', 'Tile Fabrication', 'Professional Installation', 'Grouting & Sealing'],
    applications: ['Lobbies', 'Living & Dining', 'Stair Treads', 'Outdoor Verandas'],
    finishes: ['Polished', 'Honed', 'Flamed/Brushed (anti-slip)'],
    faqs: [
      { q: 'Is it suitable for outdoors?', a: 'Yes, with the right finish like flamed/brushed for traction.' },
      { q: 'How thick are the tiles?', a: 'Typically 15–20 mm; we advise thickness by application.' },
    ],
  },
  {
    slug: 'commercial-projects',
    title: 'Commercial Projects',
    icon: '🏨',
    summary: 'Large-scale, code-compliant granite solutions for hospitality, offices, retail, and more.',
    benefits: ['Bulk material sourcing', 'Accelerated schedules', 'Dedicated PM & QA', 'Brand-consistent finishes'],
    process: ['Scope & Budgeting', 'Design & Engineering', 'Fabrication at Scale', 'On-Site Installation', 'Handover & Support'],
    applications: ['Hotel Lobbies', 'Reception Desks', 'Retail Fit-outs', 'Corporate Worktops'],
    finishes: ['Polished', 'Honed', 'Leathered'],
    faqs: [
      { q: 'Do you work with architects?', a: 'Yes, we collaborate closely with architects, designers, and GCs.' },
      { q: 'Do you handle logistics?', a: 'We coordinate transport, site access, and phased deliveries.' },
    ],
  },
  {
    slug: 'custom-fabrication',
    title: 'Custom Fabrication',
    icon: '⚙️',
    summary: 'Bespoke granite pieces—from curves to inlays—crafted with CNC precision and artisan finishing.',
    benefits: ['Complex geometries & inlays', 'Edge profiling & special textures', 'Mockups and approvals', 'Tight tolerances'],
    process: ['Concept & Sketch', 'Technical Drawings/3D', 'Sample Approval', 'Fabrication', 'Delivery/Installation'],
    applications: ['Sculptural Elements', 'Furniture Tops', 'Fireplace Surrounds', 'Feature Walls'],
    finishes: ['Polished', 'Honed', 'Leathered', 'Flamed'],
    faqs: [
      { q: 'Can you replicate a reference?', a: 'Yes, share references/drawings and we will engineer a buildable solution.' },
      { q: 'Lead time?', a: 'Depends on complexity; typically 2–6 weeks post-approval.' },
    ],
  },
  {
    slug: 'maintenance-care',
    title: 'Maintenance & Care',
    icon: '🔧',
    summary: 'Comprehensive cleaning, sealing, polishing, and repairs to keep stone surfaces pristine.',
    benefits: ['Professional stain removal', 'Periodic resealing', 'Chip & crack repairs', 'Restoration polishing'],
    process: ['Assessment', 'Service Plan', 'On-site Work', 'QA & Handover', 'Care Schedule'],
    applications: ['Homes', 'Restaurants', 'Hotels', 'Corporate'],
    finishes: ['All applicable per existing installation'],
    faqs: [
      { q: 'How often to reseal?', a: 'Typically annually for kitchens; bathrooms may vary. We assess and advise.' },
      { q: 'Do you handle emergency repairs?', a: 'Yes—contact us for priority assistance.' },
    ],
  },
]

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = String(params?.slug || '')

  const service = useMemo(() => SERVICES.find(s => s.slug === slug), [slug])
  if (!service) return notFound()

  const whatsappHref = `https://wa.me/919887971903?text=${encodeURIComponent(
    `Hello BD Stonex, I'm interested in ${service.title}. Please assist me with details.`
  )}`

  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-accent-50">
      <Header />

      {/* Breadcrumbs */}
      <div className="pt-24" />
      <nav className="max-w-7xl mx-auto px-4 text-sm text-neutral-500">
        <Link href="/services" className="hover:text-accent-600 transition-colors">Services</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-700">{service.title}</span>
      </nav>

      {/* Hero */}
      <section className="pt-8 pb-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Stone Elements */}
        <div className="absolute top-10 right-10 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-400 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-10 left-10 w-48 h-48 opacity-10">
          <div className="w-full h-full bg-gradient-to-tr from-accent-400 to-primary-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div 
            className="mb-6"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)'
            }}
          >{service.icon}</div>
          <h1 
            className="font-bold text-neutral-900 mb-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)'
            }}
          >{service.title}</h1>
          <p 
            className="text-neutral-600 max-w-4xl mx-auto leading-relaxed"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)'
            }}
          >{service.summary}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={whatsappHref} 
              target="_blank" 
              className="btn-primary px-8 py-4"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
              }}
            >
              💬 Chat on WhatsApp
            </a>
            <a 
              href="/contact" 
              className="btn-secondary px-8 py-4"
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
              }}
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Overview Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="card p-8 lg:col-span-2">
            <h2 
              className="font-bold text-neutral-900 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              Key Benefits
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {service.benefits.map((b, i) => {
                // Define icons for benefits based on keywords
                const getBenefitIcon = (benefit: string) => {
                  const benefitLower = benefit.toLowerCase()
                  if (benefitLower.includes('heat') || benefitLower.includes('resistant')) return '🔥'
                  if (benefitLower.includes('scratch')) return '⚡'
                  if (benefitLower.includes('stain')) return '🛡️'
                  if (benefitLower.includes('sealing')) return '🔒'
                  if (benefitLower.includes('custom') || benefitLower.includes('sizes')) return '📐'
                  if (benefitLower.includes('backsplash')) return '🏠'
                  if (benefitLower.includes('sink')) return '🚰'
                  if (benefitLower.includes('luxurious') || benefitLower.includes('elevates')) return '✨'
                  if (benefitLower.includes('durable') || benefitLower.includes('surface')) return '💪'
                  if (benefitLower.includes('maintenance') || benefitLower.includes('clean')) return '🧽'
                  if (benefitLower.includes('installation')) return '🔧'
                  if (benefitLower.includes('quality')) return '✅'
                  if (benefitLower.includes('water') || benefitLower.includes('moisture')) return '💧'
                  if (benefitLower.includes('professional')) return '👨‍💼'
                  if (benefitLower.includes('precision')) return '🎯'
                  return '⭐'
                }
                
                return (
                  <li key={i} className="flex items-start text-neutral-600">
                    <span className="text-lg mr-3 mt-1 flex-shrink-0">{getBenefitIcon(b)}</span>
                    <span style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>{b}</span>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="card p-8">
            <h3 
              className="font-bold text-neutral-900 mb-4"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
              }}
            >
              Recommended Applications
            </h3>
            <ul className="space-y-2">
              {service.applications.map((a, i) => {
                // Define icons for applications
                const getApplicationIcon = (application: string) => {
                  const appLower = application.toLowerCase()
                  if (appLower.includes('master') || appLower.includes('vanity')) return '🛁'
                  if (appLower.includes('double')) return '👥'
                  if (appLower.includes('powder')) return '🚿'
                  if (appLower.includes('make-up') || appLower.includes('makeup')) return '💄'
                  if (appLower.includes('island') || appLower.includes('peninsula')) return '🏝️'
                  if (appLower.includes('perimeter') || appLower.includes('counter')) return '🍽️'
                  if (appLower.includes('backplash') || appLower.includes('backspash')) return '🏠'
                  if (appLower.includes('waterfall')) return '🌊'
                  if (appLower.includes('flooring') || appLower.includes('floor')) return '🏢'
                  if (appLower.includes('wall')) return '🧱'
                  if (appLower.includes('commercial') || appLower.includes('hotel')) return '🏨'
                  if (appLower.includes('office')) return '🏢'
                  if (appLower.includes('restaurant')) return '🍽️'
                  if (appLower.includes('home')) return '🏠'
                  if (appLower.includes('corporate')) return '🏢'
                  return '⭐'
                }
                
                return (
                  <li key={i} className="flex items-center text-neutral-600">
                    <span className="text-lg mr-3 flex-shrink-0">{getApplicationIcon(a)}</span>
                    <span style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>{a}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Process & Finishes */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="card p-8 lg:col-span-2">
            <h2 
              className="font-bold text-neutral-900 mb-6"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)'
              }}
            >
              Our Process
            </h2>
            <ol className="space-y-4">
              {service.process.map((step, i) => {
                // Define icons for process steps
                const getProcessIcon = (stepText: string) => {
                  const stepLower = stepText.toLowerCase()
                  if (stepLower.includes('consultation') || stepLower.includes('design')) return '📋'
                  if (stepLower.includes('measure') || stepLower.includes('template')) return '📏'
                  if (stepLower.includes('selection') || stepLower.includes('material')) return '🎯'
                  if (stepLower.includes('fabrication') || stepLower.includes('cutting')) return '✂️'
                  if (stepLower.includes('installation') || stepLower.includes('placement')) return '🔧'
                  if (stepLower.includes('inspection') || stepLower.includes('final')) return '✅'
                  if (stepLower.includes('sealing') || stepLower.includes('care')) return '🔒'
                  if (stepLower.includes('assessment')) return '🔍'
                  if (stepLower.includes('plan') || stepLower.includes('schedule')) return '📅'
                  if (stepLower.includes('work') || stepLower.includes('service')) return '⚙️'
                  if (stepLower.includes('handover') || stepLower.includes('qa')) return '🎉'
                  return '📝'
                }
                
                return (
                  <li key={i} className="flex items-start text-neutral-600">
                    <div className="flex items-center mr-3 flex-shrink-0">
                      <span 
                        className="w-7 h-7 bg-accent-500 text-white rounded-full flex items-center justify-center font-bold mr-2"
                        style={{
                          fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                        }}
                      >
                        {i+1}
                      </span>
                      <span className="text-lg">{getProcessIcon(step)}</span>
                    </div>
                    <span style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>{step}</span>
                  </li>
                )
              })}
            </ol>
          </div>
          <div className="card p-8">
            <h3 
              className="font-bold text-neutral-900 mb-4"
              style={{
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)'
              }}
            >
              Available Finishes
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.finishes.map((f, i) => {
                // Define icons for finishes
                const getFinishIcon = (finish: string) => {
                  const finishLower = finish.toLowerCase()
                  if (finishLower.includes('polished')) return '✨'
                  if (finishLower.includes('honed') || finishLower.includes('matte')) return '🎭'
                  if (finishLower.includes('leathered')) return '🦎'
                  if (finishLower.includes('brushed')) return '🖌️'
                  if (finishLower.includes('flamed')) return '🔥'
                  if (finishLower.includes('sandblasted')) return '🌪️'
                  return '💎'
                }
                
                return (
                  <span 
                    key={i} 
                    className="px-3 py-2 rounded-full bg-accent-100 text-accent-800 text-sm font-medium flex items-center gap-2"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)'
                    }}
                  >
                    <span>{getFinishIcon(f)}</span>
                    {f}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="font-bold text-neutral-900 mb-8 text-center"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)'
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((f, i) => (
              <details key={i} className="card p-6">
                <summary 
                  className="cursor-pointer font-semibold text-neutral-900 hover:text-accent-600 transition-colors"
                  style={{
                    fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
                  }}
                >
                  {f.q}
                </summary>
                <p 
                  className="text-neutral-600 mt-4 leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.875rem, 2vw, 1rem)'
                  }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 via-white to-accent-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="card p-8 md:p-12">
            <h2 
              className="font-bold text-neutral-900 mb-6"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'
              }}
            >
              Ready to start {service.title}?
            </h2>
            <p 
              className="text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
              }}
            >
              No prices shown online. Contact us for the best customized quote based on your project specifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={whatsappHref} 
                target="_blank" 
                className="btn-primary px-8 py-4"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                💬 Chat on WhatsApp
              </a>
              <a 
                href="/contact" 
                className="btn-secondary px-8 py-4"
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1.125rem)'
                }}
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}



