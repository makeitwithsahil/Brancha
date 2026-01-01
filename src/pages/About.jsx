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
  const values = [
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
  ];

  const approach = [
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
  ];

  const stats = [
    { number: '10+', label: 'Projects Delivered' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '3-7', label: 'Day Avg Delivery' },
    { number: '100%', label: 'Commitment' }
  ];

  const expertise = [
    'Website Design & Development',
    'Brand Identity & Visual Design',
    'Poster & Creative Design',
    'Social Media Management',
    'Reel & Video Editing',
    'SEO & Website Optimisation',
    'Menu & Digital Catalog Design',
    'WhatsApp Business Setup'
  ];

  // SEO Schema
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      personSchemas.sahil,
      personSchemas.saad,
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ])
    ]
  };

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
        {/* Hero Section */}
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

        {/* Stats Section */}
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
                  key={stat.label}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-2 tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-neutral-600 font-sans tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                {...fadeInUp}
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-[#FF6B6B]" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                  Our <span className="italic font-normal">story</span>
                </h2>
                <div className="space-y-5 text-base sm:text-lg text-neutral-700 leading-relaxed">
                  <p>
                    Brancha began when two designers recognized a gap in the market: local businesses wanted professional digital presence but found agency services either too complex or too expensive.
                  </p>
                  <p>
                    We started by helping cafés and salons in our community build websites and brand systems they could actually use. The response confirmed what we suspected—there was real demand for design services that prioritize clarity, usability, and value.
                  </p>
                  <p>
                    Today, we work with businesses across India who appreciate straightforward communication, realistic timelines, and design that serves their actual goals rather than following trends.
                  </p>
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                className="relative"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-[#FF6B6B]/5 to-[#FF8E8E]/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-5xl md:text-6xl font-light text-neutral-900 mb-4 tracking-tight">
                      10+
                    </div>
                    <div className="text-lg text-neutral-600">
                      Local Businesses<br />Empowered
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="text-center mb-14 md:mb-16"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                What guides <span className="italic font-normal">our work</span>
              </h2>
              <p className="text-base text-neutral-600 max-w-xl mx-auto">
                The principles that inform every project we take on
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-50px' }}
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="h-full p-7 md:p-8 bg-white border border-neutral-100 rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-lg hover:shadow-neutral-100 hover:border-neutral-200 hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center mb-5 text-[#FF6B6B] transition-all duration-500 group-hover:scale-110">
                      {value.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-sans font-semibold text-neutral-900 mb-3 tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-[15px]">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="text-center mb-14 md:mb-16"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Our <span className="italic font-normal">approach</span>
              </h2>
              <p className="text-base text-neutral-600 max-w-xl mx-auto">
                How we think about design and delivery
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-10 lg:gap-12 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              {approach.map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className="mb-5">
                    <span className="text-5xl md:text-6xl font-light text-neutral-200 tracking-tight transition-colors duration-500 group-hover:text-[#FF6B6B]/30">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div
              className="max-w-4xl mx-auto"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-10 text-center tracking-tight">
                What we <span className="italic font-normal">do</span>
              </h2>

              <motion.div
                className="grid sm:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {expertise.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-3 p-4 bg-white border border-neutral-100 rounded-xl transition-all duration-500 hover:border-neutral-200 hover:shadow-sm"
                  >
                    <Check className="w-5 h-5 text-[#FF6B6B]" />
                    <span className="text-[15px] text-neutral-700">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 md:py-32">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <motion.div
              className="text-center mb-16 md:mb-20"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-5 tracking-tight">
                Meet the <span className="italic font-normal">team</span>
              </h2>
              <p className="text-[15px] md:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
                Two designers committed to helping businesses present themselves with clarity and confidence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-12">
              {/* Founder - Sahil */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100 hover:-translate-y-1">
                  {/* Header with icon */}
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
                          Developer & Designer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-neutral-600 mb-6 leading-relaxed font-light">
                      Leads technical execution at Brancha, focusing on clean, functional websites that work well and remain easy to update. Handles development, user experience, and ongoing site improvements.
                    </p>

                    {/* Highlights */}
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

                    {/* Contact */}
                    <div className="pt-6 border-t border-neutral-100">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Mail className="w-4 h-4" />
                        <span>workwiths4hil@gmail.com</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* Co-Founder - Saad */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="group"
              >
                <div className="h-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-neutral-100 hover:-translate-y-1">
                  {/* Header with icon */}
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

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <p className="text-neutral-600 mb-6 leading-relaxed font-light">
                      Leads the creative direction at Brancha, focusing on brand identity and visual design that feels clear, modern, and practical. Works closely with businesses to shape how they present themselves online.
                    </p>

                    {/* Highlights */}
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

                    {/* Contact */}
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

        {/* Mission Section */}
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

        {/* CTA Section */}
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
