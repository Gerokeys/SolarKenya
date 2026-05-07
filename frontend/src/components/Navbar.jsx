import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/blog', label: 'Blog' },
  { to: '/calculator', label: 'Calculator' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      menuOpen ? 'bg-coal' : scrolled ? 'bg-cream border-b-2 border-coal/10 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-ember-500 flex items-center justify-center flex-shrink-0 group-hover:bg-ember-600 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </div>
            <span className={`font-display text-2xl tracking-wider transition-colors leading-none ${
              menuOpen ? 'text-white' : scrolled ? 'text-coal' : 'text-white'
            }`}>
              SOLAR<span className="text-ember-500">KENYA</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-sans font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-ember-500'
                      : scrolled
                      ? 'text-coal hover:text-ember-500'
                      : 'text-white/80 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-ember-500" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/admin" className="btn-secondary text-xs py-2 px-4">Dashboard</Link>
                <button onClick={handleLogout} className="text-sm text-ash hover:text-ember-500 transition-colors font-sans">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/contact?type=quote" className="btn-sun text-xs py-2.5 px-5">
                Free Quote
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 transition-colors relative z-[60] ${menuOpen ? 'text-white' : scrolled ? 'text-coal' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div className={`mobile-overlay md:hidden${menuOpen ? ' mobile-overlay--open' : ''}`}>
        {/* Decorative sun */}
        <svg className="mobile-overlay__sun" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="80" stroke="#F97316" strokeWidth="1.5" opacity="0.12" />
          <circle cx="200" cy="200" r="130" stroke="#F97316" strokeWidth="1" opacity="0.07" />
          <circle cx="200" cy="200" r="180" stroke="#F97316" strokeWidth="0.5" opacity="0.04" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={200 + 95 * Math.cos(a)} y1={200 + 95 * Math.sin(a)}
                x2={200 + 120 * Math.cos(a)} y2={200 + 120 * Math.sin(a)}
                stroke="#F97316" strokeWidth="1.5" opacity="0.15"
              />
            );
          })}
        </svg>

        <div className="mobile-overlay__links">
          {navLinks.map(({ to, label }, i) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              style={{ animationDelay: menuOpen ? `${0.08 + i * 0.07}s` : '0s' }}
              className={({ isActive }) =>
                `mobile-nav-link${isActive ? ' mobile-nav-link--active' : ''}`
              }
            >
              <span className="mobile-nav-link__num">0{i + 1}</span>
              {label}
            </NavLink>
          ))}
        </div>

        <div className="mobile-overlay__footer" style={{ animationDelay: menuOpen ? '0.45s' : '0s' }}>
          <Link
            to="/contact?type=quote"
            onClick={() => setMenuOpen(false)}
            className="btn-sun w-full text-center py-4 text-sm"
          >
            Get Free Quote →
          </Link>
          <p className="text-white/20 text-xs font-sans tracking-widest uppercase mt-4 text-center">
            Solar Kenya · Powering the Nation
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
