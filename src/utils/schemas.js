const baseUrl = 'https://brancha.in';

// ✅ [CRITICAL SEO] Brand Schema - For Brand Recognition
export const brandSchema = {
  '@context': 'https://schema.org',
  '@type': 'Brand',
  '@id': `${baseUrl}/#brand`,
  name: 'Brancha',
  alternateName: ['Brancha India', 'Brancha Design', 'Brancha Digital', 'Brancha.in'],
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/logo.png`,
    width: 250,
    height: 60
  },
  image: `${baseUrl}/og-default.jpg`,
  description: 'Brancha is a trusted digital presence management brand serving service businesses across India. We build websites, create brand identities, and provide ongoing digital support.',
  slogan: 'Where Brands Grow',
  foundingDate: '2024',
  founder: [
    {
      '@type': 'Person',
      name: 'Sahil',
      jobTitle: 'Founder & Developer'
    },
    {
      '@type': 'Person',
      name: 'Saad',
      jobTitle: 'Co-Founder & Creative Director'
    }
  ]
};

// ✅ [CRITICAL SEO] Enhanced Organization Schema with Brand Emphasis
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}/#organization`,
  name: 'Brancha',
  legalName: 'Brancha',
  alternateName: ['Brancha India', 'Brancha Design', 'Brancha Digital', 'Brancha.in', 'Brancha Web Design', 'Brancha Brand Design'],
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/logo.png`,
    width: 250,
    height: 60
  },
  image: `${baseUrl}/og-default.jpg`,
  description: 'Brancha is India\'s trusted partner for complete digital presence management. We build and maintain professional websites, brand identities, and provide ongoing digital support for service businesses. Brancha - Where Brands Grow.',
  slogan: 'Where Brands Grow',
  email: 'hello@brancha.in',
  telephone: '+91-XXXXXXXXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vadodara',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390001',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.3072',
    longitude: '73.1812'
  },
  areaServed: [
    {
      '@type': 'City',
      name: 'Vadodara',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Gujarat',
        addressCountry: 'IN'
      }
    },
    {
      '@type': 'City',
      name: 'Bangalore',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Karnataka',
        addressCountry: 'IN'
      }
    },
    {
      '@type': 'City',
      name: 'Mumbai',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN'
      }
    },
    {
      '@type': 'City',
      name: 'Delhi',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN'
      }
    },
    {
      '@type': 'Country',
      name: 'India'
    }
  ],
  sameAs: [
    'https://instagram.com/growwithbrancha',
    'https://linkedin.com/company/brancha',
    'https://youtube.com/@growwithbrancha',
    'https://threads.com/@growwithbrancha',
    'https://www.facebook.com/profile.php?id=61586163604676',
    'https://x.com/growwithbrancha'
  ],
  foundingDate: '2024',
  founder: [
    {
      '@type': 'Person',
      name: 'Sahil',
      jobTitle: 'Founder & Developer',
      email: 'workwiths4hil@gmail.com',
      worksFor: {
        '@type': 'Organization',
        name: 'Brancha'
      }
    },
    {
      '@type': 'Person',
      name: 'Saad',
      jobTitle: 'Co-Founder & Creative Director',
      email: 'saadbombaywala9@gmail.com',
      worksFor: {
        '@type': 'Organization',
        name: 'Brancha'
      }
    }
  ],
  knowsAbout: [
    'Website Design',
    'Web Development',
    'Brand Identity Design',
    'Digital Presence Management',
    'SEO Services',
    'UI/UX Design',
    'Graphic Design',
    'Social Media Design',
    'Logo Design',
    'Brand Strategy'
  ],
  serviceType: [
    'Website Design and Development',
    'Brand Identity Design',
    'Digital Presence Management',
    'SEO Services',
    'Website Maintenance',
    'Social Media Design',
    'Logo Design Services'
  ],
  brand: {
    '@id': `${baseUrl}/#brand`
  }
};

// ✅ [CRITICAL SEO] Website Schema with Brand Connection
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${baseUrl}/#website`,
  name: 'Brancha',
  alternateName: 'Brancha - Where Brands Grow',
  url: baseUrl,
  description: 'Brancha provides complete digital presence management for service businesses in India. Professional website design, brand identity, and ongoing support.',
  publisher: {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Brancha',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  },
  inLanguage: 'en-IN',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  },
  about: {
    '@type': 'Thing',
    name: 'Digital Presence Management',
    description: 'Brancha specializes in building and maintaining complete online presence systems for Indian service businesses'
  }
};

// ✅ [CRITICAL SEO] Local Business Schema for Brancha
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${baseUrl}/#localbusiness`,
  name: 'Brancha',
  alternateName: 'Brancha Digital Design',
  image: `${baseUrl}/og-default.jpg`,
  url: baseUrl,
  telephone: '+91-XXXXXXXXXX',
  email: 'hello@brancha.in',
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Vadodara',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390001',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '22.3072',
    longitude: '73.1812'
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  ],
  sameAs: [
    'https://instagram.com/growwithbrancha',
    'https://linkedin.com/company/brancha',
    'https://youtube.com/@growwithbrancha',
    'https://threads.com/@growwithbrancha',
    'https://www.facebook.com/profile.php?id=61586163604676',
    'https://x.com/growwithbrancha'
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Vadodara'
    },
    {
      '@type': 'City',
      name: 'Bangalore'
    },
    {
      '@type': 'City',
      name: 'Mumbai'
    },
    {
      '@type': 'City',
      name: 'Delhi'
    },
    {
      '@type': 'Country',
      name: 'India'
    }
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '15',
    bestRating: '5',
    worstRating: '1'
  },
  brand: {
    '@id': `${baseUrl}/#brand`
  }
};

// ✅ [CRITICAL SEO] Service Schema for Brancha
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${baseUrl}/#service`,
  name: 'Digital Presence Management by Brancha',
  serviceType: 'Web Design & Development',
  provider: {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Brancha'
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Brancha Digital Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Design by Brancha',
          description: 'Professional website design and development services by Brancha for service businesses in India.',
          provider: {
            '@type': 'Organization',
            name: 'Brancha'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brand Identity Design by Brancha',
          description: 'Complete brand identity and visual design services by Brancha.',
          provider: {
            '@type': 'Organization',
            name: 'Brancha'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Design by Brancha',
          description: 'Professional social media graphics and design by Brancha.',
          provider: {
            '@type': 'Organization',
            name: 'Brancha'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO Services by Brancha',
          description: 'Website optimization and SEO services by Brancha for better search rankings.',
          provider: {
            '@type': 'Organization',
            name: 'Brancha'
          }
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Maintenance by Brancha',
          description: 'Ongoing website support and maintenance by Brancha.',
          provider: {
            '@type': 'Organization',
            name: 'Brancha'
          }
        }
      }
    ]
  }
};

// ✅ [SEO SAFE] Breadcrumb Schema Generator
export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.path}`
  }))
});

// ✅ [CRITICAL SEO] Person Schemas with Brancha Connection
export const personSchemas = {
  sahil: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sahil',
    jobTitle: 'Founder & Developer at Brancha',
    worksFor: {
      '@type': 'Organization',
      name: 'Brancha',
      url: baseUrl
    },
    url: `${baseUrl}/about`,
    email: 'workwiths4hil@gmail.com',
    knowsAbout: ['Web Development', 'Frontend Development', 'UI/UX Design', 'SEO', 'React', 'JavaScript']
  },
  saad: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saad',
    jobTitle: 'Co-Founder & Creative Director at Brancha',
    worksFor: {
      '@type': 'Organization',
      name: 'Brancha',
      url: baseUrl
    },
    url: `${baseUrl}/about`,
    email: 'saadbombaywala9@gmail.com',
    knowsAbout: ['Brand Identity', 'Visual Design', 'Creative Direction', 'Design Systems', 'Graphic Design']
  }
};

// ✅ [CRITICAL SEO] FAQ Schema for Brancha
export const branchaFAQSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Brancha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brancha is India\'s trusted partner for complete digital presence management. We build and maintain professional websites, create brand identities, and provide ongoing digital support for service businesses across India. Brancha handles your online presence so you can focus on growing your business.'
      }
    },
    {
      '@type': 'Question',
      name: 'What services does Brancha provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brancha provides comprehensive digital services including professional website design and development, brand identity design, social media design, SEO optimization, and ongoing website maintenance and support. We offer complete digital presence management for service businesses in India.'
      }
    },
    {
      '@type': 'Question',
      name: 'Where is Brancha located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brancha is based in Vadodara, Gujarat, and serves businesses across India including Vadodara, Bangalore, Mumbai, Delhi, and other major cities. We work with service businesses throughout India.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I contact Brancha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can contact Brancha by emailing hello@brancha.in or visiting our website at brancha.in/contact. We\'re ready to help you build and manage your digital presence.'
      }
    },
    {
      '@type': 'Question',
      name: 'Who should work with Brancha?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Brancha works with service businesses across India including clinics, salons, gyms, diagnostic centres, restaurants, professional services, and growing businesses that need consistent, professional online presence management.'
      }
    }
  ]
};

// ✅ [SEO SAFE] FAQ Schema Generator (for custom FAQs)
export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

// ✅ [SEO SAFE] Portfolio Schema Generator
export const portfolioSchema = (projects) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Brancha Portfolio',
  description: 'Projects completed by Brancha',
  itemListElement: projects.map((project, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'CreativeWork',
      name: project.title,
      description: project.description,
      image: project.image,
      creator: {
        '@type': 'Organization',
        name: 'Brancha',
        url: baseUrl
      },
      dateCreated: project.year
    }
  }))
});

// ✅ [SEO SAFE] Contact Page Schema with Brancha Details
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${baseUrl}/contact#contactpage`,
  url: `${baseUrl}/contact`,
  name: 'Contact Brancha',
  description: 'Get in touch with Brancha for your digital presence needs',
  mainEntity: {
    '@type': 'Organization',
    name: 'Brancha',
    url: baseUrl,
    email: 'hello@brancha.in',
    telephone: '+91-XXXXXXXXXX',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      postalCode: '390001',
      addressCountry: 'IN'
    }
  }
};

// ✅ [CRITICAL SEO] About Page Schema
export const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${baseUrl}/about#aboutpage`,
  url: `${baseUrl}/about`,
  name: 'About Brancha',
  description: 'Learn about Brancha - India\'s trusted digital presence partner',
  mainEntity: {
    '@id': `${baseUrl}/#organization`
  }
};

// ✅ [CRITICAL SEO] Services Page Schema
export const servicesPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${baseUrl}/services#servicespage`,
  url: `${baseUrl}/services`,
  name: 'Brancha Services',
  description: 'Complete digital presence services by Brancha',
  mainEntity: {
    '@id': `${baseUrl}/#service`
  }
};

// ✅ [CRITICAL SEO] Blog Schema with Brancha Attribution
export const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${baseUrl}/blog#blog`,
  url: `${baseUrl}/blog`,
  name: 'Brancha Blog',
  description: 'Insights and guides on digital presence, web design, and branding from Brancha',
  publisher: {
    '@type': 'Organization',
    name: 'Brancha',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  },
  inLanguage: 'en-IN'
};

// ✅ [CRITICAL SEO] Blog Post Schema Generator
export const blogPostSchema = (post) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  image: post.image || `${baseUrl}/og-default.jpg`,
  author: {
    '@type': 'Organization',
    name: 'Brancha',
    url: baseUrl
  },
  publisher: {
    '@type': 'Organization',
    name: 'Brancha',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  },
  datePublished: post.datePublished,
  dateModified: post.dateModified || post.datePublished,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${baseUrl}/blog/${post.slug}`
  },
  keywords: post.keywords || 'Brancha, web design, brand identity, digital presence',
  articleBody: post.content
});

// ✅ [CRITICAL SEO] Review Schema for Client Testimonials
export const reviewSchema = (review) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Organization',
    name: 'Brancha',
    url: baseUrl
  },
  author: {
    '@type': 'Person',
    name: review.authorName
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.rating,
    bestRating: '5',
    worstRating: '1'
  },
  reviewBody: review.text,
  datePublished: review.date
});

export default {
  brandSchema,
  organizationSchema,
  websiteSchema,
  localBusinessSchema,
  serviceSchema,
  breadcrumbSchema,
  personSchemas,
  branchaFAQSchema,
  faqSchema,
  portfolioSchema,
  contactPageSchema,
  aboutPageSchema,
  servicesPageSchema,
  blogSchema,
  blogPostSchema,
  reviewSchema
};