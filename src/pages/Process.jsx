import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Lightbulb, Palette, Rocket,
  HeartHandshake, MessageSquare, CheckCircle2,
  Clock, Target, ArrowRight, Sparkles,
  ChevronDown, Zap, Shield, Users, TrendingUp
} from 'lucide-react';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/schemas';

// Optimized animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px', amount: 0.2 },
  transition: {
    duration: 0.5,
    ease: [0.22, 0.61, 0.36, 1]
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-100px', amount: 0.2 },
  transition: {
    duration: 0.4,
    ease: [0.22, 0.61, 0.36, 1]
  }
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.03
    }
  },
  viewport: { once: true, margin: '-100px', amount: 0.15 }
};

const slideIn = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px', amount: 0.2 },
  transition: {
    duration: 0.5,
    ease: [0.22, 0.61, 0.36, 1]
  }
};

const slideInRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px', amount: 0.2 },
  transition: {
    duration: 0.5,
    ease: [0.22, 0.61, 0.36, 1]
  }
};

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const heroRef = useRef(null);

  const processSteps = [
    {
      number: '01',
      title: 'Discovery',
      subtitle: 'Understanding Your Vision',
      icon: <Search className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      description: 'We learn about your business, goals, and audience through in-depth conversations and research.',
      details: [
        'Initial consultation call to understand your needs',
        'Business goals and target audience analysis',
        'Competitive landscape research',
        'Brand positioning assessment',
        'Project scope and requirements gathering'
      ],
      deliverables: ['Project Brief', 'Requirements Document', 'Timeline Proposal'],
      duration: '1-2 Days',
      color: 'from-[#FF6B6B] to-[#FF8E8E]',
      bgColor: 'bg-[#FF6B6B]',
      lightBg: 'bg-[#FF6B6B]/5',
      borderColor: 'border-[#FF6B6B]',
      gradient: 'from-[#FF6B6B]/20 to-transparent'
    },
    {
      number: '02',
      title: 'Strategy',
      subtitle: 'Planning Your Success',
      icon: <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      description: 'We develop a tailored approach that aligns creative decisions with your business objectives.',
      details: [
        'Strategic planning session',
        'User experience mapping',
        'Content strategy development',
        'Technical architecture planning',
        'Design system foundation'
      ],
      deliverables: ['Strategy Document', 'Sitemap', 'Wireframes'],
      duration: '2-3 Days',
      color: 'from-[#FF8E8E] to-[#FFA5A5]',
      bgColor: 'bg-[#FF8E8E]',
      lightBg: 'bg-[#FF8E8E]/5',
      borderColor: 'border-[#FF8E8E]',
      gradient: 'from-[#FF8E8E]/20 to-transparent'
    },
    {
      number: '03',
      title: 'Creation',
      subtitle: 'Bringing Ideas to Life',
      icon: <Palette className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      description: 'We design and build with attention to every detail, ensuring quality at each stage.',
      details: [
        'Visual design and branding',
        'Interactive prototype creation',
        'Content development and copywriting',
        'Responsive development',
        'Quality assurance testing'
      ],
      deliverables: ['Design Mockups', 'Prototype', 'Final Product'],
      duration: '3-7 Days',
      color: 'from-[#FFA5A5] to-[#FFBCBC]',
      bgColor: 'bg-[#FFA5A5]',
      lightBg: 'bg-[#FFA5A5]/5',
      borderColor: 'border-[#FFA5A5]',
      gradient: 'from-[#FFA5A5]/20 to-transparent'
    },
    {
      number: '04',
      title: 'Launch & Support',
      subtitle: 'Your Success Continues',
      icon: <Rocket className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      description: 'We deliver your project and remain available for ongoing needs and optimization.',
      details: [
        'Final review and approval',
        'Deployment and launch',
        'Team training and documentation',
        'Performance monitoring',
        'Ongoing support and maintenance'
      ],
      deliverables: ['Live Project', 'Documentation', 'Support Plan'],
      duration: 'Ongoing',
      color: 'from-[#FFBCBC] to-[#FFD3D3]',
      bgColor: 'bg-[#FFBCBC]',
      lightBg: 'bg-[#FFBCBC]/5',
      borderColor: 'border-[#FFBCBC]',
      gradient: 'from-[#FFBCBC]/20 to-transparent'
    }
  ];

  const principles = [
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Clear Communication',
      description: 'Regular updates, honest feedback, and open dialogue throughout the project.',
      stat: '24/7',
      statLabel: 'Availability'
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Realistic Timelines',
      description: 'We set achievable deadlines and keep you informed of progress every step of the way.',
      stat: '98%',
      statLabel: 'On-Time'
    },
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Goal-Focused',
      description: 'Every decision is made with your business objectives and audience needs in mind.',
      stat: '100%',
      statLabel: 'Alignment'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Partnership Approach',
      description: 'We view every project as a collaboration and value your input at each stage.',
      stat: '5★',
      statLabel: 'Client Rating'
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Faster Results',
      description: 'Streamlined process means quicker turnaround without compromising quality.'
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Risk Mitigation',
      description: 'Clear milestones and regular reviews ensure alignment and reduce project risks.'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Expert Team',
      description: 'Specialized professionals handle each phase with deep expertise.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Measurable Impact',
      description: 'Data-driven approach ensures your investment delivers tangible results.'
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. A standard website typically takes 2-4 weeks, while more complex projects like custom applications may take 6-12 weeks. We provide a detailed timeline during the discovery phase.'
    },
    {
      question: 'What information do you need to get started?',
      answer: 'We\'ll need to understand your business goals, target audience, brand guidelines (if available), content requirements, and any technical specifications. Don\'t worry if you don\'t have everything ready—we\'ll guide you through gathering what\'s needed.'
    },
    {
      question: 'Do you work with clients remotely?',
      answer: 'Yes! We work with clients worldwide. Our process is designed to be effective whether we\'re meeting in person or collaborating virtually through video calls, project management tools, and regular updates.'
    },
    {
      question: 'What if I need changes during the project?',
      answer: 'We build flexibility into our process. Minor adjustments are part of our iterative approach. For significant scope changes, we\'ll discuss the impact on timeline and budget, ensuring complete transparency.'
    },
    {
      question: 'What kind of support do you offer after launch?',
      answer: 'We offer various support packages including bug fixes, content updates, performance monitoring, and feature enhancements. The level of support can be tailored to your specific needs and budget.'
    },
    {
      question: 'How do you handle payments?',
      answer: 'We typically structure payments in milestones: an initial deposit to begin work, progress payments at key project phases, and final payment upon delivery. We\'re flexible and can discuss a payment structure that works for both parties.'
    }
  ];

  const processSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Our Process - How We Work',
    description: 'Discover Brancha\'s proven 4-step process for creating exceptional digital experiences.',
    '@graph': [
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Process', path: '/process' }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Our Process - How We Work"
        description="Discover Brancha's proven 4-step process: Discovery, Strategy, Creation, and Launch. Learn how we transform ideas into exceptional digital experiences."
        keywords="design process, web development process, branding process, project workflow, design thinking"
        canonicalUrl="https://brancha.in/process"
        ogType="website"
        structuredData={processSchema}
      />

      <div className="bg-white min-h-screen" style={{ willChange: 'scroll-position' }}>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-neutral-50 to-white"
        >
          {/* Minimal Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ willChange: 'auto' }}>
            <div className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.1) 1px, transparent 0)`,
                backgroundSize: '48px 48px'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-8" style={{ willChange: 'auto' }}>
                  <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                  <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                    Our Proven Process
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 mb-6 tracking-tight leading-[1.1]"
              >
                From{" "}
                <span className="italic font-normal text-[#FF6B6B]">idea</span>{" "}
                to{" "}
                <span className="italic font-normal text-[#FF6B6B]">impact</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto"
              >
                A transparent, collaborative approach designed to bring your vision to life with clarity, creativity, and precision.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Process Steps - Interactive Cards */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid lg:grid-cols-2 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group relative bg-white rounded-3xl border border-neutral-200 p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-neutral-300 transition-all duration-500 overflow-hidden"
                  style={{ willChange: 'transform' }}
                >
                  {/* Premium gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                  {/* Subtle border accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-5">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg shadow-[#FF6B6B]/20 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#FF6B6B]/30 transition-all duration-500`}>
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-xs font-medium text-neutral-500 mb-2 tracking-wider uppercase">Step {step.number}</div>
                          <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 group-hover:text-[#FF6B6B] transition-colors duration-500 tracking-tight">
                            {step.title}
                          </h3>
                          <p className="text-sm text-neutral-500 mt-1.5 italic">{step.subtitle}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-neutral-50 group-hover:bg-neutral-100 rounded-full transition-colors duration-300">
                        <Clock className="w-4 h-4 text-neutral-600" />
                        <span className="text-xs font-medium text-neutral-700">{step.duration}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-neutral-600 mb-8 leading-relaxed text-base">
                      {step.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-4 mb-8">
                      {step.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3.5 group/item">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-300`}>
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-[15px] text-neutral-600 leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Deliverables */}
                    <div className={`${step.lightBg} group-hover:bg-white rounded-2xl p-5 border border-neutral-100 group-hover:border-neutral-200 transition-all duration-300`}>
                      <div className="text-xs font-medium text-neutral-700 mb-3 tracking-wider uppercase">Deliverables</div>
                      <div className="flex flex-wrap gap-2.5">
                        {step.deliverables.map((deliverable, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-white border border-neutral-200 rounded-full text-sm text-neutral-700 hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all duration-300"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16 sm:py-20 md:py-24 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-14 md:mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-6">
                <HeartHandshake className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                  How We Work
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Our <span className="italic font-normal">guiding principles</span>
              </h2>
              <p className="text-base text-neutral-600 max-w-xl mx-auto">
                These values shape every interaction and decision throughout our collaboration
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group bg-white rounded-2xl p-8 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-neutral-300 hover:-translate-y-1 transition-all duration-500"
                  style={{ willChange: 'transform' }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FF6B6B]/30 transition-all duration-500">
                    {principle.icon}
                  </div>
                  <div className="mb-5">
                    <div className="text-4xl font-light text-[#FF6B6B] mb-2">{principle.stat}</div>
                    <div className="text-xs text-neutral-500 tracking-wider uppercase">{principle.statLabel}</div>
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-neutral-900 mb-3 tracking-tight">
                    {principle.title}
                  </h3>
                  <p className="text-[15px] text-neutral-600 leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-14 md:mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 mb-6">
                <Target className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                  Why Our Process Works
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Built for <span className="italic font-normal">your success</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="group flex gap-6 p-8 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                  style={{ willChange: 'transform' }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FF6B6B]/30 transition-all duration-500">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium text-neutral-900 mb-3 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-[15px] text-neutral-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-neutral-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-14 md:mb-16" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-6">
                <MessageSquare className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                  FAQ
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight">
                Questions? <span className="italic font-normal">We've got answers</span>
              </h2>
            </motion.div>

            <motion.div
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-8 py-6 flex items-center justify-between gap-4 text-left hover:bg-neutral-50 transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg font-medium text-neutral-900">
                      {faq.question}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${expandedFaq === index ? 'rotate-180 bg-[#FF6B6B]/10' : ''}`}>
                      <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${expandedFaq === index ? 'text-[#FF6B6B]' : 'text-neutral-600'}`} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6 pt-0 border-t border-neutral-200">
                          <p className="text-[15px] sm:text-base text-neutral-600 leading-relaxed pt-6">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
          {/* Subtle premium background gradient */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
            <motion.div className="max-w-3xl mx-auto text-center" {...fadeInUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-6">
                <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                  Let's Get Started
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-6 tracking-tight">
                Ready to get <span className="italic font-normal">started</span>?
              </h2>

              <p className="text-base sm:text-lg text-neutral-600 mb-10 leading-relaxed max-w-2xl mx-auto">
                Let's discuss your project and how our process can help bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button
                    className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/25 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF6B6B]/35 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start a Conversation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </Link>

                <Link to="/portfolio">
                  <button
                    className="group px-10 py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-neutral-400 hover:bg-neutral-50 hover:scale-[1.02] active:scale-[0.98]"
                  >
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