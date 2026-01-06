const baseUrl = 'https://brancha.in';

// ✅ [SEO SAFE] Organization Schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Brancha',
  alternateName: 'Brancha Digital Design',
  url: baseUrl,
  logo: `${baseUrl}/favicon.png`,
  description: 'We build and manage complete online systems for local businesses in India. Website, Google profile, and monthly brand support for long-term business growth.',
  email: 'hello@brancha.in',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390001',
    addressCountry: 'IN'
  },
  sameAs: [
    'https://www.instagram.com/brancha.in',
    'https://www.linkedin.com/company/brancha'
  ],
  foundingDate: '2024',
  founder: [
    {
      '@type': 'Person',
      name: 'Sahil',
      jobTitle: 'Founder & Developer',
      email: 'workwiths4hil@gmail.com'
    },
    {
      '@type': 'Person',
      name: 'Saad',
      jobTitle: 'Co-Founder & Creative Director',
      email: 'saadbombaywala9@gmail.com'
    }
  ]
};

// ✅ [SEO SAFE] Website Schema
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Brancha',
  url: baseUrl,
  description: 'Complete online presence management for local and growing businesses in India.',
  publisher: {
    '@type': 'Organization',
    name: 'Brancha',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/portfolio?search={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
};

// ✅ [SEO SAFE] Local Business Schema
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Brancha',
  image: `${baseUrl}/og-default.jpg`,
  '@id': baseUrl,
  url: baseUrl,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390001',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 22.3072,
    longitude: 73.1812
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  },
  sameAs: [
    'https://www.instagram.com/brancha.in',
    'https://www.linkedin.com/company/brancha'
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Vadodara',
      '@id': 'https://en.wikipedia.org/wiki/Vadodara'
    },
    {
      '@type': 'City',
      name: 'Bangalore',
      '@id': 'https://en.wikipedia.org/wiki/Bangalore'
    },
    {
      '@type': 'Country',
      name: 'India',
      '@id': 'https://en.wikipedia.org/wiki/India'
    }
  ]
};

// ✅ [SEO SAFE] Service Schema
export const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Design & Development',
  provider: {
    '@type': 'Organization',
    name: 'Brancha',
    url: baseUrl
  },
  areaServed: {
    '@type': 'Country',
    name: 'India'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Digital Design Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Website Design & Development',
          description: 'Custom websites that reflect your brand and convert visitors into customers.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brand Identity',
          description: 'Cohesive visual systems that establish recognition and trust.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Media Design',
          description: 'Engaging graphics that maintain consistency across all platforms.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO & Website Optimisation',
          description: 'On-page improvements that help your website perform better and load faster.'
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

// ✅ [SEO SAFE] Person Schemas
export const personSchemas = {
  sahil: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sahil',
    jobTitle: 'Founder & Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Brancha',
      url: baseUrl
    },
    url: `${baseUrl}/about`,
    email: 'workwiths4hil@gmail.com',
    knowsAbout: ['Web Development', 'Frontend Development', 'UI/UX Design', 'SEO']
  },
  saad: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Saad',
    jobTitle: 'Co-Founder & Creative Director',
    worksFor: {
      '@type': 'Organization',
      name: 'Brancha',
      url: baseUrl
    },
    url: `${baseUrl}/about`,
    email: 'saadbombaywala9@gmail.com',
    knowsAbout: ['Brand Identity', 'Visual Design', 'Creative Direction', 'Design Systems']
  }
};

// ✅ [SEO SAFE] FAQ Schema Generator
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
        name: 'Brancha'
      },
      dateCreated: project.year
    }
  }))
});

// ✅ [SEO SAFE] Contact Page Schema
export const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${baseUrl}/contact`,
  mainEntity: {
    '@type': 'Organization',
    name: 'Brancha',
    email: 'hello@brancha.in',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      addressCountry: 'IN'
    }
  }
};