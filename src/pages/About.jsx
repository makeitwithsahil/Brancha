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

      <div className="bg-white overflow-hidden font-serif">
        <section className="relative pt-32 pb-24 md:pt-44 md:pb-36">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FF6B6B]/5 via-[#FF8E8E]/3 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B6B]/4 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="max-w-5xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#FF6B6B]" />
                </div>
                <span className="text-sm font-sans font-semibold tracking-[0.2em] text-[#FF6B6B] uppercase">
                  About Brancha
                </span>
              </div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl font-light text-neutral-900 mb-8 tracking-tight leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              >
                We build digital experiences that <span className="italic font-normal">grow businesses</span>
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              >
                Founded on the belief that exceptional design should be accessible to businesses of all sizes, Brancha partners with local enterprises to create digital presences that reflect their quality and values.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-50px' }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#FF6B6B] mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-neutral-600 font-light tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div className="text-center mb-16 md:mb-20" {...fadeInUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Our <span className="italic font-normal">values</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                These principles guide everything we do and every project we undertake.
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group bg-white border border-neutral-200 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center text-[#FF6B6B] mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3 tracking-tight">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed font-light">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div className="text-center mb-16 md:mb-20" {...fadeInUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Our <span className="italic font-normal">approach</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                A refined process that delivers exceptional results, every time.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto space-y-6">
              {approach.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                  className="group bg-white border border-neutral-200 rounded-2xl p-8 md:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center text-white text-xl font-semibold shrink-0 group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div className="text-center mb-16 md:mb-20" {...fadeInUp}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                What we <span className="italic font-normal">do best</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Comprehensive services that support your entire digital journey.
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group flex items-center gap-3 p-5 bg-white border border-neutral-200 rounded-xl transition-all duration-300 hover:border-[#FF6B6B]/30 hover:bg-[#FF6B6B]/5 hover:shadow-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                  <span className="text-neutral-700 font-light tracking-wide">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div className="text-center mb-16 md:mb-20" {...fadeInUp}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-semibold tracking-[0.2em] text-[#FF6B6B] uppercase">
                  Meet the Team
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                The people behind <span className="italic font-normal">Brancha</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Two founders committed to helping businesses establish meaningful digital presences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100 hover:-translate-y-1">
                  <div className="p-6 md:p-8 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 border-b border-neutral-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#FF6B6B]" />
                          <span className="text-sm font-semibold tracking-[0.1em] text-[#FF6B6B] uppercase">
                            Founder
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-[-0.02em]">
                          Sahil
                        </h3>
                        <p className="text-lg text-neutral-600 font-light">
                          Developer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-neutral-600 mb-6 leading-relaxed font-light">
                      Leads development at Brancha, focusing on building fast, functional websites that work well for businesses and their customers. Focuses on clean code and reliable solutions.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF6B6B] mt-0.5" />
                        <span className="text-sm text-neutral-700">
                          Experience building websites for local and growing businesses
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF6B6B] mt-0.5" />
                        <span className="text-sm text-neutral-700">
                          Skilled in modern web tools and clean front-end development
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF6B6B] mt-0.5" />
                        <span className="text-sm text-neutral-700">
                          Strong focus on performance, clarity, and long-term usability
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="w-4 h-4" />
                        <span>workwiths4hil@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="group"
              >
                <div className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100 hover:-translate-y-1">
                  <div className="p-6 md:p-8 bg-gradient-to-br from-[#FF8E8E]/10 to-[#FF6B6B]/5 border-b border-neutral-100">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF8E8E] to-[#FF6B6B] flex items-center justify-center">
                        <Palette className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#FF8E8E]" />
                          <span className="text-sm font-semibold tracking-[0.1em] text-[#FF8E8E] uppercase">
                            Co-Founder
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-[-0.02em]">
                          Saad
                        </h3>
                        <p className="text-lg text-neutral-600 font-light">
                          Creative Director
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <p className="text-neutral-600 mb-6 leading-relaxed font-light">
                      Leads the creative direction at Brancha, focusing on brand identity and visual design that feels clear, modern, and practical. Works closely with businesses to shape how they present themselves online.
                    </p>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF8E8E] mt-0.5" />
                        <span className="text-sm text-neutral-700">
                          Experience designing brand identities and digital creatives
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF8E8E] mt-0.5" />
                        <span className="text-sm text-neutral-700">
                          Skilled with modern design tools and visual systems
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF8E8E] mt-0.5" />
                        <span className="text-sm text-neutral-700">
                          Strong focus on clarity, usability, and brand consistency
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-neutral-100">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="w-4 h-4" />
                        <span>saadbombaywala9@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              {...fadeInUp}
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mx-auto mb-8">
                <Award className="w-10 h-10 text-[#FF6B6B]" />
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Our <span className="italic font-normal">mission</span>
              </h2>
              <p className="text-lg sm:text-xl text-neutral-700 leading-relaxed mb-8">
                To help quality-focused businesses build digital presences that genuinely reflect their standards and support their growth—without unnecessary complexity or inflated costs.
              </p>
              <p className="text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                We believe exceptional design should be accessible, communication should be clear, and results should be measurable. Everything we do serves these commitments.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Let's work <span className="italic font-normal">together</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Whether you're starting from scratch or refining an existing presence, we'd like to hear about your project.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <button className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF6B6B]/35 hover:scale-[1.02] active:scale-[0.98]">
                    <span className="flex items-center gap-2">
                      Start a Conversation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>
                <Link to="/portfolio">
                  <button className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]">
                    View Our Work
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}