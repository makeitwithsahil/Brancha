import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin,
  Send, Check, Shield, FileText, Cookie
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px', amount: 0.15 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  whileInView: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 }
  },
  viewport: { once: true, margin: '-100px', amount: 0.1 }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      duration: 0.3, 
      ease: [0.16, 1, 0.3, 1]
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    y: 20, 
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } 
  }
};

const FooterLink = memo(({ link }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <li>
      <Link to={link.path}>
        <div className="flex items-center gap-2 group cursor-pointer transition-transform duration-200 hover:translate-x-1">
          <span 
            className="text-sm text-[#6B6B6B] transition-colors duration-200 group-hover:text-[#e35342]" 
            style={{ fontWeight: 400 }}
          >
            {link.name}
          </span>
          <span className="text-[#e35342] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            →
          </span>
        </div>
      </Link>
    </li>
  );
});

FooterLink.displayName = 'FooterLink';

const SocialLink = memo(({ social }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <a
      href={social.url}
      target={social.url.startsWith('http') ? '_blank' : undefined}
      rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={social.name}
      className="relative w-11 h-11 rounded-full bg-[#EFEDE9] flex items-center justify-center text-[#6B6B6B] transition-all duration-200 hover:bg-[#e35342]/10 hover:text-[#e35342] hover:-translate-y-1 hover:shadow-md group overflow-hidden"
    >
      <div className="relative z-10 transition-transform duration-200 group-hover:scale-110">
        {social.icon}
      </div>
    </a>
  );
});

SocialLink.displayName = 'SocialLink';

const PolicyButton = memo(({ policyKey, policy, onClick }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <button
      onClick={() => onClick(policyKey)}
      className="group p-6 text-left bg-white border border-[#EFEDE9] rounded-xl transition-all duration-200 hover:border-[#e35342]/30 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col relative overflow-hidden active:scale-[0.98]"
    >
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-11 h-11 rounded-xl bg-[#e35342]/10 flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:bg-[#e35342]/15">
          <div className="text-[#e35342] transition-transform duration-200 group-hover:scale-110">
            {policy.icon}
          </div>
        </div>
        <span className="text-sm font-medium text-[#1F1F1F] transition-colors duration-200 group-hover:text-[#e35342]" style={{ fontWeight: 500 }}>
          {policy.title}
        </span>
      </div>
      <p className="text-xs text-[#6B6B6B] mt-auto transition-colors duration-200 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
        View policy details
      </p>
    </button>
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
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
      { name: 'Monthly Care Package', path: '/services' },
      { name: 'Complete System', path: '/services' }
    ],
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'How We Work', path: '/process' },
      { name: 'Blog', path: '/blog' },
      { name: 'Contact', path: '/contact' }
    ],
    Support: [
      { name: 'Common Questions', path: '/contact' },
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
      content: `At Brancha, we handle your information with care and respect your privacy.

Information We Collect:
We collect information you provide directly, such as your name, email address, phone number, and business details when you contact us or use our services. We also collect usage data through cookies and analytics to improve your experience on our website.

How We Use Your Information:
We use your information to provide and improve our services, respond to your inquiries, send relevant updates about your projects, and maintain the security of our systems. We do not sell or share your personal information with third parties for marketing purposes.

Data Protection:
We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction. Your information is stored securely and accessed only by authorized personnel who need it to provide our services.

Your Rights:
You have the right to access, correct, or delete your personal information at any time. You can also opt out of marketing communications while continuing to receive service-related updates. Contact us at support@brancha.in to exercise these rights.

Cookies:
We use cookies to enhance your browsing experience and understand how visitors use our website. You can control cookie preferences through your browser settings.

Changes to This Policy:
We may update this privacy policy periodically to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or email.

Contact Us:
If you have questions about this privacy policy or how we handle your information, please contact us at support@brancha.in.`
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `These terms govern your use of Brancha's services and website.

Services Overview:
Brancha provides digital presence management services for businesses in India, including website development, brand identity design, and ongoing maintenance support. Our services are delivered according to the specific package or agreement you select.

Client Responsibilities:
Clients are responsible for providing accurate information, timely feedback, and necessary content for their projects. You are also responsible for maintaining the confidentiality of any login credentials we provide and for all activities under your account.

Payment Terms:
Payment is due according to the terms specified in your service agreement. We accept payments through secure online methods. Late payments may result in service suspension until the account is brought current.

Intellectual Property:
Upon full payment, you own the final deliverables we create for you. However, we retain the right to display work in our portfolio and case studies unless otherwise agreed. You grant us permission to use your feedback and testimonials for marketing purposes.

Service Delivery:
We commit to delivering services within agreed timelines, subject to your timely cooperation and feedback. Delays caused by late responses or missing information from your end may extend project timelines accordingly.

Modifications and Cancellations:
Changes to agreed project scope may affect timelines and costs. Cancellation terms are outlined in your specific service agreement. We strive to be fair and reasonable in handling changes or cancellations.

Limitation of Liability:
While we work diligently to provide high-quality services, we cannot guarantee specific business results. Our liability is limited to the amount you paid for the specific service in question.

Termination:
Either party may terminate services according to the terms in the service agreement. Upon termination, you will receive any completed work, and payment obligations will be settled for work performed.

Disputes:
Any disputes will be handled through good faith negotiation first. If necessary, disputes will be resolved under the laws of India.

Contact:
For questions about these terms, contact us at support@brancha.in.`
    },
    cookies: {
      title: 'Cookie Policy',
      icon: <Cookie className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `This policy explains how Brancha uses cookies and similar technologies.

What Are Cookies:
Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and understand how you use our site.

Types of Cookies We Use:

Essential Cookies:
These cookies are necessary for the website to function properly. They enable core functionality such as page navigation and access to secure areas. The website cannot function properly without these cookies.

Analytics Cookies:
We use analytics cookies to understand how visitors interact with our website. This helps us improve user experience and identify areas for enhancement. These cookies collect information anonymously.

Functionality Cookies:
These cookies remember your preferences and choices to provide a more personalized experience when you return to our website.

Marketing Cookies:
With your consent, we may use cookies to deliver relevant content and measure the effectiveness of our communications.

Managing Cookies:
You can control and delete cookies through your browser settings. However, blocking certain cookies may affect website functionality. Most browsers allow you to refuse cookies or alert you when cookies are being sent.

Third-Party Cookies:
Some cookies on our site are set by third-party services such as Google Analytics. These services have their own privacy policies governing their use of information.

Updates:
We may update this cookie policy periodically. Changes will be posted on this page with an updated revision date.

Contact:
For questions about our use of cookies, contact us at support@brancha.in.`
    }
  }), []);

  const currentYear = new Date().getFullYear();

  const modalContent = activeModal && (
    <AnimatePresence mode="wait">
      <div
        className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4"
        onClick={closeModal}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)'
        }}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full sm:max-w-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            maxHeight: isMobile ? '90vh' : '85vh',
            height: isMobile ? '90vh' : 'auto',
            borderRadius: isMobile ? '20px 20px 0 0' : '16px'
          }}
        >
          <div className="flex-shrink-0 bg-white px-4 sm:px-6 py-4 sm:py-5 border-b border-[#EFEDE9] flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-11 h-11 rounded-xl bg-[#e35342]/10 flex items-center justify-center flex-shrink-0">
                <div className="text-[#e35342]">
                  {policies[activeModal].icon}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-[#1F1F1F] truncate" style={{ fontWeight: 600 }}>
                  {policies[activeModal].title}
                </h3>
                <p className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {policies[activeModal].lastUpdated}
                </p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="w-10 h-10 rounded-full bg-[#EFEDE9] flex items-center justify-center transition-all duration-200 hover:bg-[#e35342]/10 hover:text-[#e35342] flex-shrink-0 ml-2 active:scale-95"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">×</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
            <div
              className="text-[#1F1F1F] leading-relaxed whitespace-pre-line text-sm"
              style={{ fontWeight: 400 }}
            >
              {policies[activeModal].content}
            </div>
          </div>

          <div className="flex-shrink-0 bg-white px-4 sm:px-6 py-4 border-t border-[#EFEDE9]">
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-[#e35342] to-[#FF8577] rounded-full transition-all duration-200 hover:shadow-lg active:scale-95 relative overflow-hidden"
                style={{ fontWeight: 500 }}
              >
                Close
              </button>
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
          <motion.div
            className="py-12 sm:py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
              <Link to="/" className="inline-block group">
                <img
                  src="/Brancha_logo_with_tagline-png.webp"
                  alt="Brancha - Where Brands Grow"
                  className="h-20 sm:h-24 w-auto transition-opacity duration-200 group-hover:opacity-80"
                  loading="lazy"
                />
              </Link>

              <div className="space-y-3">
                <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-sm transition-colors duration-200 hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                  We build and maintain consistent online presence systems for service businesses across India, so you can focus on what you do best.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  Stay Informed
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 text-sm bg-white border border-[#EFEDE9] rounded-lg focus:outline-none focus:border-[#e35342] focus:ring-2 focus:ring-[#e35342]/20 transition-all duration-200"
                    style={{ fontWeight: 400 }}
                    disabled={isSubscribed}
                  />
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-[#e35342] text-white hover:bg-[#C94A3F] hover:shadow-lg active:scale-95'
                      }`}
                    style={{ fontWeight: 500 }}
                  >
                    {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </div>

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

            <motion.div variants={fadeInUp} className="space-y-4">
              <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                Contact
              </h4>
              <div className="space-y-3">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-2 text-[#6B6B6B] hover:text-[#e35342] transition-colors duration-200 group"
                  >
                    <div className="w-5 h-5 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-[#6B6B6B] mb-0.5" style={{ fontWeight: 400 }}>{info.label}</p>
                      <p className="text-sm font-medium break-words" style={{ fontWeight: 500 }}>{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="py-8 border-t border-[#EFEDE9]"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.3 }}
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

          <motion.div
            className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#EFEDE9]"
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 1 }}
          >
            <div className="text-center sm:text-left">
              <p className="text-[#6B6B6B] text-xs transition-colors duration-200 hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                © {currentYear} Brancha. All rights reserved.
              </p>
              <p className="text-[#6B6B6B] text-xs italic mt-1 transition-colors duration-200 hover:text-[#e35342]" style={{ fontWeight: 400 }}>
                Where Brands Grow
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-[#6B6B6B] transition-all duration-200 hover:text-[#e35342] hover:-translate-y-1 group relative"
              aria-label="Back to top"
              style={{ fontWeight: 400 }}
            >
              <ArrowUp className="w-4 h-4" />
              Back to top
              
              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#e35342] origin-left transition-transform duration-200 scale-x-0 group-hover:scale-x-100"
              />
            </button>
          </motion.div>
        </div>
      </footer>

      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}