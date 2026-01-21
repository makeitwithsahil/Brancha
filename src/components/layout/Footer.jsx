import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowUp, Mail, Phone, MapPin, Instagram, Linkedin,
  Send, Check, Shield, FileText, Cookie
} from 'lucide-react';

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
  const currentYear = new Date().getFullYear();

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
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/growwithbrancha' },
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
      content: `At Brancha, we take your privacy seriously and are committed to protecting your personal information.

About Brancha:
Brancha is a company that builds and manages complete online presence for businesses across India. We provide Foundation Packages (one-time) and Monthly Result Packages (ongoing) to help businesses stop losing customers online.

Information We Collect:
When you contact us or use our services, we collect:
- Contact information (name, email, phone number, business name)
- Business details (industry, location, services offered, current online presence)
- Communication records (emails, messages, call logs, support tickets)
- Website usage data (IP address, browser type, pages visited, time spent)
- Analytics and performance data when we manage your digital presence

We collect this information when you:
- Fill out contact forms or request consultations
- Sign up for Foundation or Monthly packages
- Communicate with us via email, phone, or WhatsApp
- Use our website or services
- Subscribe to our newsletters or updates

How We Use Your Information:
We use your information to:
- Provide Foundation Package services (website development, Google Business Profile setup, branding)
- Deliver Monthly Result Package services (social media management, content creation, ad management)
- Respond to inquiries and provide customer support
- Send project updates, performance reports, and service-related communications
- Improve our services and understand how clients use our platform
- Comply with legal obligations and prevent fraud

We do NOT:
- Sell your personal information to third parties
- Share your data for marketing purposes without consent
- Use your business data outside of providing our agreed services

Third-Party Services:
We may use trusted third-party services to deliver our work, including:
- Google Analytics for website analytics
- Meta Business Suite for social media management
- Google Workspace for email and communication
- Web3Forms for contact form submissions
- Cloud storage providers for secure data backup

These services have their own privacy policies and security measures.

Data Protection and Security:
We implement industry-standard security measures to protect your information:
- Secure encrypted connections (SSL/HTTPS)
- Access controls and authentication
- Regular security audits and updates
- Secure cloud storage with backup systems
- Limited access to authorized team members only

Data Retention:
- Active client data is retained for the duration of service and up to 2 years after service completion
- Communication records are kept for legal and quality purposes
- You can request data deletion at any time (subject to legal requirements)

Your Rights:
You have the right to:
- Access your personal information
- Correct or update your information
- Request deletion of your data
- Opt out of marketing communications
- Object to certain data processing
- Request data portability

To exercise these rights, contact us at support@brancha.in or workwithbrancha@gmail.com.

Children's Privacy:
Our services are designed for businesses and are not intended for individuals under 18 years of age. We do not knowingly collect information from children.

Changes to This Policy:
We may update this privacy policy to reflect changes in our practices or legal requirements. Significant changes will be communicated via email or website notification. The "Last updated" date will always reflect the most recent version.

Contact Information:
For questions about this privacy policy or how we handle your information:
Email: support@brancha.in
Phone: +91 98258 83015
WhatsApp: +91 92199 17186
Website: https://brancha.in

Governing Law:
This privacy policy is governed by the laws of India. Any disputes will be resolved under Indian jurisdiction.`
    },
    terms: {
      title: 'Terms of Service',
      icon: <FileText className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `These terms govern your use of Brancha's services and website. By using our services, you agree to these terms.

About Brancha:
Brancha is a company registered in India that provides digital presence management services to businesses. We operate remotely and serve clients primarily across Gujarat, Bengaluru, and other parts of India.

Services Overview:
Brancha provides two types of services:

1. Foundation Package (One-Time, Mandatory):
A one-time setup that fixes broken or confusing digital presence. This includes:
- Basic: Google Business Profile setup, WhatsApp Business, basic brand cleanup, 1-page website
- Pro: Everything in Basic plus brand positioning, logo system, 3-5 page website, copywriting
- Growth: Everything in Pro plus backend systems, analytics, SEO, email automation, photoshoot

2. Monthly Result Package (Ongoing):
Ongoing management to maintain presence and bring consistent customers. This includes:
- Basic: Google updates, review management, website maintenance
- Pro: Everything in Basic plus social media management, content creation, ads management
- Growth: Everything in Pro plus advanced optimization, email campaigns, strategy calls

Service Requirements:
- Foundation Package is mandatory before starting Monthly packages
- Both packages work together as a system
- Services are delivered according to agreed timelines in your service agreement
- Package features are subject to the specific tier selected

Client Responsibilities:
As a client, you are responsible for:
- Providing accurate business information and necessary content
- Timely feedback and approvals (within agreed timeframes)
- Access to required accounts (Google, social media, domain, hosting)
- Payment according to agreed terms
- Maintaining confidentiality of login credentials we provide
- Informing us of any business changes that affect online presence
- Cooperating during photoshoots, content creation, or other collaborative work

Payment Terms:
- Foundation Package: Payment terms are specified in your service agreement (typically 50% advance, 50% on completion)
- Monthly Package: Recurring monthly payments due at the start of each billing cycle
- Payment methods: Bank transfer, UPI, or other agreed secure methods
- Late payments may result in service suspension until account is current
- Ad budgets for Meta/Google Ads are separate and managed directly by client
- Refund policy is outlined in your specific service agreement

Timelines and Delivery:
- Foundation Package timelines: Depend on package tier and client responsiveness
- Monthly Package work: Delivered according to monthly schedules
- Delays caused by late responses, missing content, or lack of access may extend timelines
- We commit to reasonable timelines subject to your cooperation
- Rush requests may incur additional fees

Intellectual Property and Ownership:
Upon Full Payment:
- You own the final deliverables we create (websites, logos, designs, content)
- Source files are provided as agreed in your package
- We retain the right to display work in our portfolio and case studies
- You cannot resell or redistribute our work as templates or products

Ongoing Rights:
- Brancha retains ownership of our systems, processes, and methodologies
- You grant us permission to access your accounts to deliver services
- You grant us permission to use feedback, testimonials, and results for marketing
- Any pre-existing intellectual property you provide remains yours

Modifications and Scope Changes:
- Changes to agreed project scope may affect timelines and costs
- Additional features outside package scope will be quoted separately
- We maintain flexibility for minor improvements within reason
- Major changes require written approval and may involve additional charges

Cancellation and Termination:
Foundation Package:
- Cancellation before work begins: Full refund minus processing fees
- Cancellation during work: Refund of unused portion after deducting completed work
- Client receives all completed work upon settlement

Monthly Package:
- Either party may terminate with 30 days written notice
- Payment is due for the current billing cycle
- Access to accounts and files will be provided/returned as appropriate
- No refunds for partial months

Service Level and Guarantees:
We Guarantee:
- Professional, quality work aligned with agreed deliverables
- Timely communication and support during business hours
- Honest advice about what works and what doesn't
- Responsibility for our work and fixes if something is wrong

We Do NOT Guarantee:
- Specific business results (revenue, conversions, rankings)
- Viral content or specific engagement numbers
- First-page Google rankings or ad performance
- Results affected by market conditions, competition, or external factors

Our liability is limited to the amount paid for the specific service in question.

Limitation of Liability:
While we work diligently to provide high-quality services:
- We are not liable for business losses, lost profits, or indirect damages
- We are not responsible for third-party service outages (Google, Meta, hosting)
- We are not liable for content or images you provide
- Maximum liability is limited to fees paid for the affected service
- Force majeure events (natural disasters, pandemics, etc.) excuse performance delays

Confidentiality:
- We maintain confidentiality of your business information
- We do not share sensitive data with unauthorized parties
- You agree to keep our pricing, processes, and proprietary methods confidential
- This obligation continues after service termination

Account Access and Security:
- You are responsible for account security and password management
- Notify us immediately of any unauthorized access
- We are not liable for damages from compromised credentials you control
- We will use secure practices when handling your account access

Service Suspension:
We may suspend services if:
- Payments are overdue beyond grace period
- You violate these terms or engage in illegal activities
- You provide false or misleading information
- Continuing service would harm our reputation or operations

Communication and Support:
- Primary communication: Email (support@brancha.in, workwithbrancha@gmail.com)
- Support hours: Monday to Saturday, 10 AM - 7 PM IST
- Response time: Within 24-48 hours on business days
- WhatsApp: For quick queries and updates
- Strategy calls: As per package inclusions

Dispute Resolution:
In case of disputes:
1. First, attempt to resolve through direct communication with Brancha
2. If unresolved, engage in good faith negotiation
3. Mediation by a mutually agreed third party if needed
4. Legal disputes will be resolved under the laws of India
5. Jurisdiction: Courts in Vadodara, Gujarat, India

Changes to Terms:
- We may update these terms to reflect service changes or legal requirements
- Significant changes will be communicated via email
- Continued use of services after changes constitutes acceptance
- Current terms are always available on our website

Entire Agreement:
These terms, along with your specific service agreement, constitute the entire agreement between you and Brancha. Any modifications must be in writing and agreed by both parties.

Severability:
If any provision of these terms is found invalid, the remaining provisions continue in full effect.

Contact Information:
For questions about these terms:
Email: support@brancha.in
Phone: +91 98258 83015
WhatsApp: +91 92199 17186
Website: https://brancha.in

Business Details:
Brancha operates as a service-area business in India with remote service delivery. Primary focus areas include Gujarat and Bengaluru.`
    },
    cookies: {
      title: 'Cookie Policy',
      icon: <Cookie className="w-5 h-5" />,
      lastUpdated: 'Last updated: January 2026',
      content: `This policy explains how Brancha uses cookies and similar technologies on our website.

What Are Cookies:
Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit our website. They help us remember your preferences, understand how you use our site, and improve your browsing experience.

Why We Use Cookies:
We use cookies to:
- Keep the website functioning properly
- Remember your preferences and settings
- Understand how visitors interact with our content
- Improve website performance and user experience
- Analyze traffic and identify areas for improvement
- Provide relevant content and measure campaign effectiveness

Types of Cookies We Use:

1. Essential Cookies (Always Active):
These cookies are necessary for the website to function properly and cannot be disabled.
- Session management and navigation
- Security and authentication
- Form functionality and data submission
- Load balancing and performance
Without these cookies, core features like contact forms would not work.

2. Analytics Cookies (With Consent):
We use analytics cookies to understand visitor behavior and improve our services.
- Google Analytics: Tracks page views, session duration, bounce rates
- User flow and navigation patterns
- Device and browser information
- Geographic location (city/country level)
These cookies collect information anonymously and help us optimize content and user experience.

3. Functionality Cookies (With Consent):
These cookies remember your preferences for a better experience.
- Language preferences
- Display settings
- Previously viewed pages or services
- Form field auto-fill (where appropriate)

4. Marketing Cookies (With Your Consent):
We may use marketing cookies to deliver relevant content and measure effectiveness.
- Tracking ad campaign performance
- Remarketing to previous visitors
- Understanding which content leads to inquiries
- Measuring conversion rates from different sources
You can opt out of marketing cookies while still using the website.

Cookies We Use (Specific):
- Google Analytics (_ga, _gid, _gat): Website analytics and user behavior
- Session cookies: Temporary cookies for site functionality
- Preference cookies: Remember your choices and settings

How Long Cookies Last:
- Session cookies: Deleted when you close your browser
- Persistent cookies: Remain for a set period (typically 1-24 months)
- Some cookies expire after a single visit, others persist for future visits

Managing Your Cookie Preferences:
You have control over cookies on our website:

Browser Settings:
Most browsers allow you to:
- Block all cookies
- Block third-party cookies only
- Delete cookies after each session
- Set preferences for specific websites

Common browsers:
- Chrome: Settings > Privacy and Security > Cookies
- Firefox: Settings > Privacy & Security > Cookies
- Safari: Preferences > Privacy > Cookies
- Edge: Settings > Privacy > Cookies

Please note: Blocking essential cookies may prevent parts of the website from functioning properly.

Do Not Track Signals:
We respect Do Not Track (DNT) signals where possible. However, some third-party services may not honor DNT preferences.

Third-Party Cookies:
Some cookies on our site are set by third-party services we use:
- Google Analytics: For website analytics
- Google Ads: For conversion tracking (if you use our ads services)
- Social media platforms: If you interact with embedded content

These third parties have their own cookie policies:
- Google Privacy Policy: https://policies.google.com/privacy
- Meta Privacy Policy: https://www.facebook.com/privacy/

We do not control these third-party cookies. Please review their policies for more information.

Cookies and Personal Data:
While cookies collect information about your browsing:
- Most cookies do not collect personal information
- Analytics cookies are pseudonymous (IP addresses are anonymized)
- We do not use cookies to identify you personally unless you submit a form
- Cookie data is processed according to our Privacy Policy

Your Consent:
By using our website, you consent to our use of cookies as described in this policy. You can withdraw consent at any time by:
- Adjusting your browser settings
- Clearing existing cookies
- Contacting us to request data deletion

Our use of cookies complies with applicable data protection laws in India.

Mobile Apps and Similar Technologies:
If we develop mobile applications in the future, similar tracking technologies may be used. We will update this policy accordingly and provide clear consent mechanisms.

Changes to Cookie Policy:
We may update this cookie policy to:
- Reflect changes in our practices
- Comply with new legal requirements
- Add new features or services
- Improve clarity and transparency

Updates will be posted on this page with a revised "Last updated" date. Significant changes will be communicated via email to active clients.

Contact Us:
If you have questions about our use of cookies or this policy:
Email: support@brancha.in
Phone: +91 98258 83015
WhatsApp: +91 92199 17186
Website: https://brancha.in

Data Protection:
This cookie policy works alongside our Privacy Policy. For information about how we handle your personal data, please review our Privacy Policy.

Governing Law:
This cookie policy is governed by the laws of India. Any disputes will be resolved under Indian jurisdiction.`
    }
  }), []);

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
          {/* Main Footer Content - Reduced vertical padding */}
          <div className="py-8 sm:py-10 md:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
            {/* Brand Section - Reduced spacing */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="inline-block group">
                <img
                  src="/Brancha_logo_with_tagline-png.webp"
                  alt="Brancha - Where Brands Grow"
                  className="h-16 sm:h-20 w-auto transition-opacity duration-200 group-hover:opacity-80"
                  loading="lazy"
                />
              </Link>

              <div className="space-y-3">
                <p className="text-sm text-[#6B6B6B] leading-relaxed max-w-sm transition-colors duration-200 hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                  We build and maintain consistent online presence systems for service businesses across India, so you can focus on what you do best.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  Stay Informed
                </h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2.5 text-sm bg-white border border-[#EFEDE9] rounded-lg focus:outline-none focus:border-[#e35342] focus:ring-2 focus:ring-[#e35342]/20 transition-all duration-200"
                    style={{ fontWeight: 400 }}
                    disabled={isSubscribed}
                  />
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative overflow-hidden ${isSubscribed
                      ? 'bg-green-500 text-white'
                      : 'bg-[#e35342] text-white hover:bg-[#C94A3F] hover:shadow-lg active:scale-95'
                      }`}
                    style={{ fontWeight: 500 }}
                  >
                    {isSubscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  Connect
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <SocialLink key={social.name} social={social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                  {category}
                </h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <FooterLink key={link.name} link={link} />
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold tracking-wider text-[#1F1F1F] uppercase" style={{ fontWeight: 600 }}>
                Contact
              </h4>
              <div className="space-y-2.5">
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
            </div>
          </div>

          {/* Legal Section - Reduced padding */}
          <div className="py-6 border-t border-[#EFEDE9]">
            <h4 className="text-sm font-semibold tracking-wider text-[#1F1F1F] uppercase mb-4" style={{ fontWeight: 600 }}>
              Legal
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {Object.entries(policies).map(([key, policy]) => (
                <PolicyButton key={key} policyKey={key} policy={policy} onClick={openModal} />
              ))}
            </div>
          </div>

          {/* Bottom Bar - Reduced padding */}
          <div className="py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-[#EFEDE9]">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <p className="text-[#6B6B6B] text-xs transition-colors duration-200 hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                © {currentYear} Brancha. All rights reserved.
              </p>
              <p className="text-[#6B6B6B] text-xs italic mt-1 transition-colors duration-200 hover:text-[#e35342]" style={{ fontWeight: 400 }}>
                Where Brands Grow
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs text-[#6B6B6B] transition-all duration-200 hover:text-[#e35342] hover:-translate-y-1 group relative whitespace-nowrap"
              aria-label="Back to top"
              style={{ fontWeight: 400 }}
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to top</span>

              <div
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#e35342] origin-left transition-transform duration-200 scale-x-0 group-hover:scale-x-100"
              />
            </button>
          </div>
        </div>
      </footer>

      {typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}