import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const NavLink = memo(({ link, location, hoveredLink, onMouseEnter, onMouseLeave, prefersReducedMotion, index }) => {
  const isActive = location.pathname === link.path;
  const isHovered = hoveredLink === link.path;

  return (
    <Link key={link.path} to={link.path} aria-label={link.name}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative px-6 py-3 cursor-pointer overflow-hidden"
        onMouseEnter={() => onMouseEnter(link.path)}
        onMouseLeave={onMouseLeave}
      >
        {/* Text */}
        <span
          className={`relative z-10 text-[14px] font-medium tracking-[0.01em] transition-all duration-300 ${
            isActive ? 'text-[#e2493b]' : isHovered ? 'text-[#e2493b]' : 'text-[#6B6B6B]'
          }`}
          style={{
            fontWeight: isActive ? 600 : 500,
            letterSpacing: isHovered ? '0.05em' : '0.01em',
            textShadow: isActive ? '0 0 20px rgba(255, 111, 97, 0.15)' : 'none'
          }}
        >
          {link.name}
        </span>

        {/* Hover background */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.92
          }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-[#e2493b]/[0.06] via-[#e2493b]/[0.03] to-transparent"
          style={{
            boxShadow: isHovered ? '0 0 24px rgba(255, 111, 97, 0.08), inset 0 1px 0 rgba(255, 111, 97, 0.1)' : 'none'
          }}
        />

        {/* Active indicator */}
        <motion.div
          initial={false}
          animate={{
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 0,
            y: isActive ? 0 : 4
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-2 left-1/2 w-[5px] h-[5px] bg-[#e2493b] rounded-full -translate-x-1/2"
          style={{ 
            boxShadow: isActive ? '0 0 12px rgba(255, 111, 97, 0.8), 0 0 24px rgba(255, 111, 97, 0.4)' : 'none'
          }}
        />

        {/* Shine effect */}
        {isHovered && !prefersReducedMotion && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '200%', opacity: [0, 0.5, 0] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </motion.div>
    </Link>
  );
});

NavLink.displayName = 'NavLink';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Optimized scroll handler for low-end devices
  useEffect(() => {
    let rafId = null;
    let ticking = false;
    let lastScrollY = window.scrollY;
    let lastUpdate = 0;
    const threshold = 10;
    const minDelta = 5;
    const throttleMs = 32; // ~30fps for low-end devices

    const handleScroll = () => {
      if (!ticking) {
        const currentScrollY = window.scrollY;
        
        // Skip if scroll hasn't changed enough
        if (Math.abs(currentScrollY - lastScrollY) < minDelta) {
          return;
        }

        ticking = true;
        rafId = requestAnimationFrame(() => {
          const now = performance.now();
          
          // Throttle updates for performance
          if (now - lastUpdate >= throttleMs) {
            const shouldBeScrolled = currentScrollY > threshold;
            
            // Only update if state actually changes
            setIsScrolled(prev => {
              if (prev !== shouldBeScrolled) {
                return shouldBeScrolled;
              }
              return prev;
            });
            
            lastScrollY = currentScrollY;
            lastUpdate = now;
          }
          
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' }
  ], []);

  const handleMouseEnter = useCallback((path) => {
    if (!prefersReducedMotion) {
      setHoveredLink(path);
    }
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setHoveredLink(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-[#FAF9F7]/95 backdrop-blur-xl shadow-lg shadow-black/[0.03] border-b border-[#EFEDE9]/80'
            : 'bg-[#FAF9F7]/80 backdrop-blur-md'
        }`}
        style={{ 
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)',
          contain: 'layout style paint'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[76px] lg:h-[92px]">
            {/* Logo */}
            <Link to="/" aria-label="Brancha Home">
              <motion.div 
                className="cursor-pointer group"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <img 
                  src="/Brancha_Wordmark_logo.webp" 
                  alt="Brancha - Where Brands Grow" 
                  className="h-[32px] lg:h-[36px] w-auto transition-all duration-300 ease-out group-hover:opacity-80"
                  loading="eager"
                  fetchpriority="high"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.path}
                  link={link}
                  location={location}
                  hoveredLink={hoveredLink}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  prefersReducedMotion={prefersReducedMotion}
                  index={index}
                />
              ))}
            </div>

            {/* CTA Button */}
            <Link to="/contact" className="hidden lg:block" aria-label="Get Started">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ 
                  scale: prefersReducedMotion ? 1 : 1.04,
                  boxShadow: '0 8px 30px -4px rgba(255, 111, 97, 0.35), 0 0 0 1px rgba(255, 111, 97, 0.1)'
                }}
                whileTap={{ scale: 0.96 }}
                className="group relative px-8 py-3.5 text-[14px] font-semibold tracking-[0.02em] text-white bg-gradient-to-br from-[#e2493b] to-[#e35342] rounded-full overflow-hidden shadow-lg shadow-[#e2493b]/25"
                style={{
                  fontWeight: 600,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <span className="relative z-10 transition-all duration-300 ease-out group-hover:tracking-[0.08em]">
                  Get Started
                </span>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] via-[#e2493b] to-[#e35342] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Shimmer effect */}
                {!prefersReducedMotion && (
                  <motion.div
                    animate={{ 
                      x: ['0%', '200%'],
                      opacity: [0, 0.6, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: 'easeInOut'
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    style={{ pointerEvents: 'none' }}
                  />
                )}

                {/* Inner glow */}
                <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-[#EFEDE9]/50 active:bg-[#EFEDE9]"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="w-[20px] h-[14px] flex flex-col justify-between relative">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                    backgroundColor: isMobileMenuOpen ? '#e2493b' : '#1F1F1F'
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-[2px] rounded-full top-0"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scale: isMobileMenuOpen ? 0 : 1,
                    backgroundColor: '#1F1F1F'
                  }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full h-[2px] rounded-full top-[6px]"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                    backgroundColor: isMobileMenuOpen ? '#e2493b' : '#1F1F1F'
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-[2px] rounded-full top-[12px]"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Backdrop */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          backdropFilter: isMobileMenuOpen ? 'blur(8px) saturate(1.2)' : 'blur(0px)'
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-40 lg:hidden bg-gradient-to-b from-black/10 to-black/20 ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          y: isMobileMenuOpen ? 0 : -20,
          opacity: isMobileMenuOpen ? 1 : 0,
          scale: isMobileMenuOpen ? 1 : 0.95
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-50 lg:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{ top: '76px' }}
      >
        <div className="relative mx-6 mt-4 bg-white/98 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-[#EFEDE9]/50">
          <nav className="py-4">
            {navLinks.map((link, index) => (
              <Link key={link.path} to={link.path} aria-label={link.name}>
                <motion.div
                  initial={false}
                  animate={{
                    x: isMobileMenuOpen ? 0 : -20,
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                  transition={{ 
                    duration: 0.25, 
                    delay: isMobileMenuOpen ? index * 0.04 : 0,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`relative mx-3 mb-2 last:mb-0 rounded-2xl transition-all duration-200 active:scale-[0.97] ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-[#e2493b]/10 via-[#e2493b]/5 to-transparent shadow-sm shadow-[#e2493b]/5'
                      : 'bg-transparent active:bg-[#EFEDE9]/50'
                  }`}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {location.pathname === link.path && (
                    <motion.div 
                      layoutId="mobile-active-indicator"
                      className="absolute left-4 top-1/2 w-1.5 h-1.5 rounded-full bg-[#e2493b] -translate-y-1/2"
                      style={{ boxShadow: '0 0 12px rgba(255, 111, 97, 0.6)' }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                  
                  <div className={`px-6 py-4 ${location.pathname === link.path ? 'pl-9' : ''}`}>
                    <span 
                      className={`text-[15.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                        location.pathname === link.path 
                          ? 'text-[#e2493b]' 
                          : 'text-[#1F1F1F]'
                      }`}
                      style={{ fontWeight: location.pathname === link.path ? 600 : 500 }}
                    >
                      {link.name}
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </nav>

          <div className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-[#EFEDE9] to-transparent" />

          <motion.div 
            initial={false}
            animate={{
              y: isMobileMenuOpen ? 0 : 10,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.25, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-4"
          >
            <Link to="/contact" aria-label="Get Started">
              <button className="w-full rounded-2xl bg-gradient-to-br from-[#e2493b] to-[#e35342] shadow-lg shadow-[#e2493b]/20 active:scale-[0.97] transition-all duration-200 group overflow-hidden relative">
                <div className="px-6 py-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-[15.5px] font-semibold text-white tracking-[-0.01em]" style={{ fontWeight: 600 }}>
                      Get Started
                    </span>
                  </div>
                  <motion.svg
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </motion.svg>
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C94A3F] to-[#e2493b] opacity-0 group-active:opacity-100 transition-opacity duration-200" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        nav, button, a {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        button, a {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Performance optimizations for low-end devices */
        nav {
          transform: translate3d(0, 0, 0);
          will-change: auto;
        }

        @media (hover: hover) and (pointer: fine) {
          button:hover, a:hover {
            will-change: transform;
          }
        }

        /* GPU acceleration */
        motion-div, [data-framer-motion] {
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Reduce backdrop blur on low-end devices */
        @media (max-width: 768px) {
          .backdrop-blur-xl {
            backdrop-filter: blur(8px);
          }
          
          .backdrop-blur-md {
            backdrop-filter: blur(4px);
          }
        }

        /* Fallback for browsers without backdrop-filter */
        @supports not (backdrop-filter: blur(12px)) {
          .backdrop-blur-xl {
            background-color: rgba(250, 249, 247, 0.98);
          }
          
          .backdrop-blur-md {
            background-color: rgba(250, 249, 247, 0.92);
          }
        }

        /* Optimize shadow rendering */
        @media (max-width: 768px) {
          .shadow-lg {
            box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
          }
          
          .shadow-2xl {
            box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.1);
          }
        }

        /* Prevent layout shift during transitions */
        .fixed {
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Optimize text rendering on mobile */
        @media (max-width: 768px) {
          span, button, a {
            text-rendering: optimizeSpeed;
          }
        }
      `}</style>
    </>
  );
}