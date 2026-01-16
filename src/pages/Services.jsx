import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Phone, MessageSquare, Target, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import { serviceSchema, breadcrumbSchema } from '../utils/schemas';

export default function Services() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Services - Foundation & Monthly Packages | Brancha';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stop losing customers online. Brancha builds proper online presence first, then manages it every month to bring consistent enquiries.');
    }
  }, []);

  const toggleFaq = useCallback((index) => {
    setOpenFaqIndex(prev => prev === index ? null : index);
  }, []);

  const commonMistakes = [
    {
      mistake: "Building a website and expecting it to work forever",
      reality: "Websites need updates, maintenance, and content refresh. Without this, they become outdated and lose effectiveness within months."
    },
    {
      mistake: "Running social media posts without strategy",
      reality: "Random posts don't build trust or drive enquiries. You need consistent messaging and platform-specific content to see results."
    },
    {
      mistake: "Spending on ads without proper tracking",
      reality: "If you can't measure where customers come from, you can't improve. Ads without analytics waste money on the wrong audience."
    },
    {
      mistake: "Ignoring Google Business Profile",
      reality: "Most local customers find you through Google. Outdated hours, wrong contact info, or unanswered reviews directly lose you customers."
    }
  ];

  const whoBranchaIsFor = [
    {
      icon: <Target className="w-5 h-5" />,
      type: "Perfect For",
      businesses: [
        "Cafés and restaurants wanting more walk-ins",
        "Clinics and hospitals needing better patient enquiries",
        "Gyms and fitness studios looking to fill memberships",
        "Salons and spas attracting premium customers",
        "Retail stores driving online and offline footfall",
        "Service businesses building trust online"
      ]
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      type: "Not For",
      businesses: [
        "Viral-first or entertainment-focused brands",
        "Influencer-led personal brands",
        "Businesses wanting cheap template work",
        "Companies only needing posts or logos",
        "Brands focused on trends over stability",
        "Those looking for one-time work without partnership"
      ]
    }
  ];

  const foundationLevels = [
    {
      name: "BASIC",
      tagline: "Stop losing customers to simple problems",
      duration: "one-time investment",
      timeline: "7-10 business days",
      problems: [
        "Customers searching for you but can't find correct information",
        "Phone numbers wrong or not working",
        "WhatsApp messages going unanswered",
        "Google showing wrong business hours or location",
        "No proper website to build initial trust"
      ],
      whatWeDeliver: [
        "Complete business presence audit (what's broken, what's missing)",
        "Google Business Profile optimization (correct details, photos, categories)",
        "WhatsApp Business professional setup with catalog and auto-replies",
        "Brand consistency (logo usage, color system, basic visual cleanup)",
        "Single-page conversion website (mobile-first, clear contact paths)",
        "QR code solution (menu, contact card, or product catalog)"
      ],
      youGet: "Accurate contact details everywhere. Customers can find you, call you, and message you without confusion.",
      bestFor: "New cafés, small salons, single-doctor clinics, neighborhood shops just starting online",
      included: ["Direct WhatsApp support", "7-day free fixes after delivery", "Basic SEO setup"]
    },
    {
      name: "PRO",
      tagline: "Build trust and attract quality customers",
      duration: "one-time investment",
      timeline: "14-21 business days",
      popular: true,
      problems: [
        "Getting enquiries but mostly price-shoppers",
        "Customers don't understand why you're worth the cost",
        "Website looks unprofessional compared to competitors",
        "Brand messaging unclear or inconsistent",
        "Losing customers to better-presented businesses"
      ],
      whatWeDeliver: [
        "Everything in Basic package",
        "Brand strategy and positioning (why customers should choose you)",
        "Professional logo system and full brand kit (colors, fonts, usage rules)",
        "Menu or service catalog redesign (value-focused, not price-focused)",
        "Multi-page website (3-5 pages) with clear customer journey",
        "Persuasive copywriting (trust-building, conversion-focused)",
        "Competitor research (what they do right, where you can win)",
        "Content strategy for first 30 days (what to post, when, why)"
      ],
      youGet: "Higher quality enquiries. Customers understand your value before contacting. Less price negotiation, more trust.",
      bestFor: "Established restaurants, multi-chair salons, specialty clinics, growing gyms wanting premium positioning",
      included: ["Everything in Basic", "14-day free revisions", "Brand guidelines document", "Content templates"]
    },
    {
      name: "GROWTH",
      tagline: "Scale with systems and data",
      duration: "one-time investment",
      timeline: "21-30 business days",
      problems: [
        "Running ads but can't tell if they work",
        "Spending money without knowing cost per customer",
        "No way to follow up with interested leads",
        "Missing data on where customers actually come from",
        "Can't scale because there's no tracking system"
      ],
      whatWeDeliver: [
        "Everything in Pro package",
        "Advanced website with lead capture and backend forms",
        "Complete analytics setup (Google Analytics, Meta Pixel, conversion tracking)",
        "Local SEO foundation (keyword research, technical optimization, GMB advanced)",
        "Automated follow-up system (email or WhatsApp sequences for leads)",
        "Professional business photoshoot (location, team, products, services)",
        "Conversion tracking on all customer touchpoints (calls, forms, WhatsApp)",
        "Monthly performance dashboard setup"
      ],
      youGet: "Clear numbers. You know exactly where customers come from, what they cost, and how to get more of them.",
      bestFor: "Multi-location businesses, hospitals, large retail stores, any business spending ₹30,000+ monthly on marketing",
      included: ["Everything in Pro", "30-day performance monitoring", "Training on dashboard use", "Priority support"]
    }
  ];

  const monthlyLevels = [
    {
      name: "BASIC",
      tagline: "Maintain what you've built",
      duration: "per month",
      whatWeManage: [
        "Google Business Profile updates (hours, services, holiday schedules, posts)",
        "Review monitoring and professional responses (build trust, handle complaints)",
        "Website security, updates, and performance monitoring",
        "Seasonal and festival content updates",
        "Monthly performance reports (what's working, what needs improvement)",
        "Recommendations for improvement based on data"
      ],
      youGet: "Your online presence stays accurate and active. Customers don't get confused or lost. You save hours of manual work every month.",
      bestFor: "Businesses that already have good online presence but need ongoing maintenance and optimization",
      reportIncludes: ["Google Business insights", "Website visitors and traffic sources", "Review summary", "Recommendations"]
    },
    {
      name: "PRO",
      tagline: "Generate consistent enquiries every month",
      duration: "per month",
      popular: true,
      whatWeManage: [
        "Everything in Basic package",
        "Instagram and Facebook content management (posts, stories, engagement)",
        "Professional content creation (graphics, captions, planning)",
        "4-6 reels edited and posted monthly (video content that actually converts)",
        "SEO improvements month-over-month (better rankings, more organic traffic)",
        "Meta or Google Ads management (budget separate, we optimize campaigns)",
        "Customer feedback collection and response (build credibility and trust)"
      ],
      youGet: "Regular enquiries without manual effort. Social media that builds trust. Ads that actually bring customers at lower cost per lead.",
      bestFor: "Growing businesses that want predictable customer flow without hiring a full marketing team",
      reportIncludes: ["Social media growth and engagement", "Ad performance and cost per lead", "SEO rankings", "Enquiry sources", "Action plan"]
    },
    {
      name: "GROWTH",
      tagline: "Control exactly how many customers you get",
      duration: "per month",
      whatWeManage: [
        "Everything in Pro package",
        "Advanced ad optimization (reduce cost per customer, increase conversion rates)",
        "Email remarketing to lost leads (bring back people who showed interest)",
        "Conversion rate optimization (make more visitors become customers)",
        "Competitor monitoring and strategic response (stay ahead of market changes)",
        "Monthly strategy and planning calls (review data, plan next steps)",
        "Priority support and faster turnaround times"
      ],
      youGet: "Predictable customer volume. Data-driven decisions. Clear ROI on every rupee spent. Full control over growth speed.",
      bestFor: "Established businesses ready to scale aggressively with proper systems and tracking",
      reportIncludes: ["Full funnel analysis", "Customer acquisition cost", "Lifetime value tracking", "Competitor insights", "Strategic roadmap"]
    }
  ];

  const investmentBreakdown = [
    {
      question: "Why can't I just get a website and handle the rest myself?",
      answer: "You can, but most business owners don't have time to manage Google profiles, respond to reviews, update content, track analytics, and optimize ads every month. That's why websites become outdated, rankings drop, and customers go to competitors who look more active and trustworthy."
    },
    {
      question: "Why do I need both Foundation and Monthly packages?",
      answer: "Foundation fixes what's broken and builds proper systems. Monthly management keeps it working. A car without maintenance breaks down. Your online presence is the same—it needs ongoing optimization, updates, and attention to keep bringing customers."
    },
    {
      question: "What if I only want social media management?",
      answer: "Social media alone won't fix customer loss if your Google profile is wrong, your website doesn't convert, or people can't find your contact details. We start with Foundation because scattered services don't solve the core problem."
    },
    {
      question: "How is this different from hiring a freelancer?",
      answer: "Freelancers work project-to-project. Brancha is a company with systems, accountability, and long-term focus. We don't disappear after delivery. We manage, track, improve, and stay responsible for results month after month."
    },
    {
      question: "Can I pause the monthly package if business is slow?",
      answer: "Yes, but that's exactly when you should keep it running. Slow months happen when your online presence weakens. Pausing management means falling behind competitors, losing rankings, and making the slow period worse."
    },
    {
      question: "What's the minimum commitment for monthly management?",
      answer: "3 months minimum. Real results need time. Rankings improve gradually. Trust builds slowly. Ads optimize over weeks. Expecting instant results in 30 days sets unrealistic expectations and wastes your money."
    },
    {
      question: "Do you work with businesses outside India?",
      answer: "Yes. Most of our work is done remotely. For Growth package photoshoots, we charge travel expenses separately or recommend local photographers we can coordinate with."
    }
  ];

  const comparisonTable = [
    {
      approach: "One-time website design",
      problem: "Gets outdated within months, no updates, loses effectiveness, wastes initial investment",
      branchaWay: "Foundation + ongoing management. Always current, always optimized, continuous improvement"
    },
    {
      approach: "Hiring multiple freelancers",
      problem: "No coordination, inconsistent quality, disappear mid-project, no accountability",
      branchaWay: "Single company managing everything. Consistent quality, clear accountability, long-term partnership"
    },
    {
      approach: "Running ads without tracking",
      problem: "Can't measure results, waste money on wrong audience, no optimization possible",
      branchaWay: "Full analytics setup first, then ads. Track every rupee spent and customer acquired"
    },
    {
      approach: "Random social media posts",
      problem: "No strategy, no trust-building, doesn't convert viewers into customers",
      branchaWay: "Strategic content calendar, conversion-focused posts, consistent brand messaging"
    },
    {
      approach: "Ignoring Google Business Profile",
      problem: "Customers find wrong information, call competitors instead, lose local search rankings",
      branchaWay: "Optimized GBP with regular updates, review management, local SEO improvements"
    }
  ];

  const renderMistakeCard = useCallback((mistake, index) => (
    <article
      key={index}
      className="group relative p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5"
    >
      <div
        className="w-11 h-11 sm:w-12 sm:h-12 mb-4 sm:mb-5 rounded-full bg-[#e2493b]/10 flex items-center justify-center text-[#e2493b] transition-all duration-300 group-hover:bg-[#e2493b] group-hover:text-white"
      >
        <AlertCircle className="w-5 h-5" />
      </div>

      <h3 className="text-base sm:text-lg font-medium text-[#1F1F1F] mb-3 leading-snug transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
        {mistake.mistake}
      </h3>
      <p className="text-sm text-[#6B6B6B] leading-relaxed transition-colors duration-300 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
        {mistake.reality}
      </p>
    </article>
  ), []);

  const renderAudienceCard = useCallback((audience, index) => (
    <article
      key={index}
      className="group relative p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5"
    >
      <div className="flex items-start gap-4 mb-5">
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            audience.type === "Perfect For" 
              ? 'bg-[#e2493b]/10 text-[#e2493b] group-hover:bg-[#e2493b] group-hover:text-white' 
              : 'bg-[#6B6B6B]/10 text-[#6B6B6B] group-hover:bg-[#6B6B6B] group-hover:text-white'
          }`}
        >
          {audience.icon}
        </div>

        <div>
          <h3 className="text-lg sm:text-xl font-medium text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
            {audience.type}
          </h3>
        </div>
      </div>

      <ul className="space-y-3">
        {audience.businesses.map((business, i) => (
          <li
            key={i}
            className="flex items-start gap-3"
          >
            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
              audience.type === "Perfect For" ? 'text-[#e2493b]' : 'text-[#6B6B6B]'
            }`} />
            <span className="text-sm text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
              {business}
            </span>
          </li>
        ))}
      </ul>
    </article>
  ), []);

  const renderFoundationCard = useCallback((pkg, index) => (
    <article
      key={index}
      className={`group relative p-6 sm:p-7 md:p-8 bg-white border-2 rounded-2xl transition-all duration-300 ${
        pkg.popular
          ? 'border-[#e2493b] shadow-lg shadow-[#e2493b]/10'
          : 'border-[#EFEDE9] hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-[#e2493b] text-white text-[10px] font-bold rounded-full shadow-md uppercase tracking-wider" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>
          MOST POPULAR
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-2" style={{ fontWeight: 500 }}>
          {pkg.name}
        </h3>
        <p className="text-sm text-[#6B6B6B] mb-4" style={{ fontWeight: 400 }}>
          {pkg.tagline}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
            {pkg.duration}
          </span>
        </div>
        <p className="text-xs text-[#6B6B6B] mt-2" style={{ fontWeight: 400 }}>
          Timeline: {pkg.timeline}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#1F1F1F] mb-3 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            Problems This Solves
          </p>
          <ul className="space-y-2">
            {pkg.problems.map((problem, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e2493b]" />
                <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {problem}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-[#1F1F1F] mb-3 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            What We Deliver
          </p>
          <ul className="space-y-2">
            {pkg.whatWeDeliver.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e2493b]" />
                <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-[#EFEDE9]">
          <p className="text-xs font-semibold text-[#1F1F1F] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            What You Get
          </p>
          <p className="text-sm text-[#e2493b] font-medium leading-relaxed" style={{ fontWeight: 500 }}>
            {pkg.youGet}
          </p>
        </div>

        <div className="pt-4 border-t border-[#EFEDE9] bg-[#FAF9F7] -mx-6 sm:-mx-7 md:-mx-8 -mb-6 sm:-mb-7 md:-mb-8 p-6 sm:p-7 md:p-8 rounded-b-2xl">
          <p className="text-xs font-semibold text-[#1F1F1F] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            Best For
          </p>
          <p className="text-sm text-[#6B6B6B] mb-4" style={{ fontWeight: 400 }}>
            {pkg.bestFor}
          </p>
          <div className="space-y-1.5">
            {pkg.included.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e2493b]" />
                <span className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  ), []);

  const renderMonthlyCard = useCallback((pkg, index) => (
    <article
      key={index}
      className={`group relative p-6 sm:p-7 md:p-8 bg-white border-2 rounded-2xl transition-all duration-300 ${
        pkg.popular
          ? 'border-[#e2493b] shadow-lg shadow-[#e2493b]/10'
          : 'border-[#EFEDE9] hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-[#e2493b] text-white text-[10px] font-bold rounded-full shadow-md uppercase tracking-wider" style={{ fontWeight: 700, letterSpacing: '0.05em' }}>
          MOST POPULAR
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-2" style={{ fontWeight: 500 }}>
          {pkg.name}
        </h3>
        <p className="text-sm text-[#6B6B6B] mb-4" style={{ fontWeight: 400 }}>
          {pkg.tagline}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
            {pkg.duration}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-[#1F1F1F] mb-3 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            What We Manage
          </p>
          <ul className="space-y-2">
            {pkg.whatWeManage.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#e2493b]" />
                <span className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-[#EFEDE9]">
          <p className="text-xs font-semibold text-[#1F1F1F] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            What You Get
          </p>
          <p className="text-sm text-[#e2493b] font-medium leading-relaxed" style={{ fontWeight: 500 }}>
            {pkg.youGet}
          </p>
        </div>

        <div className="pt-4 border-t border-[#EFEDE9] bg-[#FAF9F7] -mx-6 sm:-mx-7 md:-mx-8 -mb-6 sm:-mb-7 md:-mb-8 p-6 sm:p-7 md:p-8 rounded-b-2xl">
          <p className="text-xs font-semibold text-[#1F1F1F] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            Best For
          </p>
          <p className="text-sm text-[#6B6B6B] mb-4" style={{ fontWeight: 400 }}>
            {pkg.bestFor}
          </p>
          <p className="text-xs font-semibold text-[#1F1F1F] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
            Monthly Report Includes
          </p>
          <div className="space-y-1.5">
            {pkg.reportIncludes.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#e2493b]" />
                <span className="text-xs text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  ), []);

  return (
    <>
      <SEO
        title="Services - Foundation & Monthly Packages | Brancha"
        description="Stop losing customers online. Brancha builds proper online presence first, then manages it every month to bring consistent enquiries."
        canonicalUrl="https://brancha.in/services"
        schema={[serviceSchema, breadcrumbSchema]}
      />

      <main className="min-h-screen bg-[#FAF9F7]">
        {/* Hero Section */}
        <section className="pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20 bg-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-6 sm:mb-8 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                    How Brancha Works
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
                Two packages. One complete system to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>stop losing customers</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto"
                style={{ fontWeight: 400 }}
              >
                Most businesses fail online because they get a website once, then nothing changes for months. Brancha builds your foundation properly first, then manages everything to bring consistent enquiries.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Why most businesses <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>waste money online</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
                These mistakes cost you customers every single day
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {commonMistakes.map(renderMistakeCard)}
            </div>
          </div>
        </section>

        {/* Who It's For Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Is Brancha right for <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>your business?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
                We work best with specific types of businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              {whoBranchaIsFor.map(renderAudienceCard)}
            </div>
          </div>
        </section>

        {/* Foundation Package Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <div
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-4 sm:mb-5 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                  Step 1 — One-Time
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Foundation Package
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Stop losing customers by building proper online presence from scratch
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-6">
              {foundationLevels.map(renderFoundationCard)}
            </div>
          </div>
        </section>

        {/* Monthly Package Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <div
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-4 sm:mb-5 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>
                  Step 2 — Ongoing
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Monthly Management Package
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Keep customers coming with proper ongoing management
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pt-6">
              {monthlyLevels.map(renderMonthlyCard)}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-[#FAF9F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                Investment & Pricing Questions
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Clear, honest answers to common questions about cost and commitment
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {investmentBreakdown.map((item, index) => (
                <div
                  key={index}
                  className="group bg-white border border-[#EFEDE9] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#e2493b]/30 hover:shadow-md hover:shadow-[#e2493b]/5"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                    aria-expanded={openFaqIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-base font-medium text-[#1F1F1F] transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown className="w-5 h-5 text-[#e2493b] flex-shrink-0" aria-hidden="true" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaqIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                      >
                        <div className="px-6 pb-6">
                          <p className="text-sm text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-3" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                How Brancha Compares
              </h2>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Understanding the difference between typical approaches and the Brancha system
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-6">
              {comparisonTable.map((item, index) => (
                <article
                  key={index}
                  className="group grid md:grid-cols-3 gap-6 p-6 bg-[#FAF9F7] border border-[#EFEDE9] rounded-xl transition-all duration-300 hover:border-[#e2493b]/20 hover:shadow-md hover:shadow-[#e2493b]/5"
                >
                  <div>
                    <p className="text-xs font-semibold text-[#6B6B6B] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Typical Approach
                    </p>
                    <p className="text-base font-medium text-[#1F1F1F]" style={{ fontWeight: 500 }}>
                      {item.approach}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#e2493b] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      The Problem
                    </p>
                    <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#1F1F1F] mb-2 uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      Brancha Way
                    </p>
                    <p className="text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>
                      {item.branchaWay}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-[#FAF9F7]">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-5 sm:mb-6 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
                Still have <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>questions?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                We'll explain everything clearly, recommend what fits your business, and answer every question honestly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact">
                  <motion.button
                    className="group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-full shadow-xl shadow-[#e2493b]/25 inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#e2493b]/35"
                    aria-label="Schedule a call with Brancha"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span className="relative z-10">Schedule a Call</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>

                <a href="tel:+919825883015">
                  <motion.button
                    className="group px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-[#1F1F1F] bg-white border-2 border-[#EFEDE9] rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:border-[#e2493b] hover:shadow-md hover:shadow-[#e2493b]/10"
                    aria-label="Call Brancha at 98258 83015"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>Call: 98258 83015</span>
                  </motion.button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}