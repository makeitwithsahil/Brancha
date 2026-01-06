import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Lightbulb, Wrench, TrendingUp,
  HeartHandshake, MessageSquare, CheckCircle2,
  Clock, Target, ArrowRight, Sparkles,
  ChevronDown, Zap, Shield, Users, RefreshCw
} from 'lucide-react';
import SEO from '../components/SEO';
import { breadcrumbSchema } from '../utils/schemas';

const useOptimizedAnimations = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return useMemo(() => {
    if (prefersReducedMotion) {
      return {
        fadeInUp: { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, margin: '-50px', amount: 0.3 }, transition: { duration: 0.2 } },
        staggerContainer: { whileInView: { transition: { staggerChildren: 0.03 } }, viewport: { once: true, margin: '-50px', amount: 0.2 } }
      };
    }

    return {
      fadeInUp: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-50px', amount: 0.3 }, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      staggerContainer: { whileInView: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }, viewport: { once: true, margin: '-50px', amount: 0.2 } }
    };
  }, [prefersReducedMotion]);
};

export default function Process() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const { fadeInUp, staggerContainer } = useOptimizedAnimations();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'How Brancha Works - Foundation + Monthly Management Process';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Brancha fixes customer loss in two steps: Foundation Package builds proper online presence, then Monthly Management brings consistent enquiries every month.');
    }
  }, []);

  const processSteps = useMemo(() => [
    {
      number: '01',
      title: 'Initial Consultation',
      subtitle: 'Understanding Your Business',
      icon: <Search className="w-6 h-6 sm:w-7 sm:h-7" />,
      description: "We start by understanding what's actually broken. Where are you losing customers? What's working? What needs to be fixed first?",
      details: [
        'Free audit of your current online presence',
        'Identify where customers are getting lost',
        'Check Google Business Profile accuracy',
        'Review website conversion paths',
        'Understand your business goals and budget'
      ],
      deliverables: ['Audit Report', 'Recommendation', 'Pricing Proposal'],
      duration: '1-2 Days'
    },
    {
      number: '02',
      title: 'Foundation Package',
      subtitle: 'Stop Customer Loss First',
      icon: <Wrench className="w-6 h-6 sm:w-7 sm:h-7" />,
      description: "Before driving any traffic, we fix what's broken. Correct Google profiles, build proper websites, set up contact systems.",
      details: [
        'Google Business Profile optimization',
        'WhatsApp Business setup with auto-replies',
        'Website built for conversions (not just design)',
        'Brand clarity and positioning',
        'QR codes for menus or contact cards',
        'Analytics and tracking setup (Growth package)'
      ],
      deliverables: ['Fixed Online Presence', 'Conversion Website', 'Contact Systems'],
      duration: '7-30 Days (depending on package)'
    },
    {
      number: '03',
      title: 'Monthly Management Begins',
      subtitle: 'Keep Customers Coming',
      icon: <RefreshCw className="w-6 h-6 sm:w-7 sm:h-7" />,
      description: 'Once foundation is solid, monthly management starts. We keep everything current, optimized, and working.',
      details: [
        'Google Business updates and review responses',
        'Social media content creation (Pro/Growth)',
        'Website maintenance and security',
        'SEO improvements month-over-month',
        'Meta or Google Ads management',
        'Monthly performance reports'
      ],
      deliverables: ['Regular Updates', 'Content', 'Performance Reports'],
      duration: 'Ongoing (minimum 3 months)'
    },
    {
      number: '04',
      title: 'Track & Improve',
      subtitle: 'Data-Driven Growth',
      icon: <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />,
      description: 'Every month, we track what\'s working. Cost per customer. Enquiry quality. We adjust based on data, not guesses.',
      details: [
        'Monitor customer acquisition costs',
        'Track enquiry sources and quality',
        'Optimize ads for lower cost per lead',
        'Conversion rate improvements',
        'Strategy calls to plan next steps',
        'Scale what works, fix what doesn\'t'
      ],
      deliverables: ['Analytics Dashboard', 'Strategy Updates', 'Action Plan'],
      duration: 'Continuous Optimization'
    }
  ], []);

  const principles = useMemo(() => [
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Clear Communication',
      description: 'No jargon. No confusing technical terms. We explain everything in plain language so you always know what\'s happening.',
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'No Surprises',
      description: 'Fixed pricing. Clear timelines. Honest recommendations. We tell you what actually fits your business, not what makes us more money.',
    },
    {
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Results-Focused',
      description: 'Every decision answers one question: Does this bring more customers? If not, we don\'t do it. Simple as that.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Long-Term Partner',
      description: 'We\'re not a vendor who disappears after delivery. We stay, manage, improve, and grow with you month after month.',
    }
  ], []);

  const benefits = useMemo(() => [
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Foundation Before Traffic',
      description: 'Most agencies drive traffic to broken websites. We fix the foundation first so you don\'t waste money on ads that go nowhere.'
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Systems Over Scattered Services',
      description: 'We don\'t just build a website and leave. Foundation + Monthly work together as one system to bring consistent customers.'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Company, Not Freelancer',
      description: 'No disappearing mid-project. No excuses. Clear accountability. Systems that work even when one person isn\'t available.'
    },
    {
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Transparent Reporting',
      description: 'You\'ll always know where customers come from, what they cost, and what\'s working. Data-driven decisions, not gut feelings.'
    }
  ], []);

  const faqs = useMemo(() => [
    {
      question: 'Do I need both Foundation and Monthly packages?',
      answer: 'Yes. Foundation fixes what\'s broken and builds proper systems. Monthly management keeps it working. A car needs to be built properly first, then maintained to keep running. Your online presence is the same.'
    },
    {
      question: 'How long does the Foundation Package take?',
      answer: 'Basic: 7-10 days. Pro: 14-21 days. Growth: 21-30 days. Timelines depend on your responsiveness and how much needs to be fixed.'
    },
    {
      question: 'What happens after Foundation is complete?',
      answer: 'Monthly management begins. We keep everything current, respond to reviews, update content, manage ads (if applicable), and continuously improve based on data.'
    },
    {
      question: 'Can I pause the Monthly package?',
      answer: 'Minimum commitment is 3 months. After that, yes, but pausing means your online presence stops being managed. Rankings drop. Competitors get ahead. Usually makes slow months worse.'
    },
    {
      question: 'What if I already have a website?',
      answer: 'We\'ll audit it during consultation. If it converts well, we\'ll optimize it. If it\'s losing customers, we\'ll rebuild it properly. No unnecessary work.'
    },
    {
      question: 'Do you work with businesses outside Gujarat?',
      answer: 'Yes. Most work is remote. For Growth package photoshoots, we charge travel separately or recommend local photographers we coordinate with.'
    },
    {
      question: 'How do you measure success?',
      answer: 'Customer acquisition cost. Enquiry volume. Enquiry quality. Conversion rates. Website traffic from organic search. We track everything and report monthly.'
    },
    {
      question: 'What makes Brancha different from other agencies?',
      answer: "We're a company, not scattered freelancers. Foundation + Monthly is a system, not one-time services. We focus on business results (customers, enquiries, revenue), not just pretty designs."
    }
  ], []);

  const toggleFaq = useCallback((index) => {
    setExpandedFaq(prev => prev === index ? null : index);
  }, []);

  return (
    <>
      <SEO
        title="How Brancha Works - Foundation + Monthly Management Process"
        description="Brancha fixes customer loss in two steps: Foundation Package builds proper online presence, then Monthly Management brings consistent enquiries every month."
        canonicalUrl="https://brancha.in/process"
        schema={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' }
        ])}
      />

      <div className="bg-[#FAF9F7] overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden bg-white">
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="max-w-4xl mx-auto text-center" {...fadeInUp}>
              <motion.div
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-5 sm:mb-6"
                whileHover={{
                  scale: prefersReducedMotion ? 1 : 1.05,
                  boxShadow: '0 4px 16px rgba(226, 73, 59, 0.15)'
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Sparkles className="w-4 h-4 text-[#e2493b] mr-2" />
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                  How We Work
                </span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1F1F1F] mb-5 sm:mb-6 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Two steps to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>stop customer loss</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
                Foundation Package fixes what's broken. Monthly Management keeps customers coming. Simple system. Proven results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="text-center mb-10 sm:mb-12" {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Our <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>process</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Clear steps from broken presence to consistent customers
              </p>
            </motion.div>

            <motion.div
              className="space-y-6 sm:space-y-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {processSteps.map((step, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl hw-accelerate transition-all duration-400 hover:shadow-lg hover:shadow-[#e2493b]/5 hover:border-[#e2493b]/20">
                    {/* Step Number & Icon */}
                    <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                      <motion.div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#e2493b] text-white flex items-center justify-center text-xl sm:text-2xl font-semibold hw-accelerate flex-shrink-0"
                        style={{ fontWeight: 600 }}
                        whileHover={{
                          scale: prefersReducedMotion ? 1 : 1.1,
                          boxShadow: '0 8px 20px -4px rgba(226, 73, 59, 0.4)'
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {step.number}
                      </motion.div>

                      <motion.div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#e2493b]/10 text-[#e2493b] flex items-center justify-center hw-accelerate relative overflow-hidden flex-shrink-0"
                        whileHover={{
                          backgroundColor: '#e2493b',
                          color: '#ffffff',
                          scale: 1.1,
                          rotate: [0, -5, 5, 0]
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="relative z-10">
                          {step.icon}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 0.3, scale: 1.5 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-[#e2493b] rounded-xl blur-md"
                        />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] transition-colors duration-400 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                            {step.title}
                          </h3>
                          <span className="text-xs font-semibold text-[#e2493b] px-3 py-1 bg-[#e2493b]/10 rounded-full" style={{ fontWeight: 600 }}>
                            {step.duration}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] italic mb-3" style={{ fontWeight: 400 }}>
                          {step.subtitle}
                        </p>
                        <p className="text-base text-[#1F1F1F] leading-relaxed" style={{ fontWeight: 400 }}>
                          {step.description}
                        </p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-semibold text-[#1F1F1F] mb-3 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                            What We Do
                          </p>
                          <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                className="flex items-start gap-2"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e2493b]" />
                                <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                                  {detail}
                                </span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-[#1F1F1F] mb-3 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                            What You Get
                          </p>
                          <ul className="space-y-2">
                            {step.deliverables.map((deliverable, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#e2493b]" />
                                <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                                  {deliverable}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="text-center mb-10 sm:mb-12" {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                How we <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>work with you</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Principles that guide every client relationship
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {principles.map((principle, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  className="group relative p-6 sm:p-7 bg-[#FAF9F7] border border-[#EFEDE9] rounded-2xl hw-accelerate cursor-default"
                  whileHover={{
                    y: prefersReducedMotion ? 0 : -4,
                    scale: prefersReducedMotion ? 1 : 1.01,
                    borderColor: 'rgba(226, 73, 59, 0.3)',
                    boxShadow: '0 12px 32px -8px rgba(226, 73, 59, 0.08)'
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#e2493b]/10 flex items-center justify-center text-[#e2493b] mb-5 hw-accelerate relative overflow-hidden"
                    whileHover={{
                      backgroundColor: '#e2493b',
                      color: '#ffffff',
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="relative z-10">
                      {principle.icon}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 0.3, scale: 1.5 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-[#e2493b] rounded-xl blur-md"
                    />
                  </motion.div>

                  <h3 className="text-base sm:text-lg font-medium text-[#1F1F1F] mb-3 transition-colors duration-400 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                    {principle.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed transition-colors duration-400 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                    {principle.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 0.03, x: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2493b] to-transparent"
                    style={{ pointerEvents: 'none' }}
                  />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="text-center mb-10 sm:mb-12" {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Why this <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>works better</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                What makes our process different from agencies and freelancers
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {benefits.map((benefit, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  className="group relative flex gap-5 sm:gap-6 p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl hw-accelerate"
                  whileHover={{
                    y: prefersReducedMotion ? 0 : -4,
                    borderColor: 'rgba(226, 73, 59, 0.3)',
                    boxShadow: '0 12px 32px -8px rgba(226, 73, 59, 0.08)'
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#e2493b]/10 flex items-center justify-center text-[#e2493b] flex-shrink-0 hw-accelerate relative overflow-hidden"
                    whileHover={{
                      backgroundColor: '#e2493b',
                      color: '#ffffff',
                      scale: 1.1,
                      rotate: [0, -5, 5, 0]
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="relative z-10">
                      {benefit.icon}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 0.3, scale: 1.5 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 bg-[#e2493b] rounded-xl blur-md"
                    />
                  </motion.div>

                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-[#1F1F1F] mb-3 transition-colors duration-400 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
                      {benefit.description}
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: '-100%' }}
                    whileHover={{ opacity: 0.03, x: '100%' }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2493b] to-transparent"
                    style={{ pointerEvents: 'none' }}
                  />
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="text-center mb-10 sm:mb-12" {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Common <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>questions</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Clear answers about how we work
              </p>
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
                  className="group bg-[#FAF9F7] border border-[#EFEDE9] rounded-xl hw-accelerate cursor-pointer"
                  whileHover={{
                    borderColor: 'rgba(226, 73, 59, 0.3)',
                    boxShadow: '0 8px 24px -4px rgba(226, 73, 59, 0.08)'
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left"
                  >
                    <h3 className="text-base font-medium text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown className="w-5 h-5 text-[#e2493b] flex-shrink-0" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-sm text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
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
        <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden bg-[#FAF9F7]">
          <div className="absolute inset-0 -z-10">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 90, 0]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="text-center" {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-5 sm:mb-6 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Ready to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>get started?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Let's talk about your business and how Foundation + Monthly can fix customer loss and bring consistent enquiries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <motion.button
                    className="group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-full shadow-xl shadow-[#e2493b]/25 inline-flex items-center gap-2 hw-accelerate overflow-hidden"
                    aria-label="Start a conversation with Brancha"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04,
                      boxShadow: '0 16px 48px -12px rgba(226, 73, 59, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span className="relative z-10">Start a Conversation</span>
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                    {!prefersReducedMotion && (
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                  </motion.button>
                </Link>

                <Link to="/services">
                  <motion.button
                    className="group px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-[#1F1F1F] bg-white border-2 border-[#EFEDE9] rounded-full inline-flex items-center gap-2 hw-accelerate"
                    aria-label="View Brancha services"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04,
                      borderColor: '#e2493b',
                      boxShadow: '0 8px 24px -4px rgba(226, 73, 59, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span>View Packages</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}