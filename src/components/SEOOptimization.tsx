'use client'

export default function SEOOptimization() {
  // Additional structured data for products and services
  const productData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Premium Granite Collection",
    "description": "Premium granite slabs and tiles for kitchen countertops, bathroom vanities, and flooring",
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Kitchen Countertops",
        "description": "Premium granite kitchen countertops with custom fabrication and installation",
        "category": "Granite Countertops",
        "brand": {
          "@type": "Brand",
          "name": "BD Stonex"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR",
          "seller": {
            "@type": "Organization",
            "name": "BD Stonex"
          }
        }
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Bathroom Vanities",
        "description": "Elegant granite bathroom vanities for master bathrooms and powder rooms",
        "category": "Granite Vanities",
        "brand": {
          "@type": "Brand",
          "name": "BD Stonex"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR",
          "seller": {
            "@type": "Organization",
            "name": "BD Stonex"
          }
        }
      },
      {
        "@type": "Product",
        "position": 3,
        "name": "Flooring Solutions",
        "description": "Durable granite flooring for residential and commercial spaces",
        "category": "Granite Flooring",
        "brand": {
          "@type": "Brand",
          "name": "BD Stonex"
        },
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR",
          "seller": {
            "@type": "Organization",
            "name": "BD Stonex"
          }
        }
      }
    ]
  }

  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Granite and Marble Installation Services",
    "description": "Professional granite and marble installation, fabrication, and maintenance services",
    "provider": {
      "@type": "LocalBusiness",
      "name": "BD Stonex",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Khasara No. 991/777, Plot No. 13, Near Khatoli High School, Khatoli Road",
        "addressLocality": "Kishangarh",
        "addressRegion": "Rajasthan",
        "postalCode": "305801",
        "addressCountry": "IN"
      },
      "telephone": "+91-98879-71903"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kishangarh"
      },
      {
        "@type": "City",
        "name": "Ajmer"
      },
      {
        "@type": "City",
        "name": "Jaipur"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Granite Services",
      "itemListElement": [
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
            "name": "Professional Installation",
            "description": "Expert installation services for all granite and marble projects"
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
    }
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://bdstonex.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Granite Suppliers",
        "item": "https://bdstonex.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Rajasthan",
        "item": "https://bdstonex.com/collection"
      }
    ]
  }

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What types of granite do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer premium granite slabs and tiles for kitchen countertops, bathroom vanities, flooring, and commercial projects. Our collection includes various colors, patterns, and finishes to suit every design preference."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide installation services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we provide comprehensive installation services including custom fabrication, precise installation, and post-installation maintenance. Our expert team ensures perfect fit and finish for all projects."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve Kishangarh, Ajmer, Jaipur, and surrounding areas in Rajasthan. We also provide services to commercial projects across India."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer free consultation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer free consultation and quotes for all granite and marble projects. Contact us at +91 98879 71903 for expert advice and personalized solutions."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  )
}
