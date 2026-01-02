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
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
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

            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 active:bg-neutral-50 active:scale-95"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
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
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-200 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={toggleMobileMenu}
        />

        {/* Mobile Menu Content */}
        <div
          className={`absolute top-[76px] left-0 right-0 bg-white shadow-xl transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-full opacity-0'
          }`}
          style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: isMobileMenuOpen ? 'translateY(0) translateZ(0)' : 'translateY(-100%) translateZ(0)',
            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 py-4">
            <div className="space-y-1">
              {navLinks.map((link, index) => (
                <Link key={link.path} to={link.path} aria-label={link.name}>
                  <div
                    className={`px-5 py-3.5 text-[15.5px] font-medium tracking-[-0.01em] rounded-xl transition-all duration-200 active:scale-[0.98] ${
                      location.pathname === link.path
                        ? 'text-[#FF6B6B] bg-gradient-to-br from-[#FF6B6B]/[0.08] to-[#FF6B6B]/[0.04]'
                        : 'text-neutral-700 active:bg-neutral-50'
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 70}ms` : '0ms',
                      animation: isMobileMenuOpen 
                        ? `slideInDown 0.7s ease-out ${index * 0.07}s both` 
                        : 'none'
                    }}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>

            <div 
              className="mt-4 pt-4 border-t border-neutral-100"
              style={{
                transitionDelay: isMobileMenuOpen ? '220ms' : '0ms',
                animation: isMobileMenuOpen 
                  ? 'slideInDown 0.7s ease-out 0.50s both' 
                  : 'none'
              }}
            >
              <Link to="/contact" aria-label="Get Started">
                <button 
                  className="w-full px-7 py-3.5 text-[15.5px] font-semibold tracking-[0.01em] text-white bg-[#FF6B6B] rounded-xl transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[#FF6B6B]/20"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}