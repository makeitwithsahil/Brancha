import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin,
  Send, Check, PenTool, Palette, Layout,
  Video, Megaphone, Settings, X, FileText, Shield, Cookie, MessageSquare
} from 'lucide-react';

// ✅ [SAFE - No animation change] Memoize animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1]
  }
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  viewport: { once: true, margin: '-50px' }
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// ✅ [SAFE - No visual change] Memoize individual link items to prevent unnecessary re-renders
const FooterLink = memo(({ link }) => (
  <li>
    <Link to={link.path}>
      <motion.div
        className="flex items-center gap-3 group cursor-pointer"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
      >
        {link.icon && (
          <div className="text-neutral-400 group-hover:text-[#FF6B6B] transition-colors duration-300">
            {link.icon}
          </div>
        )}
        <span className="text-sm sm:text-[15px] text-neutral-600 font-light tracking-[-0.01em] transition-colors duration-300 group-hover:text-[#FF6B6B]">
          {link.name}
        </span>
      </motion.div>
    </Link>
  </li>
));

FooterLink.displayName = 'FooterLink';

// ✅ [SAFE - No visual change] Memoize social link component
const SocialLink = memo(({ social }) => (
  <motion.a
    href={social.url}
    target={social.url.startsWith('http') ? '_blank' : undefined}
    rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
    aria-label={social.name}
    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-600 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] hover:scale-110 hover:shadow-lg hover:shadow-[#FF6B6B]/10"
    whileHover={{ y: -3, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
  >
    {social.icon}
  </motion.a>
));

SocialLink.displayName = 'SocialLink';

// ✅ [SAFE - No visual change] Memoize policy button component
const PolicyButton = memo(({ policyKey, policy, onClick }) => (
  <motion.button
    onClick={() => onClick(policyKey)}
    className="group p-4 sm:p-5 text-left bg-white border border-neutral-200 rounded-xl sm:rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#FF6B6B]/30 hover:bg-[#FF6B6B]/5 hover:shadow-lg hover:shadow-[#FF6B6B]/5"
    whileHover={{ y: -4, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-3 mb-2 sm:mb-3">
      <motion.div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0"
        whileHover={{ rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-[#FF6B6B]">
          {policy.icon}
        </div>
      </motion.div>
      <span className="text-base sm:text-lg font-medium text-neutral-900">
        {policy.title}
      </span>
    </div>
    <p className="text-xs sm:text-sm text-neutral-600 font-light">
      Click to view our {policy.title.toLowerCase()}
    </p>
  </motion.button>
));

PolicyButton.displayName = 'PolicyButton';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ [SAFE - No visual change] Throttle resize handler with RAF
  useEffect(() => {
    let rafId = null;
    
    const checkMobile = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 768);
        rafId = null;
      });
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // ✅ [SAFE - No visual change] Memoize handlers
  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  }, [email]);

  const openModal = useCallback((modal) => {
    setActiveModal(modal);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ✅ [SAFE - No visual change] Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal, closeModal]);

  // ✅ [SAFE - No visual change] Memoize static data
  const footerLinks = useMemo(() => ({
    Services: [
      { name: 'Website Design', path: '/services', icon: <Layout className="w-4 h-4" /> },
      { name: 'Brand Identity', path: '/services', icon: <Palette className="w-4 h-4" /> },
      { name: 'Social Media Design', path: '/services', icon: <Megaphone className="w-4 h-4" /> },
      { name: 'Brand Shoots', path: '/services', icon: <Video className="w-4 h-4" /> },
      { name: 'Marketing Materials', path: '/services', icon: <PenTool className="w-4 h-4" /> },
      { name: 'Ongoing Support', path: '/services', icon: <Settings className="w-4 h-4" /> }
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Process', path: '/process' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Testimonials', path: '/about#testimonials' },
      { name: 'Services', path: '/services' },
      { name: 'Contact', path: '/contact' }
    ],
    Resources: [
      { name: 'Blog', path: '/blog' },
      { name: 'Case Studies', path: '/portfolio' },
      { name: 'Pricing Guide', path: '/contact' },
      { name: 'Free Resources', path: '/resources' },
      { name: 'Style Guide', path: '/style-guide' },
      { name: 'FAQ', path: '/process' }
    ]
  }), []);

  const socialLinks = useMemo(() => [
    { name: 'Instagram', url: 'https://www.instagram.com/getbrancha/', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/brancha/', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Email', url: 'mailto:support@brancha.in', icon: <Mail className="w-5 h-5" /> },
    { name: 'Call', url: 'tel:+919825883015', icon: <Phone className="w-5 h-5" /> },
    { name: 'WhatsApp', url: 'https://wa.me/919219917186', icon: <MessageSquare className="w-5 h-5" /> }
  ], []);

  const contactInfo = useMemo(() => [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'support@brancha.in',
      href: 'mailto:support@brancha.in'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+919825883015',
      href: 'tel:+919825883015'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Address',
      value: 'Vadodara, Gujarat, India',
      href: 'https://maps.google.com'
    }
  ], []);

  const policies = useMemo(() => ({
    'privacy-policy': {
      title: 'Privacy Policy',
      icon: <Shield className="w-6 h-6" />,
      content: `At Brancha, we respect your privacy and take data protection seriously. This policy explains how we collect, use, and safeguard your information.

Information We Collect:
• Contact details (name, email address, phone number)
• Business-related information
• Project requirements and briefs
• Basic website usage data

How We Use Your Information:
• To deliver our services effectively
• To communicate with you regarding inquiries or projects
• To improve our services and website experience
• For marketing or updates, only with your consent

Data Protection:
We apply reasonable security measures to protect your data and do not sell or share your information with third parties without permission. You may request access, correction, or deletion of your personal data at any time.`,
      lastUpdated: 'Last updated: 26 December 2025'
    },

    'terms-of-service': {
      title: 'Terms of Service',
      icon: <FileText className="w-6 h-6" />,
      content: `By using Brancha's services, you agree to the following terms:

Service Agreement:
• All projects require a documented agreement
• Payment terms are defined in each proposal
• Urgent or rush projects may involve additional charges

Intellectual Property:
• Clients own final deliverables after full payment
• Brancha may showcase completed work in its portfolio
• Source files can be shared upon request unless stated otherwise

Project Timeline:
• Timelines are outlined in project proposals
• Changes or delays may require timeline revisions
• Clear communication is expected from both parties

Refund Policy:
• Partial refunds available if significant work hasn't been completed
• No refunds for completed or approved work
• Disputes resolved via mutual discussion

Limitation of Liability:
Brancha is not responsible for third-party services or platforms beyond our control. We aim to deliver quality work but cannot guarantee specific business results.`,
      lastUpdated: 'Last updated: 26 December 2025'
    },

    'cookie-policy': {
      title: 'Cookie Policy',
      icon: <Cookie className="w-6 h-6" />,
      content: `This Cookie Policy explains how Brancha uses cookies and similar technologies.

What Are Cookies:
Cookies are small text files stored on your device when you visit websites. They help improve your browsing experience by remembering your preferences.

Types of Cookies We Use:
• Essential cookies: Required for the website to function
• Analytics cookies: Help us understand site usage
• Preference cookies: Remember your settings and choices

Managing Cookies:
You can control cookies through your browser settings. However, disabling cookies may affect your experience on our website.

Third-Party Cookies:
We may use third-party services like Google Analytics, which may set their own cookies. Please refer to their privacy policies for more information.`,
      lastUpdated: 'Last updated: 26 December 2025'
    },

    'accessibility': {
      title: 'Accessibility Statement',
      icon: <Settings className="w-6 h-6" />,
      content: `Brancha is committed to ensuring our website is accessible to all users, including those with disabilities.

Our Commitment:
• We strive to meet WCAG 2.1 Level AA standards
• Regular accessibility audits and improvements
• Clear navigation and readable content
• Keyboard-friendly interface

Features:
• Semantic HTML structure
• Proper heading hierarchy
• Alt text for images
• High color contrast ratios
• Resizable text

Ongoing Improvements:
We continuously work to enhance accessibility. If you encounter any barriers while using our website, please contact us at support@brancha.in.

Compatibility:
Our website is designed to work with modern browsers and assistive technologies.`,
      lastUpdated: 'Last updated: 26 December 2025'
    }
  }), []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <>
      <footer className="bg-gradient-to-b from-white via-neutral-50/50 to-neutral-50 border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-8 sm:pb-10">
          {/* Top section */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-neutral-100"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Brand section */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div>
                <Link to="/" aria-label="Brancha Home">
                  <h3 className="text-[32px] sm:text-[38px] font-semibold tracking-[-0.04em] text-[#FF6B6B] mb-3 sm:mb-4 cursor-pointer transition-all duration-500 hover:tracking-[-0.02em] hover:opacity-80">
                    Brancha
                  </h3>
                </Link>
                <p className="text-neutral-600 text-sm sm:text-[15px] font-light tracking-[-0.01em] leading-relaxed max-w-md">
                  Premium design partner for modern businesses. We craft beautiful brands and digital experiences that connect with your audience.
                </p>
              </div>

              {/* Newsletter */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-700 uppercase">
                  Stay Updated
                </h4>
                <form onSubmit={handleSubscribe} className="relative max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 sm:h-14 pl-5 sm:pl-6 pr-12 sm:pr-14 text-sm sm:text-[15px] bg-white border border-neutral-200 rounded-full focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20 transition-all duration-300"
                    aria-label="Email subscription"
                    disabled={isSubscribed}
                  />
                  <motion.button
                    type="submit"
                    className={`absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isSubscribed
                        ? 'bg-green-500 text-white'
                        : 'bg-[#FF6B6B] text-white hover:bg-[#FF8E8E] hover:scale-105'
                    }`}
                    whileHover={!isSubscribed ? { scale: 1.05, rotate: 5 } : {}}
                    whileTap={!isSubscribed ? { scale: 0.95 } : {}}
                    aria-label="Subscribe"
                  >
                    <AnimatePresence mode="wait">
                      {isSubscribed ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 180 }}
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </div>

              {/* Social Links */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-700 uppercase">
                  Connect With Us
                </h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {socialLinks.map((social) => (
                    <SocialLink key={social.name} social={social} />
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-700 uppercase">
                  Get In Touch
                </h4>
                <div className="space-y-3">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-3 text-neutral-600 hover:text-[#FF6B6B] transition-colors duration-300 group"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-[#FF6B6B]/10 transition-all duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-neutral-500 font-light">{info.label}</p>
                        <p className="text-xs sm:text-sm font-medium">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={fadeInUp} className="space-y-5 sm:space-y-6">
                <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-700 uppercase">
                  {category}
                </h4>
                <ul className="space-y-3 sm:space-y-4">
                  {links.map((link) => (
                    <FooterLink key={link.name} link={link} />
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Policies Section - Modal Triggers */}
          <motion.div
            className="py-8 sm:py-10 md:py-12 border-t border-neutral-100"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <h4 className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-700 uppercase mb-5 sm:mb-6">
              Legal & Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {Object.entries(policies).map(([key, policy]) => (
                <PolicyButton key={key} policyKey={key} policy={policy} onClick={openModal} />
              ))}
            </div>
          </motion.div>

          {/* Bottom section */}
          <motion.div
            className="pt-6 sm:pt-8 pb-4 sm:pb-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 border-t border-neutral-100"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            <div className="text-center md:text-left">
              <p className="text-neutral-500 text-xs sm:text-sm font-light tracking-[-0.01em]">
                © {currentYear} Brancha Design Studio. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mt-2 text-neutral-500 text-[10px] sm:text-xs font-light">
                <span>Premium Design Partner</span>
                <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                <span>Vadodara, Gujarat</span>
              </div>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs sm:text-sm font-light tracking-[-0.01em] text-neutral-400 transition-colors duration-300 hover:text-[#FF6B6B]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
            </motion.button>
          </motion.div>
        </div>
      </footer>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeModal && policies[activeModal] && (
          <>
            {/* Backdrop - ✅ [SAFE - No visual change] Reduced blur on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className={`fixed inset-0 z-50 ${isMobile ? 'bg-black/50' : 'bg-black/40 backdrop-blur-sm'
                }`}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full sm:max-w-2xl h-[95vh] sm:h-auto sm:max-h-[85vh] bg-white sm:rounded-3xl shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
                // ✅ [SAFE - No visual change] GPU acceleration
                style={{
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              >
                {/* Modal Header */}
                <div className="flex-shrink-0 bg-white border-b border-neutral-100 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <motion.div
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#FF6B6B]/10 flex items-center justify-center flex-shrink-0"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="text-[#FF6B6B]">
                        {policies[activeModal].icon}
                      </div>
                    </motion.div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-neutral-900 truncate">
                        {policies[activeModal].title}
                      </h3>
                      <p className="text-[10px] sm:text-xs md:text-sm text-neutral-500">
                        {policies[activeModal].lastUpdated}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={closeModal}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-neutral-100 flex items-center justify-center transition-colors duration-300 hover:bg-neutral-200 flex-shrink-0 ml-2"
                    aria-label="Close modal"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-neutral-600" />
                  </motion.button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
                  <motion.div
                    className="text-neutral-700 leading-relaxed whitespace-pre-line text-sm md:text-base"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {policies[activeModal].content}
                  </motion.div>
                </div>

                {/* Modal Footer */}
                <div className="flex-shrink-0 bg-gradient-to-t from-white to-white/80 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-4 md:py-6 border-t border-neutral-100">
                  <div className="flex justify-end">
                    <motion.button
                      onClick={closeModal}
                      className="px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-white bg-[#FF6B6B] rounded-full shadow-lg shadow-[#FF6B6B]/20 transition-all duration-300 hover:bg-[#FF8E8E] hover:shadow-xl hover:shadow-[#FF6B6B]/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}