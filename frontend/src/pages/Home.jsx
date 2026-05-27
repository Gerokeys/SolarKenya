import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BlogCard from '../components/BlogCard';
import SectionWrapper from '../components/SectionWrapper';
import PageMeta from '../components/PageMeta';
import api from '../api/axios';

gsap.registerPlugin(ScrollTrigger);

const HERO_BG = '/images/solar5.jpeg';
const INSTALL_BG = '/images/solar3.jpeg';
const TRUST_IMG = '/images/solar2.jpeg';
const ROOF_IMG = '/images/solar1.jpeg';

const STATS = [
  { value: '500+', label: 'Installations' },
  { value: '47', label: 'Counties Served' },
  { value: '2.4M', label: 'kWh Generated' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const BENEFITS = [
  { num: '01', title: 'Cut Your KPLC Bill by 80%', desc: 'Most customers see dramatic reduction in monthly electricity bills within the first month of going solar.' },
  { num: '02', title: "Kenya's Ideal Solar Climate", desc: 'Kenya enjoys 5–7 peak sun hours daily, among the best conditions in Africa for solar energy generation.' },
  { num: '03', title: 'Power Through Outages', desc: 'Hybrid battery systems keep your home running during frequent grid outages — no more disruptions.' },
];

const Home = () => {
  const heroRef = useRef(null);
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo('.hero-label', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
        .fromTo('.hero-title', { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, '-=0.2')
        .fromTo('.hero-sub', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, '-=0.4')
        .fromTo('.hero-stat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.3');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    api.get('/blog?limit=3&status=published')
      .then((res) => setFeaturedPosts(res.data.data))
      .catch(() => {});
  }, []);

  return (
    <>
      <PageMeta />

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }}
      >
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-coal/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/95 via-coal/70 to-coal/30" />
        {/* Ember accent strip on right */}
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 59px,rgba(232,113,42,0.8) 60px),repeating-linear-gradient(90deg,transparent,transparent 59px,rgba(232,113,42,0.8) 60px)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-28 pb-12 w-full">
            <div className="max-w-3xl">
              <span className="hero-label section-label text-ember-400">Kenya's leading solar platform</span>

              <h1 className="hero-title font-display text-white leading-none mt-2 mb-6">
                <span className="block" style={{ fontSize: 'clamp(4.5rem, 10vw, 9.5rem)' }}>JOIN THE</span>
                <span className="block text-ember-500" style={{ fontSize: 'clamp(4.5rem, 10vw, 9.5rem)' }}>SOLAR ENERGY</span>
                <span className="block text-white/80" style={{ fontSize: 'clamp(4.5rem, 10vw, 9.5rem)' }}>REVOLUTION</span>
              </h1>

              <p className="hero-sub text-white/60 text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-sans">
                We're transforming access to renewable energy with simple, powerful solar solutions for Kenyan homes, businesses, and communities.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/contact?type=quote" className="hero-cta btn-sun text-base px-10 py-4">
                  Get Free Solar Quote
                </Link>
                <Link to="/calculator" className="hero-cta btn-secondary text-base px-10 py-4"
                  style={{ borderColor: 'rgba(232,113,42,0.5)', color: '#E8712A' }}>
                  Calculate My Savings
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative z-10 border-t border-ember-500/25 bg-coal/60 backdrop-blur-sm">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className={`hero-stat py-6 px-4 text-center ${i < 3 ? 'border-r border-ember-500/20' : ''}`}
                >
                  <div className="font-display text-4xl md:text-5xl text-ember-400 leading-none">{value}</div>
                  <div className="font-sans text-xs tracking-[0.15em] uppercase text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <SectionWrapper className="bg-cream">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-14">
            <div>
              <span className="section-label">Why go solar</span>
              <h2 className="section-title">
                Why Solar in Kenya<br /><em>Makes Sense</em>
              </h2>
            </div>
            <p className="section-subtitle font-sans lg:mt-14">
              With some of Africa's best sun resources and rising electricity costs, solar isn't just green — it's the smartest financial move you can make for your home.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-coal/10">
            {BENEFITS.map(({ num, title, desc }) => (
              <div key={title} className="card p-8 group hover:-translate-y-1 transition-all duration-300">
                <div className="font-display text-5xl text-ember-200 leading-none mb-4 group-hover:text-ember-400 transition-colors">
                  {num}
                </div>
                <h3 className="font-heading font-bold text-coal text-lg mb-3 leading-snug">{title}</h3>
                <p className="text-ash text-sm leading-relaxed font-sans">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── PHOTO FEATURE — Installation ─── */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: '55vh', backgroundImage: `url('${INSTALL_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-coal/72" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal/90 to-coal/30" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 py-24 flex items-center min-h-[55vh]">
          <div className="max-w-2xl">
            <span className="section-label text-ember-400">Professional service</span>
            <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1 }}>
              EXPERT INSTALLATION<br /><span className="text-ember-500">ACROSS ALL 47 COUNTIES</span>
            </h2>
            <p className="text-white/55 text-lg mb-8 font-sans leading-relaxed">
              Our ERC-certified engineers have completed 500+ installations across Kenya. From Nairobi penthouses to rural off-grid farms, we've powered them all.
            </p>
            <Link to="/about" className="btn-primary">Meet Our Team</Link>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="bg-coal relative overflow-hidden py-20 md:py-28">
        <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-10"
          style={{ backgroundImage: `url('${ROOF_IMG}')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="max-w-2xl">
            <span className="section-label text-ember-400">Free Tool</span>
            <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1 }}>
              FIND OUT HOW MUCH SOLAR WOULD COST YOU
            </h2>
            <p className="text-muted text-lg mb-10 leading-relaxed font-sans">
              Enter your monthly KPLC bill and get an instant estimate — no sign-up required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/calculator" className="btn-sun text-base px-10 py-4">
                Try the Solar Calculator
              </Link>
              <Link to="/contact?type=quote" className="btn-secondary text-base px-10 py-4"
                style={{ borderColor: 'rgba(232,113,42,0.5)', color: '#E8712A' }}>
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED BLOG ─── */}
      {featuredPosts.length > 0 && (
        <SectionWrapper className="bg-cream-light">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="section-label">Knowledge base</span>
                <h2 className="section-title">Latest Solar<br /><em>Insights</em></h2>
              </div>
              <Link to="/blog" className="btn-secondary text-sm py-2.5 hidden sm:inline-flex">
                All Articles
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link to="/blog" className="btn-secondary text-sm">All Articles</Link>
            </div>
          </div>
        </SectionWrapper>
      )}

      {/* ─── TRUST / SOCIAL PROOF ─── */}
      <section className="bg-coal">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">
            {/* Text column */}
            <div className="pr-0 md:pr-12 py-8">
              <span className="section-label text-ember-400">Trusted nationwide</span>
              <h2 className="section-title text-white mb-6">
                Serving All<br /><em className="text-ember-400">47 Counties</em>
              </h2>
              <p className="text-muted leading-relaxed mb-8 font-sans">
                From Mombasa to Mandera, Nairobi to Kisumu — our ERC-certified installers have brought clean solar power to hundreds of Kenyan families and businesses.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  'ERC (Energy Regulatory Commission) certified',
                  '25-year panel performance warranty',
                  'After-sales maintenance & monitoring',
                  'M-Pesa payment & financing options',
                ].map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-cream/70 font-sans">
                    <span className="w-5 h-5 bg-ember-500 flex items-center justify-center text-coal text-xs font-bold flex-shrink-0">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-primary">Our Story</Link>
            </div>

            {/* Photo + overlaid stats */}
            <div className="relative min-h-[420px] overflow-hidden">
              <img
                src={TRUST_IMG}
                alt="Solar panels installed in Kenya"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-coal/50" />
              {/* Stats overlaid bottom */}
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px bg-coal/70 backdrop-blur-sm">
                {[
                  { val: '500+', label: 'Homes Powered' },
                  { val: '80+', label: 'Businesses' },
                  { val: '5.5', label: 'Avg Sun Hours/Day' },
                  { val: '1,200t', label: 'CO₂ Saved' },
                ].map(({ val, label }) => (
                  <div key={label} className="py-5 px-4 text-center">
                    <div className="font-display text-3xl text-ember-400 leading-none">{val}</div>
                    <div className="text-xs tracking-[0.15em] uppercase text-white/40 mt-1 font-sans">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
