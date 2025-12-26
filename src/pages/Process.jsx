import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, Lightbulb, Palette, Rocket, 
  HeartHandshake, MessageSquare, CheckCircle2,
  Clock, Target, ArrowRight, Sparkles,
  ChevronDown, Zap, Shield, Users, TrendingUp
} from 'lucide-react';

// Premium animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.6,
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

const slideIn = {
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  }
};

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [hoveredPrinciple, setHoveredPrinciple] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
      title: 'Collaborative',
      description: 'Your input and expertise are valued. We work alongside you, not just for you.',
      stat: '10+',
      statLabel: 'Clients'
    }
  ];

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Most projects are completed within 3-7 days from start to finish. However, timelines vary based on project scope and complexity. We provide a detailed timeline during the discovery phase.'
    },
    {
      question: 'What do you need from me to get started?',
      answer: 'We need clarity on your business goals, target audience, brand guidelines (if available), content (text, images), and any specific features or functionality you require. We guide you through this during discovery.'
    },
    {
      question: 'Can I request changes during the project?',
      answer: 'Absolutely. We include revision rounds at key stages to ensure you\'re happy with the direction. Major scope changes may affect timeline and budget, which we discuss openly.'
    },
    {
      question: 'Do you provide training after launch?',
      answer: 'Yes! We provide documentation and training sessions to ensure you and your team feel confident managing and updating your new digital presence.'
    },
    {
      question: 'What happens after the project launches?',
      answer: 'We offer ongoing support packages for maintenance, updates, and optimization. You\'re never left without help when you need it.'
    },
    {
      question: 'How do you handle project communication?',
      answer: 'We maintain regular communication through your preferred channels - email, phone, or video calls. You\'ll receive weekly progress updates and have direct access to your project team.'
    }
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Fast Turnaround',
      description: '3-7 day delivery'
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Quality Assured',
      description: 'Rigorous testing'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Expert Team',
      description: 'Seasoned professionals'
    },
    {
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Growth Focused',
      description: 'Measurable results'
    }
  ];

  const toggleFaq = useCallback((index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  }, [expandedFaq]);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32 overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 -z-10 overflow-hidden"
          style={{ y, opacity }}
        >
          <motion.div 
            className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#FF6B6B]/10 via-[#FF8E8E]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` 
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] bg-gradient-to-tr from-[#4ECDC4]/10 via-[#44A8A0]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ 
              transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * -0.02}px)` 
            }}
          />
        </motion.div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white shadow-lg shadow-neutral-900/5 rounded-full mb-6 sm:mb-8 border border-neutral-200"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF6B6B]" />
              </motion.div>
              <span className="text-xs sm:text-sm font-sans font-medium tracking-wide text-neutral-700">
                Our Process
              </span>
            </motion.div>

            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-neutral-900 mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              A <span className="relative inline-block">
                <span className="italic font-normal text-[#FF6B6B]">Clear Path</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span> to Exceptional Results
            </motion.h1>

            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Transparent, collaborative, and designed to deliver measurable impact for your business
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Bar with Enhanced Hover */}
      <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-neutral-50 to-white border-y border-neutral-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative text-center cursor-pointer"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  layoutId={`benefit-bg-${index}`}
                />
                <div className="relative p-4 sm:p-6">
                  <motion.div
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-lg shadow-neutral-900/5 text-[#FF6B6B] mb-3 sm:mb-4 border border-neutral-200 group-hover:border-[#FF6B6B] group-hover:shadow-xl group-hover:shadow-[#FF6B6B]/20 transition-all duration-500"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900 mb-1 group-hover:text-[#FF6B6B] transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Steps with Premium Animations */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative">
        {/* Floating Elements Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#FF6B6B]/20 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16 md:mb-20"
            {...fadeInUp}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              How We <span className="relative inline-block">
                <span className="italic font-normal text-[#FF6B6B]">Work Together</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B6B]/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Four phases designed to transform your vision into reality
            </motion.p>
          </motion.div>

          {/* Desktop Process Steps with Advanced Animations */}
          <div className="hidden lg:block space-y-32">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className={`grid grid-cols-2 gap-16 xl:gap-24 items-center ${index % 2 === 1 ? 'direction-rtl' : ''}`}>
                  {/* Content Side */}
                  <motion.div 
                    className={index % 2 === 1 ? 'order-2' : 'order-1'}
                    variants={index % 2 === 0 ? slideIn : slideInRight}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                  >
                    <motion.div 
                      className="flex items-center gap-6 mb-8"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <motion.div 
                        className={`relative flex items-center justify-center w-20 h-20 rounded-2xl ${step.bgColor} text-white shadow-2xl`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <motion.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute inset-0 rounded-2xl opacity-30"
                          style={{
                            background: `conic-gradient(from 0deg, transparent, white, transparent)`,
                          }}
                        />
                        <div className="relative z-10">
                          {step.icon}
                        </div>
                      </motion.div>
                      <motion.div 
                        className="text-8xl font-extralight text-neutral-100 select-none"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      >
                        {step.number}
                      </motion.div>
                    </motion.div>

                    <motion.h3 
                      className="text-4xl xl:text-5xl font-light text-neutral-900 mb-3 tracking-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-xl text-[#FF6B6B] font-medium mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {step.subtitle}
                    </motion.p>
                    <motion.p 
                      className="text-lg xl:text-xl text-neutral-600 leading-relaxed mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {step.description}
                    </motion.p>

                    <div className="space-y-4 mb-10">
                      {step.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-start gap-4 group cursor-default"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * idx, duration: 0.5 }}
                          whileHover={{ x: 8 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <CheckCircle2 className="w-6 h-6 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                          </motion.div>
                          <span className="text-base xl:text-lg text-neutral-700 group-hover:text-neutral-900 transition-colors duration-300">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div 
                      className="flex flex-wrap gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      {step.deliverables.map((deliverable, idx) => (
                        <motion.span
                          key={idx}
                          className="px-5 py-2.5 bg-white shadow-lg shadow-neutral-900/5 rounded-full text-sm font-medium text-neutral-700 border border-neutral-200 hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {deliverable}
                        </motion.span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Visual Side with 3D Effect */}
                  <motion.div 
                    className={index % 2 === 1 ? 'order-1' : 'order-2'}
                    variants={index % 2 === 0 ? slideInRight : slideIn}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="relative group cursor-pointer"
                      whileHover="hover"
                    >
                      <motion.div
                        className={`relative h-[500px] xl:h-[600px] rounded-3xl bg-gradient-to-br ${step.gradient} backdrop-blur-3xl p-12 xl:p-16 flex items-center justify-center overflow-hidden border border-neutral-200/50 shadow-2xl shadow-neutral-900/10`}
                        variants={{
                          hover: {
                            scale: 1.02,
                            rotateY: 5,
                            rotateX: 5,
                          }
                        }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Animated Background Pattern */}
                        <motion.div 
                          className="absolute inset-0 opacity-5"
                          style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                            backgroundSize: '40px 40px',
                            color: step.bgColor
                          }}
                          animate={{
                            backgroundPosition: ['0px 0px', '40px 40px'],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />

                        {/* Gradient Orbs */}
                        <motion.div
                          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${step.color} rounded-full blur-3xl opacity-20`}
                          animate={{
                            scale: [1, 1.2, 1],
                            x: [0, 30, 0],
                            y: [0, -30, 0],
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />

                        <div className="relative text-center z-10">
                          <motion.div
                            className={`inline-flex items-center justify-center w-32 h-32 xl:w-40 xl:h-40 rounded-3xl ${step.bgColor} text-white mb-8 shadow-2xl`}
                            animate={{
                              y: [0, -20, 0],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                            whileHover={{
                              scale: 1.1,
                              rotate: [0, -10, 10, -10, 0],
                            }}
                          >
                            <motion.div 
                              className="transform scale-[2]"
                              animate={{
                                rotate: [0, 5, -5, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {step.icon}
                            </motion.div>
                          </motion.div>
                          <motion.div 
                            className="text-3xl xl:text-4xl font-light text-neutral-900 mb-3"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                          >
                            {step.duration}
                          </motion.div>
                          <motion.div 
                            className="text-base xl:text-lg text-neutral-600 font-medium"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                          >
                            Typical Duration
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Floating Badge */}
                      <motion.div
                        className={`absolute -top-6 -right-6 w-20 h-20 rounded-2xl ${step.bgColor} text-white flex items-center justify-center text-3xl font-light shadow-2xl`}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                      >
                        {step.number}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Connection Line for Desktop */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="absolute left-1/2 -bottom-16 w-0.5 h-32 bg-gradient-to-b from-neutral-300 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{ transformOrigin: 'top' }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Process Steps with Enhanced Design */}
          <div className="lg:hidden space-y-8 sm:space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  className={`relative rounded-3xl bg-gradient-to-br from-white to-neutral-50 p-6 sm:p-8 border-2 ${step.borderColor} shadow-xl shadow-neutral-900/5 overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                      backgroundSize: '32px 32px',
                    }}
                  />

                  {/* Header */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <motion.div 
                      className={`relative flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} text-white shadow-xl flex-shrink-0`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {step.icon}
                      </motion.div>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Step {step.number}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-[#FF6B6B] font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Details with Hover Animation */}
                  <div className="space-y-3 mb-6">
                    {step.details.map((detail, idx) => (
                      <motion.div 
                        key={idx} 
                        className="flex items-start gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * idx }}
                        whileHover={{ x: 4 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#FF6B6B] flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <span className="text-sm text-neutral-700 leading-relaxed group-hover:text-neutral-900 transition-colors duration-300">{detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Deliverables */}
                  <div className="mb-6">
                    <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                      Deliverables
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((deliverable, idx) => (
                        <motion.span
                          key={idx}
                          className="px-4 py-2 bg-white rounded-xl text-sm font-medium text-neutral-700 border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#FF6B6B] hover:text-[#FF6B6B] transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {deliverable}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <motion.div 
                    className="inline-flex items-center gap-3 px-5 py-3 bg-white rounded-xl border-2 border-neutral-200 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Clock className="w-5 h-5 text-[#FF6B6B]" />
                    <span className="text-sm font-semibold text-neutral-900">{step.duration}</span>
                  </motion.div>
                </motion.div>

                {/* Connection Dot */}
                {index < processSteps.length - 1 && (
                  <motion.div
                    className="flex justify-center my-6"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div
                      className={`w-2 h-2 rounded-full ${step.bgColor}`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section with Premium Cards */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white via-neutral-50 to-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(229 231 235) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            {...fadeInUp}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Our <span className="relative inline-block">
                <span className="italic font-normal text-[#FF6B6B]">Core Principles</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B6B]/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The values that guide every project and client relationship
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative group"
                onMouseEnter={() => setHoveredPrinciple(index)}
                onMouseLeave={() => setHoveredPrinciple(null)}
              >
                <motion.div
                  className="h-full bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 shadow-xl shadow-neutral-900/5 relative overflow-hidden"
                  whileHover={{ 
                    y: -12, 
                    borderColor: '#FF6B6B',
                    boxShadow: '0 25px 50px -12px rgba(255, 107, 107, 0.25)'
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    initial={false}
                  />

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%)',
                      backgroundSize: '200% 200%',
                    }}
                    animate={hoveredPrinciple === index ? {
                      backgroundPosition: ['200% 0%', '-200% 0%'],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 text-[#FF6B6B] mb-6 border border-[#FF6B6B]/20 shadow-lg shadow-[#FF6B6B]/10"
                      animate={hoveredPrinciple === index ? { 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                        backgroundColor: ['rgba(255, 107, 107, 0.1)', 'rgba(255, 107, 107, 0.2)', 'rgba(255, 107, 107, 0.1)']
                      } : { 
                        scale: 1,
                        rotate: 0 
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      {principle.icon}
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-light text-neutral-900 mb-4 tracking-tight group-hover:text-[#FF6B6B] transition-colors duration-500">
                      {principle.title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8">
                      {principle.description}
                    </p>

                    <div className="flex items-baseline gap-2">
                      <motion.div 
                        className="text-4xl sm:text-5xl font-extralight text-[#FF6B6B]"
                        animate={hoveredPrinciple === index ? {
                          scale: [1, 1.1, 1],
                        } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        {principle.stat}
                      </motion.div>
                      <div className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                        {principle.statLabel}
                      </div>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-br from-[#FF6B6B]/10 to-transparent rounded-full blur-2xl"
                    animate={hoveredPrinciple === index ? {
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0.8, 0.5],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section with Premium Accordion */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            {...fadeInUp}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Frequently Asked <span className="relative inline-block">
                <span className="italic font-normal text-[#FF6B6B]">Questions</span>
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B6B]/30 rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Everything you need to know about working with us
            </motion.p>
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <motion.div
                  className="bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden shadow-lg shadow-neutral-900/5"
                  layout
                  whileHover={{ 
                    borderColor: '#FF6B6B',
                    boxShadow: '0 20px 25px -5px rgba(255, 107, 107, 0.1)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 sm:px-8 py-6 sm:py-8 text-left flex items-center justify-between gap-4 group relative overflow-hidden"
                    aria-expanded={expandedFaq === index}
                    whileHover={{ backgroundColor: 'rgba(255, 107, 107, 0.02)' }}
                  >
                    <span className="text-base sm:text-lg md:text-xl font-light text-neutral-900 group-hover:text-[#FF6B6B] transition-colors duration-300 pr-4 relative z-10">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-shrink-0 relative z-10"
                    >
                      <motion.div
                        className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-[#FF6B6B]/10 flex items-center justify-center transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ChevronDown className="w-5 h-5 text-neutral-600 group-hover:text-[#FF6B6B] transition-colors duration-300" />
                      </motion.div>
                    </motion.div>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
                          <motion.div
                            className="pt-6 border-t border-neutral-200"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     

      {/* CTA Section with Premium Design */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 relative overflow-hidden bg-white">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] md:w-[1000px] lg:w-[1200px] h-[600px] sm:h-[800px] md:h-[1000px] lg:h-[1200px] bg-gradient-to-br from-[#FF6B6B]/8 via-[#FF8E8E]/4 to-transparent rounded-full blur-3xl" />
        </motion.div>

        {/* Floating Elements */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FF6B6B]/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            {...fadeInUp}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight leading-[1.1] px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Ready to get <span className="relative inline-block">
                <span className="italic font-normal">started</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span>?
            </motion.h2>
            <motion.p 
              className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              Let's discuss your project and how our process can help bring your vision to life.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            >
              <Link to="/contact">
                <motion.button 
                  className="relative w-full sm:w-auto group px-8 sm:px-10 py-3 sm:py-3.5 md:py-4 text-sm font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-2xl shadow-[#FF6B6B]/30 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 25px 50px -12px rgba(255, 107, 107, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 1,
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-2">
                    Start a Conversation
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </span>
                </motion.button>
              </Link>
              <Link to="/portfolio">
                <motion.button 
                  className="relative w-full sm:w-auto group px-8 sm:px-10 py-3 sm:py-3.5 md:py-4 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border-2 border-neutral-300 rounded-full shadow-lg shadow-neutral-900/5 overflow-hidden"
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.05)',
                    boxShadow: '0 20px 25px -5px rgba(255, 107, 107, 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Hover Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B]/5 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative">View Our Work</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}