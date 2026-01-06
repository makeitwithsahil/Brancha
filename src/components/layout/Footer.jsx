import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin,
  Send, Check, Shield, FileText, Cookie
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px', amount: 0.3 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  whileInView: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  },
  viewport: { once: true, margin: '-50px', amount: 0.3 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.3 }
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.94, 
    y: 30, 
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
  }
};

const FooterLink = memo(({ link }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <li>
      <Link to={link.path}>
        <motion.div
          className="flex items-center gap-2 group cursor-pointer"
          whileHover={{ x: prefersReducedMotion ? 0 : 4 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            className="text-sm text-[#6B6B6B] transition-all duration-400 ease-out group-hover:text-[#e35342]" 
            style={{ fontWeight: 400 }}
            whileHover={{ fontWeight: 500 }}
          >
            {link.name}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#e35342]"
          >
            →
          </motion.span>
        </motion.div>
      </Link>
    </li>
  );
});

FooterLink.displayName = 'FooterLink';

const SocialLink = memo(({ social }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.a
      href={social.url}
      target={social.url.startsWith('http') ? '_blank' : undefined}
      rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={social.name}
      className="relative w-11 h-11 rounded-full bg-[#EFEDE9] flex items-center justify-center text-[#6B6B6B] transition-all duration-400 ease-out hover:bg-[#e35342]/10 hover:text-[#e35342] hw-accelerate group overflow-hidden"
      whileHover={{ 
        y: prefersReducedMotion ? 0 : -4,
        scale: prefersReducedMotion ? 1 : 1.08,
        boxShadow: '0 8px 20px -4px rgba(255, 111, 97, 0.2)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative z-10 transition-transform duration-400 group-hover:scale-110">
        {social.icon}
      </div>
      
      {/* Premium gradient on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-gradient-to-br from-[#e35342]/10 to-transparent"
      />
      
      {/* Shine effect */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ 
            rotate: [0, 180],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 4
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          style={{ pointerEvents: 'none' }}
        />
      )}
    </motion.a>
  );
});

SocialLink.displayName = 'SocialLink';

const PolicyButton = memo(({ policyKey, policy, onClick }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.button
      onClick={() => onClick(policyKey)}
      className="group p-6 text-left bg-white border border-[#EFEDE9] rounded-xl transition-all duration-400 ease-out hover:border-[#e35342]/30 hover:shadow-xl hover:shadow-[#e35342]/5 h-full flex flex-col hw-accelerate relative overflow-hidden"
      whileHover={{ 
        y: prefersReducedMotion ? 0 : -3,
        scale: prefersReducedMotion ? 1 : 1.01
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <motion.div 
          className="w-11 h-11 rounded-xl bg-[#e35342]/10 flex items-center justify-center flex-shrink-0 transition-all duration-400 group-hover:bg-[#e35342]/15 group-hover:shadow-md group-hover:shadow-[#e35342]/10"
          whileHover={{ rotate: prefersReducedMotion ? 0 : [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-[#e35342] transition-transform duration-400 group-hover:scale-110">
            {policy.icon}
          </div>
        </motion.div>
        <span className="text-sm font-medium text-[#1F1F1F] transition-colors duration-400 group-hover:text-[#e35342]" style={{ fontWeight: 500 }}>
          {policy.title}
        </span>
      </div>
      <p className="text-xs text-[#6B6B6B] mt-auto transition-colors duration-400 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
        Click to view details
      </p>
      
      {/* Premium gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0, x: '-100%' }}
        whileHover={{ opacity: 0.03, x: '100%' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e35342] to-transparent"
        style={{ pointerEvents: 'none' }}
      />
    </motion.button>
  );
});

PolicyButton.displayName = 'PolicyButton';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal, closeModal]);

  const footerLinks = useMemo(() => ({
    Services: [
      { name: 'Foundation Package', path: '/services' },
      { name: 'Monthly Result Package', path: '/services' },
      { name: 'Complete System', path: '/services' }
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'How We Work', path: '/process' },
      { name: 'Contact', path: '/contact' }
    ],
    Support: [
      { name: 'FAQs', path: '/contact' },
      { name: 'Get Started', path: '/contact' }
    ]
  }), []);

  const socialLinks = useMemo(() => [
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/getbrancha' },
    { name: 'LinkedIn', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/company/brancha' }
  ], []);

  const contactInfo = useMemo(() => [
    { label: 'Email', value: 'support@brancha.in', href: 'mailto:support@brancha.in', icon: <Mail className="w-4 h-4" /> },
    { label: 'Phone', value: '+91 98258 83015', href: 'tel:+919825883015', icon: <Phone className="w-4 h-4" /> },
    { label: 'Location', value: 'Vadodara, Gujarat, India', href: 'https://maps.google.com', icon: <MapPin className="w-4 h-4" /> }
  ], []);

  const policies = useMemo(() => ({
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `At Brancha, we respect your privacy and protect your personal data.

Information We Collect:
We collect information you provide directly—name, email, phone number, and business details when you contact us or use our services.

How We Use Your Information:
- To provide and improve our services
- To communicate with you about projects and updates
- To send relevant business information (you can opt out anytime)
- To analyze usage and improve our offerings

Your Rights:
You have the right to access, correct, or delete your personal information at any time.

Contact:
For privacy concerns, email us at support@brancha.in`
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `Welcome to Brancha. By using our services, you agree to these terms.

Services:
Brancha provides online presence management including branding, website development, and digital marketing services.

Payment Terms:
- Foundation Package: One-time payment required before project start
- Monthly Packages: Billed monthly in advance
- Refunds available within 7 days of initial payment

Intellectual Property:
- Final deliverables belong to you after full payment
- We retain rights to use work in our portfolio

Termination:
Either party may terminate monthly services with 30 days notice.

Contact:
For questions, email us at support@brancha.in`
    },
    cookies: {
      title: 'Cookie Policy',
      icon: <Cookie className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `Brancha uses cookies to improve your experience on our website.

What Are Cookies:
Cookies are small text files stored on your device when you visit our website.

How We Use Cookies:
- Essential cookies: Required for website functionality
- Analytics cookies: Help us understand how visitors use our site
- Marketing cookies: Remember your preferences

Managing Cookies:
You can control cookies through your browser settings. Disabling cookies may affect website functionality.

Contact:
For questions about cookies, email support@brancha.in`
    }
  }), []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  // Modal component
  const modalContent = activeModal && policies[activeModal] && (
    <AnimatePresence mode="wait">
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
          className={`absolute inset-0 ${isMobile ? 'bg-black/70' : 'bg-black/50 backdrop-blur-md'}`}
          style={{ cursor: 'pointer' }}
        />

        <motion.div
          key="modal-content"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-white sm:rounded-2xl shadow-2xl flex flex-col z-10"
          onClick={(e) => e.stopPropagation()}
          style={{ cursor: 'default' }}
        >
          {/* Modal Header */}
          <div className="flex-shrink-0 bg-white border-b border-[#EFEDE9] px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <motion.div
                className="w-11 h-11 rounded-xl bg-[#e35342]/10 flex items-center justify-center flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-[#e35342]">
                  {policies[activeModal].icon}
                </div>
              </motion.div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-[#1F1F1F] truncate" style={{ fontWeight: 600 }}>
                  {policies[activeModal].title}
                </h3>
                <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {policies[activeModal].lastUpdated}
                </p>
              </div>
            </div>
            <motion.button
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-[#EFEDE9] flex items-center justify-center transition-all duration-300 hover:bg-[#e35342]/10 hover:text-[#e35342] flex-shrink-0 ml-2"
              aria-label="Close modal"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-xl leading-none">×</span>
            </motion.button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <motion.div
              className="text-[#1F1F1F] leading-relaxed whitespace-pre-line text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontWeight: 400 }}
            >
              {policies[activeModal].content}
            </motion.div>
          </div>

          {/* Modal Footer */}
          <div className="flex-shrink-0 bg-white px-4 sm:px-6 py-4 border-t border-[#EFEDE9]">
            <div className="flex justify-end">
              <motion.button
                onClick={closeModal}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#e35342] to-[#FF8577] rounded-full transition-all duration-400 hover:shadow-lg hover:shadow-[#e35342]/30 relative overflow-hidden"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontWeight: 500 }}
              >
                Close
                
                {!prefersReducedMotion && (
                  <motion.div
                    animate={{ x: ['0%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return (
    <>
      <footer className="bg-[#FAF9F7] border-t border-[#EFEDE9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main footer content */}
          <motion.div
            className="py-12 sm:py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Company info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              {/* Logo */}
              <Link to="/" className="inline-block group">
                <motion.img
                  src="/Brancha_logo_with_tagline-png.webp"
                  alt="Brancha - Where Brands Grow"
                  className="h-20 sm:h-24 w-auto transition-all duration-500 ease-out group-hover:opacity-80 group-hover:brightness-110"
                  whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  loading="lazy"
                />
              </Link>

              {/* Description */}
              <div className="space-y-3">
                <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-sm transition-colors duration-400 hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                  A company that builds and manages the complete online presence of businesses—so they stop losing customers and start growing with clarity.
                </p>
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  Stay Updated
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 text-sm bg-white border border-[#EFEDE9] rounded-lg focus:outline-none focus:border-[#e35342] focus:ring-2 focus:ring-[#e35342]/20 transition-all duration-400"
                    style={{ fontWeight: 400 }}
                    disabled={isSubscribed}
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubscribed}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-400 hw-accelerate relative overflow-hidden ${isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-[#e35342] text-white hover:bg-[#C94A3F] hover:shadow-lg hover:shadow-[#e35342]/25'
                      }`}
                    whileHover={!isSubscribed ? { scale: 1.05 } : {}}
                    whileTap={!isSubscribed ? { scale: 0.95 } : {}}
                    style={{ fontWeight: 500 }}
                  >
                    {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                    
                    {!isSubscribed && !prefersReducedMotion && (
                      <motion.div
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ pointerEvents: 'none' }}
                      />
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  Connect
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <SocialLink key={social.name} social={social} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <motion.div key={category} variants={fadeInUp} className="space-y-4">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  {category}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <FooterLink key={link.name} link={link} />
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact info */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                Contact
              </h4>
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-2 text-[#6B6B6B] hover:text-[#e35342] transition-colors duration-400 group"
                    whileHover={{ x: prefersReducedMotion ? 0 : 2 }}
                  >
                    <motion.div 
                      className="w-5 h-5 mt-0.5 flex-shrink-0 transition-transform duration-400 group-hover:scale-110"
                      whileHover={{ rotate: prefersReducedMotion ? 0 : [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#6B6B6B] mb-0.5" style={{ fontWeight: 400 }}>{info.label}</p>
                      <p className="text-sm font-medium break-words" style={{ fontWeight: 500 }}>{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Policies Section */}
          <motion.div
            className="py-8 border-t border-[#EFEDE9]"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.5 }}
          >
            <h4 className="text-sm font-semibold tracking-wider text-[#1F1F1F] uppercase mb-6" style={{ fontWeight: 600 }}>
              Legal
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(policies).map(([key, policy]) => (
                <PolicyButton key={key} policyKey={key} policy={policy} onClick={openModal} />
              ))}
            </div>
          </motion.div>

          {/* Bottom section */}
          <motion.div
            className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#EFEDE9]"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 1 }}
          >
            <div className="text-center sm:text-left">
              <p className="text-[#6B6B6B] text-xs transition-colors duration-400 hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                © {currentYear} Brancha. All rights reserved.
              </p>
              <p className="text-[#6B6B6B] text-xs italic mt-1 transition-colors duration-400 hover:text-[#e35342]" style={{ fontWeight: 400 }}>
                Where Brands Grow
              </p>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-[#6B6B6B] transition-all duration-400 hover:text-[#e35342] group relative"
              whileHover={{ y: prefersReducedMotion ? 0 : -2 }}
              whileTap={{ y: 0 }}
              aria-label="Back to top"
              style={{ fontWeight: 400 }}
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowUp className="w-4 h-4" />
              </motion.div>
              Back to top
              
              {/* Underline animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#e35342] origin-left"
              />
            </motion.button>
          </motion.div>
        </div>
      </footer>

      {/* Render modal using createPortal for guaranteed visibility */}
      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}