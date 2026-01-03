import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageSquare, User, Sparkles, Loader2,
  Linkedin, Instagram, ArrowRight, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { contactPageSchema, breadcrumbSchema } from '../utils/schemas';

// Optimized minimal animation variants
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

  const services = [
    'Website Design & Development',
    'Brand Identity & Visual Design',
    'Poster & Creative Design',
    'Social Media Management',
    'Reel & Video Editing',
    'SEO & Website Optimisation',
    'Menu & Digital Catalog Design',
    'WhatsApp Business Setup'
  ];

  const budgetRanges = [
    '5k - 15k',
    '₹15K - ₹30K',
    '₹30K - ₹50K',
    '₹50K - ₹1L',
    '₹1L - ₹2L',
    '₹2L+',
    'Not Sure'
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
    const text = `Hello Brancha Team!%0A%0A*New Project Inquiry*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone || 'Not provided'}%0A*Service Needed:* ${service}%0A*Budget:* ${budget || 'Not specified'}%0A%0A*Message:*%0A${message}%0A%0ALooking forward to discussing!`;
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
          subject: `New Project Inquiry from ${formData.name}`,
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
        title="Contact Us"
        description="Get in touch with Brancha for website design, branding, social media management, and digital marketing services in Vadodara. Let's create something exceptional together."
        keywords="contact brancha, website design vadodara, branding agency contact, digital marketing inquiry, web development quote"
        canonicalUrl="https://brancha.in/contact"
        ogType="website"
        structuredData={contactSchema}
      />

      <div className="bg-white min-h-screen" style={{ willChange: 'scroll-position' }}>
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
                    Let's Start a Conversation
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-neutral-900 mb-6 tracking-tight leading-[1.1]"
              >
                Let's create something <span className="italic font-normal text-[#FF6B6B]">extraordinary</span> together
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
              >
                We're excited to hear about your project and explore how we can bring your digital vision to life.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
            >
              {[
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: 'Email Us',
                  content: 'support@brancha.in',
                  link: 'mailto:support@brancha.in',
                  gradient: 'from-[#FF6B6B] to-[#FF8E8E]'
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: 'Call Us',
                  content: '+91 98258 83015',
                  link: 'tel:+919825883015',
                  gradient: 'from-[#FF6B6B] to-[#FF8E8E]'
                },
                {
                  icon: <MessageSquare className="w-6 h-6" />,
                  title: 'WhatsApp',
                  content: 'Chat with us instantly',
                  link: 'https://wa.me/919219917186',
                  gradient: 'from-[#25D366] to-[#128C7E]'
                }
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  variants={fadeInUp}
                  className="group relative bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                  style={{ willChange: 'transform' }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300`} />
                  
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-sans font-medium text-neutral-900 mb-1 group-hover:text-[#FF6B6B] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {item.content}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Social Media Links */}
        <section className="py-12 sm:py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              {...fadeInUp}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 mb-4 tracking-tight">
                Connect with us on <span className="italic font-normal text-[#FF6B6B]">social media</span>
              </h2>
              <p className="text-base text-neutral-600 mb-8 max-w-xl mx-auto">
                Follow our journey and get inspired by our latest work
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {[
                  {
                    name: 'Instagram',
                    icon: <Instagram className="w-5 h-5" />,
                    link: 'https://www.instagram.com/getbrancha/',
                    color: 'hover:text-[#E1306C]',
                    bgHover: 'hover:bg-[#E1306C]/5'
                  },
                  {
                    name: 'LinkedIn',
                    icon: <Linkedin className="w-5 h-5" />,
                    link: 'https://www.linkedin.com/company/brancha/',
                    color: 'hover:text-[#0077B5]',
                    bgHover: 'hover:bg-[#0077B5]/5'
                  }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group px-6 py-3 bg-white border border-neutral-200 rounded-full text-neutral-700 ${social.color} ${social.bgHover} transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                    style={{ willChange: 'transform' }}
                  >
                    <span className="flex items-center gap-2">
                      {social.icon}
                      <span className="text-sm font-sans font-medium">{social.name}</span>
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white to-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left Column - Info */}
              <motion.div
                className="lg:col-span-2 space-y-8"
                {...fadeInUp}
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-6">
                    <Send className="w-4 h-4 text-[#FF6B6B]" />
                    <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                      Get in Touch
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 tracking-tight leading-[1.1]">
                    Tell us about your <span className="italic font-normal text-[#FF6B6B]">project</span>
                  </h2>
                  <p className="text-base text-neutral-600 leading-relaxed">
                    Fill out the form and we'll get back to you within 24 hours. We'll also connect with you on WhatsApp to make communication seamless.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center text-white flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-sans font-medium text-neutral-900 mb-1">
                        Our Office
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        Vadodara, Gujarat, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center text-white flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-sans font-medium text-neutral-900 mb-1">
                        Response Time
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        We typically respond within 24 hours on business days
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                className="lg:col-span-3"
                {...scaleIn}
              >
                <div className="bg-white rounded-3xl border border-neutral-200 shadow-lg p-6 sm:p-8 md:p-10" style={{ willChange: 'auto' }}>
                  <div ref={formRef}>
                    {isSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-sans font-medium text-neutral-900 mb-3">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-base text-neutral-600 mb-6 max-w-md mx-auto">
                          Thank you for reaching out! We've received your inquiry and will get back to you shortly via email and WhatsApp.
                        </p>
                        <button
                          onClick={() => setIsSuccess(false)}
                          className="px-6 py-3 text-sm font-sans font-medium text-white bg-[#FF6B6B] rounded-xl shadow-lg shadow-[#FF6B6B]/20 hover:shadow-xl hover:shadow-[#FF6B6B]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name & Email */}
                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Name */}
                          <div className="space-y-2">
                            <label className="text-sm font-sans font-medium text-neutral-700">
                              Full Name *
                            </label>
                            <div className="relative group">
                              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[#FF6B6B] transition-colors duration-300 pointer-events-none" />
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400 font-sans"
                                placeholder="John Doe"
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div className="space-y-2">
                            <label className="text-sm font-sans font-medium text-neutral-700">
                              Email Address *
                            </label>
                            <div className="relative group">
                              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[#FF6B6B] transition-colors duration-300 pointer-events-none" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400 font-sans"
                                placeholder="john@example.com"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Phone & Service */}
                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Phone */}
                          <div className="space-y-2">
                            <label className="text-sm font-sans font-medium text-neutral-700">
                              Phone Number (Optional)
                            </label>
                            <div className="relative group">
                              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-[#FF6B6B] transition-colors duration-300 pointer-events-none" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400 font-sans"
                                placeholder="+91 98765 43210"
                              />
                            </div>
                          </div>

                          {/* Service */}
                          <div className="space-y-2">
                            <label className="text-sm font-sans font-medium text-neutral-700">
                              Service Needed *
                            </label>
                            <div className="relative">
                              <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 appearance-none font-sans"
                              >
                                <option value="" disabled>Select a service</option>
                                {services.map((service) => (
                                  <option key={service} value={service}>
                                    {service}
                                  </option>
                                ))}
                              </select>
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <ArrowRight className="w-5 h-5 text-neutral-400 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Budget */}
                        <div className="space-y-3">
                          <label className="text-sm font-sans font-medium text-neutral-700">
                            Project Budget (Optional)
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {budgetRanges.map((range) => (
                              <label
                                key={range}
                                className={`relative cursor-pointer ${formData.budget === range
                                  ? 'bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 border-[#FF6B6B] text-[#FF6B6B] shadow-sm'
                                  : 'bg-white border-neutral-200 hover:border-[#FF6B6B]/30 hover:bg-neutral-50 text-neutral-700'
                                  } border rounded-xl p-3 text-center transition-all duration-300`}
                                style={{ willChange: 'transform' }}
                              >
                                <input
                                  type="radio"
                                  name="budget"
                                  value={range}
                                  checked={formData.budget === range}
                                  onChange={handleChange}
                                  className="sr-only"
                                />
                                <span className="text-sm font-medium block font-sans">
                                  {range}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                          <label className="text-sm font-sans font-medium text-neutral-700">
                            Project Details *
                          </label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 resize-none placeholder:text-neutral-400 font-sans"
                            placeholder="Tell us about your project goals, timeline, and specific requirements..."
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
                              <span className="text-sm font-medium font-sans">{error}</span>
                            </div>
                          </motion.div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full group px-8 py-4 text-base font-sans font-medium tracking-wide text-white bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-xl shadow-lg shadow-[#FF6B6B]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-[#FF6B6B]/35 hover:-translate-y-0.5"
                          style={{ willChange: 'transform' }}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-3">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Sending your message...
                            </span>
                          ) : (
                            <span className="flex items-center justify-center gap-3">
                              Send Message & Connect on WhatsApp
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                          )}
                        </button>

                        <p className="text-xs text-center text-neutral-500 pt-2 font-sans">
                          By submitting, you'll receive an email confirmation and WhatsApp message with your inquiry details.
                        </p>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-neutral-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              {...fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-neutral-200 mb-8">
                <Sparkles className="w-4 h-4 text-[#FF6B6B]" />
                <span className="text-sm font-sans font-medium text-neutral-700 tracking-wide">
                  Let's Build Something Great
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-6 tracking-tight leading-[1.1]">
                Ready to transform your <span className="italic font-normal text-[#FF6B6B]">digital vision</span> into reality?
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-neutral-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Whether you're starting from scratch or refining an existing presence, we're here to help you achieve exceptional results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/portfolio">
                  <button
                    className="w-full sm:w-auto px-8 py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border-2 border-neutral-300 rounded-full transition-all duration-300 hover:border-[#FF6B6B] hover:text-[#FF6B6B] shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    style={{ willChange: 'transform' }}
                  >
                    View Our Portfolio
                  </button>
                </Link>

                <a
                  href="https://wa.me/919219917186"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="w-full sm:w-auto group px-8 py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/35 hover:-translate-y-0.5"
                    style={{ willChange: 'transform' }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      Quick Chat on WhatsApp
                      <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </span>
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}