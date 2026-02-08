import { motion, useReducedMotion } from 'framer-motion';
import { useState, useRef, useEffect, memo, useMemo, useCallback } from 'react';
import {
  Mail, Phone, MapPin, Send, CheckCircle,
  MessageSquare, User, Sparkles, Loader2,
  Linkedin, Instagram, ArrowRight, Clock, Save, X,
  Facebook, Youtube, Twitter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTheme } from '../ThemeContext';
import {
  contactFormDraft,
  contactFormStatus,
  packageInterest,
  journeyTracking,
  visitorTracking,
  userPreferences,
  session
} from '../utils/storage';

/* ────────────────────────────────────────────
   SATOSHI FONT IMPORT  (CDN – Fontsource)
   ──────────────────────────────────────────── */
const SATOSHI_LINK = 'https://fonts.cdnfonts.com/css/satoshi?display=swap';

/* ─── HAND-DRAWN SVGs (matching About.jsx) ─── */
const HDCircle = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 200 200" fill="none">
    <path d="M100,12 C140,10 175,38 182,75 C190,118 170,165 130,180 C88,193 38,178 22,140 C6,100 18,48 55,22 C72,12 86,13 100,12Z" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" opacity="0.38" />
    <path d="M100,20 C136,18 168,44 174,78 C181,114 164,157 128,172 C92,184 48,172 34,138 C20,104 30,54 62,28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.16" strokeDasharray="4 7" />
  </svg>
));

const HDUnderline = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 440 28" preserveAspectRatio="none" fill="none">
    <path d="M8,16 C50,20 100,10 160,15 C220,20 270,8 330,14 C380,19 420,12 434,15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
    <path d="M6,21 C48,24 98,15 158,19 C218,24 268,13 328,18 C378,22 418,16 436,18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.18" strokeDasharray="4 8" />
  </svg>
));

const HDScribble = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 180 110" fill="none">
    <path d="M20,58 Q38,32 58,56 Q78,80 98,52 Q118,24 138,54 Q152,72 160,56" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M26,66 Q42,44 60,64 Q78,82 96,60 Q114,38 132,60" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.14" strokeDasharray="3 7" />
  </svg>
));

const HDCoil = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 40 180" fill="none">
    <path d="M20,8 C36,18 36,38 20,48 C4,58 4,78 20,88 C36,98 36,118 20,128 C4,138 4,158 20,168" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.34" />
  </svg>
));

const HDDots = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 130 130" fill="none">
    <circle cx="22" cy="22" r="4.5" fill="currentColor" opacity="0.28" />
    <circle cx="65" cy="18" r="3.2" fill="currentColor" opacity="0.2" />
    <circle cx="108" cy="28" r="4" fill="currentColor" opacity="0.25" />
    <circle cx="38" cy="65" r="3" fill="currentColor" opacity="0.18" />
    <circle cx="90" cy="68" r="3.8" fill="currentColor" opacity="0.22" />
    <circle cx="18" cy="108" r="3.5" fill="currentColor" opacity="0.2" />
    <circle cx="65" cy="105" r="4" fill="currentColor" opacity="0.25" />
    <circle cx="112" cy="112" r="3" fill="currentColor" opacity="0.18" />
  </svg>
));

const HDSparkle = memo(({ className = '', style = {} }) => (
  <svg className={`pointer-events-none ${className}`} style={style} viewBox="0 0 100 100" fill="none">
    <path d="M50,10 L53,44 L50,44 L47,44 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M10,50 L44,47 L44,50 L44,53 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M50,90 L47,56 L50,56 L53,56 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <path d="M90,50 L56,53 L56,50 L56,47 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.32" />
    <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.38" />
  </svg>
));

/* ─── MOTION VARIANTS ─── */
const fadeInScale = { initial: { opacity: 0, scale: 0.94 }, animate: { opacity: 1, scale: 1 } };
const staggerContainer = { animate: { transition: { staggerChildren: 0.11, delayChildren: 0.14 } } };

/* ─── CONTACT METHOD CARD ─── */
const ContactMethodCard = memo(({ method }) => (
  <motion.a
    href={method.action}
    target={method.action.startsWith('http') ? '_blank' : undefined}
    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
    variants={fadeInScale}
    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    className="group p-7 sm:p-8 bg-white border-2 border-[#E8E8E8] rounded-xl hover:border-[#F1464A] transition-all duration-500"
  >
    <div className="w-12 h-12 rounded-xl bg-[#F1464A]/[0.08] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#F1464A]/[0.14]">
      <div className="text-[#F1464A]">{method.icon}</div>
    </div>
    <h3 className="text-[18px] sm:text-[19px] font-bold text-[#1F1F1F] mb-2 tracking-tight leading-tight">
      {method.title}
    </h3>
    <p className="text-[#F1464A] font-bold mb-1 text-[15px] sm:text-[16px]">
      {method.detail}
    </p>
    <p className="text-[#4A4A4A] leading-[1.7] text-[13px] sm:text-[14px]" style={{ fontWeight: 500 }}>
      {method.description}
    </p>
  </motion.a>
));
ContactMethodCard.displayName = 'ContactMethodCard';

export default function Contact() {
  const theme = useTheme();
  
  // ✅ OPTIMIZATION: Check if user already submitted successfully (persists in localStorage)
  const hasSubmittedSuccessfully = useMemo(() => {
    try {
      return contactFormStatus.isSubmitted();
    } catch {
      return false;
    }
  }, []);

  // ✅ OPTIMIZATION: Initialize form data with storage-aware defaults (single computation)
  const initialFormData = useMemo(() => {
    // If user already submitted successfully, don't load draft
    if (hasSubmittedSuccessfully) {
      return {
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        budget: ''
      };
    }

    try {
      // Try to load draft first
      const draft = contactFormDraft.get();
      if (draft) {
        return draft;
      }
      
      // Otherwise check for pre-selected package
      const mostInterested = packageInterest.getMostInterested();
      if (mostInterested) {
        return {
          name: '',
          email: '',
          phone: '',
          service: mostInterested,
          message: '',
          budget: ''
        };
      }
    } catch (err) {
      // Silent fail
    }
    
    // Default empty form
    return {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
      budget: ''
    };
  }, [hasSubmittedSuccessfully]);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(hasSubmittedSuccessfully);
  
  const [error, setError] = useState('');
  
  // ✅ OPTIMIZATION: Only show draft notification if we actually loaded a draft AND user hasn't submitted
  const [showDraftNotification, setShowDraftNotification] = useState(() => {
    if (hasSubmittedSuccessfully) {
      return false;
    }
    try {
      const draft = contactFormDraft.get();
      return !!(draft && (draft.name || draft.email || draft.phone || draft.message));
    } catch {
      return false;
    }
  });
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const formRef = useRef(null);
  const dropdownRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // ✅ OPTIMIZATION: Track if user is returning visitor (memoized)
  const isReturningVisitor = useMemo(() => {
    try {
      return session.isReturningUser() || visitorTracking.hasVisited('/contact');
    } catch {
      return false;
    }
  }, []);

  // ✅ OPTIMIZATION: Auto-hide draft notification after 5s
  useEffect(() => {
    if (showDraftNotification) {
      const timer = setTimeout(() => setShowDraftNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showDraftNotification]);

  // ✅ OPTIMIZATION: Debounced draft saving (reduces storage writes)
  // Don't save draft if user already submitted successfully
  useEffect(() => {
    if (hasSubmittedSuccessfully) {
      return; // Don't save drafts after successful submission
    }

    // Only save if form has meaningful content
    if (formData.name || formData.email || formData.phone || formData.message) {
      const saveTimer = setTimeout(() => {
        try {
          contactFormDraft.save(formData);
        } catch (err) {
          // Silent fail - not critical
        }
      }, 800); // 800ms debounce
      
      return () => clearTimeout(saveTimer);
    }
  }, [formData, hasSubmittedSuccessfully]);

  // ✅ OPTIMIZATION: Mark page visit once on mount
  useEffect(() => {
    try {
      visitorTracking.markVisited('/contact');
    } catch {
      // Silent fail
    }
  }, []);

  // ✅ OPTIMIZATION: Memoized form change handler (prevents recreating function on every render)
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  }, [error]);

  // ✅ OPTIMIZATION: Memoized service selection handler
  const handleServiceSelect = useCallback((service) => {
    setFormData(prev => ({ ...prev, service }));
    setIsDropdownOpen(false);
    
    // Track interest for future personalization
    try {
      packageInterest.set(service);
    } catch {
      // Silent fail
    }
  }, []);

  // ✅ OPTIMIZATION: Memoized validation logic (prevents recreation on every render)
  const validateForm = useCallback(() => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Please enter your phone number');
      return false;
    }
    if (formData.phone.trim().length < 10) {
      setError('Please enter a valid phone number');
      return false;
    }
    if (!formData.service) {
      setError('Please select your industry');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please tell us about your project');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '18b53e4d-37a3-40de-89ea-a49749bc900e',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          budget: formData.budget || 'Not specified',
          subject: `New Contact Form Submission from ${formData.name}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        
        // ✅ OPTIMIZATION: Store success state in localStorage so it persists permanently
        try {
          contactFormStatus.markSubmitted();
          contactFormDraft.clear();
        } catch {
          // Silent fail
        }

        // Also send WhatsApp notification
        const whatsappMessage = encodeURIComponent(
          `Hi! I just submitted a contact form.\n\n` +
          `Name: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Phone: ${formData.phone}\n` +
          `Industry: ${formData.service}\n` +
          `Budget: ${formData.budget || 'Not specified'}\n\n` +
          `Message:\n${formData.message}`
        );

        const whatsappNumber = theme?.contactInfo?.whatsapp?.replace(/\+/g, '').replace(/\s/g, '') || '919219917186';
        
        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          '_blank',
          'noopener,noreferrer'
        );
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again or contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ OPTIMIZATION: Close dropdown when clicking outside (memoized handler)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // ✅ OPTIMIZATION: Memoized contact methods (prevents recreation on every render)
  const contactMethods = useMemo(() => [
    {
      icon: <Mail className="w-5 h-5" strokeWidth={2.2} />,
      title: 'Email Us',
      detail: theme?.contactInfo?.email || 'support@brancha.in',
      description: 'Send us an email anytime',
      action: `mailto:${theme?.contactInfo?.email || 'support@brancha.in'}`
    },
    {
      icon: <Phone className="w-5 h-5" strokeWidth={2.2} />,
      title: 'Call Us',
      detail: theme?.contactInfo?.phone || '+91 98258 83015',
      description: 'Mon-Sat, 9AM-7PM IST',
      action: `tel:${theme?.contactInfo?.phone || '+919825883015'}`
    },
    {
      icon: <MessageSquare className="w-5 h-5" strokeWidth={2.2} />,
      title: 'WhatsApp',
      detail: 'Chat with us',
      description: 'Quick response guaranteed',
      action: `https://wa.me/${theme?.contactInfo?.whatsapp?.replace(/\+/g, '').replace(/\s/g, '') || '919219917186'}`
    },
    {
      icon: <MapPin className="w-5 h-5" strokeWidth={2.2} />,
      title: 'Visit Us',
      detail: theme?.contactInfo?.location || 'Vadodara, Gujarat',
      description: 'Schedule a meeting',
      action: 'https://maps.app.goo.gl/VNKiP7EzUoVv8nru5'
    }
  ], [theme]);

  // ✅ OPTIMIZATION: Memoized social links (prevents recreation on every render)
  const socialLinks = useMemo(() => {
    const links = [];
    
    if (theme?.social?.linkedin) {
      links.push({
        name: 'LinkedIn',
        url: theme.social.linkedin,
        icon: <Linkedin className="w-5 h-5" strokeWidth={2} />
      });
    }
    
    if (theme?.social?.instagram) {
      links.push({
        name: 'Instagram',
        url: theme.social.instagram,
        icon: <Instagram className="w-5 h-5" strokeWidth={2} />
      });
    }
    
    if (theme?.social?.facebook) {
      links.push({
        name: 'Facebook',
        url: theme.social.facebook,
        icon: <Facebook className="w-5 h-5" strokeWidth={2} />
      });
    }
    
    if (theme?.social?.youtube) {
      links.push({
        name: 'YouTube',
        url: theme.social.youtube,
        icon: <Youtube className="w-5 h-5" strokeWidth={2} />
      });
    }
    
    if (theme?.social?.twitter) {
      links.push({
        name: 'Twitter',
        url: theme.social.twitter,
        icon: <Twitter className="w-5 h-5" strokeWidth={2} />
      });
    }
    
    return links;
  }, [theme?.social]);

  // ✅ OPTIMIZATION: Memoized service options (prevents recreation)
  const serviceOptions = useMemo(() => [
    'Gym & Fitness Marketing',
    'Real Estate Marketing',
    'Healthcare Marketing',
    'Education Marketing',
    'Multi-Department Support',
    'Custom Solution'
  ], []);

  return (
    <main className="relative overflow-hidden bg-[#FAF9F7]" style={{ fontFamily: 'Satoshi, sans-serif' }}>
      <Helmet>
        <title>Contact Us | Brancha - Let's Grow Your Brand Together</title>
        <meta name="description" content="Get in touch with Brancha to discuss your marketing needs. We specialize in Gym, Real Estate, Healthcare, and Education marketing. Let's build something great together." />
        <link rel="canonical" href="https://brancha.in/contact" />
      </Helmet>

      {/* Draft Notification */}
      {showDraftNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm"
        >
          <div className="bg-white border-2 border-[#F1464A]/20 rounded-xl shadow-xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F1464A]/10 flex items-center justify-center flex-shrink-0">
              <Save className="w-5 h-5 text-[#F1464A]" />
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-bold text-[#1F1F1F] mb-1">
                Draft Restored
              </h4>
              <p className="text-[13px] text-[#6B6B6B]" style={{ fontWeight: 500 }}>
                We've restored your previous message
              </p>
            </div>
            <button
              onClick={() => setShowDraftNotification(false)}
              className="w-6 h-6 rounded-full hover:bg-[#EFEDE9] flex items-center justify-center flex-shrink-0 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 text-[#6B6B6B]" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ══════ HERO SECTION ══════ */}
      <section className="relative" style={{ paddingTop: 'clamp(100px, 16vw, 220px)', paddingBottom: 'clamp(56px, 8vw, 120px)' }}>
        {/* bg glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F1464A]/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-[55%] h-[65%] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent" />

        {/* drifting doodles */}
        <div className="absolute top-[18%] left-[6%] hidden xl:block pointer-events-none animate-float" style={{ opacity: 0.06 }}>
          <HDCircle className="text-[#F1464A]" style={{ width: 220, height: 220 }} />
        </div>
        <div className="absolute top-[32%] right-[4%] hidden xl:block pointer-events-none animate-float-delayed" style={{ opacity: 0.05 }}>
          <HDCoil className="text-[#F1464A]" style={{ width: 48, height: 220 }} />
        </div>

        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F1464A]/[0.2] bg-white/90 backdrop-blur-sm shadow-sm shadow-[#F1464A]/[0.06]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" />
                <span className="text-[11px] font-bold text-[#F1464A] tracking-widest uppercase">
                  Let's Connect
                </span>
                <Sparkles className="w-3 h-3 text-[#F1464A]" />
              </div>
            </motion.div>

            {/* headline */}
            <div className="relative inline-block mb-5">
              <h1 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.08]" style={{ fontSize: 'clamp(40px, 8vw, 88px)' }}>
                Ready to Grow
                <br />
                <span className="relative inline-block" style={{ marginTop: 4 }}>
                  <span className="bg-gradient-to-r from-[#F1464A] via-[#D4433E] to-[#F1464A] bg-clip-text text-transparent">
                    Your Brand?
                  </span>
                  <HDUnderline className="absolute left-0 w-full text-[#F1464A]" style={{ bottom: -13, height: 18 }} />
                </span>
              </h1>
            </div>

            {/* description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.42 }}
              className="text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 500 }}
            >
              We're here to help. Fill out the form below or reach out directly via email, phone, or WhatsApp.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ══════ CONTACT METHODS ══════ */}
      <section className="relative" style={{ paddingBottom: 'clamp(60px, 9vw, 120px)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {contactMethods.map((method, idx) => (
              <ContactMethodCard key={idx} method={method} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════ CONTACT FORM ══════ */}
      <section className="relative" style={{ paddingBottom: 'clamp(80px, 11vw, 160px)' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border-2 border-[#10b981]/20 rounded-2xl p-10 sm:p-14 text-center shadow-xl"
            >
              <div className="w-20 h-20 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-[#10b981]" strokeWidth={2} />
              </div>
              <h3 className="text-[28px] sm:text-[32px] font-bold text-[#1F1F1F] mb-4 tracking-tight">
                Message Sent Successfully!
              </h3>
              <p className="text-[#6B6B6B] text-[15px] sm:text-[16px] leading-[1.7] mb-6" style={{ fontWeight: 500 }}>
                Thank you for reaching out! We've received your message and will get back to you shortly. You should also receive a confirmation email and WhatsApp message.
              </p>
              <div className="flex items-center justify-center gap-2 text-[#10b981] text-[14px] mb-8" style={{ fontWeight: 600 }}>
                <Clock className="w-4 h-4" />
                <span>We typically respond within 2-4 hours</span>
              </div>
              
              <motion.button
                onClick={() => {
                  // Clear the success flag from localStorage
                  try {
                    contactFormStatus.clear();
                  } catch {
                    // Silent fail
                  }
                  
                  setIsSuccess(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    message: '',
                    budget: ''
                  });
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#F1464A]/5 border-2 border-[#F1464A]/20 rounded-xl text-[14px] text-[#F1464A] hover:bg-[#F1464A]/10 hover:border-[#F1464A]/30 transition-all font-semibold"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1 duration-300" strokeWidth={2.5} />
                <span>Send Another Message</span>
              </motion.button>
            </motion.div>
          ) : (
            <div className="bg-white border-2 border-[#E8E8E8] rounded-2xl p-8 sm:p-10 shadow-xl">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="text-[28px] sm:text-[34px] font-bold text-[#1F1F1F] mb-3 tracking-tight leading-tight">
                  Send Us a Message
                </h2>
                <p className="text-[#6B6B6B] text-[14px] sm:text-[15px]" style={{ fontWeight: 500 }}>
                  We'll respond within 2-4 hours during business hours
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="flex items-center gap-2 text-[#1F1F1F] text-[14px] font-bold mb-2.5" style={{ fontWeight: 600 }}>
                    <User className="w-4 h-4 text-[#F1464A]" strokeWidth={2.2} />
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-[15px] text-[#1F1F1F] bg-[#FAF9F7] border-2 border-[#E8E8E8] rounded-xl focus:border-[#F1464A] focus:outline-none transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-[#1F1F1F] text-[14px] font-bold mb-2.5" style={{ fontWeight: 600 }}>
                    <Mail className="w-4 h-4 text-[#F1464A]" strokeWidth={2.2} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-[15px] text-[#1F1F1F] bg-[#FAF9F7] border-2 border-[#E8E8E8] rounded-xl focus:border-[#F1464A] focus:outline-none transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="flex items-center gap-2 text-[#1F1F1F] text-[14px] font-bold mb-2.5" style={{ fontWeight: 600 }}>
                    <Phone className="w-4 h-4 text-[#F1464A]" strokeWidth={2.2} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-[15px] text-[#1F1F1F] bg-[#FAF9F7] border-2 border-[#E8E8E8] rounded-xl focus:border-[#F1464A] focus:outline-none transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="+91 99240 35005"
                    required
                  />
                </div>

                {/* Industry Dropdown */}
                <div ref={dropdownRef}>
                  <label htmlFor="service" className="flex items-center gap-2 text-[#1F1F1F] text-[14px] font-bold mb-2.5" style={{ fontWeight: 600 }}>
                    <Sparkles className="w-4 h-4 text-[#F1464A]" strokeWidth={2.2} />
                    Your Industry / Niche
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-5 py-3.5 text-[15px] text-left bg-[#FAF9F7] border-2 border-[#E8E8E8] rounded-xl focus:border-[#F1464A] focus:outline-none transition-colors duration-200 flex items-center justify-between"
                      style={{ fontWeight: 500 }}
                    >
                      <span className={formData.service ? 'text-[#1F1F1F]' : 'text-[#9CA3AF]'}>
                        {formData.service || 'Select your industry'}
                      </span>
                      <svg className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-10 w-full mt-2 bg-white border-2 border-[#E8E8E8] rounded-xl shadow-xl overflow-hidden"
                      >
                        {serviceOptions.map((service) => (
                          <button
                            key={service}
                            type="button"
                            onClick={() => handleServiceSelect(service)}
                            className="w-full px-5 py-3 text-left text-[15px] text-[#1F1F1F] hover:bg-[#F1464A]/5 transition-colors duration-200 border-b border-[#E8E8E8] last:border-b-0"
                            style={{ fontWeight: 500 }}
                          >
                            {service}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Budget (Optional) */}
                <div>
                  <label htmlFor="budget" className="flex items-center gap-2 text-[#1F1F1F] text-[14px] font-bold mb-2.5" style={{ fontWeight: 600 }}>
                    <span>Budget Range</span>
                    <span className="text-[#9CA3AF] text-[12px] font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 text-[15px] text-[#1F1F1F] bg-[#FAF9F7] border-2 border-[#E8E8E8] rounded-xl focus:border-[#F1464A] focus:outline-none transition-colors duration-200"
                    style={{ fontWeight: 500 }}
                    placeholder="e.g., ₹50,000 - ₹1,00,000"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="flex items-center gap-2 text-[#1F1F1F] text-[14px] font-bold mb-2.5" style={{ fontWeight: 600 }}>
                    <MessageSquare className="w-4 h-4 text-[#F1464A]" strokeWidth={2.2} />
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-5 py-3.5 text-[15px] text-[#1F1F1F] bg-[#FAF9F7] border-2 border-[#E8E8E8] rounded-xl focus:border-[#F1464A] focus:outline-none transition-colors duration-200 resize-none"
                    style={{ fontWeight: 500 }}
                    placeholder="Tell us about your project and goals..."
                    required
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border-2 border-red-200 rounded-xl"
                  >
                    <div className="flex items-center gap-2 text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[14px] font-bold" style={{ fontWeight: 600 }}>{error}</span>
                    </div>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full px-8 py-4 text-[16px] font-bold text-white bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-xl shadow-lg shadow-[#F1464A]/[0.25] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#F1464A]/[0.35]"
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
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
                    </>
                  )}
                </motion.button>

                <p className="text-[13px] text-center text-[#6B6B6B] pt-2" style={{ fontWeight: 500 }}>
                  By submitting, you'll receive an email confirmation and WhatsApp message with your inquiry details.
                </p>
              </form>
            </div>
          )}

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mt-10 text-center"
            >
              <p className="text-[#6B6B6B] mb-4 text-[14px]" style={{ fontWeight: 500 }}>
                Or connect with us on social media
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={`${social.name}-${idx}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white border-2 border-[#E8E8E8] flex items-center justify-center text-[#1F1F1F] hover:border-[#F1464A] hover:text-[#F1464A] transition-all duration-300"
                    whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="relative overflow-hidden" style={{ paddingTop: 'clamp(64px, 9vw, 140px)', paddingBottom: 'clamp(80px, 11vw, 160px)' }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F1464A]/[0.04] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-[12%] left-[10%] hidden xl:block pointer-events-none" style={{ opacity: 0.07 }}>
          <HDDots className="text-[#F1464A]" style={{ width: 80, height: 80 }} />
        </div>
        <div className="absolute bottom-[14%] right-[8%] hidden xl:block pointer-events-none" style={{ opacity: 0.08 }}>
          <HDSparkle className="text-[#F1464A]" style={{ width: 72, height: 72 }} />
        </div>

        <div className="max-w-3xl mx-auto px-5 sm:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-90px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* scribble accent */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <HDScribble className="text-[#F1464A]" style={{ width: 160, height: 56, opacity: 0.18 }} />
            </div>

            <h2 className="font-bold text-[#1F1F1F] tracking-tight leading-[1.1] mb-5 sm:mb-6" style={{ fontSize: 'clamp(34px, 6vw, 64px)' }}>
              Want to see how
              <br />
              <span className="bg-gradient-to-r from-[#F1464A] to-[#C94A3F] bg-clip-text text-transparent" style={{ fontStyle: 'italic' }}>
                we work?
              </span>
            </h2>

            <p className="text-[#6B6B6B] mb-10 sm:mb-12 max-w-xl mx-auto leading-[1.7]" style={{ fontSize: 'clamp(15px, 2.1vw, 17px)', fontWeight: 500 }}>
              Check out our specialist departments and see how we help businesses in your industry grow.
            </p>

            <Link to="/departments">
              <motion.button
                className="group relative inline-flex items-center gap-2.5 text-white font-bold bg-gradient-to-r from-[#F1464A] to-[#C94A3F] rounded-full overflow-hidden shadow-lg shadow-[#F1464A]/[0.25] border border-[#F1464A]"
                style={{ padding: '15px 40px', fontSize: 'clamp(14px, 1.8vw, 17px)' }}
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.04, boxShadow: '0 18px 40px -10px rgba(241,70,74,0.45)' }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative z-10">View Our Departments</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── keyframes ── */}
      <style>{`
        @import url('${SATOSHI_LINK}');
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(12px, -16px) rotate(2deg); }
          66% { transform: translate(-8px, 14px) rotate(-1.5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-14px, 18px) rotate(-2deg); }
          66% { transform: translate(10px, -12px) rotate(1.5deg); }
        }
        
        .animate-float {
          animation: float 22s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 26s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
