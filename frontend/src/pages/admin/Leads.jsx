import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'closed'];

const STATUS_STYLES = {
  new: 'bg-ember-500/15 text-ember-600',
  contacted: 'bg-citron/25 text-coal',
  converted: 'bg-citron text-coal',
  closed: 'bg-ash/10 text-ash',
};

const AdminNav = () => (
  <nav className="bg-coal border-b-2 border-ember-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-4">
      <Link to="/admin" className="text-white/40 hover:text-ember-400 transition-colors font-sans text-sm tracking-wide">
        ← Dashboard
      </Link>
      <span className="text-white/20">|</span>
      <span className="font-display text-xl tracking-wider text-white leading-none">
        SOLAR LINK<span className="text-citron"> KENYA</span>
        <span className="text-white/30 text-xs ml-3 font-sans tracking-[0.2em] uppercase">Admin</span>
      </span>
    </div>
    <span className="font-sans text-xs tracking-widest uppercase text-white/40">Leads</span>
  </nav>
);

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', type: '' });
  const [selected, setSelected] = useState(null);

  const fetchLeads = () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: 50 });
    if (filter.status) params.set('status', filter.status);
    if (filter.type) params.set('type', filter.type);

    api.get(`/leads?${params}`)
      .then(({ data }) => setLeads(data.data))
      .catch(() => toast.error('Failed to load leads'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchLeads, [filter]);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.patch(`/leads/${id}`, { status });
      setLeads((prev) => prev.map((l) => l._id === id ? data.data : l));
      if (selected?._id === id) setSelected(data.data);
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update');
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Lead deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const selectClass = 'px-4 py-2.5 border-2 border-coal/20 bg-white focus:outline-none focus:border-ember-400 transition-colors font-sans text-sm text-coal';

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav />

      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className={selectClass}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            className={selectClass}
          >
            <option value="">All Types</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote Request</option>
          </select>
          <span className="font-sans text-xs text-ash tracking-widest uppercase ml-auto">{leads.length} lead{leads.length !== 1 ? 's' : ''}</span>
        </div>

        <div className={`grid gap-6 ${selected ? 'lg:grid-cols-5' : ''}`}>
          {/* Leads table */}
          <div className={`${selected ? 'lg:col-span-3' : ''} bg-cream-light border-2 border-coal/10 overflow-hidden`}>
            {loading ? (
              <div className="p-8 text-center font-sans text-xs tracking-widest uppercase text-ash">
                <span className="inline-block w-5 h-5 border-2 border-coal/20 border-t-ember-500 rounded-full animate-spin mr-2" />
                Loading...
              </div>
            ) : leads.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-12 h-12 border-2 border-coal/10 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-ash">
                    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="font-sans text-ash text-sm">No leads match your filters</p>
              </div>
            ) : (
              <>
                {/* Table header */}
                <div className="grid grid-cols-12 border-b-2 border-coal/10 bg-coal/5 px-6 py-3">
                  <div className="col-span-5 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold">Name</div>
                  <div className="col-span-3 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold hidden md:block">Location</div>
                  <div className="col-span-2 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold">Type</div>
                  <div className="col-span-2 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold">Status</div>
                </div>
                <div className="divide-y-2 divide-coal/5">
                  {leads.map((lead) => (
                    <div
                      key={lead._id}
                      onClick={() => setSelected(lead)}
                      className={`grid grid-cols-12 px-6 py-4 items-center cursor-pointer transition-colors ${
                        selected?._id === lead._id
                          ? 'bg-ember-500/10 border-l-2 border-ember-500'
                          : 'hover:bg-ember-500/5 border-l-2 border-transparent'
                      }`}
                    >
                      <div className="col-span-5">
                        <p className="font-sans font-semibold text-sm text-coal">{lead.name}</p>
                        <p className="font-sans text-xs text-ash mt-0.5">{lead.phone}</p>
                      </div>
                      <div className="col-span-3 hidden md:block">
                        <span className="font-sans text-xs text-ash">{lead.location}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="font-sans text-xs tracking-wider uppercase px-2 py-1 bg-coal/10 text-ash font-semibold">
                          {lead.type}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`font-sans text-xs tracking-wider uppercase px-2 py-1 font-semibold ${STATUS_STYLES[lead.status] || 'bg-ash/10 text-ash'}`}>
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Lead detail panel */}
          {selected && (
            <div className="lg:col-span-2 bg-coal h-fit sticky top-20">
              <div className="px-6 py-5 border-b-2 border-white/10 flex items-center justify-between">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-ember-400 font-semibold">Lead Detail</span>
                <button
                  onClick={() => setSelected(null)}
                  className="w-7 h-7 border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center font-sans text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div>
                  <p className="font-display text-2xl tracking-wider text-white leading-none mb-1">{selected.name}</p>
                  <p className="font-sans text-xs text-white/30 tracking-widest uppercase">
                    {new Date(selected.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-5">
                  {[
                    ['Phone', selected.phone],
                    ['Email', selected.email],
                    ['Location', selected.location],
                    ['Type', selected.type],
                    ...(selected.estimatedSystemSize ? [['System Size', selected.estimatedSystemSize]] : []),
                    ...(selected.estimatedCost ? [['Est. Cost', selected.estimatedCost]] : []),
                  ].map(([k, v]) => v && (
                    <div key={k} className="flex gap-3">
                      <span className="font-sans text-xs tracking-[0.15em] uppercase text-white/30 font-semibold w-24 flex-shrink-0 pt-0.5">{k}</span>
                      <span className="font-sans text-sm text-white/80">{v}</span>
                    </div>
                  ))}
                </div>

                {selected.message && (
                  <div className="border-t border-white/10 pt-5">
                    <p className="font-sans text-xs tracking-[0.15em] uppercase text-white/30 font-semibold mb-2">Message</p>
                    <p className="font-sans text-sm text-white/60 bg-white/5 p-4 leading-relaxed">{selected.message}</p>
                  </div>
                )}

                <div className="border-t border-white/10 pt-5">
                  <p className="font-sans text-xs tracking-[0.15em] uppercase text-white/30 font-semibold mb-3">Update Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected._id, s)}
                        className={`px-3 py-2 font-sans text-xs tracking-widest uppercase font-semibold border-2 transition-all ${
                          selected.status === s
                            ? 'bg-ember-500 border-ember-500 text-coal'
                            : 'border-white/10 text-white/40 hover:border-ember-500/50 hover:text-white/60'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <button
                    onClick={() => deleteLead(selected._id)}
                    className="w-full py-3 font-sans text-xs tracking-widest uppercase text-white/30 border-2 border-white/10 hover:border-red-500/50 hover:text-red-400 transition-all"
                  >
                    Delete Lead
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;
