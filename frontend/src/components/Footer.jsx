import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-coal text-white/40">
      <div className="h-1 bg-ember-500" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        {/* Wordmark */}
        <div className="border-b border-white/10 pb-10 mb-10 overflow-hidden">
          <Link
            to="/"
            className="font-display text-white/8 hover:text-white/15 transition-colors select-none block"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', lineHeight: 1 }}
          >
            SOLAR<span className="text-ember-500/25 hover:text-ember-500/40 transition-colors">LINK</span><span className="text-citron/25 hover:text-citron/40 transition-colors"> KENYA</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-8 h-8 bg-ember-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="4" fill="currentColor" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              </div>
              <span className="font-display text-xl tracking-wider text-white leading-none">
                SOLAR<span className="text-ember-500">LINK</span><span className="text-citron"> KENYA</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed font-sans mb-6">
              Empowering Kenyan homes and businesses with clean, affordable solar energy solutions.
            </p>
            <div className="flex gap-2">
              {['F', 'T', 'I', 'L'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={['Facebook', 'Twitter', 'Instagram', 'LinkedIn'][i]}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-xs font-sans hover:border-ember-500 hover:text-ember-400 transition-all"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ember-500 mb-5">Navigation</h4>
            <ul className="space-y-2.5 text-sm font-sans">
              {[['/', 'Home'], ['/blog', 'Blog'], ['/calculator', 'Solar Calculator'], ['/about', 'About Us'], ['/contact', 'Contact']].map(
                ([to, label]) => (
                  <li key={to}>
                    <Link to={to} className="hover:text-ember-400 transition-colors">
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Blog Topics */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ember-500 mb-5">Blog Topics</h4>
            <ul className="space-y-2.5 text-sm font-sans">
              <li><Link to="/blog?category=Solar Panels" className="hover:text-ember-400 transition-colors">Solar Panels</Link></li>
              <li><Link to="/blog?category=Solar Batteries" className="hover:text-ember-400 transition-colors">Solar Batteries</Link></li>
              <li><Link to="/blog?category=Solar Inverters" className="hover:text-ember-400 transition-colors">Solar Inverters</Link></li>
              <li><Link to="/blog?category=Solar Hot Water Systems" className="hover:text-ember-400 transition-colors">Solar Hot Water</Link></li>
              <li><Link to="/blog?category=Reviews" className="hover:text-ember-400 transition-colors">Reviews</Link></li>
              <li><Link to="/blog?category=News" className="hover:text-ember-400 transition-colors">News</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ember-500 mb-5">Get in Touch</h4>
            <ul className="space-y-3.5 text-sm font-sans">
              <li>Westlands, Nairobi, Kenya</li>
              <li>
                <a href="tel:+254700000000" className="hover:text-ember-400 transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li>
                <a href="mailto:info@solarlink.co.ke" className="hover:text-ember-400 transition-colors">
                  info@solarlink.co.ke
                </a>
              </li>
              <li className="text-white/20">Mon–Sat: 8am – 6pm</li>
            </ul>
            <Link to="/contact?type=quote" className="btn-sun text-xs py-2.5 px-5 mt-6 inline-flex">
              Free Quote
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-sans">
          <p>&copy; {year} Solar Link Kenya. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ember-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-ember-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
