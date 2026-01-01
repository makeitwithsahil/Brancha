import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Palette, Layout, Smartphone, TrendingUp, Camera, QrCode, Phone,
  MessageSquare, ShoppingCart, Search, Target, FileText,
  Users, Zap, Globe, Shield, Award, Check, Sparkles
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../components/SEO';
import { serviceSchema, breadcrumbSchema } from '../utils/schemas';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  }
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  viewport: { once: true, margin: '-50px' }
};

export default function Services() {
  const serviceCategories = [
    {
      title: 'Branding & Design',
      icon: <Palette className="w-7 h-7" />,
      color: 'from-[#FF6B6B] to-[#FF8E8E]',
      services: [
        { name: 'Logo Design', description: 'Custom logos that capture your brand essence' },
        { name: 'Full Brand Kit', description: 'Complete visual identity system with guidelines' },
        { name: 'Poster Design', description: 'Eye-catching posters for events and promotions' },
        { name: 'Business Card Design', description: 'Professional cards that make an impression' },
        { name: 'Brand Colors & Font Pairing', description: 'Cohesive color schemes and typography' },
        { name: 'Menu Design', description: 'Beautiful and functional restaurant menus' }
      ]
    },
    {
      title: 'Development',
      icon: <Layout className="w-7 h-7" />,
      color: 'from-[#4ECDC4] to-[#44A08D]',
      services: [
        { name: 'Landing Page Website', description: 'Single-page websites optimized for conversions' },
        { name: 'Static Website (3–5 Pages)', description: 'Fast, responsive multi-page websites' },
        { name: 'Full Website (Frontend & Backend)', description: 'Complete custom web applications' },
        { name: 'E-Commerce Website', description: 'Online stores with payment integration' },
        { name: 'QR Menu & QR Cards', description: 'Digital menus and contactless solutions' },
        { name: 'WhatsApp Business Setup', description: 'Professional WhatsApp business configuration' }
      ]
    },
    {
      title: 'Social Media Services',
      icon: <Smartphone className="w-7 h-7" />,
      color: 'from-[#A166AB] to-[#C44569]',
      services: [
        { name: 'Social Media Management', description: 'Complete platform management and engagement' },
        { name: 'Content Creation', description: 'High-quality visual and written content' },
        { name: 'Instagram & Facebook Management', description: 'Dedicated platform optimization' },
        { name: 'Reel Editing', description: 'Professional video editing for social media' },
        { name: 'Content Strategy & Planning', description: 'Data-driven content calendars' },
        { name: 'Community Management', description: 'Building and engaging your audience' }
      ]
    },
    {
      title: 'Digital Marketing',
      icon: <TrendingUp className="w-7 h-7" />,
      color: 'from-[#FFD166] to-[#FFB347]',
      services: [
        { name: 'Digital Marketing Strategy', description: 'Comprehensive growth roadmaps' },
        { name: 'Meta Ads (Facebook & Instagram)', description: 'Targeted social media advertising' },
        { name: 'Google Ads', description: 'Search and display network campaigns' },
        { name: 'SEO Services', description: 'Search engine optimization and ranking' },
        { name: 'Google Business Profile Optimization', description: 'Local search visibility enhancement' },
        { name: 'Analytics & Reporting', description: 'Performance tracking and insights' }
      ]
    },
    {
      title: 'Additional Services',
      icon: <Sparkles className="w-7 h-7" />,
      color: 'from-[#06D6A0] to-[#1B9AAA]',
      services: [
        { name: 'Product Photoshoot', description: 'Professional product photography' },
        { name: 'Brand Photography', description: 'Custom imagery for your brand' },
        { name: 'Email Marketing Setup', description: 'Newsletter and automation systems' },
        { name: 'Copywriting Services', description: 'Compelling brand messaging' },
        { name: 'Competitor Analysis', description: 'Market positioning and strategy' },
        { name: 'Monthly Retainer Packages', description: 'Ongoing support and maintenance' }
      ]
    }
  ];

  const whyChooseUs = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Goal-Oriented',
      description: 'Every project starts with clear business objectives'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Client-Focused',
      description: 'Your vision and needs guide our creative process'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Efficient workflows without compromising quality'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Premium Quality',
      description: 'Attention to detail in every deliverable'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Reliable Support',
      description: 'Ongoing assistance and maintenance'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Modern Solutions',
      description: 'Latest technologies and design trends'
    }
  ];

  const popularPackages = [
    {
      name: 'Startup Package',
      price: '₹19,999',
      originalPrice: '₹24,999',
      description: 'Perfect for new Indian startups & small businesses',
      features: [
        'Custom Logo Design',
        '3-Page Responsive Website',
        'Social Media Setup (2 Platforms)',
        'Basic SEO Setup',
        '1 Month Free Support',
        'Mobile-Friendly Design'
      ],
      color: 'border-neutral-200',
      bestFor: ['Small Businesses', 'Startups', 'Local Shops']
    },
    {
      name: 'Growth Package',
      price: '₹44,999',
      originalPrice: '₹54,999',
      description: 'Most Popular - Comprehensive digital presence',
      features: [
        'Complete Brand Identity',
        '5-Page Dynamic Website',
        'Social Media Management (3 months)',
        'Advanced SEO Setup',
        'Google Business Profile',
        '6 Months Support',
        'WhatsApp Business Setup'
      ],
      color: 'border-[#FF6B6B]',
      popular: true,
      bestFor: ['Growing Businesses', 'E-commerce', 'Service Providers']
    },
    {
      name: 'Enterprise Package',
      price: '₹89,999',
      originalPrice: '₹1,09,999',
      description: 'End-to-end digital transformation',
      features: [
        'Complete Brand System',
        'Custom Website + CMS',
        'E-commerce Setup',
        'Full Digital Marketing (3 months)',
        'Content Creation Package',
        '12 Months Priority Support',
        'Monthly Performance Reports',
        'Dedicated Account Manager'
      ],
      color: 'border-neutral-800',
      bestFor: ['Established Brands', 'Enterprises', 'Franchises']
    }
  ];

const servicesSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    serviceSchema,
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' }
    ])
  ]
};
  return (
    <>
     <SEO
      title="Our Services"
      description="Professional website design, brand identity, social media management, and digital marketing services for businesses in Vadodara, Bangalore, and across India."
      canonical="/services"
      schema={servicesSchema}
      keywords="web design services, brand identity services, social media management, digital marketing services India, website development Vadodara, branding services Bangalore"
    />
    <div className="bg-white overflow-hidden font-serif">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-36">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FF6B6B]/5 via-[#FF8E8E]/3 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B6B]/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#FF6B6B]" />
              </div>
              <span className="text-sm font-sans font-semibold tracking-[0.1em] text-[#FF6B6B] uppercase">
                Our Services
              </span>
            </div>

            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-light text-neutral-900 mb-6 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              We Create, <span className="italic font-normal">You Grow</span>
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              Comprehensive digital solutions designed to strengthen your brand and support your business growth.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <Link to="/contact">
                <button className="group px-8 py-3 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-lg shadow-[#FF6B6B]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-xl hover:shadow-[#FF6B6B]/30 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    Get a Free Consultation
                  </span>
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="group px-8 py-3 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="flex items-center gap-3">
                    <Layout className="w-4 h-4" />
                    View Our Portfolio
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="text-center mb-14 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
              What we <span className="italic font-normal">offer</span>
            </h2>
            <p className="text-base text-neutral-600 max-w-xl mx-auto">
            From brand identity to digital marketing, we provide what your business needs to perform well online.
            </p>
          </motion.div>

          <div className="space-y-12">
            {serviceCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: categoryIndex * 0.1 }}
                className="relative"
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-3 text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light text-neutral-900 tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-neutral-600 mt-1 text-sm">
                      Complete solutions for your {category.title.toLowerCase()} needs
                    </p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, index) => (
                    <motion.div
                      key={service.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                      className="group"
                    >
                      <div className="h-full p-6 bg-white border border-neutral-100 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-lg hover:shadow-neutral-100 hover:border-neutral-200 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 flex items-center justify-center group-hover:border-neutral-200 transition-colors duration-300">
                            <Check className="w-4 h-4 text-neutral-400 group-hover:text-[#FF6B6B] transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-sans font-semibold text-neutral-900 mb-2 tracking-tight group-hover:text-[#FF6B6B] transition-colors duration-300">
                              {service.name}
                            </h4>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="text-center mb-14 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
              Why <span className="italic font-normal">choose</span> Brancha
            </h2>
            <p className="text-base text-neutral-600 max-w-xl mx-auto">
              We combine creativity with strategy to deliver exceptional results
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-50px' }}
          >
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="group"
              >
                <div className="h-full p-7 md:p-8 bg-white border border-neutral-100 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-lg hover:shadow-neutral-100 hover:border-neutral-200 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mb-6 group-hover:from-[#FF6B6B]/20 group-hover:to-[#FF6B6B]/10 transition-all duration-500">
                    <div className="text-[#FF6B6B] group-hover:scale-110 transition-transform duration-500">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-sans font-semibold text-neutral-900 mb-3 tracking-tight group-hover:text-[#FF6B6B] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="text-center mb-14 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
              Popular <span className="italic font-normal">packages</span>
            </h2>
            <p className="text-base text-neutral-600 max-w-xl mx-auto">
              Flexible solutions tailored to different business needs and budgets
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-50px' }}
          >
            {popularPackages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                variants={fadeInUp}
                className={`relative ${pkg.popular ? 'lg:-translate-y-3' : ''}`}
              >
                {/* Most Popular Badge - Positioned above the card */}
                {pkg.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-full">
                    <div className="px-5 py-1.5 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white text-xs font-medium tracking-wide rounded-full shadow-lg w-fit mx-auto">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`
              h-full bg-white border ${pkg.color} rounded-2xl
              p-7 md:p-8
              transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
              hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-100
              ${pkg.popular ? 'pt-10 shadow-md ring-1 ring-[#FF6B6B]/20' : ''}
            `}
                >
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-light text-neutral-900 mb-2 tracking-tight">
                      {pkg.name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-3xl md:text-4xl font-light text-neutral-900 tracking-tighter">
                        {pkg.price}
                      </div>
                      {pkg.originalPrice && (
                        <div className="text-neutral-400 line-through text-lg">
                          {pkg.originalPrice}
                        </div>
                      )}
                    </div>

                    <p className="text-neutral-600 text-sm">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#FF6B6B]" />
                        </div>
                        <span className="text-neutral-700 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Best For */}
                  {pkg.bestFor && (
                    <div className="mb-8">
                      <p className="text-neutral-500 text-xs font-medium mb-3">BEST FOR</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.bestFor.map((type, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-neutral-50 text-neutral-700 text-xs rounded-full border border-neutral-200"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link to="/contact">
                    <button
                      className={`
                  w-full py-3.5 text-sm font-medium tracking-wide rounded-xl
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  hover:scale-[1.02] active:scale-[0.98]
                  ${pkg.popular
                          ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white hover:shadow-lg hover:shadow-[#FF6B6B]/30'
                          : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                        }
                `}
                    >
                      Get Started
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16"
            {...fadeInUp}
          >
            <p className="text-neutral-600 mb-6 text-sm">
              Need a custom package? We tailor solutions to your specific needs.
            </p>
            <Link to="/contact">
              <button className="group px-8 py-3 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]">
                <span className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  Request Custom Quote
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-7 h-7 text-[#FF6B6B]" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
              Ready to <span className="italic font-normal">begin</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Let's discuss how our services can help you achieve your business goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <button className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF6B6B]/35 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" />
                    Start a Conversation
                  </span>
                </button>
              </Link>
              <a href="tel:+919825883015">
                <button className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]">
                  <span className="flex items-center gap-3">
                    <Phone className="w-4 h-4" />
                    Call Now: 98258 83015
                  </span>
                </button>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-neutral-500 text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[#FF6B6B]" />
                <span>Free Initial Consultation</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
              <div className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[#FF6B6B]" />
                <span>No Contracts Required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
}