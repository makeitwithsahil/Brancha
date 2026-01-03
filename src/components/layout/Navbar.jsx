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
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 active:bg-neutral-50 active:scale-95"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="w-[21px] h-[15px] flex flex-col justify-between">
                <span
                  className={`w-full h-[2px] bg-[#FF6B6B] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-[#FF6B6B] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-[#FF6B6B] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-400 ease-out ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/20 transition-all duration-400 ease-out ${
            isMobileMenuOpen ? 'opacity-100 backdrop-blur-xl' : 'opacity-0 backdrop-blur-none'
          }`}
          onClick={toggleMobileMenu}
          style={{
            WebkitBackdropFilter: isMobileMenuOpen ? 'blur(20px)' : 'blur(0px)',
            backdropFilter: isMobileMenuOpen ? 'blur(20px)' : 'blur(0px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-[68px] left-0 right-0 px-4 transition-all duration-500 ease-out ${
            isMobileMenuOpen 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-6 opacity-0'
          }`}
          style={{ 
            willChange: 'transform, opacity',
            transform: isMobileMenuOpen ? 'translateY(0) translateZ(0)' : 'translateY(-24px) translateZ(0)'
          }}
        >
          <div 
            className="relative overflow-hidden transition-all duration-500 ease-out"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.92))',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              backdropFilter: 'blur(40px) saturate(180%)',
              boxShadow: '0 20px 60px -10px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.5) inset',
              border: '0.5px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '28px',
              transform: isMobileMenuOpen ? 'scale(1)' : 'scale(0.95)',
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FF6B6B]/5 to-transparent pointer-events-none" />
            
            <div className="relative px-4 py-5">
              {/* Navigation Links */}
              <div className="space-y-1.5">
                {navLinks.map((link, index) => (
                  <Link key={link.path} to={link.path} aria-label={link.name}>
                    <div
                      className={`group relative overflow-hidden rounded-[20px] transition-all duration-300 ease-out active:scale-[0.97] ${
                        location.pathname === link.path
                          ? 'bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF6B6B]/5'
                          : 'bg-white/40 active:bg-white/70'
                      }`}
                      style={{
                        WebkitTapHighlightColor: 'transparent',
                        boxShadow: location.pathname === link.path 
                          ? '0 2px 8px -2px rgba(255, 107, 107, 0.2), 0 1px 0 rgba(255, 255, 255, 0.5) inset' 
                          : '0 1px 3px -1px rgba(0, 0, 0, 0.1)',
                        animation: isMobileMenuOpen 
                          ? `slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.04}s both` 
                          : 'none',
                        willChange: 'transform, opacity'
                      }}
                    >
                      {/* Active indicator bar */}
                      <div 
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-r-full transition-all duration-400 ease-out ${
                          location.pathname === link.path 
                            ? 'h-10 bg-[#FF6B6B] opacity-100' 
                            : 'h-0 bg-[#FF6B6B] opacity-0'
                        }`}
                        style={{
                          boxShadow: location.pathname === link.path ? '0 0 12px rgba(255, 107, 107, 0.6)' : 'none'
                        }}
                      />

                      {/* Ripple effect on active tap */}
                      <div 
                        className="absolute inset-0 bg-neutral-100/0 group-active:bg-neutral-100/50 rounded-[20px] transition-all duration-200"
                        style={{ mixBlendMode: 'multiply' }}
                      />
                      
                      <div className={`relative px-6 py-4 flex items-center transition-all duration-300 ${
                        location.pathname === link.path ? 'pl-8' : ''
                      }`}>
                        <span className={`text-[17px] font-medium tracking-[-0.02em] flex-1 transition-all duration-300 ease-out ${
                          location.pathname === link.path ? 'text-[#FF6B6B]' : 'text-neutral-800'
                        }`}>
                          {link.name}
                        </span>
                        
                        {/* Chevron arrow */}
                        <svg 
                          className={`w-5 h-5 transition-all duration-400 ease-out ${
                            location.pathname === link.path 
                              ? 'text-[#FF6B6B] opacity-70 translate-x-0' 
                              : 'text-neutral-400 opacity-0 -translate-x-3'
                          }`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div 
                className="my-5 h-px bg-gradient-to-r from-transparent via-neutral-200/70 to-transparent"
                style={{
                  animation: isMobileMenuOpen 
                    ? 'fadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.24s both' 
                    : 'none'
                }}
              />

              {/* CTA Button */}
              <div
                style={{
                  animation: isMobileMenuOpen 
                    ? 'slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.28s both' 
                    : 'none'
                }}
              >
                <Link to="/contact" aria-label="Get Started">
                  <button 
                    className="group relative w-full rounded-[20px] overflow-hidden transition-all duration-300 ease-out active:scale-[0.97]"
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      boxShadow: '0 8px 24px -6px rgba(255, 107, 107, 0.4), 0 1px 0 rgba(255, 255, 255, 0.3) inset'
                    }}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B6B] via-[#FF6B6B] to-[#FF8E8E] transition-all duration-300" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-200">
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Subtle animated shine */}
                    <div className="absolute inset-0 opacity-30 overflow-hidden">
                      <div 
                        className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        style={{
                          animation: 'shine 3s ease-in-out infinite',
                          transform: 'skewX(-20deg)'
                        }}
                      />
                    </div>
                    
                    {/* Button content */}
                    <div className="relative px-6 py-4 flex items-center justify-center gap-2">
                      <span className="text-[17px] font-semibold text-white tracking-[-0.01em]">
                        Get Started
                      </span>
                      <svg 
                        className="w-5 h-5 text-white transition-transform duration-300 ease-out group-active:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          20%, 100% { left: 200%; }
        }
        
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Smooth spring animation for iOS feel */
        @media (prefers-reduced-motion: no-preference) {
          .transition-spring {
            transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        }
      `}</style>
    </>
  );
}