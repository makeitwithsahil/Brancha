import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, TrendingUp } from 'lucide-react';
import { useEffect, useMemo, useCallback, memo } from 'react';

const problems = [
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: "Customers can't find you when they're ready to buy",
    description: "When someone searches for your service right now, they find outdated details or a website that looks unprofessional. They call your competitor instead. You never know you lost them."
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: "Weak online presence means lower prices and margins",
    description: "If your brand doesn't look credible online, customers don't trust you enough to pay full price. They negotiate harder, ask for discounts, or just walk away to someone who looks more established."
  },
  {
    icon: <AlertCircle className="w-5 h-5" />,
    title: "No system means unpredictable revenue",
    description: "Without proper online management, enquiries are random. Good months and slow months happen by chance. You can't grow a business when you don't control where customers come from."
  }
];

const foundationPackages = [
  {
    name: "Basic",
    tagline: "Stop losing customers who are already searching for you",
    solves: ["Wrong contact details online", "No clear way to reach you", "Website that doesn't build trust"],
    delivers: ["Complete online presence audit", "Google Business Profile setup and correction", "WhatsApp Business for faster responses", "Brand clarity fixes", "One-page website built to get calls", "QR code for menu or contact card"],
    result: "Customers who search for you will actually reach you and contact you"
  },
  {
    name: "Pro",
    tagline: "Get better customers who pay more and negotiate less",
    solves: ["Customers only asking about price", "Being compared to every competitor", "Website visitors who don't convert"],
    delivers: ["Everything in Basic", "Clear brand positioning that justifies your pricing", "Professional logo and brand identity", "Menu or service design that increases value perception", "3–5 page website designed to convert visitors", "Sales-focused copywriting throughout", "Competitor research and analysis", "30 days of content direction"],
    result: "Higher-quality enquiries, better average order value, less price resistance",
    popular: true
  },
  {
    name: "Growth",
    tagline: "Build systems that bring predictable customers",
    solves: ["Ad spending with unclear returns", "No way to track where enquiries come from", "Lost leads because there's no follow-up"],
    delivers: ["Everything in Pro", "Backend systems for lead capture", "Analytics and conversion tracking", "SEO foundation for organic growth", "Automated email and follow-up sequences", "Professional business photography"],
    result: "Measurable customer acquisition with clear return on every rupee spent"
  }
];

const monthlyPackages = [
  {
    name: "Basic",
    tagline: "Maintain your presence so customers keep coming",
    includes: ["Google Business updates and ranking improvements", "Review management to build trust", "Website updates and security", "Seasonal and festival updates", "Monthly performance reports", "Improvement recommendations"],
    result: "Steady baseline of enquiries without customer loss"
  },
  {
    name: "Pro",
    tagline: "Generate consistent enquiries every single month",
    includes: ["Everything in Basic", "Instagram and Facebook management", "Professional content creation", "4–6 reels edited and posted monthly", "SEO improvements for better ranking", "Meta or Google Ads management", "Customer feedback collection and response"],
    result: "Reliable flow of qualified enquiries that turn into revenue",
    popular: true
  },
  {
    name: "Growth",
    tagline: "Control exactly how many customers you get",
    includes: ["Everything in Pro", "Advanced ad optimization for lower costs", "Email remarketing to lost leads", "Conversion rate optimization", "Competitor monitoring and response", "Monthly strategy and planning calls"],
    result: "Predictable customer volume at the lowest possible cost per acquisition"
  }
];

const ProblemCard = memo(({ problem, index, prefersReducedMotion }) => (
  <article 
    className="group relative p-6 sm:p-7 bg-[#FAF9F7] border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5"
  >
    <div 
      className="w-11 h-11 sm:w-12 sm:h-12 mb-4 rounded-full bg-[#e2493b]/10 flex items-center justify-center text-[#e2493b] transition-all duration-300 group-hover:bg-[#e2493b] group-hover:text-white"
    >
      {problem.icon}
    </div>
    
    <h3 className="text-lg sm:text-xl font-medium text-[#1F1F1F] mb-3 leading-snug transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
      {problem.title}
    </h3>
    <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed transition-colors duration-300 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
      {problem.description}
    </p>
  </article>
));

const FoundationCard = memo(({ pkg, index, prefersReducedMotion }) => (
  <article 
    className={`group relative p-6 sm:p-7 bg-white rounded-2xl transition-all duration-300 ${pkg.popular ? 'border-2 border-[#e2493b] shadow-xl shadow-[#e2493b]/10' : 'border border-[#EFEDE9] hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5'}`}
  >
    {pkg.popular && (
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-[#e2493b] to-[#d34437] text-white text-xs font-semibold rounded-full tracking-wide whitespace-nowrap shadow-lg shadow-[#e2493b]/30"
        style={{ fontWeight: 600 }}
      >
        MOST POPULAR
      </div>
    )}
    
    <div className="mb-5 relative z-10">
      <h4 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-2 transition-colors duration-300 group-hover:text-[#e2493b]" style={{ letterSpacing: '-0.01em', fontWeight: 500 }}>
        {pkg.name}
      </h4>
      <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed italic" style={{ fontWeight: 400 }}>{pkg.tagline}</p>
    </div>

    <div className="mb-5 pb-5 border-b border-[#EFEDE9]">
      <p className="text-xs font-semibold text-[#e2493b] mb-3 tracking-wider uppercase" style={{ fontWeight: 600 }}>What it fixes:</p>
      <ul className="space-y-2">
        {pkg.solves.map((item, i) => (
          <li key={i} className="text-xs sm:text-sm text-[#6B6B6B] flex items-start gap-2" style={{ fontWeight: 400 }}>
            <span className="text-[#e2493b] mt-0.5 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mb-5">
      <p className="text-xs font-semibold text-[#1F1F1F] mb-3 tracking-wider uppercase" style={{ fontWeight: 600 }}>What you get:</p>
      <ul className="space-y-2.5">
        {pkg.delivers.map((item, i) => (
          <li 
            key={i} 
            className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#e2493b] flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="pt-5 border-t border-[#EFEDE9]">
      <p className="text-xs font-semibold text-[#1F1F1F] mb-2 tracking-wider uppercase" style={{ fontWeight: 600 }}>Business outcome:</p>
      <p className="text-xs sm:text-sm text-[#e2493b] font-medium leading-relaxed" style={{ fontWeight: 500 }}>{pkg.result}</p>
    </div>
  </article>
));

const MonthlyCard = memo(({ pkg, index, prefersReducedMotion }) => (
  <article 
    className={`group relative p-6 sm:p-7 bg-white rounded-2xl transition-all duration-300 ${pkg.popular ? 'border-2 border-[#e2493b] shadow-xl shadow-[#e2493b]/10' : 'border border-[#EFEDE9] hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5'}`}
  >
    {pkg.popular && (
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-[#e2493b] to-[#e2493b] text-white text-xs font-semibold rounded-full tracking-wide whitespace-nowrap shadow-lg shadow-[#e2493b]/30"
        style={{ fontWeight: 600 }}
      >
        MOST POPULAR
      </div>
    )}
    
    <div className="mb-5 relative z-10">
      <h4 className="text-xl sm:text-2xl font-medium text-[#1F1F1F] mb-2 transition-colors duration-300 group-hover:text-[#e2493b]" style={{ letterSpacing: '-0.01em', fontWeight: 500 }}>
        {pkg.name}
      </h4>
      <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed italic" style={{ fontWeight: 400 }}>{pkg.tagline}</p>
    </div>

    <div className="mb-5">
      <p className="text-xs font-semibold text-[#1F1F1F] mb-3 tracking-wider uppercase" style={{ fontWeight: 600 }}>Monthly work:</p>
      <ul className="space-y-2.5">
        {pkg.includes.map((item, i) => (
          <li 
            key={i} 
            className="flex items-start gap-2.5 transition-transform duration-200 hover:translate-x-1"
          >
            <CheckCircle2 className="w-4 h-4 text-[#e2493b] flex-shrink-0 mt-0.5" />
            <span className="text-xs sm:text-sm text-[#6B6B6B]" style={{ fontWeight: 400 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="pt-5 border-t border-[#EFEDE9]">
      <p className="text-xs font-semibold text-[#1F1F1F] mb-2 tracking-wider uppercase" style={{ fontWeight: 600 }}>Business outcome:</p>
      <p className="text-xs sm:text-sm text-[#e2493b] font-medium leading-relaxed" style={{ fontWeight: 500 }}>{pkg.result}</p>
    </div>
  </article>
));

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.title = 'Brancha - Where Brands Grow | Complete Online Presence for Local Businesses';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stop losing customers online. Brancha builds and manages a complete online presence for local businesses worldwide. Get consistent enquiries, not just designs.');
    }
  }, []);

  const renderProblemCard = useCallback((problem, index) => (
    <ProblemCard key={index} problem={problem} index={index} prefersReducedMotion={prefersReducedMotion} />
  ), [prefersReducedMotion]);

  const renderFoundationCard = useCallback((pkg, index) => (
    <FoundationCard key={index} pkg={pkg} index={index} prefersReducedMotion={prefersReducedMotion} />
  ), [prefersReducedMotion]);

  const renderMonthlyCard = useCallback((pkg, index) => (
    <MonthlyCard key={index} pkg={pkg} index={index} prefersReducedMotion={prefersReducedMotion} />
  ), [prefersReducedMotion]);

  return (
    <main className="bg-[#FAF9F7] overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" aria-hidden="true">
          <div 
            className="absolute inset-0" 
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 111 97 / 0.12) 1px, transparent 0)`, backgroundSize: '48px 48px' }}
          />
        </div>

        <div className="max-w-6xl pt-8 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e2493b]/5 border border-[#e2493b]/10 mb-6 sm:mb-8"
              >
                <TrendingUp className="w-3.5 h-3.5 text-[#e2493b]" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-medium text-[#e2493b] italic" style={{ letterSpacing: '0.01em', fontWeight: 500 }}>
                  Where Brands Grow
                </span>
              </div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} 
              className="text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-normal text-[#1F1F1F] mb-4 sm:mb-6 leading-[1.1]" 
              style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
            >
              Stop losing customers
              <br />
              <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>start growing consistently</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }} 
              className="text-base sm:text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed" 
              style={{ fontWeight: 400 }}
            >
              We build and manage a complete online presence for local businesses — so you get customers, not just designs.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button 
                  className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#f44839] to-[#d23d2c] rounded-full shadow-lg shadow-[#e2493b]/20 flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#e2493b]/30" 
                  aria-label="Get your free business audit"
                  whileHover={{ 
                    scale: prefersReducedMotion ? 1 : 1.03,
                    transition: { duration: 0.25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontWeight: 500 }}
                >
                  <span className="relative z-10">Get Your Free Audit</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>
              
              <Link to="/process" className="w-full sm:w-auto">
                <motion.button 
                  className="group relative w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-[#1F1F1F] bg-transparent border-2 border-[#EFEDE9] rounded-full overflow-hidden transition-all duration-300 hover:border-[#e2493b] hover:bg-[#e2493b]/5" 
                  aria-label="View our work and case studies"
                  whileHover={{ 
                    scale: prefersReducedMotion ? 1 : 1.03,
                    transition: { duration: 0.25 }
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{ fontWeight: 500 }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#e2493b]">How We Work</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
              Your business is <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>losing money right now</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
              These problems cost you real customers and real profit every day
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {problems.map(renderProblemCard)}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#FAF9F7]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
              How we work
            </h2>
            <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
              First, we fix your online presence properly. Then, we manage it every month so customers keep coming.
            </p>
          </div>

          {/* Foundation Package */}
          <div className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-10">
              <div 
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-3 sm:mb-4 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>Step 1 — One-Time</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-2" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>Foundation Package</h3>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>Stop losing customers by building proper online presence from scratch</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {foundationPackages.map(renderFoundationCard)}
            </div>
          </div>

          {/* Monthly Package */}
          <div>
            <div className="text-center mb-8 sm:mb-10">
              <div 
                className="inline-flex items-center px-4 sm:px-5 py-2 bg-[#e2493b]/10 rounded-full mb-3 sm:mb-4 transition-all duration-300 hover:shadow-md hover:shadow-[#e2493b]/10"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#e2493b] tracking-wider uppercase" style={{ fontWeight: 600 }}>Step 2 — Ongoing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F] mb-2" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>Monthly Management Package</h3>
              <p className="text-sm sm:text-base text-[#6B6B6B] max-w-2xl mx-auto" style={{ fontWeight: 400 }}>Keep customers coming with proper ongoing management</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {monthlyPackages.map(renderMonthlyCard)}
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-8 sm:mb-10 text-center leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
              Why one-time design <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>doesn't work</span>
            </h2>
            
            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg text-[#1F1F1F] leading-relaxed" style={{ fontWeight: 400 }}>
              <p className="transition-colors duration-300 hover:text-[#e2493b]/80">
                Most businesses get a website made once, then nothing changes for months. Meanwhile, Google details go outdated, customer reviews pile up unanswered, and competitors get stronger every week.
              </p>
              
              <p className="transition-colors duration-300 hover:text-[#e2493b]/80">
                Brancha builds the foundation properly first. Then we manage your complete online presence every month. This is why our clients get consistent enquiries instead of hoping a one-time website will keep working.
              </p>
              
              <p className="text-[#e2493b] italic" style={{ fontWeight: 500 }}>
                This is a system that works long-term, not a one-time project. Growing businesses need systems.
              </p>
            </div>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-4 sm:mb-5 leading-tight" style={{ letterSpacing: '-0.02em', fontWeight: 400 }}>
              Ready to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>fix your online presence?</span>
            </h2>
            <p className="text-base sm:text-lg text-[#6B6B6B] mb-7 sm:mb-8 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
              Get a free audit to see exactly where you're losing customers and how to fix it.
            </p>
            <Link to="/contact">
              <motion.button 
                className="group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-full shadow-xl shadow-[#e2493b]/25 inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#e2493b]/35" 
                aria-label="Get your free business audit now"
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.04,
                  transition: { duration: 0.25 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{ fontWeight: 500 }}
              >
                <span className="relative z-10">Get Your Free Audit</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}