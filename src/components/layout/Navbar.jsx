import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

const NavLink = memo(({ link, location, hoveredLink, onMouseEnter, onMouseLeave }) => {
  const isActive = location.pathname === link.path;
  const isHovered = hoveredLink === link.path;

  return (
    <Link to={link.path} aria-label={link.name}>
      <div
        className="nav-link relative px-6 py-3 cursor-pointer overflow-hidden"
        onMouseEnter={() => onMouseEnter(link.path)}
        onMouseLeave={onMouseLeave}
        style={{ 
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <span
          className={`relative z-10 text-[14px] font-medium tracking-[0.01em] ${
            isActive ? 'text-[#e2493b]' : isHovered ? 'text-[#e2493b]' : 'text-[#6B6B6B]'
          }`}
          style={{
            fontWeight: isActive ? 600 : 500,
            textShadow: isActive ? '0 0 20px rgba(255, 111, 97, 0.2)' : 'none',
            transition: 'color 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {link.name}
        </span>

        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#e2493b]/8 via-[#e2493b]/4 to-transparent"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1) translateZ(0)' : 'scale(0.95) translateZ(0)',
            boxShadow: isHovered ? '0 0 20px rgba(255, 111, 97, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)' : 'none',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            backfaceVisibility: 'hidden',
            willChange: 'transform, opacity'
          }}
        />

        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-2 left-1/2 w-[5px] h-[5px] bg-[#e2493b] rounded-full -translate-x-1/2"
            style={{ 
              boxShadow: '0 0 12px rgba(255, 111, 97, 0.8), 0 2px 8px rgba(255, 111, 97, 0.4)'
            }}
            transition={{ 
              type: "spring", 
              stiffness: 500, 
              damping: 35,
              mass: 0.8
            }}
          />
        )}
      </div>
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

  useEffect(() => {
    let ticking = false;
    const threshold = 5;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldBeScrolled = currentScrollY > threshold;
          
          if (isScrolled !== shouldBeScrolled) {
            setIsScrolled(shouldBeScrolled);
          }
          
          ticking = false;
        });
        
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setHoveredLink(null);
      
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
  }, [location.pathname]);

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
  }, [isMobileMenuOpen]);

  const navLinks = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ], []);

  const handleMouseEnter = useCallback((path) => {
    if (!prefersReducedMotion && window.innerWidth >= 1024) {
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
        initial={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-white/80 shadow-sm border-b border-gray-200/50'
            : 'bg-white/60'
        }`}
        style={{ 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[76px] lg:h-[92px]">
            <Link to="/" aria-label="Brancha Home">
              <div 
                className="cursor-pointer smooth-scale"
                style={{ transform: 'translateZ(0)' }}
              >
                <img 
                  src="/Brancha_Wordmark_logo.webp" 
                  alt="Brancha - Where Brands Grow" 
                  className="h-[32px] lg:h-[36px] w-auto"
                  loading="eager"
                  fetchPriority="high"
                  style={{ 
                    filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.05))',
                    transform: 'translateZ(0)'
                  }}
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  link={link}
                  location={location}
                  hoveredLink={hoveredLink}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>

            <Link to="/contact" className="hidden lg:block" aria-label="Get Started">
              <button
                className="smooth-scale relative px-8 py-3.5 text-[14px] font-semibold tracking-[0.02em] text-white rounded-full overflow-hidden"
                style={{
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #e2493b 0%, #e35342 100%)',
                  boxShadow: '0 4px 16px -2px rgba(226, 73, 59, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <span className="relative z-10">Get Started</span>
              </button>
            </Link>

            <motion.button
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full bg-gray-100/50 active:bg-gray-200/50"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                transform: 'translateZ(0)'
              }}
            >
              <div className="w-[20px] h-[14px] flex flex-col justify-between relative">
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0,
                    backgroundColor: isMobileMenuOpen ? '#e2493b' : '#1F1F1F'
                  }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-[2px] rounded-full top-0"
                />
                <motion.span
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    scale: isMobileMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-full h-[2px] rounded-full top-[6px] bg-[#1F1F1F]"
                />
                <motion.span
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0,
                    backgroundColor: isMobileMenuOpen ? '#e2493b' : '#1F1F1F'
                  }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-[2px] rounded-full top-[12px]"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-40 lg:hidden bg-black/20"
        onClick={toggleMobileMenu}
        style={{ 
          backdropFilter: isMobileMenuOpen ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: isMobileMenuOpen ? 'blur(8px)' : 'none'
        }}
      />

      <motion.div
        initial={false}
        animate={{
          y: isMobileMenuOpen ? 0 : -20,
          opacity: isMobileMenuOpen ? 1 : 0,
          scale: isMobileMenuOpen ? 1 : 0.96,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
        className="fixed left-0 right-0 z-50 lg:hidden"
        style={{ top: '76px' }}
      >
        <div 
          className="relative mx-6 mt-4 bg-white/95 rounded-[28px] overflow-hidden border border-gray-200/50"
          style={{ 
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 20px 60px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          <nav className="py-3">
            {navLinks.map((link, index) => (
              <Link key={link.path} to={link.path} aria-label={link.name}>
                <motion.div
                  initial={false}
                  animate={{
                    x: isMobileMenuOpen ? 0 : -10,
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                    mass: 0.8,
                    delay: isMobileMenuOpen ? index * 0.02 : 0
                  }}
                  className={`smooth-scale-mobile relative mx-3 mb-1.5 last:mb-0 rounded-2xl ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-br from-[#e2493b]/10 via-[#e2493b]/5 to-transparent'
                      : 'bg-transparent'
                  }`}
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: location.pathname === link.path ? '0 2px 8px -2px rgba(226, 73, 59, 0.15)' : 'none',
                    transform: 'translateZ(0)',
                    willChange: 'transform'
                  }}
                >
                  {location.pathname === link.path && (
                    <div 
                      className="absolute left-4 top-1/2 w-1.5 h-1.5 rounded-full bg-[#e2493b] -translate-y-1/2"
                      style={{ boxShadow: '0 0 8px rgba(255, 111, 97, 0.6)' }}
                    />
                  )}
                  
                  <div className={`px-6 py-4 ${location.pathname === link.path ? 'pl-9' : ''}`}>
                    <span 
                      className={`text-[15.5px] font-medium tracking-[-0.01em] ${
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

          <div className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

          <motion.div 
            initial={false}
            animate={{
              y: isMobileMenuOpen ? 0 : 10,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.8,
              delay: 0.1
            }}
            className="p-4"
          >
            <Link to="/contact" aria-label="Get Started">
              <button 
                className="smooth-scale-mobile w-full rounded-2xl text-white overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, #e2493b 0%, #e35342 100%)',
                  boxShadow: '0 8px 20px -4px rgba(226, 73, 59, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              >
                <div className="px-6 py-4 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center"
                      style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-[16px] font-semibold tracking-[-0.01em]" style={{ fontWeight: 600 }}>
                      Get Started
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
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
          text-rendering: optimizeLegibility;
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

        nav {
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
          contain: layout style paint;
        }

        /* Butter-smooth hover effects */
        .nav-link {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (hover: hover) {
          .nav-link:hover {
            transform: scale(1.02) translateZ(0);
          }
        }

        /* Smooth scale for buttons */
        .smooth-scale {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        @media (hover: hover) {
          .smooth-scale:hover {
            transform: scale(1.02) translateZ(0);
          }
          
          button.smooth-scale:hover {
            box-shadow: 0 8px 24px -4px rgba(226, 73, 59, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          }
        }

        .smooth-scale:active,
        .nav-link:active {
          transform: scale(0.98) translateZ(0);
          transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Mobile tap animations */
        .smooth-scale-mobile {
          transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .smooth-scale-mobile:active {
          transform: scale(0.98) translateZ(0);
        }

        @supports not (backdrop-filter: blur(20px)) {
          nav {
            background-color: rgba(255, 255, 255, 0.95) !important;
          }
        }

        .fixed {
          backface-visibility: hidden;
        }

        img {
          transform: translateZ(0);
          image-rendering: -webkit-optimize-contrast;
        }

        @media (hover: none) {
          button:hover, a:hover {
            transform: translateZ(0) !important;
          }
        }

        @media (max-width: 1024px) {
          a {
            transition: none !important;
          }
          
          a, button {
            touch-action: manipulation;
          }
          
          * {
            will-change: auto !important;
          }
        }

        button, a {
          cursor: pointer;
        }

        /* Hardware acceleration */
        button, a, .smooth-scale, .smooth-scale-mobile, .nav-link {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </>
  );
}