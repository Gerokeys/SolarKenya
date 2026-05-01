import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const LeadForm = ({ type = 'contact', calculatorData = null, compact = false }) => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.location) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        type,
        ...(calculatorData && {
          monthlyBill: calculatorData.monthlyBill,
          estimatedSystemSize: `${calculatorData.systemSizeKw}kW`,
          estimatedCost: `KES ${calculatorData.costLow} – ${calculatorData.costHigh}`,
        }),
      };
      await api.post('/leads', payload);
      setSubmitted(true);
      toast.success("Thank you! We'll be in touch within 24 hours.");
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-ember-500 flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-heading font-bold text-xl text-coal mb-2">Message Received!</h3>
        <p className="text-ash font-sans">Our solar experts will contact you within 24 hours.</p>
      </div>
    );
  }

  const labelClass = 'block font-sans text-xs tracking-[0.15em] uppercase text-ash mb-2 font-semibold';

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${compact ? '' : 'max-w-lg'}`}>
      <div className={`grid ${compact ? 'grid-cols-1' : 'sm:grid-cols-2'} gap-4`}>
        <div>
          <label className={labelClass}>
            Full Name <span className="text-ember-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Kamau"
            className="input-field"
            required
          />
        </div>
        <div>
          <label className={labelClass}>
            Phone <span className="text-ember-500">*</span>
          </label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+254 7XX XXX XXX"
            className="input-field"
            required
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          Email <span className="text-ember-500">*</span>
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="john@email.com"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Location (County / Town) <span className="text-ember-500">*</span>
        </label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="e.g. Westlands, Nairobi"
          className="input-field"
          required
        />
      </div>

      <div>
        <label className={labelClass}>
          Message{' '}
          {type === 'contact' && <span className="text-ash/60 normal-case tracking-normal">(optional)</span>}
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={
            type === 'quote'
              ? 'Tell us about your energy needs, current setup, or any specific requirements...'
              : 'How can we help you?'
          }
          rows={4}
          className="input-field resize-none"
        />
      </div>

      {calculatorData && (
        <div className="border-2 border-ember-200 bg-ember-50 p-4">
          <p className="font-sans font-bold text-ember-700 text-xs tracking-widest uppercase mb-1">
            Calculator Results Attached
          </p>
          <p className="text-sm text-ash font-sans">
            System: {calculatorData.systemSizeKw}kW · Cost: KES {calculatorData.costLow} – {calculatorData.costHigh}
          </p>
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-sm">
        {loading ? (
          <span className="flex items-center gap-2 justify-center">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending...
          </span>
        ) : type === 'quote' ? (
          'Request My Free Quote'
        ) : (
          'Send Message'
        )}
      </button>

      <p className="text-xs text-ash text-center font-sans">
        We respect your privacy. No spam, ever.
      </p>
    </form>
  );
};

export default LeadForm;
