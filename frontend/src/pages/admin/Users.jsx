import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const AdminNav = () => (
  <nav className="bg-coal border-b-2 border-ember-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-4">
      <Link to="/admin" className="text-white/40 hover:text-ember-400 transition-colors font-sans text-sm tracking-wide">
        ← Dashboard
      </Link>
      <span className="text-white/20">|</span>
      <span className="font-display text-xl tracking-wider text-white leading-none">
        SOLAR<span className="text-ember-500">LINK</span><span className="text-citron"> KENYA</span>
        <span className="text-white/30 text-xs ml-3 font-sans tracking-[0.2em] uppercase">Admin</span>
      </span>
    </div>
    <span className="font-sans text-xs tracking-widest uppercase text-white/40">Users</span>
  </nav>
);

const Users = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'admin' });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    api.get('/users')
      .then(({ data }) => setUsers(data.data))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchUsers, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/auth/register', form);
      toast.success(`Account created for ${form.email}`);
      setForm({ name: '', email: '', password: '', role: 'admin' });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Remove ${name}'s account? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/users/${id}`);
      toast.success('User removed');
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete user');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav />

      <div className="max-w-screen-md mx-auto px-6 py-10 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="section-label">Team Access</span>
            <h1 className="font-display text-4xl tracking-widest text-coal leading-none">ADMIN USERS</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-ember-500 hover:bg-ember-600 text-coal font-sans font-bold px-5 py-2.5 tracking-widest uppercase text-xs transition-colors"
          >
            {showForm ? '✕ Cancel' : '+ New User'}
          </button>
        </div>

        {/* Create user form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-coal border-2 border-ember-500/20 p-6 space-y-4"
          >
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-white/40 font-semibold mb-5">
              Create New Account
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-1.5">Full Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full bg-white/5 border-2 border-white/10 text-white font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-ember-500 transition-colors placeholder-white/20"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jane@solarkenya.com"
                  className="w-full bg-white/5 border-2 border-white/10 text-white font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-ember-500 transition-colors placeholder-white/20"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-1.5">Password</label>
                <input
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Min. 8 characters"
                  className="w-full bg-white/5 border-2 border-white/10 text-white font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-ember-500 transition-colors placeholder-white/20"
                  style={{ borderRadius: 0 }}
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-widest uppercase text-white/40 mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-coal border-2 border-white/10 text-white font-sans text-sm px-4 py-2.5 focus:outline-none focus:border-ember-500 transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-ember-500 hover:bg-ember-600 disabled:opacity-50 text-coal font-sans font-bold py-3 tracking-widest uppercase text-sm transition-colors mt-2"
            >
              {submitting ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Users list */}
        <div className="bg-cream-light border-2 border-coal/10 overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-coal/10 bg-coal/5">
            <span className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-ash">
              {users.length} user{users.length !== 1 ? 's' : ''}
            </span>
          </div>

          {loading ? (
            <div className="divide-y-2 divide-coal/5">
              {[1, 2].map((i) => (
                <div key={i} className="px-6 py-4 flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-coal/10 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-coal/10 w-1/3" />
                    <div className="h-3 bg-coal/10 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <p className="p-8 text-center font-sans text-sm text-ash">No users found.</p>
          ) : (
            <div className="divide-y-2 divide-coal/5">
              {users.map((u) => (
                <div key={u._id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 bg-ember-500/10 border-2 border-ember-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-ember-500 text-lg leading-none">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-sans font-semibold text-sm text-coal truncate">{u.name}</p>
                        {u._id === currentUser?.id && (
                          <span className="font-sans text-xs bg-citron/20 text-citron px-2 py-0.5 tracking-wider uppercase font-semibold">You</span>
                        )}
                      </div>
                      <p className="font-sans text-xs text-ash mt-0.5 truncate">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-sans text-xs tracking-wider uppercase px-2 py-1 font-semibold bg-coal/10 text-ash hidden sm:block">
                      {u.role}
                    </span>
                    {u._id !== currentUser?.id && (
                      <button
                        onClick={() => handleDelete(u._id, u.name)}
                        disabled={deleting === u._id}
                        className="font-sans text-xs text-coal/30 hover:text-red-500 px-2 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-40"
                      >
                        {deleting === u._id ? '...' : 'Remove'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
