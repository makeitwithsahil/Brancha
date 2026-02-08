import { useState, useEffect, useCallback, memo, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../ThemeContext';
import { Menu, X } from 'lucide-react';
import { storage, userPreferences, journeyTracking } from '../../utils/storage';

const NavLink = memo(({ link, location, hoveredLink, onMouseEnter, onMouseLeave, theme, isDarkNavbar }) => {
  const isActive = location.pathname === link.path;
  const isHovered = hoveredLink === link.path;

  return (
    <Link to={link.path} aria-label={link.name}>
      <div
        className="nav-link relative px-5 py-2.5 cursor-pointer overflow-hidden rounded-xl"
        onMouseEnter={() => onMouseEnter(link.path)}
        onMouseLeave={onMouseLeave}
      >
        <span
          className={`relative z-10 text-sm font-semibold tracking-wide transition-colors duration-200`}
          style={{
            color: isActive 
              ? theme.primaryColor 
              : isHovered 
                ? theme.primaryColor 
                : isDarkNavbar 
                  ? '#F2F2F2' 
                  : '#2B2B2B',
          }}
        >
          {link.name}
        </span>

        {/* Hover background */}
        <div
          className="absolute inset-0 rounded-xl transition-all duration-300"
          style={{
            background: isDarkNavbar
              ? `${theme.primaryColor}15`
              : `${theme.primaryColor}10`,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1)' : 'scale(0.9)',
          }}
        />

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute bottom-1 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2"
            style={{ 
              backgroundColor: theme.primaryColor,
              boxShadow: `0 0 10px ${theme.primaryColor}99`
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30
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
  const theme = useTheme();
  
  // Determine if navbar background is dark (for text color contrast)
  const isDarkNavbar = theme.navbarBgColor && 
    !['#FFFFFF', '#FAF9F7', '#F7F9FA', '#E4E7EC'].includes(theme.navbarBgColor);

  // 🧠 STORAGE: Remember last visited department for personalization
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.startsWith('/gym')) {
      storage.set('last_department', 'gym', { consent: false });
    } else if (pathname.startsWith('/real-estate')) {
      storage.set('last_department', 'real-estate', { consent: false });
    } else if (pathname.startsWith('/healthcare')) {
      storage.set('last_department', 'healthcare', { consent: false });
    } else if (pathname.startsWith('/education')) {
      storage.set('last_department', 'education', { consent: false });
    }
  }, [location.pathname]);

  // ⚡ PERFORMANCE: Memoize scroll threshold to avoid re-computation
  const scrollThreshold = useMemo(() => 10, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > scrollThreshold;
      setIsScrolled(scrolled);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      document.body.style.overflow = '';
    }
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

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

  const contactPath = theme.navLinks.find(link => link.name === 'Contact')?.path || '/contact';

  return (
    <>
      <motion.nav
        initial={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden w-full max-w-full ${
          isScrolled
            ? 'backdrop-blur-xl shadow-lg'
            : 'backdrop-blur-md'
        }`}
        style={{
          backgroundColor: isScrolled 
            ? `${theme.navbarBgColor}F8`
            : `${theme.navbarBgColor}B3`,
          borderBottom: isScrolled ? `1px solid ${theme.navbarBgColor === '#FFFFFF' ? '#E5E7EB' : 'rgba(255,255,255,0.1)'}` : 'none'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="flex items-center justify-between h-20 lg:h-24 w-full max-w-full">
            {/* Logo */}
            <Link to={theme.navLinks[0].path} aria-label={`${theme.name} Home`}>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer flex items-center gap-4"
              >
                <img 
                  src={theme.logo}
                  alt={`${theme.name}`}
                  className="w-auto object-contain"
                  style={{
                    height: theme.name === 'Brancha' ? '40px' : '48px',
                    maxHeight: '48px'
                  }}
                  loading="eager"
                  fetchPriority="high"
                />
                {theme.name !== 'Brancha' && (
                  <div className="h-6 w-px bg-gray-300" style={{ backgroundColor: isDarkNavbar ? '#4B5563' : '#D1D5DB' }} />
                )}
                {theme.name !== 'Brancha' && (
                  <Link to="/" aria-label="Back to Brancha">
                    <span 
                      className="text-xs font-semibold tracking-wide hover:opacity-80 transition-opacity duration-200"
                      style={{ color: '#6B7280' }}
                    >
                      by Brancha
                    </span>
                  </Link>
                )}
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {theme.navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  link={link}
                  location={location}
                  hoveredLink={hoveredLink}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  theme={theme}
                  isDarkNavbar={isDarkNavbar}
                />
              ))}
            </div>

            {/* Desktop CTA */}
            <Link to={contactPath} className="hidden lg:block" aria-label={theme.ctaText}>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: '#ffffff',
                  boxShadow: `0 4px 20px -2px ${theme.primaryColor}50`
                }}
              >
                {theme.ctaText}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-xl transition-colors duration-200"
              style={{
                color: isDarkNavbar ? '#F2F2F2' : '#0A0A0A',
                backgroundColor: isMobileMenuOpen 
                  ? isDarkNavbar ? '#2B2B2B' : '#F2F2F2'
                  : 'transparent'
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2.5} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-40 lg:hidden pt-20`}
        style={{
          backgroundColor: theme.navbarBgColor || '#FFFFFF'
        }}
      >
        <nav className="h-full overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-8 w-full max-w-full">
          <div className="space-y-2 mb-8 w-full max-w-full">
            {theme.navLinks.map((link, index) => (
              <Link key={link.path} to={link.path}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    x: isMobileMenuOpen ? 0 : -20,
                    opacity: isMobileMenuOpen ? 1 : 0
                  }}
                  transition={{ 
                    delay: isMobileMenuOpen ? index * 0.05 : 0,
                    duration: 0.3
                  }}
                  className={`px-6 py-4 rounded-2xl transition-all duration-200 border`}
                  style={{
                    backgroundColor: location.pathname === link.path 
                      ? `${theme.primaryColor}15`
                      : 'transparent',
                    borderColor: location.pathname === link.path
                      ? `${theme.primaryColor}30`
                      : 'transparent'
                  }}
                >
                  <span 
                    className="text-base font-semibold"
                    style={{ 
                      color: location.pathname === link.path 
                        ? theme.primaryColor 
                        : isDarkNavbar 
                          ? '#F2F2F2' 
                          : '#0A0A0A'
                    }}
                  >
                    {link.name}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              y: isMobileMenuOpen ? 0 : 20,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ delay: 0.2 }}
          >
            <Link to={contactPath}>
              <button 
                className="w-full px-7 py-5 rounded-2xl text-base font-bold shadow-xl"
                style={{
                  backgroundColor: theme.primaryColor,
                  color: '#ffffff',
                  boxShadow: `0 8px 30px -4px ${theme.primaryColor}60`
                }}
              >
                {theme.ctaText}
              </button>
            </Link>
          </motion.div>
        </nav>
      </motion.div>

      <style>{`
        body, html {
          overflow-x: hidden !important;
          max-width: 100vw !important;
          position: relative;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .nav-link {
          position: relative;
        }

        @media (hover: hover) {
          .nav-link:hover {
            transform: scale(1.02);
          }
        }

        .nav-link:active {
          transform: scale(0.98);
        }
      `}</style>
    </>
  );
}
