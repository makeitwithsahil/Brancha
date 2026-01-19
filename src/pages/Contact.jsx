import { motion, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageSquare, User, Sparkles, Loader2,
  Linkedin, Instagram, ArrowRight, Clock, Save, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  contactFormDraft, 
  packageInterest, 
  journeyTracking,
  visitorTracking 
} from '../utils/storage';

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
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [showDraftNotification, setShowDraftNotification] = useState(false);
  const formRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Contact Brancha - Get Your Free Online Presence Audit';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", 'Contact Brancha for Foundation Package or Monthly Management. Get a free audit to see where you\'re losing customers and how to fix it.');
    }

    // Load saved draft
    const draft = contactFormDraft.get();
    if (draft && !draftLoaded) {
      setFormData(draft);
      setDraftLoaded(true);
      setShowDraftNotification(true);
      
      setTimeout(() => setShowDraftNotification(false), 5000);
    }

    // Pre-fill service based on most interested package
    if (!draft && !formData.service) {
      const mostInterested = packageInterest.getMostInterested();
      if (mostInterested) {
        setFormData(prev => ({
          ...prev,
          service: mostInterested
        }));
      }
    }
  }, [draftLoaded]);

  // Auto-save draft
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      const timer = setTimeout(() => {
        contactFormDraft.save(formData);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [formData]);

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

  const handleClearDraft = () => {
    contactFormDraft.clear();
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      budget: ''
    });
    setShowDraftNotification(false);
  };

  const createWhatsAppMessage = () => {
    const { name, email, phone, service, message, budget } = formData;
    
    const journey = journeyTracking.get();
    const journeyString = journey.map(j => j.name).join(' → ');
    const isReturning = visitorTracking.isReturning();
    const visitCount = visitorTracking.getVisitCount();
    
    const text = `Hello Brancha Team!%0A%0A*New Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${phone ? encodeURIComponent(phone) : 'Not provided'}%0A*Interested In:* ${encodeURIComponent(service)}%0A*Budget:* ${budget ? encodeURIComponent(budget) : 'Not specified'}%0A%0A*Details:*%0A${encodeURIComponent(message)}%0A%0A*User Info:*%0A${isReturning ? `Returning visitor (${visitCount} visits)` : 'First-time visitor'}%0AJourney: ${encodeURIComponent(journeyString)}%0A%0ALooking forward to discussing!`;
    
    return `https://wa.me/919219917186?text=${text}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      setError('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const journey = journeyTracking.get();
      const isReturning = visitorTracking.isReturning();
      
      // Prepare form data for Web3Forms
      const submitData = {
        access_key: "0e53af2d-694f-4d64-9537-f4f7153813c7",
        subject: `New Inquiry from ${formData.name}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        service: formData.service,
        budget: formData.budget || 'Not specified',
        message: formData.message,
        // Additional metadata
        "User Journey": journey.map(j => j.name).join(' → '),
        "Visitor Type": isReturning ? 'Returning' : 'First-time',
        "Visit Count": visitorTracking.getVisitCount().toString(),
        // Bot detection bypass
        botcheck: false
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        // Clear draft
        contactFormDraft.clear();
        
        // Show success
        setIsSuccess(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          budget: ''
        });

        // Open WhatsApp in new tab
        setTimeout(() => {
          window.open(createWhatsAppMessage(), '_blank');
        }, 500);

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error(result.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to submit form. Please try again or contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F7]">
      {/* Draft Notification */}
      {showDraftNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 sm:top-24 right-4 z-50 max-w-sm"
        >
          <div className="bg-white border border-[#EFEDE9] rounded-xl shadow-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e2493b]/10 flex items-center justify-center flex-shrink-0">
              <Save className="w-5 h-5 text-[#e2493b]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1F1F1F] mb-1" style={{ fontWeight: 500 }}>
                Draft Restored
              </p>
              <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                We've loaded your previously saved form data.
              </p>
            </div>
            <button
              onClick={() => setShowDraftNotification(false)}
              className="text-[#6B6B6B] hover:text-[#1F1F1F] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1000px] sm:h-[1000px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10">
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                  Get Started
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1F1F1F] mb-4 sm:mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
            >
              Ready to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>grow?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto"
              style={{ fontWeight: 400 }}
            >
              Share your challenges, and we'll show you exactly how to build a reliable online presence 
              that brings consistent enquiries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-12 sm:mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                {method.action ? (
                  <a
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group block p-6 bg-white border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#e2493b]/10 flex items-center justify-center mb-4 text-[#e2493b] transition-all duration-300 group-hover:bg-[#e2493b] group-hover:text-white">
                      {method.icon}
                    </div>
                    <h3 className="text-base font-medium text-[#1F1F1F] mb-1" style={{ fontWeight: 500 }}>
                      {method.title}
                    </h3>
                    <p className="text-sm font-medium text-[#e2493b] mb-2" style={{ fontWeight: 500 }}>
                      {method.detail}
                    </p>
                    <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                      {method.description}
                    </p>
                  </a>
                ) : (
                  <div className="p-6 bg-white border border-[#EFEDE9] rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-[#e2493b]/10 flex items-center justify-center mb-4 text-[#e2493b]">
                      {method.icon}
                    </div>
                    <h3 className="text-base font-medium text-[#1F1F1F] mb-1" style={{ fontWeight: 500 }}>
                      {method.title}
                    </h3>
                    <p className="text-sm font-medium text-[#e2493b] mb-2" style={{ fontWeight: 500 }}>
                      {method.detail}
                    </p>
                    <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                      {method.description}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-12 sm:mb-16">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group relative w-12 h-12 rounded-full bg-white border-2 border-[#EFEDE9] flex items-center justify-center transition-all duration-300 hover:border-transparent hover:shadow-lg overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <span className="relative z-10 text-[#1F1F1F] group-hover:text-white transition-colors duration-300">
                  {social.icon}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Form Section */}
          <div className="max-w-3xl mx-auto">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-6 bg-gradient-to-br from-[#e2493b]/5 to-transparent rounded-3xl border border-[#e2493b]/20"
              >
                <div className="w-20 h-20 rounded-full bg-[#e2493b]/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#e2493b]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-medium text-[#1F1F1F] mb-3" style={{ fontWeight: 500 }}>
                  Message Sent Successfully!
                </h2>
                <p className="text-base sm:text-lg text-[#6B6B6B] mb-6" style={{ fontWeight: 400 }}>
                  We've received your inquiry and will respond within 24 hours. 
                  You should also receive a confirmation email shortly.
                </p>
                <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  Opening WhatsApp for immediate assistance...
                </p>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                        placeholder="Your Name"
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
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone and Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                        placeholder="+91 ***** *****"
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
                  className="group relative w-full px-8 py-4 text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-xl shadow-xl shadow-[#e2493b]/25 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#e2493b]/35"
                  style={{ fontWeight: 500 }}
                  whileHover={!isSubmitting ? { scale: prefersReducedMotion ? 1 : 1.02 } : {}}
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

                      <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-center text-[#6B6B6B] pt-2" style={{ fontWeight: 400 }}>
                  By submitting, you'll receive an email confirmation and WhatsApp message with your inquiry details.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 relative overflow-hidden bg-[#FAF9F7]">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-5 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
              Prefer to explore <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>first?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
              Check out our packages and process to understand how we can help stop customer loss and bring consistent enquiries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/services">
                <motion.button
                  className="group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-full shadow-xl shadow-[#e2493b]/25 inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#e2493b]/35"
                  aria-label="View Brancha packages"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontWeight: 500 }}
                >
                  <span className="relative z-10">View Packages</span>
                  <ArrowRight className="w-4 h-4" />

                  <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              <Link to="/process">
                <motion.button
                  className="group px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-[#1F1F1F] bg-white border-2 border-[#EFEDE9] rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:border-[#e2493b] hover:shadow-md hover:shadow-[#e2493b]/10"
                  aria-label="View our process"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontWeight: 500 }}
                >
                  <span>See How We Work</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}