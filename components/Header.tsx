
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAccordion, setOpenAccordion] = useState<string | null>(() => {
    const firstWithSub = NAV_LINKS.find((l) => l.submenu);
    return firstWithSub ? firstWithSub.label : null;
  });

  // Handle scrolling to hash anchors
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80; // Account for sticky header
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f2f4] px-2 sm:px-3 md:px-6 lg:px-10 xl:px-20 py-1.5 sm:py-2 md:py-3 shadow-sm">
      <div className="max-w-full sm:max-w-350 mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-1 sm:gap-2 md:gap-3 group">
            <div className="h-8 sm:h-10 md:h-12 transition-transform">
              <img src="/images/gpaa_logo.png" alt="GPAA Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="hidden xs:block">
              <h3 className="text-[#111418] text-xs sm:text-base md:text-lg lg:text-xl font-black leading-tight tracking-tight">GPAA</h3>
              <p className="text-[8px] sm:text-[10px] md:text-[12px] text-[#617289] font-bold -mt-0.5">Ghana Physician Assistants Association</p>
            </div>
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 animate-in fade-in slide-in-from-left duration-300">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.submenu && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`text-xs xl:text-sm font-semibold transition-colors hover:text-primary flex items-center gap-1 ${
                    location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                      ? 'text-primary'
                      : 'text-[#111418]'
                  }`}
                >
                  {link.label}
                  {link.submenu && (
                    <span className="material-symbols-outlined text-base">expand_more</span>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.submenu && openDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-[#e5e7eb] py-2 min-w-55">
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.label}
                          to={sublink.href}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-3 text-sm font-semibold text-[#111418] hover:bg-primary/5 hover:text-primary transition-colors"
                        >
                          {sublink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <Link
            to="/login"
            className="hidden md:flex items-center gap-2 cursor-pointer justify-center rounded-xl h-9 lg:h-10 px-4 lg:px-6 border-2 border-primary text-primary text-xs lg:text-sm font-bold hover:bg-primary/5 transition-all"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            <span>Log In</span>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-[#111418]" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-18 bg-white border-b shadow-xl p-2 sm:p-4 max-h-[calc(100vh-56px)] sm:max-h-[calc(100vh-72px)] overflow-y-auto animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="mb-2">

              <div className="flex items-center justify-between">
                {link.submenu ? (
                  <button
                    type="button"
                    aria-expanded={openAccordion === link.label}
                    aria-controls={`submenu-${link.label}`}
                    onClick={() => setOpenAccordion(openAccordion === link.label ? null : link.label)}
                    className={`flex-1 text-left text-base font-bold p-3 rounded-lg mr-2 ${
                      location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                        ? 'bg-primary/10 text-primary'
                        : 'text-[#111418] hover:bg-background-light'
                    }`}
                  >
                    {link.label}
                    <span className="material-symbols-outlined text-xl align-middle ml-2">
                      {openAccordion === link.label ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex-1 text-base font-bold p-3 rounded-lg mr-2 ${
                      location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                        ? 'bg-primary/10 text-primary'
                        : 'text-[#111418] hover:bg-background-light'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>

              {/* Accordion content: only one open at a time (auto-closes) */}
              {link.submenu && openAccordion === link.label && (
                <div id={`submenu-${link.label}`} className="ml-4 mt-2 space-y-1">
                  {link.submenu.map((sublink) => (
                    <Link
                      key={sublink.label}
                      to={sublink.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-sm font-semibold p-2 pl-4 rounded-lg text-[#617289] hover:bg-primary/5 hover:text-primary"
                    >
                      {sublink.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-[#e5e7eb] mt-4 space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-white border-2 border-primary text-primary font-bold py-3 rounded-xl"
            >
              <span className="material-symbols-outlined">login</span>
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
