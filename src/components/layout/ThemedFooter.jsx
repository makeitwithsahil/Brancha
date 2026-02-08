import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin,
  Send, Check, Shield, FileText, Cookie, X, Youtube, Facebook
} from 'lucide-react';
import { useTheme } from '../../ThemeContext';
import { storage, userPreferences } from '../../utils/storage';

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
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
    scale: 0.95,
    y: 20,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
  }
};

const FooterLink = memo(({ link, theme, isDarkFooter }) => {
  const linkColor = isDarkFooter ? '#9CA3AF' : '#6B6B6B';

  return (
    <li>
      <Link to={link.path}>
        <motion.div 
          whileHover={{ x: 4 }}
          className="flex items-center gap-2 group cursor-pointer py-1.5"
        >
          <span
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: linkColor }}
            onMouseEnter={(e) => e.target.style.color = theme.accentColor}
            onMouseLeave={(e) => e.target.style.color = linkColor}
          >
            {link.name}
          </span>
          <span
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm"
            style={{ color: theme.accentColor }}
          >
            →
          </span>
        </motion.div>
      </Link>
    </li>
  );
});

FooterLink.displayName = 'FooterLink';

const SocialLink = memo(({ social, theme, isDarkFooter }) => {

  return (
    <motion.a
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.name}
      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
      style={{
        backgroundColor: isDarkFooter ? '#2B2B2B' : '#F2F2F2',
        color: isDarkFooter ? '#F2F2F2' : '#2B2B2B'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${theme.accentColor}`;
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isDarkFooter ? '#2B2B2B' : '#F2F2F2';
        e.currentTarget.style.color = isDarkFooter ? '#F2F2F2' : '#2B2B2B';
      }}
    >
      {social.icon}
    </motion.a>
  );
});

SocialLink.displayName = 'SocialLink';

const PolicyButton = memo(({ policyKey, policy, onClick, theme, isDarkFooter }) => {

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(policyKey)}
      className="p-6 text-left border rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl h-full"
      style={{
        backgroundColor: isDarkFooter ? '#2B2B2B' : 'white',
        borderColor: isDarkFooter ? '#2B2B2B' : '#E5E5E5'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${theme.accentColor}80`;
        e.currentTarget.style.boxShadow = `0 8px 30px -4px ${theme.accentColor}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isDarkFooter ? '#2B2B2B' : '#E5E5E5';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${theme.accentColor}20`,
            color: theme.accentColor
          }}
        >
          {policy.icon}
        </div>
        <span
          className="text-sm font-bold"
          style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}
        >
          {policy.title}
        </span>
      </div>
      <p className="text-xs" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
        View policy details
      </p>
    </motion.button>
  );
});

PolicyButton.displayName = 'PolicyButton';

export default function Footer() {
  const theme = useTheme();
  
  // 🧠 STORAGE: Restore newsletter email from storage if user started typing before
  const [email, setEmail] = useState(() => {
    const saved = storage.get('newsletter_draft', { consent: false, temporary: true });
    return saved || '';
  });
  
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  
  // ⚡ PERFORMANCE: Memoize static values
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const copyrightText = useMemo(() => 
    currentYear === 2025 ? '© 2025' : `© 2025-${currentYear}`,
    [currentYear]
  );
  
  // Determine if footer background is dark (for text color contrast)
  const isDarkFooter = theme.footerBgColor && 
    !['#FFFFFF', '#FAF9F7', '#F7F9FA', '#E4E7EC'].includes(theme.footerBgColor);

  // 🧠 STORAGE: Save newsletter draft as user types
  useEffect(() => {
    if (email && !isSubscribed) {
      storage.set('newsletter_draft', email, { consent: false, temporary: true });
    }
  }, [email, isSubscribed]);

  const handleSubscribe = useCallback((e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      
      // Clear draft after successful subscribe
      storage.remove('newsletter_draft', { consent: false, temporary: true });
      
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

  // Custom SVG icons for X (Twitter) and Threads
  const XIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  const ThreadsIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 192 192" fill="currentColor">
      <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
    </svg>
  );

  // ✅ ALWAYS import social links from themeConfig
  const socialLinks = useMemo(() => [
    { name: 'Instagram', url: theme.socialLinks.instagram, icon: <Instagram className="w-5 h-5" strokeWidth={2} /> },
    { name: 'LinkedIn', url: theme.socialLinks.linkedin, icon: <Linkedin className="w-5 h-5" strokeWidth={2} /> },
    { name: 'Facebook', url: theme.socialLinks.facebook, icon: <Facebook className="w-5 h-5" strokeWidth={2} /> },
    { name: 'YouTube', url: theme.socialLinks.youtube, icon: <Youtube className="w-5 h-5" strokeWidth={2} /> },
    { name: 'X', url: theme.socialLinks.twitter, icon: <XIcon /> },
    { name: 'Threads', url: theme.socialLinks.threads, icon: <ThreadsIcon /> }
  ], [theme.socialLinks]);

  const contactInfo = useMemo(() => [
    {
      label: 'WhatsApp',
      value: theme.contactInfo.whatsapp,
      href: `https://wa.me/${theme.contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      )
    },
    {
      label: 'Phone',
      value: theme.contactInfo.phone,
      href: `tel:${theme.contactInfo.phone}`,
      icon: <Phone className="w-4 h-4" strokeWidth={2} />
    },
    {
      label: 'Support',
      value: theme.contactInfo.email,
      href: `mailto:${theme.contactInfo.email}`,
      icon: <Mail className="w-4 h-4" strokeWidth={2} />
    },
    {
      label: 'Partnership',
      value: theme.contactInfo.partnershipEmail,
      href: `mailto:${theme.contactInfo.partnershipEmail}`,
      icon: <Mail className="w-4 h-4" strokeWidth={2} />
    },
    {
      label: 'Location',
      value: theme.contactInfo.location,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(theme.contactInfo.location)}`,
      icon: <MapPin className="w-4 h-4" strokeWidth={2} />
    }
  ], [theme.contactInfo]);

  const policies = useMemo(() => {
    const departmentName = theme.name;
    const isGym = departmentName.includes('Gym');
    const isRealEstate = departmentName.includes('Real Estate');
    const isHealthcare = departmentName.includes('Healthcare');
    const isEducation = departmentName.includes('Education');
    
    return {
      privacy: {
        title: 'Privacy Policy',
        icon: <Shield className="w-5 h-5" strokeWidth={2} />,
        content: (
          <div className="space-y-5">
            <div>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                At {departmentName}, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you visit our website or use our services.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>1. Information We Collect</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-sm mb-1" style={{ color: isDarkFooter ? '#E5E7EB' : '#374151' }}>Personal Information</h5>
                  <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                    We collect information you provide directly, including: name, email address, phone number, business name, {isGym ? 'gym location, member count, and business goals' : isRealEstate ? 'property details, project information, and RERA registration number' : isHealthcare ? 'clinic/hospital name, specialty, patient volume, and DISHA compliance status' : isEducation ? 'institution name, student count, admission cycles, and operational details' : 'company information and business requirements'}.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-1" style={{ color: isDarkFooter ? '#E5E7EB' : '#374151' }}>Technical Information</h5>
                  <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                    We automatically collect device information, IP address, browser type, operating system, referring URLs, and page interaction data to improve our services and user experience.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>2. How We Use Your Information</h4>
              <ul className="space-y-2 text-sm" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Respond to inquiries and provide customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Deliver {isGym ? 'gym website development and lead generation services' : isRealEstate ? 'RERA-compliant websites and CRM solutions' : isHealthcare ? 'DISHA-compliant websites and patient automation systems' : isEducation ? 'student management and admission systems' : 'our specialized services'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Send newsletters, updates, and marketing communications (with your consent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Analyze website performance and user behavior to improve our platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Comply with legal obligations and prevent fraudulent activities</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>3. Data Sharing & Disclosure</h4>
              <p className="text-sm leading-relaxed mb-2" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Service providers who assist in website hosting, email delivery, and analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Legal authorities when required by law or to protect our rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Business partners with your explicit consent</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>4. Data Security</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your information from unauthorized access, alteration, or disclosure.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>5. Your Rights</h4>
              <p className="text-sm leading-relaxed mb-2" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                You have the right to:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Access, correct, or delete your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Opt-out of marketing communications at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Request a copy of the data we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Withdraw consent for data processing</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>6. Contact Us</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                For privacy-related questions or to exercise your rights, contact us at{' '}
                <a href={`mailto:${theme.contactInfo.email}`} style={{ color: theme.accentColor, fontWeight: 600 }}>
                  {theme.contactInfo.email}
                </a>
              </p>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: isDarkFooter ? '#374151' : '#E5E7EB' }}>
              <p className="text-xs italic" style={{ color: isDarkFooter ? '#6B7280' : '#9CA3AF' }}>
                Last Updated: February 2026
              </p>
            </div>
          </div>
        )
      },
      terms: {
        title: 'Terms of Service',
        icon: <FileText className="w-5 h-5" strokeWidth={2} />,
        content: (
          <div className="space-y-5">
            <div>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                Welcome to {departmentName}. By accessing or using our website and services, you agree to be bound by these Terms of Service. Please read them carefully before proceeding.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>1. Acceptance of Terms</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                By using our services, you acknowledge that you have read, understood, and agree to these Terms of Service, our Privacy Policy, and Cookie Policy. If you do not agree, please discontinue use immediately.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>2. Services Provided</h4>
              <p className="text-sm leading-relaxed mb-2" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                {departmentName} provides {isGym ? 'website development, lead generation systems, WhatsApp automation, and member tracking solutions specifically designed for gyms and fitness studios' : isRealEstate ? 'RERA-compliant website development, CRM systems, lead tracking, and ROI analytics for real estate developers and brokers' : isHealthcare ? 'DISHA-compliant website development, patient recall automation, appointment systems, and patient retention tools for healthcare providers' : isEducation ? 'student management systems, admission automation, communication platforms, and operational tools for educational institutions' : 'specialized technology solutions and services'}. We reserve the right to modify, suspend, or discontinue any service at our discretion.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>3. User Responsibilities</h4>
              <p className="text-sm leading-relaxed mb-2" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                You agree to:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Provide accurate and complete information during registration or inquiry</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Use our services only for lawful purposes and in accordance with these Terms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Not attempt to gain unauthorized access to our systems or networks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Not engage in activities that could harm, disable, or impair our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Respect intellectual property rights of {departmentName} and third parties</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>4. Intellectual Property</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                All content, features, and functionality on this website—including text, graphics, logos, images, code, and software—are the exclusive property of {departmentName} or its licensors. Unauthorized reproduction, distribution, or modification is strictly prohibited.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>5. Payment Terms</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                Service fees, payment schedules, and refund policies will be outlined in individual service agreements. All payments are subject to applicable taxes. Late payments may result in service suspension or termination.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>6. Limitation of Liability</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                {departmentName} provides services "as is" without warranties of any kind. We are not liable for indirect, incidental, consequential, or punitive damages arising from your use of our services, to the fullest extent permitted by law.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>7. Termination</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We reserve the right to suspend or terminate your access to our services at any time, with or without notice, for violations of these Terms or for any other reason we deem appropriate.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>8. Governing Law</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                These Terms are governed by the laws of India. Any disputes shall be resolved in the courts of Vadodara, Gujarat, India.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>9. Changes to Terms</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We may update these Terms from time to time. Continued use of our services after changes constitutes acceptance of the revised Terms. We will notify users of significant changes via email or website notice.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>10. Contact Information</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                For questions about these Terms, contact us at{' '}
                <a href={`mailto:${theme.contactInfo.email}`} style={{ color: theme.accentColor, fontWeight: 600 }}>
                  {theme.contactInfo.email}
                </a>
              </p>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: isDarkFooter ? '#374151' : '#E5E7EB' }}>
              <p className="text-xs italic" style={{ color: isDarkFooter ? '#6B7280' : '#9CA3AF' }}>
                Last Updated: February 2026
              </p>
            </div>
          </div>
        )
      },
      cookies: {
        title: 'Cookie Policy',
        icon: <Cookie className="w-5 h-5" strokeWidth={2} />,
        content: (
          <div className="space-y-5">
            <div>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                This Cookie Policy explains how {departmentName} uses cookies and similar tracking technologies to enhance your browsing experience, analyze site performance, and deliver personalized content.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>1. What Are Cookies?</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit our website. They help us recognize your device, remember your preferences, and improve your overall experience.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>2. Types of Cookies We Use</h4>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-sm mb-1" style={{ color: isDarkFooter ? '#E5E7EB' : '#374151' }}>Essential Cookies (Required)</h5>
                  <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. The website cannot function properly without these cookies.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-1" style={{ color: isDarkFooter ? '#E5E7EB' : '#374151' }}>Performance Cookies (Optional)</h5>
                  <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                    These cookies collect anonymous information about how visitors use our website, such as which pages are visited most often and if users receive error messages. This helps us optimize site performance and user experience.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-1" style={{ color: isDarkFooter ? '#E5E7EB' : '#374151' }}>Functionality Cookies (Optional)</h5>
                  <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                    These cookies allow the website to remember choices you make (such as form inputs, newsletter preferences, or {isGym ? 'gym location filters' : isRealEstate ? 'property search preferences' : isHealthcare ? 'appointment preferences' : isEducation ? 'institution type filters' : 'your settings'}) to provide a more personalized experience.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-sm mb-1" style={{ color: isDarkFooter ? '#E5E7EB' : '#374151' }}>Analytics Cookies (Optional)</h5>
                  <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                    We use analytics tools to understand user behavior, measure website traffic, and improve our services. These cookies help us track metrics like page views, session duration, and conversion rates.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>3. How We Use Cookies</h4>
              <ul className="space-y-2 text-sm" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Remember your consent preferences and user settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Restore form data if you navigate away mid-completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Track which departments or services you're most interested in</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Analyze website performance and identify areas for improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Understand user journey and optimize conversion paths</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Provide personalized recommendations based on your interests</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>4. Third-Party Cookies</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We may use third-party services such as Google Analytics, social media widgets, and embedded content that set their own cookies. These third parties have their own privacy policies governing the use of such information.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>5. Managing Your Cookie Preferences</h4>
              <p className="text-sm leading-relaxed mb-2" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                You have full control over cookie usage:
              </p>
              <ul className="space-y-2 text-sm" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Use our cookie consent banner to accept or reject optional cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Configure your browser settings to block or delete cookies</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Opt-out of third-party analytics via browser extensions or platform settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: theme.accentColor }}>•</span>
                  <span>Clear your browsing data regularly to remove stored cookies</span>
                </li>
              </ul>
              <p className="text-sm leading-relaxed mt-2" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                Note: Blocking essential cookies may affect website functionality and your ability to use certain features.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>6. Cookie Duration</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We use both session cookies (deleted when you close your browser) and persistent cookies (remain on your device for a set period). Most of our cookies expire after 12 months, but some may last longer for user convenience.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>7. Updates to This Policy</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                We may update this Cookie Policy periodically to reflect changes in technology, regulations, or our practices. We encourage you to review this policy regularly to stay informed about how we use cookies.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base mb-2" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>8. Questions or Concerns</h4>
              <p className="text-sm leading-relaxed" style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}>
                If you have questions about our use of cookies, please contact us at{' '}
                <a href={`mailto:${theme.contactInfo.email}`} style={{ color: theme.accentColor, fontWeight: 600 }}>
                  {theme.contactInfo.email}
                </a>
              </p>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: isDarkFooter ? '#374351' : '#E5E7EB' }}>
              <p className="text-xs italic" style={{ color: isDarkFooter ? '#6B7280' : '#9CA3AF' }}>
                Last Updated: February 2026
              </p>
            </div>
          </div>
        )
      }
    };
  }, [isDarkFooter, theme]);

  const modalContent = activeModal && (
    <AnimatePresence mode="wait">
      {activeModal && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
              style={{ backgroundColor: isDarkFooter ? '#0A0A0A' : 'white' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${theme.accentColor}20`,
                        color: theme.accentColor
                      }}
                    >
                      {policies[activeModal].icon}
                    </div>
                    <h3 className="text-2xl font-bold" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>
                      {policies[activeModal].title}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: isDarkFooter ? '#2B2B2B' : '#F2F2F2',
                      color: isDarkFooter ? '#F2F2F2' : '#0A0A0A'
                    }}
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" strokeWidth={2.5} />
                  </motion.button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  {policies[activeModal].content}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <footer 
        className="relative overflow-hidden w-full max-w-full"
        style={{ backgroundColor: theme.footerBgColor }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-8 w-full max-w-full">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12 w-full max-w-full">
            {/* Brand & Newsletter Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <Link to={theme.navLinks[0].path} aria-label={`${theme.name} Home`}>
                  <img 
                    src={theme.logoWithTagline}
                    alt={`${theme.name}`}
                    className="w-auto object-contain"
                    style={{
                      height: theme.name === 'Brancha' ? '52px' : '60px',
                      maxHeight: '60px'
                    }}
                    loading="lazy"
                  />
                </Link>
                {theme.name !== 'Brancha' && (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-px bg-gray-300" style={{ backgroundColor: isDarkFooter ? '#4B5563' : '#D1D5DB' }} />
                    <Link to="/" aria-label="Back to Brancha">
                      <span 
                        className="text-xs font-semibold tracking-wide hover:opacity-70 transition-opacity duration-200"
                        style={{ color: '#6B7280' }}
                      >
                        by Brancha
                      </span>
                    </Link>
                  </div>
                )}
              </div>
              <p 
                className="text-sm leading-relaxed max-w-md font-medium"
                style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}
              >
                {theme.footerDescription}
              </p>

              {/* Newsletter */}
              <div className="space-y-2">
                <h4 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}
                >
                  Stay Updated
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-64 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 font-medium"
                    style={{
                      backgroundColor: isDarkFooter ? '#2B2B2B' : '#F2F2F2',
                      borderColor: isDarkFooter ? '#2B2B2B' : '#E5E5E5',
                      color: isDarkFooter ? '#F2F2F2' : '#0A0A0A'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = theme.accentColor;
                      e.target.style.boxShadow = `0 0 0 3px ${theme.accentColor}20`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = isDarkFooter ? '#2B2B2B' : '#E5E5E5';
                      e.target.style.boxShadow = 'none';
                    }}
                    disabled={isSubscribed}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubscribed}
                    className="px-3 py-2 rounded-lg text-sm font-bold text-white transition-all duration-200 shadow-md flex-shrink-0"
                    style={{
                      backgroundColor: isSubscribed ? '#10b981' : theme.accentColor,
                      boxShadow: `0 4px 16px -2px ${isSubscribed ? '#10b981' : theme.accentColor}40`
                    }}
                  >
                    {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  </motion.button>
                </form>
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                <h4 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}
                >
                  Connect
                </h4>
                <div className="flex gap-2.5">
                  {socialLinks.map((social) => (
                    <SocialLink key={social.name} social={social} theme={theme} isDarkFooter={isDarkFooter} />
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(theme.footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-3">
                <h4 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}
                >
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <FooterLink key={link.name} link={link} theme={theme} isDarkFooter={isDarkFooter} />
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="space-y-3">
              <h4 
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}
              >
                Contact
              </h4>
              <div className="space-y-1.5">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors duration-200 group text-xs"
                    style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = theme.accentColor}
                    onMouseLeave={(e) => e.currentTarget.style.color = isDarkFooter ? '#9CA3AF' : '#6B6B6B'}
                  >
                    <div className="flex-shrink-0 opacity-70">
                      {info.icon}
                    </div>
                    <div className="flex items-baseline text-sm gap-2">
                      <span className="font-medium ">{info.label}:</span>
                      <span className="font-medium opacity-90" style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}>
                        {info.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Section */}
          <div 
            className="py-6 mb-6 border-t"
            style={{ borderColor: isDarkFooter ? '#2B2B2B' : '#E5E5E5' }}
          >
            <h4 
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: isDarkFooter ? '#F2F2F2' : '#0A0A0A' }}
            >
              Legal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-full">
              {Object.entries(policies).map(([key, policy]) => (
                <PolicyButton key={key} policyKey={key} policy={policy} onClick={openModal} theme={theme} isDarkFooter={isDarkFooter} />
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div 
            className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t w-full max-w-full"
            style={{ borderColor: isDarkFooter ? '#2B2B2B' : '#E5E5E5' }}
          >
            <div className="text-center sm:text-left">
              <p 
                className="text-sm font-medium mb-1"
                style={{ color: isDarkFooter ? '#9CA3AF' : '#6B6B6B' }}
              >
                {copyrightText} {theme.name}. All rights reserved.
              </p>
              <p
                className="text-xs font-bold italic"
                style={{ color: theme.accentColor }}
              >
                Where Brands Grow
              </p>
            </div>

            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg"
              style={{
                backgroundColor: isDarkFooter ? '#2B2B2B' : '#F2F2F2',
                color: isDarkFooter ? '#F2F2F2' : '#0A0A0A'
              }}
              aria-label="Back to top"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.accentColor;
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDarkFooter ? '#2B2B2B' : '#F2F2F2';
                e.currentTarget.style.color = isDarkFooter ? '#F2F2F2' : '#0A0A0A';
              }}
            >
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>
      </footer>

      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
