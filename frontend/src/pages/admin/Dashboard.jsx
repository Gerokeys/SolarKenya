import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';

const AdminNav = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="bg-coal border-b-2 border-ember-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <span className="font-display text-xl tracking-wider text-white leading-none">
        SOLAR<span className="text-ember-500">KENYA</span>
        <span className="text-white/30 text-xs ml-3 font-sans tracking-[0.2em] uppercase">Admin</span>
      </span>
      <div className="flex items-center gap-6">
        <span className="font-sans text-xs tracking-widest uppercase text-white/40">{user?.name}</span>
        <Link to="/" target="_blank" className="font-sans text-xs tracking-widest uppercase text-ember-400 hover:text-ember-300 transition-colors">
          View Site ↗
        </Link>
        <button
          onClick={logout}
          className="font-sans text-xs tracking-widest uppercase text-white/30 hover:text-white/60 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const STATUS_STYLES = {
  new: 'bg-citron/15 text-citron',
  contacted: 'bg-citron/20 text-coal',
  converted: 'bg-citron text-coal',
  closed: 'bg-ash/10 text-ash',
};

const StatCard = ({ label, value, accent = false }) => (
  <div className={`border-2 p-6 ${accent ? 'bg-ember-500 border-ember-500' : 'bg-cream-light border-coal/10'}`}>
    <div className={`font-display text-5xl leading-none mb-2 ${accent ? 'text-coal' : 'text-citron'}`}>{value ?? '—'}</div>
    <div className={`font-sans text-xs tracking-widest uppercase font-semibold ${accent ? 'text-coal/60' : 'text-ash'}`}>{label}</div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/leads/stats/summary'),
      api.get('/leads?limit=5'),
      api.get('/blog?limit=5&status=all'),
    ]).then(([statsRes, leadsRes, postsRes]) => {
      setStats(statsRes.data.data);
      setRecentLeads(leadsRes.data.data);
      setRecentPosts(postsRes.data.data);
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav />

      <div className="max-w-screen-xl mx-auto px-6 py-10 space-y-10">

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Leads" value={stats.total} accent />
            <StatCard label="New Leads" value={stats.newLeads} />
            <StatCard label="Quote Requests" value={stats.quotes} />
            <StatCard label="Converted" value={stats.converted} />
          </div>
        )}

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              to: '/admin/posts/new', label: 'New Blog Post', sub: 'Create & publish content',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-ember-500">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              ),
            },
            {
              to: '/admin/leads', label: 'View All Leads', sub: 'Manage customer inquiries',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-ember-500">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                </svg>
              ),
            },
            {
              to: '/admin/posts', label: 'Manage Posts', sub: 'Edit, delete, publish',
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-ember-500">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                </svg>
              ),
            },
          ].map(({ to, label, sub, icon }) => (
            <Link
              key={to}
              to={to}
              className="bg-cream-light border-2 border-coal/10 p-5 flex items-center gap-4 hover:border-ember-400 hover:bg-cream-dark/10 transition-all group"
            >
              <div className="w-10 h-10 border-2 border-ember-500/20 bg-ember-500/5 flex items-center justify-center flex-shrink-0 group-hover:bg-ember-500/10 transition-colors">
                {icon}
              </div>
              <div>
                <p className="font-sans font-semibold text-coal tracking-wide">{label}</p>
                <p className="font-sans text-xs text-ash mt-0.5">{sub}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent leads */}
          <div className="bg-cream-light border-2 border-coal/10">
            <div className="px-6 py-4 border-b-2 border-coal/10 flex items-center justify-between">
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ash">Recent Leads</span>
              <Link to="/admin/leads" className="font-sans text-xs tracking-widest uppercase text-citron hover:text-citron/70 transition-colors">
                View all →
              </Link>
            </div>
            <div className="divide-y-2 divide-coal/5">
              {recentLeads.length === 0 ? (
                <p className="p-6 font-sans text-sm text-ash text-center">No leads yet.</p>
              ) : recentLeads.map((lead) => (
                <div key={lead._id} className="px-6 py-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-sans font-semibold text-sm text-coal">{lead.name}</p>
                    <p className="font-sans text-xs text-ash mt-0.5">{lead.location} · {lead.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`font-sans text-xs tracking-wider uppercase px-2 py-1 font-semibold ${STATUS_STYLES[lead.status] || 'bg-ash/10 text-ash'}`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent posts */}
          <div className="bg-cream-light border-2 border-coal/10">
            <div className="px-6 py-4 border-b-2 border-coal/10 flex items-center justify-between">
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ash">Recent Posts</span>
              <Link to="/admin/posts" className="font-sans text-xs tracking-widest uppercase text-citron hover:text-citron/70 transition-colors">
                Manage →
              </Link>
            </div>
            <div className="divide-y-2 divide-coal/5">
              {recentPosts.length === 0 ? (
                <p className="p-6 font-sans text-sm text-ash text-center">No posts yet.</p>
              ) : recentPosts.map((post) => (
                <div key={post._id} className="px-6 py-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-sans font-semibold text-sm text-coal truncate">{post.title}</p>
                    <p className="font-sans text-xs text-ash mt-0.5">{post.category} · {post.views ?? 0} views</p>
                  </div>
                  <span className={`font-sans text-xs tracking-wider uppercase px-2 py-1 font-semibold flex-shrink-0 ${
                    post.status === 'published' ? 'bg-citron text-coal' : 'bg-coal/10 text-ash'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
