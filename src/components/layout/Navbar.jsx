import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let rafId = null;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          setIsScrolled(currentScrollY > 10);
          lastScrollY = currentScrollY;
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
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
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' }
  ], []);

  const handleMouseEnter = useCallback((path) => {
    setHoveredLink(path);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredLink(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-neutral-100/60'
            : 'bg-white'
        }`}
        style={{ 
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[76px] lg:h-[92px]">
            <Link to="/" aria-label="Brancha Home">
              <div className="cursor-pointer group">
                <span className="text-[27px] lg:text-[32px] font-semibold tracking-[-0.04em] text-[#FF6B6B] transition-all duration-300 group-hover:tracking-[-0.02em] group-hover:opacity-80">
                  Brancha
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} aria-label={link.name}>
                  <div
                    className="relative px-6 py-3 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(link.path)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <span
                      className={`relative z-10 text-[13.5px] font-medium tracking-[0.015em] transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'text-[#FF6B6B]'
                          : hoveredLink === link.path
                          ? 'text-[#FF6B6B]'
                          : 'text-neutral-600'
                      }`}
                      style={{
                        letterSpacing: hoveredLink === link.path ? '0.04em' : '0.015em'
                      }}
                    >
                      {link.name}
                    </span>

                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/[0.04] to-[#FF6B6B]/[0.02] rounded-[14px] transition-all duration-300 ${
                        hoveredLink === link.path
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                      style={{
                        boxShadow: hoveredLink === link.path ? '0 0 20px rgba(255, 107, 107, 0.05)' : 'none'
                      }}
                    />

                    <div
                      className={`absolute bottom-1.5 left-1/2 w-[4px] h-[4px] bg-[#FF6B6B] rounded-full transition-all duration-300 ${
                        location.pathname === link.path
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-0'
                      }`}
                      style={{ 
                        transform: `translateX(-50%) scale(${location.pathname === link.path ? 1 : 0})`,
                        boxShadow: location.pathname === link.path ? '0 0 8px rgba(255, 107, 107, 0.6)' : 'none'
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>

            <Link to="/contact" className="hidden lg:block" aria-label="Get Started">
              <button 
                className="group relative px-8 py-3 text-[13.5px] font-semibold tracking-[0.02em] text-white bg-[#FF6B6B] rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B6B]/30 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  boxShadow: '0 2px 12px -4px rgba(255, 107, 107, 0.4)'
                }}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:tracking-[0.06em]">
                  Get Started
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8E8E] to-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>

            {/* Minimal Premium Mobile Menu Button */}
            <button
              className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                transform: isMobileMenuOpen ? 'scale(0.95)' : 'scale(1)'
              }}
            >
              <div className="w-[20px] h-[14px] flex flex-col justify-between relative">
                <span
                  className={`absolute w-full h-[2px] rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isMobileMenuOpen 
                      ? 'top-[6px] rotate-45 bg-[#FF6B6B]' 
                      : 'top-0 rotate-0 bg-neutral-800'
                  }`}
                  style={{ transformOrigin: 'center' }}
                />
                <span
                  className={`absolute top-[6px] w-full h-[2px] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen 
                      ? 'opacity-0 scale-0 bg-[#FF6B6B]' 
                      : 'opacity-100 scale-100 bg-neutral-800'
                  }`}
                />
                <span
                  className={`absolute w-full h-[2px] rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isMobileMenuOpen 
                      ? 'top-[6px] -rotate-45 bg-[#FF6B6B]' 
                      : 'top-[12px] rotate-0 bg-neutral-800'
                  }`}
                  style={{ transformOrigin: 'center' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Page Blur Backdrop */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          background: isMobileMenuOpen 
            ? 'linear-gradient(to bottom, rgba(15, 15, 15, 0.08), rgba(0, 0, 0, 0.12))' 
            : 'transparent',
          WebkitBackdropFilter: isMobileMenuOpen ? 'blur(12px) saturate(1.3)' : 'blur(0px)',
          backdropFilter: isMobileMenuOpen ? 'blur(12px) saturate(1.3)' : 'blur(0px)',
          transition: 'backdrop-filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), background 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'backdrop-filter, background'
        }}
        onClick={toggleMobileMenu}
      />

      {/* Minimal Premium Dropdown Menu */}
      <div
        className={`fixed left-0 right-0 z-50 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          top: '76px',
          transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
          opacity: isMobileMenuOpen ? 1 : 0,
          willChange: 'transform, opacity'
        }}
      >
        {/* Minimal Dropdown Panel */}
        <div
          className="relative mx-6 mt-4 bg-white rounded-3xl overflow-hidden"
          style={{
            boxShadow: isMobileMenuOpen
              ? '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)'
              : '0 0 0 0 rgba(0, 0, 0, 0)',
            transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0.96)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Minimal Navigation Links */}
          <nav className="py-3">
            {navLinks.map((link, index) => (
              <Link key={link.path} to={link.path} aria-label={link.name}>
                <div
                  className={`relative mx-3 mb-1.5 last:mb-0 rounded-2xl transition-all duration-300 active:scale-[0.98] ${
                    location.pathname === link.path
                      ? 'bg-gradient-to-r from-[#FF6B6B]/8 to-[#FF6B6B]/4'
                      : 'bg-transparent active:bg-neutral-50'
                  }`}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-15px)',
                    transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 40 + 100}ms`,
                    willChange: 'transform, opacity'
                  }}
                >
                  {/* Active Indicator Dot */}
                  {location.pathname === link.path && (
                    <div 
                      className="absolute left-4 top-1/2 w-1.5 h-1.5 rounded-full bg-[#FF6B6B] -translate-y-1/2"
                      style={{
                        boxShadow: '0 0 8px rgba(255, 107, 107, 0.6)'
                      }}
                    />
                  )}
                  
                  <div className={`px-6 py-4 ${location.pathname === link.path ? 'pl-9' : ''}`}>
                    <span 
                      className={`text-[15.5px] font-medium tracking-[-0.01em] transition-colors duration-300 ${
                        location.pathname === link.path 
                          ? 'text-[#FF6B6B]' 
                          : 'text-neutral-700'
                      }`}
                    >
                      {link.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Minimal Divider */}
          <div 
            className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-neutral-200 to-transparent"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: 'opacity 0.5s ease 300ms'
            }}
          />

          {/* Minimal CTA */}
          <div 
            className="p-3 pt-3"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 350ms'
            }}
          >
            <Link to="/contact" aria-label="Get Started">
              <button
                className="w-full rounded-2xl transition-all duration-300 active:scale-[0.98] group"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
                  boxShadow: '0 4px 16px -4px rgba(255, 107, 107, 0.3)'
                }}
              >
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-[15.5px] font-semibold text-white tracking-[-0.01em]">
                      Get Started
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-white/80 transition-transform duration-300 group-active:translate-x-1"
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
          </div>
        </div>
      </div>

      {/* Performance Optimization Styles */}
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Hardware acceleration */
        nav, button, a {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Prevent text selection during interactions */
        button, a {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        
        /* Smooth transform performance */
        @media (max-width: 1023px) {
          [style*="transform"] {
            will-change: transform;
          }
        }
      `}</style>
    </>
  );
}