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
    'Foundation Package - Basic',
    'Foundation Package - Pro',
    'Foundation Package - Growth',
    'Monthly Management - Basic',
    'Monthly Management - Pro',
    'Monthly Management - Growth',
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
      action: "https://www.google.com/maps/place/Vadodara,+Gujarat/@22.3222406,73.0906857,12z/data=!3m1!4b1!4m6!3m5!1s0x395fc8ab91a3ddab:0xac39d3bfe1473fb8!8m2!3d22.3000395!4d73.2064994!16zL20vMDJrZnhr?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D",
      description: 'Serving businesses worldwide — remotely'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
      url: 'https://instagram.com/growwithbrancha',
      color: 'from-[#E4405F] via-[#C13584] to-[#833AB4]',
      hoverColor: '#E4405F'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: 'https://linkedin.com/company/brancha',
      color: 'from-[#0077B5] to-[#00669C]',
      hoverColor: '#0077B5'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: 'https://youtube.com/@growwithbrancha',
      color: 'from-[#FF0000] to-[#CC0000]',
      hoverColor: '#FF0000'
    },
    {
      name: 'Threads',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 192 192" fill="none">
          <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" fill="currentColor"/>
        </svg>
      ),
      url: 'https://threads.com/@growwithbrancha',
      color: 'from-[#1F1F1F] to-[#000000]',
      hoverColor: '#1F1F1F'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: 'https://www.facebook.com/profile.php?id=61586163604676',
      color: 'from-[#1877F2] to-[#0C63D4]',
      hoverColor: '#1877F2'
    },
    {
      name: 'X',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: 'https://x.com/growwithbrancha',
      color: 'from-[#1F1F1F] to-[#000000]',
      hoverColor: '#000000'
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
          <div className="flex justify-center gap-3 mb-12 sm:mb-16">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
                className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg overflow-hidden hover:-translate-y-1"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-100 transition-all duration-300`} />
                
                {/* Icon */}
                <span className="relative z-10 text-[#1F1F1F] group-hover:text-white transition-colors duration-300">
                  {social.icon}
                </span>

                {/* Hover ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-all duration-300 scale-110" />
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
                        className={`relative cursor-pointer ${formData.budget === range
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
            <div className="pt-8 pb-4 flex justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfHmxDru_ZcD7Hiry_vcMrEkaCgZVuH0ekjAIVB9h7OWS7xhA/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="group relative px-6 py-3 text-sm font-medium text-[#1F1F1F] bg-white border border-[#EFEDE9] rounded-full inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:border-[#e2493b] hover:shadow-lg hover:shadow-[#e2493b]/10"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontWeight: 500 }}
                >
                  <MessageSquare className="w-4 h-4 text-[#e2493b]" />
                  <span className="relative z-10">Share Feedback</span>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#e2493b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </a>
            </div>

          </div>

        </div>

      </section>
    </div>
  );
}