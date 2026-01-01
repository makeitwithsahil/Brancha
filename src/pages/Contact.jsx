import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageSquare, User, Sparkles, Loader2,
  Linkedin, Instagram, Twitter, ArrowRight,
  Calendar, Clock, Briefcase, Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px', amount: 0.3 },
  transition: {
    duration: 0.6,
    ease: [0.16, 1, 0.3, 1]
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-50px', amount: 0.3 },
  transition: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1]
  }
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  },
  viewport: { once: true, margin: '-50px', amount: 0.2 }
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  const processSteps = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Initial Consultation',
      description: 'We discuss your vision, goals, and requirements'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Project Planning',
      description: 'Timeline, deliverables, and investment details'
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Kickoff & Execution',
      description: 'Regular updates and collaborative development'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Launch & Support',
      description: 'Go live with ongoing maintenance and support'
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
          access_key: "18b53e4d-37a3-40de-89ea-a49749bc900e",
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

  return (
    <div className="bg-white overflow-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-[#FF6B6B]/10 via-[#FF8E8E]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-[250px] sm:w-[350px] md:w-[450px] h-[250px] sm:h-[350px] md:h-[450px] bg-gradient-to-tr from-[#4ECDC4]/10 via-[#44A8A0]/5 to-transparent rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white shadow-lg shadow-neutral-900/5 rounded-full mb-6 sm:mb-8 border border-neutral-200"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#FF6B6B]" />
              <span className="text-xs sm:text-sm font-sans font-medium tracking-wide text-neutral-700">
                Let's Connect
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-neutral-900 mb-4 sm:mb-6 md:mb-8 tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Let's Create <span className="relative inline-block">
                <span className="italic font-normal text-[#FF6B6B]">Something Great</span>
                <motion.span
                  className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-[#FF6B6B] to-transparent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{ transformOrigin: 'left' }}
                />
              </span> Together
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Share your vision with us, and let's transform it into an exceptional digital experience
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.a
              href="mailto:support@brancha.in"
              variants={fadeInUp}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 hover:border-[#FF6B6B] shadow-lg shadow-neutral-900/5 hover:shadow-xl hover:shadow-[#FF6B6B]/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center border border-[#FF6B6B]/20 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-2 tracking-tight">Email Us</h3>
                  <p className="text-sm sm:text-base text-neutral-600 break-all">support@brancha.in</p>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="tel:+919219917186"
              variants={fadeInUp}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 hover:border-[#FF6B6B] shadow-lg shadow-neutral-900/5 hover:shadow-xl hover:shadow-[#FF6B6B]/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center border border-[#FF6B6B]/20 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-2 tracking-tight">Call Us</h3>
                  <p className="text-sm sm:text-base text-neutral-600">+91 92199 17186</p>
                </div>
              </div>
            </motion.a>

            <motion.div
              variants={fadeInUp}
              className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-200 shadow-lg shadow-neutral-900/5"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center border border-[#FF6B6B]/20">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF6B6B]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-2 tracking-tight">Availability</h3>
                  <p className="text-sm sm:text-base text-neutral-600">
                    Calls: Mon – Sat, 9AM – 9PM IST · Chat & Email: 24/7
                  </p>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Side - Process Steps */}
            <motion.div
              className="lg:col-span-2"
              {...fadeInUp}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight leading-tight">
                Our <span className="italic font-normal text-[#FF6B6B]">Process</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-8 sm:mb-12 leading-relaxed">
                From first contact to launch and beyond, we're with you every step of the way
              </p>

              <motion.div
                className="space-y-6 sm:space-y-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
              >
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex gap-4 sm:gap-6"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF6B6B]/5 flex items-center justify-center border border-[#FF6B6B]/20 text-[#FF6B6B]">
                        {step.icon}
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-neutral-200"
                {...fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-light text-neutral-900 mb-4 sm:mb-6 tracking-tight">
                  Follow Our Journey
                </h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://www.linkedin.com/company/brancha/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#0077B5] hover:bg-[#0077B5]/5 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 text-neutral-600 group-hover:text-[#0077B5] transition-colors" />
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/getbrancha"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-white border-2 border-neutral-200 hover:border-[#E4405F] hover:bg-[#E4405F]/5 flex items-center justify-center transition-all duration-300 group"
                  >
                    <Instagram className="w-5 h-5 text-neutral-600 group-hover:text-[#E4405F] transition-colors" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              className="lg:col-span-3"
              {...scaleIn}
            >
              <div className="bg-white rounded-3xl border-2 border-neutral-200 shadow-2xl shadow-neutral-900/10 p-6 sm:p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-neutral-900 mb-3 tracking-tight">
                    Start Your Project
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                <div className="relative">
                  {/* Success Message */}
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-2xl"
                    >
                      <div className="text-center p-8">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center"
                        >
                          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                        </motion.div>
                        <h3 className="text-2xl sm:text-3xl font-light text-neutral-900 mb-3 tracking-tight">
                          Message Sent!
                        </h3>
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
                          Thank you for reaching out. We've received your message and will respond within 24 hours.
                        </p>
                        <motion.button
                          onClick={() => setIsSuccess(false)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2.5 text-sm font-medium text-white bg-[#FF6B6B] rounded-xl shadow-lg shadow-[#FF6B6B]/25 transition-all duration-300"
                        >
                          Send Another Message
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Form */}
                  {!isSuccess && (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      {/* Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-sans font-medium text-neutral-700">
                            <User className="w-4 h-4" />
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400 font-sans"
                            placeholder="John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-sans font-medium text-neutral-700">
                            <Mail className="w-4 h-4" />
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400 font-sans"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      {/* Phone & Service */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm font-sans font-medium text-neutral-700">
                            <Phone className="w-4 h-4" />
                            Phone
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400 font-sans"
                            placeholder="+91 98765 43210"
                          />
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
                            <motion.label
                              key={range}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`relative cursor-pointer ${formData.budget === range
                                ? 'bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 border-[#FF6B6B] text-[#FF6B6B]'
                                : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700'
                                } border rounded-xl p-3 text-center transition-all duration-300`}
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
                            </motion.label>
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
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full group px-8 py-4 text-base font-sans font-medium tracking-wide text-white bg-[#FF6B6B] rounded-xl shadow-xl shadow-[#FF6B6B]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      </motion.button>

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
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white to-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            {...fadeInUp}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg shadow-neutral-900/5 border border-neutral-200 mb-8">
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-sans font-medium tracking-wide text-neutral-700 bg-white border-2 border-neutral-300 rounded-full transition-all duration-300 hover:border-neutral-400 hover:bg-neutral-50 shadow-lg shadow-neutral-900/5"
                >
                  View Our Portfolio
                </motion.button>
              </Link>

              <a
                href="https://wa.me/919219917186"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto group px-8 py-3.5 text-sm font-sans font-medium tracking-wide text-white bg-green-500 rounded-full shadow-xl shadow-green-500/25 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/35"
                >
                  <span className="flex items-center justify-center gap-2">
                    Quick Chat on WhatsApp
                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </span>
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}