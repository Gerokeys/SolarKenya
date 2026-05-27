import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-coal flex">
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/solar5.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-coal/80" />
        <div className="relative z-10">
          <span className="font-display text-3xl tracking-wider text-white leading-none">
            SOLAR LINK<span className="text-citron"> KENYA</span>
          </span>
        </div>
        <div className="relative z-10">
          <p className="font-display text-6xl xl:text-7xl leading-none text-white mb-4">
            POWER<br />THE<br /><span className="text-ember-500">NATION.</span>
          </p>
          <p className="font-sans text-white/40 text-sm tracking-widest uppercase">Admin Control Panel</p>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-px border border-white/10">
          {[['98%', 'Uptime'], ['5K+', 'Panels'], ['47', 'Counties']].map(([val, lab]) => (
            <div key={lab} className="bg-white/5 p-4">
              <div className="font-display text-2xl text-ember-400 leading-none">{val}</div>
              <div className="font-sans text-xs text-white/30 tracking-widest uppercase mt-1">{lab}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 text-center">
            <span className="font-display text-2xl tracking-wider text-white leading-none">
              SOLAR LINK<span className="text-citron"> KENYA</span>
            </span>
          </div>

          <div className="mb-8">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-ember-400 font-semibold mb-2">Admin Access</p>
            <h1 className="font-display text-4xl tracking-wider text-white leading-none">SIGN IN</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/40 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-white/10 bg-white/5 text-white focus:outline-none focus:border-ember-400 transition-colors font-sans placeholder-white/20"
                placeholder="admin@solarkenya.co.ke"
                required
                autoFocus
              />
            </div>
            <div>
              <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/40 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 border-2 border-white/10 bg-white/5 text-white focus:outline-none focus:border-ember-400 transition-colors font-sans placeholder-white/20"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ember-500 hover:bg-ember-600 text-coal font-sans font-bold py-4 tracking-widest uppercase text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/10">
            <a href="/" className="font-sans text-xs tracking-widest uppercase text-white/30 hover:text-white/50 transition-colors">
              ← Back to Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
