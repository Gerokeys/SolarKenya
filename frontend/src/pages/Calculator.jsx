import { useState } from 'react';
import { Link } from 'react-router-dom';
import { calculate, PACKAGES } from '../utils/calculatorLogic';
import LeadForm from '../components/LeadForm';
import PageMeta from '../components/PageMeta';
import SectionWrapper from '../components/SectionWrapper';

const Calculator = () => {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [result, setResult] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  const handleCalculate = () => {
    const r = calculate(monthlyBill);
    setResult(r);
    setShowQuoteForm(false);
    if (r) setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <>
      <PageMeta
        title="Solar Cost Calculator Kenya"
        description="Find out how much a solar system would cost based on your KPLC electricity bill. Free instant estimate."
      />

      {/* Hero */}
      <section className="bg-coal pt-32 pb-16 relative overflow-hidden grain-overlay">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-ember-500/5" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative z-10">
          <span className="section-label text-ember-400">Free tool</span>
          <h1 className="font-display text-white mt-2" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1 }}>
            KENYA SOLAR<br /><span className="text-ember-500">COST CALCULATOR</span>
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl font-sans leading-relaxed">
            Enter your monthly KPLC electricity bill and get an instant estimate of what solar would cost — and save — for your home.
          </p>
        </div>
      </section>

      {/* Calculator Card */}
      <SectionWrapper className="bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <div className="border-2 border-coal/10 p-8 bg-cream-light">
            <h2 className="font-heading font-bold text-xl text-coal mb-6">Enter Your Monthly Bill</h2>

            <div className="mb-6">
              <label className="font-sans text-xs tracking-[0.15em] uppercase text-ash block mb-3">
                Average Monthly KPLC Bill (KES)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ash font-semibold font-sans text-sm">
                  KES
                </span>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="e.g. 5000"
                  min="0"
                  className="input-field pl-14 text-xl font-display tracking-wider"
                />
              </div>
              <p className="text-xs text-ash mt-2 font-sans">
                Find this on your KPLC bill or M-Pesa payment history.
              </p>
            </div>

            {/* Quick select */}
            <div className="mb-6">
              <p className="text-xs text-ash mb-3 font-sans tracking-widest uppercase">Common amounts:</p>
              <div className="flex flex-wrap gap-2">
                {[1500, 3000, 5000, 8000, 15000, 25000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setMonthlyBill(String(v))}
                    className={`px-3 py-2 text-sm font-sans border-2 transition-all ${
                      monthlyBill === String(v)
                        ? 'bg-ember-500 text-coal border-ember-500'
                        : 'bg-white border-coal/10 text-coal hover:border-citron'
                    }`}
                  >
                    KES {v.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={!monthlyBill}
              className="btn-primary w-full text-base py-4 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Calculate My Solar System
            </button>
          </div>

          {/* RESULTS */}
          {result && (
            <div id="results" className="mt-8 space-y-6">
              {/* Summary grid */}
              <div className="grid grid-cols-2 gap-px bg-coal/10">
                {[
                  { label: 'Monthly Usage', value: `${result.monthlyKwh} kWh` },
                  { label: 'System Size', value: `${result.systemSizeKw} kW` },
                  { label: 'Estimated Cost', value: `KES ${result.costLow}`, sub: `up to KES ${result.costHigh}` },
                  { label: 'Annual Savings', value: `KES ${result.annualSavings}` },
                  { label: 'Payback Period', value: `~${result.paybackYears} yrs` },
                  { label: 'CO₂ Saved/Year', value: `${result.co2SavedKgPerYear} kg` },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-coal p-5 text-center">
                    <div className="font-display text-3xl text-ember-400 leading-none">{value}</div>
                    {sub && <div className="text-xs text-white/25 mt-1 font-sans">{sub}</div>}
                    <div className="text-xs tracking-widest uppercase text-white/35 mt-2 font-sans">{label}</div>
                  </div>
                ))}
              </div>

              {/* Recommended package */}
              <div className="border-2 border-ember-500 bg-cream-light p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="section-label mb-0">Recommended Package</span>
                  {result.recommendedPackage.popular && (
                    <span className="bg-citron text-coal font-sans font-bold text-xs px-3 py-1 tracking-widest uppercase">
                      Most Popular
                    </span>
                  )}
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-heading font-bold text-xl text-coal">{result.recommendedPackage.name}</p>
                    <p className="text-ash text-sm mt-1 font-sans">{result.recommendedPackage.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {result.recommendedPackage.features.map((f) => (
                        <span key={f} className="text-xs bg-cream-dark text-coal/70 px-2 py-1 font-sans">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-display text-3xl text-ember-500">{result.recommendedPackage.size}</div>
                    <p className="text-xs text-ash mt-1 font-sans">{result.recommendedPackage.priceRange}</p>
                  </div>
                </div>
              </div>

              {/* All packages */}
              <div>
                <span className="section-label">All Available Packages</span>
                <div className="grid gap-px bg-coal/10 mt-4">
                  {PACKAGES.map((pkg) => (
                    <div
                      key={pkg.name}
                      className={`bg-cream-light p-4 flex items-center justify-between gap-4 border-l-4 transition-all ${
                        result.recommendedPackage.name === pkg.name ? 'border-ember-500' : 'border-transparent'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-sans font-semibold text-sm text-coal">{pkg.name}</span>
                          {result.recommendedPackage.name === pkg.name && (
                            <span className="bg-ember-100 text-ember-700 font-sans font-bold text-xs px-2 py-0.5 tracking-widest uppercase">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ash mt-0.5 font-sans">{pkg.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-display text-2xl text-coal">{pkg.size}</div>
                        <div className="text-xs text-ash font-sans">{pkg.priceRange}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-coal p-8 text-center">
                <h3 className="font-display text-3xl text-white mb-3">READY TO GO SOLAR?</h3>
                <p className="text-white/40 mb-6 text-sm font-sans leading-relaxed">
                  Get a detailed site assessment and firm quote from our certified engineers — completely free.
                </p>
                <button onClick={() => setShowQuoteForm(!showQuoteForm)} className="btn-sun">
                  {showQuoteForm ? 'Hide Form' : 'Request My Free Quote'}
                </button>
              </div>

              {showQuoteForm && (
                <div className="border-2 border-coal/10 p-6 bg-cream-light">
                  <h3 className="font-heading font-bold text-coal mb-5">Request a Free Quote</h3>
                  <LeadForm
                    type="quote"
                    calculatorData={{
                      monthlyBill,
                      systemSizeKw: result.systemSizeKw,
                      costLow: result.costLow,
                      costHigh: result.costHigh,
                    }}
                    compact
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* How it works */}
      <SectionWrapper className="bg-coal">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <span className="section-label text-ember-400">Methodology</span>
          <h2 className="section-title text-white mb-12">
            How the<br /><em className="text-ember-400">Calculator Works</em>
          </h2>
          <div className="space-y-px bg-ember-500/10">
            {[
              { step: '01', title: 'Estimate Your kWh Usage', desc: 'We use the KPLC blended tariff rate (KES 23/kWh) to back-calculate your monthly electricity consumption from your bill amount.' },
              { step: '02', title: 'Calculate System Size', desc: 'Kenya averages 5.5 peak sun hours per day. We factor in system efficiency (80%) to determine how many kilowatts of panels you need.' },
              { step: '03', title: 'Estimate Installation Cost', desc: 'Based on current Kenyan market rates (KES 145,000–185,000 per kW installed), we calculate your likely investment range for a hybrid solar system.' },
              { step: '04', title: 'Match You with a Package', desc: 'We compare your needs against our standard packages to suggest the best fit — from a starter kit to a full-estate system.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-coal/80 hover:bg-coal/60 transition-colors p-6 flex gap-6">
                <div className="font-display text-4xl text-ember-500/35 leading-none flex-shrink-0 w-14">{step}</div>
                <div>
                  <h3 className="font-heading font-semibold text-white mb-2">{title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-sans">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/20 mt-8 border-t border-white/10 pt-4 font-sans">
            * Estimates are based on 2024 KPLC tariff bands and average Kenyan market prices. Actual costs vary by location, roof type, and system configuration. Request a free site assessment for a precise quote.
          </p>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Calculator;
