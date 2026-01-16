import { useMemo, useEffect, useState, lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Target, Users, TrendingUp, Shield, Award, CheckCircle2,
  Sparkles, Mail, ArrowRight, AlertCircle
} from 'lucide-react';

const SEO = lazy(() => import('../components/SEO'));
import { breadcrumbSchema } from '../utils/schemas';

const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    
    const element = document.getElementById('hero-section');
    if (element) {
      observer.observe(element);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return isVisible;
};

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const heroVisible = useIntersectionObserver();

  useEffect(() => {
    document.title = 'About Brancha - Where Brands Grow | Complete Online Presence Management';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Brancha stops customer loss for local businesses. We build proper online presence first, then manage it every month to bring consistent enquiries.');
    }
  }, []);

  const whatMakesBranchaDifferent = useMemo(() => [
    {
      icon: <Target className="w-5 h-5" aria-hidden="true" />,
      title: "A Company, Not a Short-Term Agency",
      description:
        "Brancha works as a long-term partner, not a project vendor. We manage and improve your online presence continuously, so it stays accurate, reliable, and effective."
    },
    {
      icon: <Shield className="w-5 h-5" aria-hidden="true" />,
      title: "One Clear System, Built in the Right Order",
      description:
        "We don't offer disconnected services. First, we fix the foundation. Then, we manage and optimise it over time. This ensures your time and money are spent where they actually matter."
    },
    {
      icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
      title: "Business Outcomes, Not Just Design",
      description:
        "Good design supports the business, but results matter more. Our work focuses on visibility, trust, and enquiries — not decoration or trends."
    },
    {
      icon: <Users className="w-5 h-5" aria-hidden="true" />,
      title: "Designed for Local Businesses",
      description:
        "Our approach reflects real market conditions — pricing sensitivity, local competition, and customer behaviour — with clear communication and practical execution."
    }
  ], []);

  const coreValues = useMemo(() => [
    {
      title: "Professional",
      description: "We communicate clearly, deliver on time, and treat your business with the seriousness it deserves."
    },
    {
      title: "Honest",
      description: "If something won't work for your business, we'll tell you. We don't upsell. We recommend what actually fits."
    },
    {
      title: "Calm & Focused",
      description: "No loud pitches. No pressure. No unnecessary complexity. Just clear systems that work."
    }
  ], []);

  const approachSteps = useMemo(() => [
    {
      step: "1",
      title: "We Listen First",
      description: "Before anything else, we understand your business. What's working? What's broken? What are customers actually saying? No templates. No assumptions."
    },
    {
      step: "2",
      title: "We Fix What's Broken",
      description: "Foundation Package comes first. We fix Google profiles, build proper websites, set up contact systems. This stops customer loss before we drive any traffic."
    },
    {
      step: "3",
      title: "We Manage What Works",
      description: "Monthly Result Package begins after Foundation. We keep everything current, optimized, and working. Updates, improvements, ads, content—handled."
    },
    {
      step: "4",
      title: "We Measure & Improve",
      description: "Every month, we track what's working. Cost per customer. Enquiry quality. Conversion rates. We adjust based on data, not guesses."
    }
  ], []);

  const teamMembers = useMemo(() => [
    {
      name: "Sahil",
      role: "Founder",
      color: "#e2493b",
      description: "Handles strategy, systems, and client direction. Ensures every project solves real business problems, not just design problems.",
      focus: [
        "Business strategy and positioning",
        "Foundation package structure",
        "Client communication and direction",
        "System design for growth"
      ],
      email: "workwiths4hil@gmail.com",
      portfolioUrl: "https://sahilmaurya.vercel.app/"
    },
    {
      name: "Saad",
      role: "Co-Founder",
      color: "#C94A3F",
      description: "Focuses on brand direction and visual judgment. Makes sure everything looks intentional, refined, and trustworthy.",
      focus: [
        "Brand tone and visual direction",
        "Design taste and restraint",
        "Trust and perception",
        "Long-term brand recall"
      ],
      email: "saadbombaywala9@gmail.com",
      portfolioUrl: "https://www.linkedin.com/in/saad-bombaywala-34a923382/"
    }
  ], []);

  const whyWeExist = useMemo(() => ({
    problem: "Most local businesses don't fail because of poor products. They fail because customers can't find correct information, Google profiles are weak, messages go unanswered, websites don't build trust, and ads are run without tracking.",
    solution: "Brancha exists to fix and manage these problems as a complete system. Foundation stops customer loss. Monthly management keeps customers coming consistently.",
    commitment: "We don't sell creativity. We sell clarity, control, and growth."
  }), []);

  const aboutSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://brancha.in/#organization',
        name: 'Brancha',
        url: 'https://brancha.in',
        logo: 'https://brancha.in/logo.png',
        description: 'A company that builds and manages the complete online presence of businesses',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Vadodara',
          addressRegion: 'Gujarat',
          addressCountry: 'IN'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+91-98258-83015',
          contactType: 'customer service'
        }
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' }
      ])
    ]
  }), []);

  return (
    <>
      <Suspense fallback={null}>
        <SEO
          title="About Brancha - Where Brands Grow | Complete Online Presence Management"
          description="Brancha stops customer loss for local businesses. We build proper online presence first, then manage it every month to bring consistent enquiries."
          canonicalUrl="https://brancha.in/about"
          schema={aboutSchema}
        />
      </Suspense>

      <main className="bg-[#FAF9F7] overflow-hidden">
        {/* Hero Section */}
        <section 
          id="hero-section" 
          className="relative pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 md:pb-20 overflow-hidden bg-white"
          aria-labelledby="hero-heading"
        >
          {heroVisible && (
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl"
              />
            </div>
          )}

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
                    About Brancha
                  </span>
                </div>
              </motion.div>

              <motion.h1
                id="hero-heading"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#1F1F1F] mb-4 sm:mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                A company that stops <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>customer loss</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto mb-7 sm:mb-9"
                style={{ fontWeight: 400 }}
              >
                {whyWeExist.problem}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl mx-auto p-6 sm:p-7 md:p-8 bg-[#FAF9F7] border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-[#e2493b]/5"
              >
                <p className="text-base sm:text-lg text-[#1F1F1F] mb-4 leading-relaxed" style={{ fontWeight: 400 }}>
                  {whyWeExist.solution}
                </p>
                <p className="text-sm sm:text-base text-[#e2493b] italic" style={{ fontWeight: 500 }}>
                  {whyWeExist.commitment}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What Makes Brancha Different */}
        <section 
          className="py-12 sm:py-16 md:py-20 bg-[#FAF9F7]"
          aria-labelledby="different-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 
                id="different-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                What makes Brancha <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>different</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
                Why businesses choose us over agencies and freelancers
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {whatMakesBranchaDifferent.map((item, index) => (
                <article
                  key={index}
                  className="group relative p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:border-[#e2493b]/30 hover:shadow-lg hover:shadow-[#e2493b]/5"
                >
                  <div
                    className="w-11 h-11 sm:w-12 sm:h-12 mb-4 sm:mb-5 rounded-full bg-[#e2493b]/10 flex items-center justify-center text-[#e2493b] transition-all duration-300 group-hover:bg-[#e2493b] group-hover:text-white"
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-base sm:text-lg font-medium text-[#1F1F1F] mb-3 leading-snug transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed transition-colors duration-300 group-hover:text-[#1F1F1F]" style={{ fontWeight: 400 }}>
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section 
          className="py-12 sm:py-16 md:py-20 bg-white"
          aria-labelledby="work-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 
                id="work-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                How we <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>work</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
                Our approach to building systems that bring consistent customers
              </p>
            </div>

            <div className="space-y-5 sm:space-y-6">
              {approachSteps.map((step, index) => (
                <article
                  key={index}
                  className="group relative"
                >
                  <div className="flex gap-5 sm:gap-6 p-6 sm:p-7 md:p-8 bg-[#FAF9F7] border border-[#EFEDE9] rounded-2xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-[#e2493b]/5 hover:border-[#e2493b]/20">
                    <div className="flex-shrink-0">
                      <div
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#e2493b] text-white flex items-center justify-center text-lg font-semibold"
                        style={{ fontWeight: 600 }}
                      >
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-[#1F1F1F] mb-3 transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                        {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section 
          className="py-12 sm:py-16 md:py-20 bg-[#FAF9F7]"
          aria-labelledby="values-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 
                id="values-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                Our <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>values</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
                These principles guide every decision we make
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {coreValues.map((value, index) => (
                <article
                  key={index}
                  className="group relative"
                >
                  <div className="h-full p-6 sm:p-7 md:p-8 bg-white border border-[#EFEDE9] rounded-2xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-[#e2493b]/5 hover:border-[#e2493b]/20">
                    <div
                      className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#e2493b]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#e2493b]/15"
                    >
                      <Award className="w-7 h-7 text-[#e2493b]" aria-hidden="true" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-medium text-[#1F1F1F] mb-3 transition-colors duration-300 group-hover:text-[#e2493b]" style={{ fontWeight: 500 }}>
                      {value.title}
                    </h3>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed" style={{ fontWeight: 400 }}>
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section 
          className="py-12 sm:py-16 md:py-20 bg-white"
          aria-labelledby="team-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center mb-10 sm:mb-12">
              <h2 
                id="team-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-3 sm:mb-4"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                Meet the <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>founders</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 400 }}>
                Two people building systems that actually work for businesses
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member, index) => (
                <article
                  key={index}
                  className="group"
                >
                  <a 
                    href={member.portfolioUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block h-full"
                    aria-label={`Visit ${member.name}'s portfolio`}
                  >
                    <div
                      className="h-full bg-white border border-[#EFEDE9] rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[#e2493b]/5 hover:border-[#e2493b]/20"
                    >
                      {/* Header */}
                      <div className="p-6 sm:p-7 md:p-8 border-b border-[#EFEDE9] bg-[#FAF9F7]">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: member.color }}
                            aria-hidden="true"
                          />
                          <span className="text-xs font-semibold tracking-wider text-[#6B6B6B] uppercase" style={{ fontWeight: 600 }}>
                            {member.role}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#1F1F1F]" style={{ letterSpacing: '-0.015em', fontWeight: 400 }}>
                          {member.name}
                        </h3>
                      </div>

                      {/* Body */}
                      <div className="p-6 sm:p-7 md:p-8">
                        <p className="text-sm sm:text-base text-[#6B6B6B] mb-6 leading-relaxed" style={{ fontWeight: 400 }}>
                          {member.description}
                        </p>

                        <ul className="space-y-3 mb-6" aria-label={`${member.name}'s focus areas`}>
                          {member.focus.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#e2493b] flex-shrink-0 mt-0.5" aria-hidden="true" />
                              <span className="text-sm text-[#1F1F1F]" style={{ fontWeight: 400 }}>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 border-t border-[#EFEDE9]">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-sm text-[#6B6B6B] transition-colors duration-300 hover:text-[#e2493b]"
                            style={{ fontWeight: 400 }}
                            aria-label={`Email ${member.name}`}
                          >
                            <Mail className="w-4 h-4" aria-hidden="true" />
                            <span className="break-all">{member.email}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-[#FAF9F7]"
          aria-labelledby="cta-heading"
        >
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-br from-[#e2493b]/5 via-[#e2493b]/2 to-transparent rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="text-center">
              <h2 
                id="cta-heading"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1F1F1F] mb-5 sm:mb-6 leading-tight"
                style={{ letterSpacing: '-0.02em', fontWeight: 400 }}
              >
                Ready to <span className="italic text-[#e2493b]" style={{ fontWeight: 500 }}>stop losing customers?</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6B6B6B] mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto" style={{ fontWeight: 400 }}>
                Let's talk about your business. We'll explain how Foundation + Monthly works and recommend what actually fits your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/contact" aria-label="Contact Brancha">
                  <motion.button
                    className="group relative px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-white bg-gradient-to-br from-[#e2493b] to-[#e2493b] rounded-full shadow-xl shadow-[#e2493b]/25 inline-flex items-center gap-2 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#e2493b]/35"
                    aria-label="Start a conversation with Brancha"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span className="relative z-10">Start a Conversation</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>

                <Link to="/services" aria-label="View Brancha services">
                  <motion.button
                    className="group px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-medium text-[#1F1F1F] bg-white border-2 border-[#EFEDE9] rounded-full inline-flex items-center gap-2 transition-all duration-300 hover:border-[#e2493b] hover:shadow-md hover:shadow-[#e2493b]/10"
                    aria-label="View Brancha services"
                    whileHover={{
                      scale: prefersReducedMotion ? 1 : 1.04
                    }}
                    whileTap={{ scale: 0.98 }}
                    style={{ fontWeight: 500 }}
                  >
                    <span>View Services</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}