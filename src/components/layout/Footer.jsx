import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin,
  Send, Check, PenTool, Palette, Layout,
  Video, Megaphone, Settings, X, FileText, Shield, Cookie, MessageSquare
} from 'lucide-react';

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

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const openModal = (modal) => {
    setActiveModal(modal);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [activeModal]);

  const footerLinks = {
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
  };

  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/getbrancha/', icon: <Instagram className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/brancha/', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'Email', url: 'mailto:support@brancha.in', icon: <Mail className="w-5 h-5" /> },
    { name: 'Call', url: 'tel:+919825883015', icon: <Phone className="w-5 h-5" /> },
    { name: 'WhatsApp', url: 'https://wa.me/919219917186', icon: <MessageSquare className="w-5 h-5" /> }
  ];

  const contactInfo = [
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
  ];

  const policies = {
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
      content: `By using Brancha’s services, you agree to the following terms:

Service Agreement:
• All projects require a documented agreement
• Payment terms are defined in each proposal
• Urgent or rush projects may involve additional charges

Intellectual Property:
• Clients own final deliverables after full payment
• Brancha may showcase completed work in its portfolio
• Source files can be shared upon request unless stated otherwise

Project Timeline:
• Timelines are estimates based on project scope
• Delays in client feedback may affect delivery dates
• Changes in scope can impact timelines and costs

Revisions:
• Standard projects include 2–3 revision rounds
• Additional revisions may be billed separately
• Major scope changes require a revised agreement

Refund Policy:
• Deposits are non-refundable
• Refunds are reviewed on a case-by-case basis
• Work completed up to the cancellation point will be billed

For any questions, please contact Brancha before proceeding.`,
      lastUpdated: 'Last updated: 26 December 2025'
    },

    'cookie-policy': {
      title: 'Cookie Policy',
      icon: <Cookie className="w-6 h-6" />,
      content: `We use cookies to improve your browsing experience and understand how our website is used.

What Are Cookies:
Cookies are small text files stored on your device that help improve functionality and performance.

Types of Cookies We Use:
• Essential cookies for core website functionality
• Analytics cookies to understand user behaviour
• Marketing cookies for relevant content (where applicable)

Managing Cookies:
You can manage or disable cookies through your browser settings. Disabling certain cookies may affect site performance.

Third-Party Cookies:
Some third-party tools (such as analytics services) may place their own cookies.

Your Consent:
By continuing to use our website, you consent to the use of cookies described in this policy.`,
      lastUpdated: 'Last updated: 26 December 2025'
    },

    'refund-policy': {
      title: 'Refund Policy',
      icon: <Settings className="w-6 h-6" />,
      content: `Our refund policy is designed to be fair and transparent.

Project Deposits:
• A 50% deposit is required to begin work
• Deposits are non-refundable
• This secures project scheduling and resources

Mid-Project Cancellation:
• Completed work will be billed
• Any unused portion may be reviewed for refund
• Decisions are made on a case-by-case basis

Dissatisfaction Policy:
• Multiple revision rounds are provided
• We prioritise open communication to resolve concerns
• Refunds may be considered if expectations cannot be met

Refund Process:
• Requests must be submitted via email
• Reviewed within 5–7 business days
• Approved refunds processed within 10–14 days

Service Issues:
• Technical failures: full refund considered
• Delays from our side: compensation discussed
• Uncontrollable events: prorated refund may apply`,
      lastUpdated: 'Last updated: 26 December 2025'
    }
  };


  return (
    <>
      <footer className="bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24">
          {/* Main footer content */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 pb-10 sm:pb-12 md:pb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
          >
            {/* Brand section */}
            <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-5 sm:space-y-6">
              <Link to="/" className="inline-block group">
                <motion.h2
                  className="text-3xl sm:text-4xl font-light tracking-tight text-neutral-900 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  Brancha
                </motion.h2>
              </Link>
              <p className="text-sm sm:text-[15px] text-neutral-600 leading-relaxed font-light tracking-[-0.01em] max-w-md">
               A creative design studio crafting thoughtful digital experiences that strengthen brands and support business growth.
              </p>

              {/* Social links */}
              <div className="flex flex-wrap gap-3 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target={social.name === 'Email' || social.name === 'Call' ? '_self' : '_blank'}
                    rel={social.name === 'Email' || social.name === 'Call' ? '' : 'noopener noreferrer'}
                    className="group w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center transition-all duration-300 hover:border-[#FF6B6B] hover:bg-[#FF6B6B]/5 hover:shadow-lg hover:shadow-[#FF6B6B]/10"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <div className="text-neutral-600 group-hover:text-[#FF6B6B] transition-colors duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Newsletter */}
              <div className="pt-4">
                <form onSubmit={handleSubscribe} className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 pr-12 sm:pr-14 text-sm sm:text-[15px] bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]/20 focus:border-[#FF6B6B] transition-all duration-300 placeholder:text-neutral-400"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FF6B6B] text-white flex items-center justify-center transition-all duration-300 hover:bg-[#FF8E8E] disabled:opacity-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </motion.button>
                </form>
                <p className="mt-2 text-[11px] sm:text-xs text-neutral-500 font-light">
                  Subscribe for design insights and updates
                </p>
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
                    <li key={link.name}>
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
                <motion.button
                  key={key}
                  onClick={() => openModal(key)}
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
                © {new Date().getFullYear()} Brancha Design Studio. All rights reserved.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 sm:gap-4 mt-2 text-neutral-500 text-[10px] sm:text-xs font-light">
                <span>Premium Design Partner</span>
                <div className="w-1 h-1 rounded-full bg-neutral-300"></div>
                <span>Vadodara, Gujarat</span>
              </div>
            </div>

            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs sm:text-sm font-light tracking-[-0.01em] text-neutral-400 transition-colors duration-300 hover:text-[#FF6B6B]"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
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
            {/* Backdrop */}
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