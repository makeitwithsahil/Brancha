import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  },
  viewport: { once: true, margin: '-50px' }
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Website');

  const services = [
    {
      title: 'Website Design & Development',
      description: 'Custom websites that reflect your brand and convert visitors into customers.'
    },
    {
      title: 'Brand Identity',
      description: 'Cohesive visual systems that establish recognition and trust.'
    },
    {
      title: 'Social Media Design',
      description: 'Engaging graphics that maintain consistency across all platforms.'
    },
    {
      title: 'Marketing Collateral',
      description: 'Brochures, flyers, and promotional materials that communicate clearly.'
    },
    {
      title: 'SEO & Website Optimisation',
      description: 'On-page improvements that help your website perform better and load faster.'
    },
    {
      title: 'Ongoing Support',
      description: 'Regular updates and refinements to keep your presence current.'
    }
  ];

  const process = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We learn about your business, goals, and audience.'
    },
    {
      number: '02',
      title: 'Strategy',
      description: 'We develop a tailored approach that fits your needs.'
    },
    {
      number: '03',
      title: 'Creation',
      description: 'We design and build with attention to every detail.'
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'We deliver your project and remain available for ongoing needs.'
    }
  ];

  return (
    <div className="bg-white overflow-hidden font-sans">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
        {/* Minimal Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ willChange: 'auto' }}>
          <div className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.1) 1px, transparent 0)`,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-8" style={{ willChange: 'auto' }}>
                <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                  Design That Works
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 mb-6 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
            >
              We create.
              <span className="italic font-normal text-[#FF6B6B] block sm:inline">
                {" "}So your business can grow.
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            >
              We design clear websites and brand systems that help local businesses
              look professional, feel trustworthy, and grow with confidence —
              without unnecessary complexity.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <Link to="/contact">
                <button className="group px-8 py-3 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-lg shadow-[#FF6B6B]/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-xl hover:shadow-[#FF6B6B]/30 hover:scale-[1.02] active:scale-[0.98]">
                  Get a free sample
                </button>
              </Link>

              <Link to="/portfolio">
                <button className="group px-8 py-3 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]">
                  View selected work
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Trust Section */}
      <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed">
              We work with <span className="italic font-medium">cafés, salons, boutiques,</span> and service businesses that want a professional online presence without unnecessary complexity. Our approach is simple and focused on what works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="text-center mb-14 md:mb-16"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
              What we <span className="italic font-normal">offer</span>
            </h2>
            <p className="text-base text-neutral-600 max-w-xl mx-auto">
              Design services tailored to your business needs
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: '-50px' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <div className="h-full p-7 md:p-8 bg-white border border-neutral-100 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-lg hover:shadow-neutral-100 hover:border-neutral-200 hover:-translate-y-1">
                  <h3 className="text-lg md:text-xl font-sans font-semibold text-neutral-900 mb-3 tracking-tight transition-all duration-500 group-hover:text-[#FF6B6B]">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Why Brancha */}
      <section className="py-20 md:py-28 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-3xl mx-auto"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-10 text-center tracking-tight">
              Why work <span className="italic font-normal">with us</span>
            </h2>
            <div className="space-y-6 text-base sm:text-lg text-neutral-700 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                We focus on creating digital experiences that support your business goals. Every project is built with care, from the first idea to final delivery.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              >
                Our clients appreciate <span className="italic font-medium">clear communication, realistic timelines,</span> and designs that reflect their unique positioning. We avoid short-lived trends and focus on building foundations that last.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                Whether you need a complete brand system or a focused website update, we bring the same level of care and professionalism to every project.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

          {/* Section Header */}
          <motion.div
            className="text-center mb-16 md:mb-20"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-5 tracking-tight">
              How we <span className="italic font-normal">work</span>
            </h2>
            <p className="text-[15px] md:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
              A simple, transparent process designed to keep things clear,
              focused, and stress-free.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {process.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group text-center"
              >

                {/* Number */}
                <div className="mb-6">
                  <span className="block text-5xl md:text-6xl font-light text-neutral-200 tracking-tight transition-colors duration-500 group-hover:text-[#FF6B6B]/30">
                    {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-medium text-neutral-900 mb-3 tracking-tight transition-colors duration-500 group-hover:text-[#FF6B6B]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] leading-relaxed text-neutral-600 max-w-xs mx-auto">
                  {step.description}
                </p>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Final CTA */}
      <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            {...fadeInUp}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
              Ready to <span className="italic font-normal">begin</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Get in touch to discuss your project. We'll provide honest feedback and a clear path forward.
            </p>
            <Link to="/contact">
              <button className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF6B6B]/35 hover:scale-[1.02] active:scale-[0.98]">
                Start a Conversation
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}