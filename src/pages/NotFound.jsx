import { memo, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Home, Mail, Sparkles, ArrowRight, Search } from 'lucide-react';

// Optimized animation variants with reduced motion support
const createAnimationVariants = (prefersReducedMotion) => ({
  fadeInUp: {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: prefersReducedMotion ? 0.2 : 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  scaleIn: {
    initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      duration: prefersReducedMotion ? 0.2 : 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  float: {
    animate: prefersReducedMotion ? {} : {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  }
});

// Memoized background pattern component
const BackgroundPattern = memo(() => (
  <div 
    className="absolute inset-0 opacity-[0.015] pointer-events-none"
    style={{ willChange: 'auto' }}
  >
    <div 
      className="absolute inset-0"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0 / 0.08) 1px, transparent 0)`,
        backgroundSize: '56px 56px'
      }}
    />
  </div>
));

BackgroundPattern.displayName = 'BackgroundPattern';

// Memoized gradient blob component with optimized rendering
const GradientBlob = memo(({ prefersReducedMotion }) => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1100px] md:h-[1100px]"
      style={{
        background: 'radial-gradient(circle at center, rgba(255, 107, 107, 0.08) 0%, rgba(255, 142, 142, 0.04) 40%, transparent 70%)',
        filter: 'blur(80px)',
        willChange: 'auto'
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    />
  </div>
));

GradientBlob.displayName = 'GradientBlob';

// Memoized quick link component
const QuickLink = memo(({ link, index, prefersReducedMotion }) => (
  <a href={link.path} className="block">
    <motion.div
      className="group relative p-5 bg-white/80 backdrop-blur-sm border border-neutral-100 rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#FF6B6B]/40 hover:shadow-xl hover:shadow-[#FF6B6B]/8 cursor-pointer"
      whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.6 + index * 0.08,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/0 to-[#FF6B6B]/0 group-hover:from-[#FF6B6B]/5 group-hover:to-transparent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      
      <span className="relative text-sm font-medium text-neutral-700 group-hover:text-[#FF6B6B] transition-colors duration-500 flex items-center justify-between gap-3">
        <span className="tracking-wide">{link.name}</span>
        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
      </span>
    </motion.div>
  </a>
));

QuickLink.displayName = 'QuickLink';

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion();
  const animations = useMemo(() => createAnimationVariants(prefersReducedMotion), [prefersReducedMotion]);

  const quickLinks = useMemo(() => [
    { name: 'Portfolio', path: '/portfolio', icon: Search },
    { name: 'About Us', path: '/about', icon: Sparkles },
    { name: 'Services', path: '/services', icon: Sparkles },
    { name: 'Contact', path: '/contact', icon: Mail }
  ], []);

  return (
    <div className="bg-gradient-to-b from-neutral-50 via-white to-neutral-50 min-h-screen flex items-center justify-center overflow-hidden font-sans">
      <BackgroundPattern />
      <GradientBlob prefersReducedMotion={prefersReducedMotion} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-12 sm:py-16">
        
        {/* Status Badge */}
        <motion.div
          {...animations.fadeInUp}
          transition={{ delay: 0, ...animations.fadeInUp.transition }}
        >
          <div className="inline-flex sm:text-xs mt-14 items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg shadow-black/5 border border-neutral-200/80 mb-10 sm:mb-12">
            <Sparkles className="w-4 h-4 text-[#FF6B6B]" strokeWidth={2.5} />
            <span className="text-sm font-medium text-neutral-700 tracking-wide">
              404 • Page Not Found
            </span>
          </div>
        </motion.div>

        {/* Large 404 Display with floating animation */}
        <motion.div
          {...animations.scaleIn}
          transition={{ delay: 0.1, ...animations.scaleIn.transition }}
          className="mb-8 sm:mb-10"
        >
          <motion.div {...animations.float}>
            <h1 
              className="text-[140px] sm:text-[180px] md:text-[220px] lg:text-[280px] font-extralight text-transparent bg-clip-text bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-200 leading-none tracking-tighter select-none"
              style={{ 
                textShadow: '0 0 80px rgba(255, 107, 107, 0.08)',
                willChange: 'auto'
              }}
            >
              404
            </h1>
          </motion.div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          {...animations.fadeInUp}
          transition={{ delay: 0.2, ...animations.fadeInUp.transition }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 mb-5 sm:mb-6 tracking-tight leading-[1.1]">
            This page doesn't{' '}
            <span className="italic font-normal text-[#FF6B6B] inline-block">
              exist
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          {...animations.fadeInUp}
          transition={{ delay: 0.3, ...animations.fadeInUp.transition }}
          className="text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12 px-4"
        >
          The page you're looking for has been moved, deleted, or never existed. 
          Let's get you back to exploring.
        </motion.p>

        {/* Primary Action Buttons */}
        <motion.div
          {...animations.fadeInUp}
          transition={{ delay: 0.4, ...animations.fadeInUp.transition }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20"
        >
          <a href="/" className="w-full sm:w-auto">
            <motion.button
              className="group relative w-full sm:w-auto px-9 py-4 text-sm font-medium tracking-wide text-white bg-[#FF6B6B] rounded-full shadow-xl shadow-[#FF6B6B]/25 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-[#FF6B6B]/40"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="relative flex items-center justify-center gap-2.5">
                <Home className="w-4 h-4" strokeWidth={2.5} />
                Back to Home
              </span>
            </motion.button>
          </a>

          <a href="/contact" className="w-full sm:w-auto">
            <motion.button
              className="group w-full sm:w-auto px-9 py-4 text-sm font-medium tracking-wide text-neutral-700 bg-white/90 backdrop-blur-sm border border-neutral-300 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#FF6B6B]/50 hover:bg-white hover:shadow-lg hover:shadow-black/5"
              whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center justify-center gap-2.5">
                <Mail className="w-4 h-4 transition-transform duration-500 group-hover:rotate-12" strokeWidth={2.5} />
                Contact Support
              </span>
            </motion.button>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...animations.fadeInUp}
          transition={{ delay: 0.5, ...animations.fadeInUp.transition }}
          className="max-w-xs mx-auto mb-10 sm:mb-12"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          {...animations.fadeInUp}
          transition={{ delay: 0.5, ...animations.fadeInUp.transition }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-xs sm:text-sm text-neutral-500 mb-6 font-medium tracking-wider uppercase">
            Quick Navigation
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {quickLinks.map((link, index) => (
              <QuickLink 
                key={link.path} 
                link={link} 
                index={index}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </motion.div>

        {/* Help Text */}
        <motion.p
          {...animations.fadeInUp}
          transition={{ delay: 0.9, ...animations.fadeInUp.transition }}
          className="mt-12 sm:mt-16 text-sm text-neutral-500 max-w-md mx-auto leading-relaxed px-4"
        >
          Still can't find what you're looking for? 
          <a href="/contact" className="text-[#FF6B6B] hover:underline ml-1 font-medium transition-colors duration-300">
            Reach out to us
          </a>
          {' '}and we'll help you navigate.
        </motion.p>
      </div>
    </div>
  );
}