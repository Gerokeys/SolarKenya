import { useSearchParams } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import PageMeta from '../components/PageMeta';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const isQuote = searchParams.get('type') === 'quote';

  return (
    <>
      <PageMeta
        title={isQuote ? 'Request a Free Solar Quote' : 'Contact Us'}
        description="Get in touch with our solar experts. Free consultations and quotes for Kenyan homes and businesses."
      />

      {/* Hero */}
      <section className="bg-coal pt-32 pb-20 relative overflow-hidden grain-overlay">
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-ember-500/5" />
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 relative z-10">
          <span className="section-label text-ember-400">
            {isQuote ? 'Free consultation' : 'Reach out'}
          </span>
          <h1 className="font-display text-white mt-2" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', lineHeight: 1 }}>
            {isQuote ? (
              <>GET YOUR FREE<br /><span className="text-ember-500">SOLAR QUOTE</span></>
            ) : (
              <>CONTACT<br /><span className="text-ember-500">OUR TEAM</span></>
            )}
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl font-sans leading-relaxed">
            {isQuote
              ? 'Fill in the form below and our certified solar engineers will contact you within 24 hours with a detailed proposal.'
              : "Have a question about solar? We're here to help. Reach out and we'll respond promptly."}
          </p>
        </div>
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Form */}
          <div className="md:col-span-3 border-2 border-coal/10 p-8 bg-cream-light">
            <h2 className="font-heading font-bold text-xl text-coal mb-6">
              {isQuote ? 'Request a Free Quote' : 'Send Us a Message'}
            </h2>
            <LeadForm type={isQuote ? 'quote' : 'contact'} />
          </div>

          {/* Contact info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ember-500 mb-5">
                Get in Touch
              </h3>
              <div className="space-y-0">
                {[
                  { label: 'Address', val: 'Westlands, Nairobi, Kenya' },
                  { label: 'Phone', val: '+254 700 000 000' },
                  { label: 'Email', val: 'info@solarkenya.co.ke' },
                  { label: 'Hours', val: 'Mon–Sat: 8am – 6pm' },
                ].map(({ label, val }) => (
                  <div key={label} className="border-b border-coal/10 py-4">
                    <p className="text-xs text-ash uppercase tracking-widest font-sans mb-1">{label}</p>
                    <p className="text-coal font-medium text-sm font-sans">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-2 border-ember-500 p-5">
              <h4 className="font-sans font-bold text-ember-600 text-xs tracking-widest mb-2 uppercase">
                Fast Response Guarantee
              </h4>
              <p className="text-sm text-ash leading-relaxed font-sans">
                We respond to all quote requests within 24 hours on business days. For urgent inquiries, call us directly.
              </p>
            </div>

            <div className="border-2 border-coal/10 p-5 bg-cream-light">
              <h4 className="font-sans font-bold text-coal text-xs tracking-widest uppercase mb-4">
                Service Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Machakos', 'Nyeri', 'All 47 Counties'].map((c) => (
                  <span key={c} className="text-xs bg-cream-dark text-coal/60 px-3 py-1 font-sans">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
