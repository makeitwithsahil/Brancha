import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Heart, Users, Target, Zap, Award, TrendingUp,
  Sparkles, Mail, Check, MessageSquare, ArrowRight, Code, Palette
} from 'lucide-react';
import SEO from '../components/SEO';
import { personSchemas, breadcrumbSchema } from '../utils/schemas';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px', amount: 0.3 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
  }
};

const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px', amount: 0.3 },
  transition: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1]
  }
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  },
  viewport: { once: true, margin: '-100px', amount: 0.2 }
};

export default function About() {
  const values = useMemo(() => [
    {
      icon: <Heart className="w-7 h-7" />,
      title: 'Genuine Care',
      description: 'We treat every project as if it were our own business, investing the same care and attention to detail.'
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: 'Results-Focused',
      description: 'Beautiful design is just the beginning. We measure success by the impact on your business goals.'
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Collaborative Spirit',
      description: 'Your insights and expertise are invaluable. We work alongside you, not just for you.'
    },
    {
      icon: <Zap className="w-7 h-7" />,
      title: 'Efficient Process',
      description: 'Streamlined workflows and clear communication mean faster delivery without compromising quality.'
    }
  ], []);

  const approach = useMemo(() => [
    {
      number: '01',
      title: 'Understanding First',
      description: 'We begin every project by deeply understanding your business, audience, and competitive landscape. No templates, no assumptions.'
    },
    {
      number: '02',
      title: 'Strategic Foundation',
      description: 'Before any design begins, we develop a clear strategy that aligns creative decisions with your business objectives.'
    },
    {
      number: '03',
      title: 'Thoughtful Execution',
      description: 'Every element is crafted with intention. From typography to user flows, we consider how each choice serves your goals.'
    },
    {
      number: '04',
      title: 'Ongoing Partnership',
      description: 'Launch is just the beginning. We remain available to refine, optimize, and support your continued growth.'
    }
  ], []);

  const stats = useMemo(() => [
    { number: '10+', label: 'Projects Delivered' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '3-7', label: 'Day Avg Delivery' },
    { number: '100%', label: 'Commitment' }
  ], []);

  const expertise = useMemo(() => [
    'Website Design & Development',
    'Brand Identity & Visual Design',
    'Poster & Creative Design',
    'Social Media Management',
    'Reel & Video Editing',
    'SEO & Website Optimisation',
    'Menu & Digital Catalog Design',
    'WhatsApp Business Setup'
  ], []);

  const aboutSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      personSchemas.sahil,
      personSchemas.saad,
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ])
    ]
  }), []);

  return (
    <>
      <SEO
        title="About Us"
        description="Meet the team behind Brancha. Sahil and Saad founded Brancha to help local businesses in Vadodara and Bangalore build professional digital presences through exceptional design and development."
        canonical="/about"
        schema={aboutSchema}
        keywords="about Brancha, design agency team, Sahil founder, Saad creative director, Vadodara design agency, Bangalore web design"
      />

      <div className="bg-white overflow-hidden font-sans">
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
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.15 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-8" style={{ willChange: 'auto' }}>
                  <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                  <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                    About Brancha
                  </span>
                </div>
              </motion.div>

              {/* Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 mb-6 tracking-tight leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
              >
                We create.
                <span className="italic font-normal text-[#FF6B6B] block sm:inline">
                  {" "}You grow.
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
              >
                Brancha works with local and growing businesses to build clear,
                professional digital experiences. We focus on thoughtful design,
                honest communication, and long-term value — so your brand feels
                confident today and stays relevant as you grow.
              </motion.p>
            </motion.div>
          </div>
        </section>


        {/* Stats Section */}
        <section className="py-20 md:py-24 lg:py-28 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInScale}
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="relative p-6 md:p-8 rounded-2xl bg-white border border-neutral-100 transition-all duration-300 group-hover:border-[#FF6B6B]/20 group-hover:shadow-lg group-hover:shadow-[#FF6B6B]/5">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-light text-[#FF6B6B] mb-2 tracking-tight transition-all duration-300 group-hover:scale-110">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-600 transition-colors duration-300 group-hover:text-neutral-900">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="text-center mb-14 md:mb-16"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Our <span className="italic font-normal">values</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-100px' }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="h-full p-6 md:p-7 lg:p-8 bg-white border border-neutral-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B6B]/10 hover:border-[#FF6B6B]/20">
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mb-5 text-[#FF6B6B]"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-lg md:text-xl font-sans font-semibold text-neutral-900 mb-3 tracking-tight transition-colors duration-300 group-hover:text-[#FF6B6B]">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm md:text-[15px] transition-colors duration-300 group-hover:text-neutral-700">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <motion.div
              className="text-center mb-16 md:mb-20"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-5 tracking-tight">
                Our <span className="italic font-normal">approach</span>
              </h2>
              <p className="text-sm sm:text-[15px] md:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
                A thoughtful process that puts your business goals at the center
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {approach.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group text-center"
                >
                  <motion.div
                    className="mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="block text-4xl md:text-5xl lg:text-6xl font-light text-neutral-200 tracking-tight transition-colors duration-300 group-hover:text-[#FF6B6B]/30">
                      {step.number}
                    </span>
                  </motion.div>
                  <h3 className="text-lg md:text-xl font-medium text-neutral-900 mb-3 tracking-tight transition-colors duration-300 group-hover:text-[#FF6B6B]">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-[15px] leading-relaxed text-neutral-600 max-w-xs mx-auto transition-colors duration-300 group-hover:text-neutral-700">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expertise */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="text-center mb-14 md:mb-16"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Our <span className="italic font-normal">expertise</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
                A full range of services to support your digital growth
              </p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ x: 5, scale: 1.02 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex items-center gap-3 p-4 bg-white border border-neutral-100 rounded-xl hover:border-[#FF6B6B]/30 hover:shadow-lg hover:shadow-[#FF6B6B]/5 transition-all duration-300"
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-[#FF6B6B] flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-sm md:text-[15px] text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="text-center mb-14 md:mb-16"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Meet <span className="italic font-normal">Founders</span>
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
                Two professionals dedicated to your success
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Sahil */}
              <a
                href="http://sahilmaurya.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <div className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B6B]/10 hover:border-[#FF6B6B]/30">

                    {/* Header */}
                    <div className="p-6 md:p-8 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 border-b border-neutral-100 transition-all duration-300 group-hover:from-[#FF6B6B]/15 group-hover:to-[#FF6B6B]/8">
                      <div className="flex items-center gap-4">
                        <motion.div
                          className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center shadow-lg"
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Code className="w-7 h-7 md:w-8 md:h-8 text-white" />
                        </motion.div>

                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-[#FF6B6B] animate-pulse" />
                            <span className="text-xs md:text-sm font-sans font-semibold tracking-[0.1em] text-[#FF6B6B] uppercase">
                              Founder
                            </span>
                          </div>

                          <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight transition-colors duration-300 group-hover:text-[#FF6B6B]">
                            Sahil
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8">
                      <p className="text-sm md:text-base text-neutral-600 mb-6 leading-relaxed">
                        Founder of Brancha, focused on helping businesses build a clear,
                        professional digital presence. Works closely with brands to turn ideas
                        into structured systems that support long-term growth.
                      </p>

                      <div className="space-y-4 mb-6">
                        <motion.div
                          className="flex items-start gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-neutral-700">
                            Experience working with local and growing businesses
                          </span>
                        </motion.div>

                        <motion.div
                          className="flex items-start gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-neutral-700">
                            Strong focus on clarity, consistency, and brand credibility
                          </span>
                        </motion.div>

                        <motion.div
                          className="flex items-start gap-3"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check className="w-5 h-5 text-[#FF6B6B] mt-0.5 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-neutral-700">
                            Business-first approach with long-term value in mind
                          </span>
                        </motion.div>
                      </div>

                      <div className="pt-6 border-t border-neutral-100">
                        <motion.div
                          className="flex items-center gap-2 text-xs md:text-sm text-neutral-600 hover:text-[#FF6B6B] transition-colors duration-300"
                          whileHover={{ x: 3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="break-all">workwithbrancha@gmail.com</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </a>


              {/* Saad */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF8E8E]/10 hover:border-[#FF8E8E]/30">

                  {/* Header */}
                  <div className="p-6 md:p-8 bg-gradient-to-br from-[#FF8E8E]/10 to-[#FF6B6B]/5 border-b border-neutral-100 transition-all duration-300 group-hover:from-[#FF8E8E]/15 group-hover:to-[#FF6B6B]/8">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-[#FF8E8E] to-[#FF6B6B] flex items-center justify-center shadow-lg"
                        whileHover={{ rotate: -5, scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Palette className="w-7 h-7 md:w-8 md:h-8 text-white" />
                      </motion.div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#FF8E8E] animate-pulse" />
                          <span className="text-xs md:text-sm font-sans font-semibold tracking-[0.1em] text-[#FF8E8E] uppercase">
                            Co-Founder
                          </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 tracking-tight transition-colors duration-300 group-hover:text-[#FF8E8E]">
                          Saad
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 md:p-8">
                    <p className="text-sm md:text-base text-neutral-600 mb-6 leading-relaxed">
                      Co-founder of Brancha, focused on brand direction and visual judgment.
                      Ensures every brand feels intentional, refined, and aligned with how
                      customers actually perceive it in the real world.
                    </p>


                    <div className="space-y-4 mb-6">
                      <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5 text-[#FF8E8E] mt-0.5 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-neutral-700">
                          Defines brand tone, visual direction, and overall look & feel
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5 text-[#FF8E8E] mt-0.5 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-neutral-700">
                          Strong sense of taste, balance, and restraint in design decisions
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Check className="w-5 h-5 text-[#FF8E8E] mt-0.5 flex-shrink-0" />
                        <span className="text-xs md:text-sm text-neutral-700">
                          Focused on trust, perception, and long-term brand recall
                        </span>
                      </motion.div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100">
                      <motion.div
                        className="flex items-center gap-2 text-xs md:text-sm text-neutral-600 hover:text-[#FF8E8E] transition-colors duration-300"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Mail className="w-4 h-4 flex-shrink-0" />
                        <span className="break-all">saadbombaywala9@gmail.com</span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              {...fadeInUp}
            >
              <motion.div
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mx-auto mb-8"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-8 h-8 md:w-10 md:h-10 text-[#FF6B6B]" />
              </motion.div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Our <span className="italic font-normal">mission</span>
              </h2>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-neutral-700 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              >
                To help quality-focused businesses build digital presences that genuinely reflect their standards and support their growth—without unnecessary complexity or inflated costs.
              </motion.p>
              <motion.p
                className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                We believe exceptional design should be accessible, communication should be clear, and results should be measurable. Everything we do serves these commitments.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Let's work <span className="italic font-normal">together</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Whether you're starting from scratch or refining an existing presence, we'd like to hear about your project.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <Link to="/contact">
                  <motion.button
                    className="group px-8 md:px-10 py-3 md:py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/25 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6B6B]/35"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="flex items-center gap-2">
                      Start a Conversation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </Link>
                <Link to="/portfolio">
                  <motion.button
                    className="group px-8 md:px-10 py-3 md:py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Our Work
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}