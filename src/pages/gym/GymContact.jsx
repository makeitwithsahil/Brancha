import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowRight, MessageSquare, Mail, Phone, Clock, Instagram, Facebook, Youtube, Send, CheckCircle, Loader2, User, Building, ChevronDown, Save, X } from 'lucide-react';
import SEO from '../../components/SEO';
import { 
  formStorage, 
  leadIntent, 
  session, 
  userPreferences,
  performanceTracking,
  packageInterest
} from '../../utils/storage';

export default function GymContact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gymName: '',
    service: '',
    message: '',
    budget: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showDraftNotification, setShowDraftNotification] = useState(false);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef(null);
  const budgetDropdownRef = useRef(null);

  // Check if user prefers reduced motion
  const reducedMotion = useMemo(() => {
    return userPreferences.get('reducedMotion', false);
  }, []);

  // Check for pre-selected package from other pages
  const preselectedPackage = useMemo(() => {
    return packageInterest.get();
  }, []);

  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'root', label: 'Root - Get Online (Single Page)' },
    { value: 'branch', label: 'Branch - Establish Presence (Multi-Page)' },
    { value: 'grow', label: 'Grow - Build Systems (Full Website + Automation)' },
    { value: 'maintain', label: 'Maintain - Stay Visible (Monthly Support)' },
    { value: 'scale', label: 'Scale - Paid Advertising (Google/Meta Ads)' },
    { value: 'consultation', label: 'Just Want to Talk / Get Advice' }
  ];

  const budgetOptions = [
    { value: '', label: 'Select budget range...' },
    { value: 'under-25k', label: 'Under ₹25,000' },
    { value: '25k-50k', label: '₹25,000 - ₹50,000' },
    { value: '50k-100k', label: '₹50,000 - ₹1,00,000' },
    { value: 'above-100k', label: 'Above ₹1,00,000' },
    { value: 'not-sure', label: 'Not sure yet' }
  ];

  useEffect(() => {
    const startTime = performance.now();

    // Mark gym contact intent (high value!)
    leadIntent.markInterest('gym');

    // Track page load performance
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const endTime = performance.now();
        performanceTracking.track('Gym Contact', {
          loadTime: Math.round(endTime - startTime),
          hadPreselectedPackage: !!preselectedPackage,
          hadDraftData: !!formStorage.load('gym_contact')
        });
      });
    }
  }, [preselectedPackage]);

  // Optimize mouse and scroll handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (reducedMotion) return;
      
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 30 - 15,
        y: (e.clientY / window.innerHeight) * 30 - 15
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsWhatsAppVisible(window.scrollY > 100);
    };

    if (!reducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [reducedMotion]);

  // Auto-save draft (optimized with debouncing)
  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      const timer = setTimeout(() => {
        formStorage.save('gym_contact', formData);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  // Load draft and preselect package on mount
  useEffect(() => {
    const draft = formStorage.load('gym_contact');
    
    if (draft) {
      // Restore draft
      setFormData(draft);
      setShowDraftNotification(true);
      setTimeout(() => setShowDraftNotification(false), 5000);
    } else if (preselectedPackage) {
      // Apply preselected package if no draft exists
      setFormData(prev => ({ ...prev, service: preselectedPackage }));
      packageInterest.clear(); // Clear after using
    }
  }, [preselectedPackage]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
        setIsServiceDropdownOpen(false);
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(event.target)) {
        setIsBudgetDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contactMethods = [
    {
      icon: <MessageSquare className="w-5 h-5" strokeWidth={2.5} />,
      title: 'WhatsApp',
      detail: '+91 92199 17186',
      description: 'Fastest way to reach us. We typically respond within minutes during business hours.',
      action: 'https://wa.me/919219917186?text=Hi, I\'m interested in learning more about your services'
    },
    {
      icon: <Phone className="w-5 h-5" strokeWidth={2.5} />,
      title: 'Call Us',
      detail: '+91 98258 83015',
      description: 'Prefer to talk? Give us a call and we\'ll walk you through everything.',
      action: 'tel:+919825883015'
    },
    {
      icon: <Mail className="w-5 h-5" strokeWidth={2.5} />,
      title: 'Email',
      detail: 'support@brancha.in',
      description: 'Send us an email and we\'ll get back to you within 24 hours.',
      action: 'mailto:support@brancha.in'
    }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" strokeWidth={2} />, url: 'https://instagram.com/branchaforgym' },
    { name: 'Facebook', icon: <Facebook className="w-5 h-5" strokeWidth={2} />, url: 'https://www.facebook.com/profile.php?id=61587972351123' },
    { name: 'YouTube', icon: <Youtube className="w-5 h-5" strokeWidth={2} />, url: 'https://youtube.com/@branchaforgym' }
  ];

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleServiceSelect = useCallback((value) => {
    setFormData(prev => ({ ...prev, service: value }));
    setIsServiceDropdownOpen(false);
  }, []);

  const handleBudgetSelect = useCallback((value) => {
    setFormData(prev => ({ ...prev, budget: value }));
    setIsBudgetDropdownOpen(false);
  }, []);

  const clearDraft = useCallback(() => {
    formStorage.clear('gym_contact');
    setShowDraftNotification(false);
  }, []);

  // Track contact method clicks
  const handleContactMethodClick = useCallback((method) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        performanceTracking.track('Contact Method Click', {
          method,
          formFilled: !!(formData.name || formData.email)
        });
      });
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '70d2b7d4-177b-4d56-a7ae-56057cdc51a8',
          ...formData,
          subject: `New Gym Inquiry from ${formData.name}`,
        })
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        formStorage.clear('gym_contact');

        // Track successful submission
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            performanceTracking.track('Gym Contact Form Submitted', {
              service: formData.service,
              budget: formData.budget,
              hasGymName: !!formData.gymName
            });
          });
        }

        // Also send WhatsApp notification
        const whatsappMessage = `Hi! I just submitted a contact form.%0A%0AName: ${formData.name}%0AGym: ${formData.gymName}%0AService: ${formData.service}%0A%0AI'm interested in working with you.`;
        window.open(`https://wa.me/919219917186?text=${whatsappMessage}`, '_blank');
      } else {
        setError('Something went wrong. Please try again or contact us directly.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedLabel = (options, value) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : options[0].label;
  };

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch"
        description="Ready to improve your gym's digital presence? Contact us for custom websites, lead generation systems, and marketing automation for gyms."
        canonical="/gym/contact"
        keywords="gym marketing contact, fitness website quote, gym digital marketing, contact gym agency"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Brancha Gym Marketing",
          "description": "Get in touch with Brancha for gym marketing solutions.",
          "url": "https://brancha.in/gym/contact",
          "mainEntity": {
            "@type": "Organization",
            "name": "Brancha",
            "telephone": "+91-98258-83015",
            "email": "support@brancha.in"
          }
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] via-[#1c1919] to-[#0A0A0A] text-white antialiased overflow-x-hidden">

        {/* Advanced Background System */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div
            className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] rounded-full opacity-[0.12] blur-[140px] will-change-transform"
            style={{
              background: 'radial-gradient(circle, #F1464A 0%, #d63942 50%, transparent 70%)',
              transform: reducedMotion 
                ? 'none' 
                : `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px) scale(${1 + scrollY * 0.0001})`,
              transition: reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />
          <div
            className="absolute bottom-[-15%] right-[15%] w-[600px] h-[600px] rounded-full opacity-[0.10] blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #F1464A 0%, #8B2832 60%, transparent 75%)',
              transform: reducedMotion 
                ? 'none' 
                : `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
              transition: reducedMotion ? 'none' : 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              mixBlendMode: 'overlay'
            }}
          />

          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
          />
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/919219917186?text=Hi, I'm interested in learning more about your services"
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${isWhatsAppVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
            }`}
          onClick={() => handleContactMethodClick('whatsapp_float')}
        >
          <div className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />

            <div className="relative w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <MessageSquare className="w-7 h-7 text-white" strokeWidth={2.5} fill="white" />
            </div>
          </div>
        </a>

        {/* Hero Section */}
        <section className="relative mt-20 pt-16 sm:pt-20 pb-12 sm:pb-16 px-5 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#F1464A]/8 to-[#F1464A]/5 border border-[#F1464A]/20 backdrop-blur-xl mb-8 fade-in relative group shadow-lg shadow-[#F1464A]/5">
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A]/20 via-[#F1464A]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F1464A] animate-pulse" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-1.5 h-1.5 rounded-full bg-[#F1464A] opacity-60" style={{ animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold text-white/85 tracking-wide uppercase relative z-10" style={{ letterSpacing: '0.08em' }}>
                  Get in Touch
                </span>
              </div>

              <div className="mb-8 slide-up">
                <h1
                  className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.05] tracking-[-0.02em] mb-4"
                  style={{
                    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                  <span className="block text-white/95">Let's Talk About</span>
                  <span className="block text-white/95 mt-1">Your Gym's</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 50%, #F1464A 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Digital Future.
                  </span>
                </h1>

                <div className="hidden sm:flex items-center gap-3 mt-6 opacity-0 animate-slide-in-fade justify-center" style={{ animationDelay: '200ms' }}>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#F1464A]/60 to-transparent" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-white/35 font-semibold">We typically respond within 2 hours</span>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#F1464A]/60 to-transparent" />
                </div>
              </div>

              <div className="max-w-2xl mx-auto mb-10 opacity-0 animate-slide-in-fade" style={{ animationDelay: '300ms' }}>
                <p
                  className="text-base sm:text-lg leading-[1.6] text-white/70 font-normal tracking-tight"
                  style={{ fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}
                >
                  Fill out the form below or choose your preferred way to connect. We'll get back to you with honest advice on what would actually help your gym.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="relative py-8 sm:py-12 px-5 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-5 mb-12">
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] hover:border-[#F1464A]/40 transition-all duration-300"
                  onClick={() => handleContactMethodClick(method.title.toLowerCase())}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#F1464A]/20 to-[#F1464A]/10 flex items-center justify-center text-[#F1464A] border border-[#F1464A]/20 group-hover:scale-110 transition-transform duration-300">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white/95 mb-1 tracking-tight">
                        {method.title}
                      </h3>
                      <p className="text-sm text-[#F1464A] mb-2 font-semibold">
                        {method.detail}
                      </p>
                      <p className="text-xs text-white/55 leading-relaxed font-light">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="relative py-8 sm:py-12 px-5 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Draft Notification */}
            {showDraftNotification && !isSuccess && (
              <div className="mb-6 p-4 rounded-xl bg-[#F1464A]/10 border border-[#F1464A]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Save className="w-5 h-5 text-[#F1464A]" strokeWidth={2} />
                  <p className="text-sm text-white/90 font-medium">
                    We've restored your previous draft
                  </p>
                </div>
                <button
                  onClick={clearDraft}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Clear draft"
                >
                  <X className="w-4 h-4 text-white/60" strokeWidth={2} />
                </button>
              </div>
            )}

            {!isSuccess ? (
              /* Contact Form */
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08]">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2.5">
                      Your Name <span className="text-[#F1464A]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" strokeWidth={2} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full h-14 pl-12 pr-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#F1464A] focus:bg-white/[0.08] hover:border-white/20"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2.5">
                        Email <span className="text-[#F1464A]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" strokeWidth={2} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full h-14 pl-12 pr-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#F1464A] focus:bg-white/[0.08] hover:border-white/20"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-white/80 mb-2.5">
                        Phone <span className="text-[#F1464A]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" strokeWidth={2} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full h-14 pl-12 pr-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#F1464A] focus:bg-white/[0.08] hover:border-white/20"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Gym Name */}
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2.5">
                      Gym Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" strokeWidth={2} />
                      <input
                        type="text"
                        name="gymName"
                        value={formData.gymName}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#F1464A] focus:bg-white/[0.08] hover:border-white/20"
                        placeholder="Iron Paradise Gym"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Service Dropdown */}
                    <div ref={serviceDropdownRef}>
                      <label className="block text-sm font-semibold text-white/80 mb-2.5">
                        Service <span className="text-[#F1464A]">*</span>
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                          className="w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base text-left flex items-center justify-between transition-all duration-300 hover:border-white/20 focus:outline-none focus:border-[#F1464A]"
                        >
                          <span className={formData.service ? 'text-white' : 'text-white/30'}>
                            {getSelectedLabel(serviceOptions, formData.service)}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-200 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
                        </button>

                        {isServiceDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto animate-dropdown-open">
                            {serviceOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleServiceSelect(option.value)}
                                className={`w-full px-4 py-3 text-left text-sm rounded-lg transition-colors ${
                                  formData.service === option.value
                                    ? 'bg-[#F1464A]/20 text-[#F1464A] font-semibold'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Budget Dropdown */}
                    <div ref={budgetDropdownRef}>
                      <label className="block text-sm font-semibold text-white/80 mb-2.5">
                        Budget Range
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsBudgetDropdownOpen(!isBudgetDropdownOpen)}
                          className="w-full h-14 px-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base text-left flex items-center justify-between transition-all duration-300 hover:border-white/20 focus:outline-none focus:border-[#F1464A]"
                        >
                          <span className={formData.budget ? 'text-white' : 'text-white/30'}>
                            {getSelectedLabel(budgetOptions, formData.budget)}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-white/40 transition-transform duration-200 ${isBudgetDropdownOpen ? 'rotate-180' : ''}`} strokeWidth={2} />
                        </button>

                        {isBudgetDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl z-50">
                            {budgetOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => handleBudgetSelect(option.value)}
                                className={`w-full px-4 py-3 text-left text-sm rounded-lg transition-colors ${
                                  formData.budget === option.value
                                    ? 'bg-[#F1464A]/20 text-[#F1464A] font-semibold'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-white/80 mb-2.5">
                      Message <span className="text-[#F1464A]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl text-white text-base placeholder:text-white/30 transition-all duration-300 focus:outline-none focus:border-[#F1464A] focus:bg-white/[0.08] hover:border-white/20 resize-none"
                      placeholder="Tell us about your gym and what you're looking for..."
                    />
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full h-14 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-xl font-bold text-base overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#F1464A]/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    {isSubmitting ? (
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                        Sending...
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
                  </button>

                  <p className="text-[13px] text-center text-white/40 pt-2 font-light">
                    By submitting, you'll receive an email confirmation and WhatsApp message with your inquiry details.
                  </p>
                </form>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-16 sm:py-24 slide-up">
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute inset-0 bg-[#F1464A]/20 rounded-full blur-2xl opacity-50" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#F1464A]/20 to-[#F1464A]/5 border border-[#F1464A]/30 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-[#F1464A]" strokeWidth={2.5} />
                  </div>
                </div>

                <h2
                  className="text-[clamp(1.75rem,5vw,2.75rem)] font-black mb-5 leading-[1.1] tracking-[-0.02em]"
                  style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
                >
                  <span className="block text-white/95">Message Sent</span>
                  <span
                    className="block mt-1.5"
                    style={{
                      background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Successfully!
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-white/60 max-w-md mx-auto mb-4 leading-relaxed font-light">
                  We've received your message and will get back to you within 24 hours.
                </p>
                <p className="text-sm text-white/50 max-w-md mx-auto mb-10 leading-relaxed font-light">
                  You should also receive a WhatsApp confirmation shortly.
                </p>

                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({ name: '', email: '', phone: '', gymName: '', service: '', message: '', budget: '' });
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 hover:bg-white/10 hover:border-[#F1464A]/30 transition-all font-semibold"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1 duration-300" strokeWidth={2.5} />
                  <span>Send Another Message</span>
                </button>
              </div>
            )}

            {/* Social Links */}
            {!isSuccess && (
              <div className="mt-10 text-center">
                <p className="text-white/55 mb-4 text-sm font-light">
                  Or connect with us on social media
                </p>
                <div className="flex justify-center gap-4">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1A1A1A] to-[#151515] border border-white/[0.08] flex items-center justify-center text-white/60 hover:bg-[#F1464A]/10 hover:border-[#F1464A]/30 hover:text-[#F1464A] transition-all duration-300"
                      aria-label={social.name}
                      onClick={() => handleContactMethodClick(`social_${social.name.toLowerCase()}`)}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-16 sm:py-20 px-5 sm:px-6 lg:px-8 mb-8">
          <div className="max-w-4xl mx-auto text-center">

            <h2
              className="text-[clamp(1.75rem,5.5vw,3rem)] font-black mb-5 sm:mb-6 leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: '"SF Pro Display", -apple-system, sans-serif' }}
            >
              <span className="block text-white/95">Ready to Fix</span>
              <span className="block text-white/95 mt-1.5">What's Actually</span>
              <span
                className="block mt-2"
                style={{
                  background: 'linear-gradient(135deg, #F1464A 0%, #FF6B6B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Broken?
              </span>
            </h2>

            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light tracking-tight">
              Let's have an honest conversation about your gym's digital presence. No sales pitch. No pressure. Just real advice from people who understand gyms.
            </p>

            <a
              href="https://wa.me/919219917186?text=Hi, I'm interested in learning more about your services"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden w-full sm:w-auto mb-8 inline-block"
              onClick={() => handleContactMethodClick('whatsapp_cta')}
            >
              <div className="absolute -inset-[1px] bg-gradient-to-r from-[#F1464A] to-[#FF5252] rounded-2xl opacity-0 blur-md group-hover:opacity-30 transition-opacity duration-500" />

              <div className="relative px-8 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-br from-[#F1464A] to-[#d63942] rounded-2xl text-base sm:text-lg font-bold flex items-center justify-center gap-3 transition-all group-hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F1464A]/25">
                <span className="tracking-tight">Let's Talk</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5 duration-300" strokeWidth={2.5} />
              </div>

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 rounded-2xl" />
            </a>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-white/35">
              {['Fast Response', 'No Pressure', 'Honest Advice'].map((item, i, arr) => (
                <div key={item} className="flex items-center gap-4 sm:gap-6">
                  <span className="tracking-tight font-medium">{item}</span>
                  {i < arr.length - 1 && <span className="hidden sm:block w-1 h-1 rounded-full bg-white/25" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-12" />

        <style jsx>{`
          @keyframes slide-in-fade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes dropdown-open {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-slide-in-fade {
            animation: slide-in-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .animate-dropdown-open {
            animation: dropdown-open 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .fade-in {
            animation: slide-in-fade 0.6s ease-out forwards;
          }

          .slide-up {
            animation: slide-in-fade 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          .will-change-transform {
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </div>
    </>
  );
}