import { Link } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';
import PageMeta from '../components/PageMeta';

const HERO_BG = '/images/solar2.jpeg';
const MISSION_IMG = '/images/solar1.jpeg';
const INSTALL_IMG = '/images/solar3.jpeg';

const TEAM = [
  { name: 'Lilian Rabera', role: 'Founder & CEO', bio: 'Founder of Solar Link Kenya, passionate about bringing clean, affordable solar energy to every Kenyan home and business.' },
  { name: 'Wanjiru Kamau', role: 'Lead Installer', bio: 'Specializes in off-grid and hybrid systems for rural Kenya. 200+ installations.' },
  { name: 'Kevin Mutua', role: 'Technical Advisor', bio: 'MSc in Electrical Engineering. Expert in grid-tied solar and battery storage systems.' },
];

const VALUES = [
  { num: '01', title: 'Sustainability First', desc: "Every installation reduces Kenya's carbon footprint and dependence on fossil fuels." },
  { num: '02', title: 'Community Impact', desc: 'We prioritize projects that bring solar to underserved communities across all 47 counties.' },
  { num: '03', title: 'Technical Excellence', desc: 'All our engineers are ERC-certified. We only use Tier-1 panels and certified equipment.' },
  { num: '04', title: 'Transparent Pricing', desc: 'No hidden fees. You know what you pay before we start. Firm quotes, honored quotes.' },
];

const About = () => (
  <>
    <PageMeta title="About Us" description="Learn about Solar Link Kenya — our mission, team, and commitment to clean energy across all 47 counties." />

    {/* ─── Hero with background photo ─── */}
    <section
      className="relative min-h-[65vh] flex items-center overflow-hidden grain-overlay"
      style={{ backgroundImage: `url('${HERO_BG}')`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
    >
      <div className="absolute inset-0 bg-coal/78" />
      <div className="absolute inset-0 bg-gradient-to-r from-coal/92 to-coal/40" />
      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 pt-32 pb-20 relative z-10">
        <span className="section-label text-ember-400">Our story</span>
        <h1 className="font-display text-white mt-2" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 0.95 }}>
          POWERING<br />KENYA'S<br /><span className="text-ember-500">SOLAR FUTURE</span>
        </h1>
        <p className="text-white/55 text-xl leading-relaxed max-w-xl mt-8 font-sans">
          Founded in Nairobi in 2019, Solar Link Kenya exists to make clean, reliable solar energy accessible to every Kenyan home and business — from Westlands to Wajir.
        </p>
      </div>
    </section>

    {/* ─── Mission ─── */}
    <SectionWrapper className="bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-0 items-stretch">
        {/* Photo */}
        <div className="relative min-h-[400px] md:min-h-0 overflow-hidden">
          <img
            src={MISSION_IMG}
            alt="Solar farm aerial view"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Ember overlay corner label */}
          <div className="absolute top-0 left-0 bg-ember-500 px-4 py-2">
            <span className="font-sans text-xs font-bold tracking-widest uppercase text-white">Est. 2019</span>
          </div>
          {/* Stats strip at bottom */}
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-2 gap-px bg-coal/70 backdrop-blur-sm">
            {[
              { val: '47', label: 'Counties Served' },
              { val: '500+', label: 'Installations' },
            ].map(({ val, label }) => (
              <div key={label} className="py-4 px-4 text-center">
                <div className="font-display text-3xl text-ember-400 leading-none">{val}</div>
                <div className="text-xs tracking-[0.15em] uppercase text-white/50 mt-1 font-sans">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div className="p-10 md:p-12 bg-cream-light flex flex-col justify-center">
          <span className="section-label">Our mission</span>
          <h2 className="section-title mb-6">
            Making Solar<br /><em>Accessible to<br />Every Kenyan</em>
          </h2>
          <p className="text-ash leading-relaxed mb-5 font-sans">
            Kenya is one of the sunniest countries in Africa, yet millions of households still rely on expensive grid power or costly kerosene. We believe that's wrong — and fixable.
          </p>
          <p className="text-ash leading-relaxed mb-8 font-sans">
            Our platform educates, our calculator empowers, and our installation teams deliver. We handle everything from consultation to commissioning, with after-sales support that actually answers the phone.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { val: '2019', label: 'Founded' },
              { val: '25yr', label: 'Warranty Period' },
            ].map(({ val, label }) => (
              <div key={label} className="border-2 border-coal/10 p-4 text-center">
                <div className="font-display text-4xl text-ember-500 leading-none mb-1">{val}</div>
                <div className="text-xs tracking-[0.15em] uppercase text-ash font-sans">{label}</div>
              </div>
            ))}
          </div>
          <Link to="/contact?type=quote" className="btn-primary self-start">Start Your Solar Journey</Link>
        </div>
      </div>
    </SectionWrapper>

    {/* ─── Values ─── */}
    <SectionWrapper className="bg-coal">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <span className="section-label text-ember-400">Principles</span>
          <h2 className="section-title text-white">
            What We<br /><em className="text-ember-400">Stand For</em>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ember-500/10">
          {VALUES.map(({ num, title, desc }) => (
            <div key={title} className="bg-coal/90 p-8 hover:bg-coal/60 transition-colors group">
              <div className="font-display text-5xl text-ember-500/25 group-hover:text-ember-500/60 transition-colors leading-none mb-5">
                {num}
              </div>
              <h3 className="font-heading font-bold text-white mb-3">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed font-sans">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    {/* ─── Installation photo break ─── */}
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '45vh', backgroundImage: `url('${INSTALL_IMG}')`, backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
    >
      <div className="absolute inset-0 bg-coal/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-coal/80 to-coal/40" />
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 lg:px-10 py-20 flex items-center min-h-[45vh]">
        <div>
          <span className="section-label text-ember-400">Our craft</span>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1 }}>
            EVERY PANEL.<br />EVERY COUNTY.<br /><span className="text-ember-500">DONE RIGHT.</span>
          </h2>
        </div>
      </div>
    </section>

    {/* ─── Team ─── */}
    <SectionWrapper className="bg-cream">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <span className="section-label">The people</span>
          <h2 className="section-title">The Team Behind<br /><em>the Solar</em></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-coal/10 max-w-4xl">
          {TEAM.map(({ name, role, bio }) => (
            <div key={name} className="bg-cream-light group hover:bg-cream-dark transition-colors overflow-hidden">
              {/* Initials placeholder */}
              <div className="h-48 bg-coal flex items-center justify-center relative">
                <span className="font-display text-6xl text-ember-500 leading-none select-none">
                  {name.split(' ').map(n => n[0]).join('')}
                </span>
                <div className="absolute bottom-3 right-3 bg-ember-500/10 border border-ember-500/20 px-2 py-1">
                  <span className="font-sans text-xs text-ember-400 tracking-widest uppercase">Photo coming soon</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-coal text-lg">{name}</h3>
                <p className="text-ember-600 text-xs tracking-widest uppercase font-sans font-semibold mb-3 mt-1">
                  {role}
                </p>
                <p className="text-ash text-sm leading-relaxed font-sans">{bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>

    {/* ─── CTA ─── */}
    <SectionWrapper className="bg-ember-500">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-coal mb-6" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1 }}>
            READY TO JOIN THE SOLAR REVOLUTION?
          </h2>
          <p className="text-coal/70 text-lg mb-8 font-sans leading-relaxed">
            Let our team design the perfect solar system for your home or business.
          </p>
          <Link
            to="/contact?type=quote"
            className="inline-flex items-center justify-center gap-2 bg-coal text-cream font-sans font-semibold px-10 py-4 tracking-widest uppercase text-sm hover:bg-coal/80 transition-all"
            style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
          >
            Get a Free Assessment
          </Link>
        </div>
      </div>
    </SectionWrapper>
  </>
);

export default About;
