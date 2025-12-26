import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-2xl shadow-sm border-b border-neutral-100/60'
            : 'bg-white'
        }`}
        style={{ 
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          willChange: 'background-color, backdrop-filter, box-shadow'
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-[76px] lg:h-[92px]">
            {/* Logo */}
            <Link to="/">
              <div className="cursor-pointer group">
                <span className="text-[27px] lg:text-[32px] font-semibold tracking-[-0.04em] text-[#FF6B6B] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[-0.02em] group-hover:opacity-80">
                  Brancha
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <div
                    className="relative px-6 py-3 cursor-pointer"
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <span
                      className={`relative z-10 text-[13.5px] font-medium tracking-[0.015em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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

                    {/* Hover background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-[#FF6B6B]/[0.04] to-[#FF6B6B]/[0.02] rounded-[14px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        hoveredLink === link.path
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-95'
                      }`}
                      style={{
                        boxShadow: hoveredLink === link.path ? '0 0 20px rgba(255, 107, 107, 0.05)' : 'none'
                      }}
                    />

                    {/* Active dot indicator */}
                    <div
                      className={`absolute bottom-1.5 left-1/2 w-[4px] h-[4px] bg-[#FF6B6B] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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

            {/* CTA Button */}
            <Link to="/contact" className="hidden lg:block">
              <button 
                className="group relative px-8 py-3 text-[13.5px] font-semibold tracking-[0.02em] text-white bg-[#FF6B6B] rounded-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-lg hover:shadow-[#FF6B6B]/30 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  boxShadow: '0 2px 12px -4px rgba(255, 107, 107, 0.4)'
                }}
              >
                <span className="relative z-10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.06em]">
                  Get Started
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8E8E] to-[#FF6B6B] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:bg-neutral-50 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-[21px] h-[15px] flex flex-col justify-between">
                <span
                  className={`w-full h-[2px] bg-[#FF6B6B] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-[#FF6B6B] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isMobileMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
                  }`}
                />
                <span
                  className={`w-full h-[2px] bg-[#FF6B6B] rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none delay-300'
        }`}
      >
        {/* Backdrop - Reduced blur to prevent artifacts */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen 
              ? 'bg-black/25 backdrop-blur-[1px]' 
              : 'bg-transparent backdrop-blur-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel - Removed backdrop-blur, using solid background with opacity */}
        <div
          className={`absolute top-[76px] left-0 right-0 bg-white/95 border-b border-neutral-100/60 shadow-lg transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
          style={{
            boxShadow: '0 20px 60px -20px rgba(0, 0, 0, 0.1)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="max-w-[1440px] mx-auto px-6 py-5">
            <div className="space-y-1.5">
              {navLinks.map((link, index) => (
                <Link key={link.path} to={link.path}>
                  <div
                    className={`px-5 py-4 text-[15.5px] font-medium tracking-[-0.01em] rounded-[14px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] ${
                      location.pathname === link.path
                        ? 'text-[#FF6B6B] bg-gradient-to-br from-[#FF6B6B]/[0.08] to-[#FF6B6B]/[0.04] shadow-sm'
                        : 'text-neutral-700 active:bg-neutral-50'
                    }`}
                    style={{
                      transitionDelay: isMobileMenuOpen ? `${index * 40}ms` : '0ms',
                      transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                      opacity: isMobileMenuOpen ? 1 : 0
                    }}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>

            <div 
              className="mt-6 pt-6 border-t border-neutral-100/80 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: isMobileMenuOpen ? '300ms' : '0ms',
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                opacity: isMobileMenuOpen ? 1 : 0
              }}
            >
              <Link to="/contact">
                <button 
                  className="w-full px-7 py-4 text-[15.5px] font-semibold tracking-[0.01em] text-white bg-[#FF6B6B] rounded-[14px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] active:opacity-90 shadow-lg shadow-[#FF6B6B]/20"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}