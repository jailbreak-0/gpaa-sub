
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f2f4] px-3 md:px-6 lg:px-10 xl:px-20 py-2 md:py-3 shadow-sm">
      <div className="max-w-350 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6 lg:gap-10">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="h-10 md:h-12 transition-transform">
              <img src="/images/gpaa_logo.png" alt="GPAA Logo" className="h-full w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <h3 className="text-[#111418] text-base md:text-lg lg:text-xl font-black leading-tight tracking-tight">GPAA</h3>
              <p className="text-[10px] md:text-[12px] text-[#617289] font-bold -mt-0.5">Ghana Physician Assistants Association</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:px-24">
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
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to="/donate"
            className="hidden md:flex items-center gap-2 min-w-20 lg:min-w-25 cursor-pointer justify-center rounded-lg h-9 lg:h-10 px-3 lg:px-5 bg-linear-to-r from-primary to-primary-dark text-white text-xs lg:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">favorite</span>
            <span className="hidden lg:inline">Donate</span>
          </Link>
          <Link
            to="/membership/join"
            className="hidden md:flex min-w-20 lg:min-w-25 cursor-pointer items-center justify-center rounded-lg h-9 lg:h-10 px-3 lg:px-5 bg-primary text-white text-xs lg:text-sm font-bold shadow-md hover:bg-primary-dark transition-all active:scale-95"
          >
            Join Now
          </Link>
          <button className="lg:hidden p-2 text-[#111418]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="material-symbols-outlined text-2xl">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 bg-white border-b shadow-xl p-4 max-h-[calc(100vh-72px)] overflow-y-auto animate-in slide-in-from-top duration-300">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link
                to={link.href}
                onClick={() => !link.submenu && setMobileMenuOpen(false)}
                className={`block text-base font-bold p-3 rounded-lg mb-2 ${
                  location.pathname === link.href || location.pathname.startsWith(link.href + '/')
                    ? 'bg-primary/10 text-primary'
                    : 'text-[#111418] hover:bg-background-light'
                }`}
              >
                {link.label}
              </Link>
              {link.submenu && (
                <div className="ml-4 mb-2 space-y-1">
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
              to="/membership/join"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-primary text-white font-bold py-3 rounded-lg text-center"
            >
              Join GPAA
            </Link>
            <Link
              to="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full bg-linear-to-r from-primary to-primary-dark text-white font-bold py-3 rounded-lg text-center"
            >
              💝 Donate Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
