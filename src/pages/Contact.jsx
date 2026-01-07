import { motion, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect, useMemo } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageSquare, User, Sparkles, Loader2,
  Linkedin, Instagram, ArrowRight, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { contactPageSchema, breadcrumbSchema } from '../utils/schemas';

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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const { fadeInUp, staggerContainer } = useOptimizedAnimations();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Contact Brancha - Get Your Free Online Presence Audit';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 'Contact Brancha for Foundation Package or Monthly Management. Get a free audit to see where you\'re losing customers and how to fix it.');
    }
  }, []);

  const services = [
    'Foundation Package - Basic (₹12K-₹18K)',
    'Foundation Package - Pro (₹28K-₹40K)',
    'Foundation Package - Growth (₹55K-₹75K)',
    'Monthly Management - Basic (₹5K-₹7K)',
    'Monthly Management - Pro (₹10K-₹15K)',
    'Monthly Management - Growth (₹20K-₹30K)',
    'Not Sure / Need Consultation'
  ];

  const budgetRanges = [
    'Under ₹20K',
    '₹20K - ₹40K',
    '₹40K - ₹60K',
    '₹60K - ₹1L',
    '₹1L - ₹2L',
    '₹2L+',
    'Not Sure'
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Call Us',
      detail: '+91 98258 83015',
      action: 'tel:+919825883015',
      description: 'Mon-Sat, 10 AM - 7 PM IST'
    },
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'WhatsApp',
      detail: '+91 92199 17186',
      action: 'https://wa.me/919219917186',
      description: 'Quick responses, anytime'
    },
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Email',
      detail: 'support@brancha.in',
      action: 'mailto:support@brancha.in',
      description: 'We reply within 24 hours'
    },
    {
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Location',
      detail: 'Vadodara, Gujarat',
      action: null,
      description: 'Serving businesses worldwide — remotely'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/getbrancha',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/company/brancha',
      color: 'from-blue-600 to-blue-700'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const createWhatsAppMessage = () => {
    const { name, email, phone, service, message, budget } = formData;
    const text = `Hello Brancha Team!%0A%0A*New Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone || 'Not provided'}%0A*Interested In:* ${service}%0A*Budget:* ${budget || 'Not specified'}%0A%0A*Details:*%0A${message}%0A%0ALooking forward to discussing!`;
    return `https://wa.me/919219917186?text=${text}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0e53af2d-694f-4d64-9537-f4f7153813c7",
          subject: `New Inquiry from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          to: "support@brancha.in",
          from_name: "Brancha Contact Form"
        }),
      });

      const result = await response.json();

      if (result.success) {
        window.open(createWhatsAppMessage(), '_blank');

        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          budget: ''
        });

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      contactPageSchema,
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' }
      ])
    ]
  };

  return (
    <>
      <SEO
        title="Contact Brancha - Get Your Free Online Presence Audit"
        description="Contact Brancha for Foundation Package or Monthly Management. Get a free audit to see where you're losing customers and how to fix it."
        keywords="contact brancha, online presence audit, foundation package, monthly management, stop customer loss"
        canonicalUrl="https://brancha.in/contact"
        ogType="website"
        structuredData={contactSchema}
      />

      <div className="bg-[#FAF9F7] min-h-screen overflow-hidden">
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

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div {...fadeInUp}>
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
                    Let's Talk
                  </span>
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1F1F1F] mb-5 sm:mb-6 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                  Ready to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>stop losing customers?</span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
                  Get a free audit to see exactly where you're losing customers and how Foundation + Monthly Management can fix it.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 sm:py-20 md:py-24 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <motion.div className="text-center mb-10 sm:mb-12" {...fadeInUp}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Get in <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>touch</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Choose your preferred way to connect with us
              </p>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, amount: 0.2 }}
            >
              {contactMethods.map((method, index) => (
                <motion.article
                  key={index}
                  variants={fadeInUp}
                  className="group relative"
                >
                  {method.action ? (
                    <a
                      href={method.action}
                      target={method.action.startsWith('http') ? '_blank' : undefined}
                      rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="block"
                    >
                      <motion.div
                        className="h-full p-6 sm:p-7 bg-white border border-[#EFEDE9] rounded-2xl hw-accelerate cursor-pointer"
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
                            {method.icon}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileHover={{ opacity: 0.3, scale: 1.5 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 bg-[#e2493b] rounded-xl blur-md"
                          />
                        </motion.div>

                        <h3 className="text-sm font-semibold text-[#6B6B6B] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                          {method.title}
                        </h3>
                        <p className="text-base font-medium text-[#1F1F1F] mb-2 transition-colors duration-400 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                          {method.detail}
                        </p>
                        <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                          {method.description}
                        </p>

                        <motion.div
                          initial={{ opacity: 0, x: '-100%' }}
                          whileHover={{ opacity: 0.03, x: '100%' }}
                          transition={{ duration: 0.8, ease: 'easeInOut' }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e2493b] to-transparent"
                          style={{ pointerEvents: 'none' }}
                        />
                      </motion.div>
                    </a>
                  ) : (
                    <motion.div
                      className="h-full p-6 sm:p-7 bg-white border border-[#EFEDE9] rounded-2xl hw-accelerate"
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
                          {method.icon}
                        </div>

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 0.3, scale: 1.5 }}
                          transition={{ duration: 0.4 }}
                          className="absolute inset-0 bg-[#e2493b] rounded-xl blur-md"
                        />
                      </motion.div>

                      <h3 className="text-sm font-semibold text-[#6B6B6B] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                        {method.title}
                      </h3>
                      <p className="text-base font-medium text-[#1F1F1F] mb-2" style={{ fontWeight: 500 }}>
                        {method.detail}
                      </p>
                      <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                        {method.description}
                      </p>
                    </motion.div>
                  )}
                </motion.article>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="mt-10 flex items-center justify-center gap-4"
              {...fadeInUp}
            >
              <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>Follow us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white border border-[#EFEDE9] flex items-center justify-center text-[#6B6B6B] hw-accelerate"
                  whileHover={{
                    y: prefersReducedMotion ? 0 : -3,
                    scale: prefersReducedMotion ? 1 : 1.1,
                    borderColor: '#e2493b',
                    color: '#e2493b',
                    boxShadow: '0 8px 20px -4px rgba(226, 73, 59, 0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-20 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="mb-10 sm:mb-12">
              <motion.div className="text-center" {...fadeInUp}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                  Send us a <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>message</span>
                </h2>
                <p className="text-sm sm:text-base text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  Fill out the form and we'll get back to you within 24 hours
                </p>
              </motion.div>
            </div>

            <motion.div {...fadeInUp}>
              <div className="bg-[#FAF9F7] border border-[#EFEDE9] rounded-2xl p-6 sm:p-8 md:p-10">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-2xl font-medium text-[#1F1F1F] mb-3" style={{ fontWeight: 500 }}>
                      Message Sent Successfully!
                    </h3>
                    <p className="text-base text-[#6B6B6B] mb-6" style={{ fontWeight: 400 }}>
                      We've received your inquiry and will get back to you within 24 hours. Check your WhatsApp for confirmation!
                    </p>
                    <motion.button
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-2.5 text-sm font-medium text-[#e2493b] bg-[#e2493b]/10 rounded-full transition-colors duration-300 hover:bg-[#e2493b]/20"
                      style={{ fontWeight: 500 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                          Your Name *
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                            <User className="w-5 h-5" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border border-[#EFEDE9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2493b]/20 focus:border-[#e2493b] transition-all duration-300 placeholder:text-[#6B6B6B]"
                            style={{ fontWeight: 400 }}
                            placeholder="Enter your name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                            <Mail className="w-5 h-5" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-3 bg-white border border-[#EFEDE9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2493b]/20 focus:border-[#e2493b] transition-all duration-300 placeholder:text-[#6B6B6B]"
                            style={{ fontWeight: 400 }}
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone & Service */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                          Phone Number (Optional)
                        </label>
                        <div className="relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                            <Phone className="w-5 h-5" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-[#EFEDE9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2493b]/20 focus:border-[#e2493b] transition-all duration-300 placeholder:text-[#6B6B6B]"
                            style={{ fontWeight: 400 }}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                          What do you need? *
                        </label>
                        <div className="relative">
                          <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-[#EFEDE9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2493b]/20 focus:border-[#e2493b] transition-all duration-300 appearance-none"
                            style={{ fontWeight: 400 }}
                          >
                            <option value="" disabled>Select a package</option>
                            {services.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <ArrowRight className="w-5 h-5 text-[#6B6B6B] rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                        Budget Range (Optional)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {budgetRanges.map((range) => (
                          <label
                            key={range}
                            className={`relative cursor-pointer ${
                              formData.budget === range
                                ? 'bg-[#e2493b]/10 border-[#e2493b] text-[#e2493b] shadow-sm'
                                : 'bg-white border-[#EFEDE9] hover:border-[#e2493b]/30 hover:bg-[#EFEDE9] text-[#1F1F1F]'
                            } border rounded-xl p-3 text-center transition-all duration-300 hw-accelerate`}
                          >
                            <input
                              type="radio"
                              name="budget"
                              value={range}
                              checked={formData.budget === range}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium block" style={{ fontWeight: 500 }}>
                              {range}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                        Tell us about your business *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="4"
                        className="w-full px-4 py-3 bg-white border border-[#EFEDE9] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#e2493b]/20 focus:border-[#e2493b] transition-all duration-300 resize-none placeholder:text-[#6B6B6B]"
                        style={{ fontWeight: 400 }}
                        placeholder="What problems are you facing? Where are you losing customers? What are your goals?"
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-50 border border-red-200 rounded-xl"
                      >
                        <div className="flex items-center gap-2 text-red-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-medium" style={{ fontWeight: 500 }}>{error}</span>
                        </div>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full px-8 py-4 text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-xl shadow-xl shadow-[#e2493b]/25 disabled:opacity-50 disabled:cursor-not-allowed hw-accelerate overflow-hidden"
                      style={{ fontWeight: 500 }}
                      whileHover={!isSubmitting ? {
                        scale: prefersReducedMotion ? 1 : 1.02,
                        boxShadow: '0 16px 48px -12px rgba(226, 73, 59, 0.4)'
                      } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending your message...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10 flex items-center justify-center gap-3">
                            Send Message & Connect on WhatsApp
                            <ArrowRight className="w-5 h-5" />
                          </span>

                          <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                          {!prefersReducedMotion && (
                            <motion.div
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              style={{ pointerEvents: 'none' }}
                            />
                          )}
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-center text-[#6B6B6B] pt-2" style={{ fontWeight: 400 }}>
                      By submitting, you'll receive an email confirmation and WhatsApp message with your inquiry details.
                    </p>
                  </form>
                )}
              </div>
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
                Prefer to explore <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>first?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Check out our packages and process to understand how we can help stop customer loss and bring consistent enquiries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/services">
                  <motion.button
                    className="group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-full shadow-xl shadow-[#e2493b]/25 inline-flex items-center gap-2 hw-accelerate overflow-hidden"
                    aria-label="View Brancha packages"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04,
                      boxShadow: '0 16px 48px -12px rgba(226, 73, 59, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span className="relative z-10">View Packages</span>
                    <ArrowRight className="w-4 h-4" />

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

                <Link to="/process">
                  <motion.button
                    className="group px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-[#1F1F1F] bg-white border-2 border-[#EFEDE9] rounded-full inline-flex items-center gap-2 hw-accelerate"
                    aria-label="View our process"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04,
                      borderColor: '#e2493b',
                      boxShadow: '0 8px 24px -4px rgba(226, 73, 59, 0.15)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span>See How We Work</span>
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