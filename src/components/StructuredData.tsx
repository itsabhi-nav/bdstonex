'use client'

export default function StructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://bdstonex.com/#business",
    "name": "BD Stonex",
    "alternateName": "BD Stonex Premium Granite",
    "description": "Leading granite & marble suppliers in Rajasthan. Premium kitchen countertops, bathroom vanities, flooring solutions with 43+ years combined experience.",
    "url": "https://bdstonex.com",
    "logo": "https://bdstonex.com/logo.jpeg",
    "image": "https://bdstonex.com/logo.jpeg",
    "telephone": "+91-98879-71903",
    "email": "info@bdstonex.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Khasara No. 991/777, Plot No. 13, Near Khatoli High School, Khatoli Road",
      "addressLocality": "Kishangarh",
      "addressRegion": "Rajasthan",
      "postalCode": "305801",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "26.5701",
      "longitude": "74.8692"
    },
    "openingHours": "Mo-Sa 09:00-18:00",
    "priceRange": "$$",
    "paymentAccepted": "Cash, Credit Card, UPI, Bank Transfer",
    "currenciesAccepted": "INR",
    "foundingDate": "2024",
    "founder": [
      {
        "@type": "Person",
        "name": "Mr. Manish Surana",
        "jobTitle": "Founder & Head of Operations"
      },
      {
        "@type": "Person", 
        "name": "Mr. Jai Ram Thakan",
        "jobTitle": "Cofounder & Production Head"
      },
      {
        "@type": "Person",
        "name": "Mr. Kavya Surana", 
        "jobTitle": "Head of Growth & Innovation"
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Mr. Manish Surana",
        "jobTitle": "Founder & Head of Operations"
      },
      {
        "@type": "Person",
        "name": "Mr. Jai Ram Thakan", 
        "jobTitle": "Cofounder & Production Head"
      },
      {
        "@type": "Person",
        "name": "Mr. Kavya Surana",
        "jobTitle": "Head of Growth & Innovation"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Kishangarh",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City", 
        "name": "Ajmer",
        "containedInPlace": {
          "@type": "State",
          "name": "Rajasthan"
        }
      },
      {
        "@type": "City",
        "name": "Jaipur",
        "containedInPlace": {
          "@type": "State", 
          "name": "Rajasthan"
        }
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "26.5701",
        "longitude": "74.8692"
      },
      "geoRadius": "100000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Granite and Marble Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Kitchen Countertops",
            "description": "Premium granite countertops with custom fabrication and installation"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Bathroom Vanities",
            "description": "Elegant granite vanities for master bathrooms and powder rooms"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Flooring Solutions",
            "description": "Durable granite flooring for residential and commercial spaces"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Projects", 
            "description": "Large-scale granite installations for hotels, offices, and restaurants"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Fabrication",
            "description": "Bespoke granite solutions tailored to specific requirements"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maintenance & Care",
            "description": "Professional cleaning, sealing, and repair services"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Rajesh Kumar"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "BD Stonex transformed our kitchen into a masterpiece. The quality and craftsmanship exceeded our expectations."
      },
      {
        "@type": "Review", 
        "author": {
          "@type": "Person",
          "name": "Amit Patel"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5", 
          "bestRating": "5"
        },
        "reviewBody": "Working with BD Stonex has been a pleasure. Their attention to detail and commitment to quality makes them my go-to choice."
      }
    ],
    "sameAs": [
      "https://wa.me/919887971903",
      "https://suranastonex.com"
    ]
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://bdstonex.com/#organization",
    "name": "BD Stonex",
    "url": "https://bdstonex.com",
    "logo": "https://bdstonex.com/logo.jpeg",
    "description": "Premium granite and marble suppliers in Rajasthan, India. Specializing in kitchen countertops, bathroom vanities, and commercial stone solutions.",
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "Mr. Manish Surana"
      },
      {
        "@type": "Person", 
        "name": "Mr. Jai Ram Thakan"
      },
      {
        "@type": "Person",
        "name": "Mr. Kavya Surana"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-98879-71903",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Khasara No. 991/777, Plot No. 13, Near Khatoli High School, Khatoli Road",
      "addressLocality": "Kishangarh",
      "addressRegion": "Rajasthan", 
      "postalCode": "305801",
      "addressCountry": "IN"
    }
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://bdstonex.com/#website",
    "url": "https://bdstonex.com",
    "name": "BD Stonex - Premium Granite & Marble Suppliers",
    "description": "Leading granite and marble suppliers in Rajasthan. Premium stone solutions for residential and commercial projects.",
    "publisher": {
      "@id": "https://bdstonex.com/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bdstonex.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  )
}
