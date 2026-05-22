import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import PageMeta from '../components/PageMeta';
import api from '../api/axios';

const CATEGORIES = ['All', 'Solar Panels', 'Batteries', 'Costs', 'Installation', 'News', 'Tips'];

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const category = searchParams.get('category') || 'All';
  const page = parseInt(searchParams.get('page') || '1');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 9 });
      if (category !== 'All') params.set('category', category);
      if (search) params.set('search', search);
      const { data } = await api.get(`/blog?${params}`);
      setPosts(data.data);
      setPagination(data.pagination);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [page, category, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  const setCategory = (cat) => {
    const p = new URLSearchParams();
    if (cat !== 'All') p.set('category', cat);
    setSearchParams(p);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setSearchParams({ page: '1' });
  };

  return (
    <>
      <PageMeta title="Solar Blog Kenya" description="Expert solar energy guides, cost breakdowns, installation tips, and industry news for Kenya." />

      {/* Header */}
      <section className="bg-coal relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[420px]">
          {/* Text side */}
          <div className="pt-32 pb-14 px-6 lg:px-10 flex flex-col justify-center relative z-10">
            <span className="section-label">Knowledge base</span>
            <h1 className="font-display text-white mt-2" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1 }}>
              SOLAR ENERGY<br /><span className="text-ember-500">BLOG</span>
            </h1>
            <p className="text-muted text-base mt-5 max-w-md font-sans leading-relaxed">
              Expert guides, cost analyses, and the latest solar news — built for Kenya.
            </p>
            <form onSubmit={handleSearch} className="max-w-sm mt-8 flex gap-0">
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="flex-1 px-4 py-3 border-2 border-white/10 bg-white/5 text-white placeholder-white/30 font-sans focus:outline-none focus:border-ember-400 transition-colors text-sm"
                style={{ borderRadius: 0 }}
              />
              <button
                type="submit"
                className="bg-citron text-white font-sans font-bold px-5 py-3 tracking-widest uppercase text-xs hover:bg-citron/90 transition-all"
              >
                Go
              </button>
            </form>
          </div>

          {/* Image side */}
          <div className="hidden lg:block relative">
            <img
              src="/images/solar2.jpeg"
              alt="Solar panel installation"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-coal via-coal/40 to-transparent" />
            {/* Stat callout */}
            <div className="absolute bottom-8 right-8 bg-coal/80 border border-white/10 px-6 py-4 backdrop-blur-sm">
              <div className="font-display text-4xl text-ember-500 leading-none">47</div>
              <div className="font-sans text-xs text-white/50 tracking-widest uppercase mt-1">Counties covered</div>
            </div>
          </div>
        </div>

        {/* Bottom border accent */}
        <div className="h-1 bg-ember-500" />
      </section>

      <div className="max-w-screen-xl mx-auto px-6 lg:px-10 py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 text-sm font-sans font-medium border-2 tracking-wide transition-all ${
                category === cat
                  ? 'bg-ember-500 text-coal border-ember-500'
                  : 'bg-cream-light text-coal border-coal/10 hover:border-citron'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border-2 border-coal/10 overflow-hidden animate-pulse">
                <div className="bg-coal/10 aspect-video" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-coal/10 w-3/4" />
                  <div className="h-3 bg-coal/10" />
                  <div className="h-3 bg-coal/10 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="font-display text-8xl text-coal/10 mb-4 leading-none">NONE</div>
            <h3 className="font-heading font-bold text-xl text-coal mb-2">No posts found</h3>
            <p className="text-ash font-sans">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard
                key={post._id}
                post={post}
                featured={i === 0 && page === 1 && category === 'All' && !search}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setSearchParams({ page: String(p), ...(category !== 'All' && { category }) })}
                className={`w-10 h-10 font-sans font-medium text-sm transition-all border-2 ${
                  p === page
                    ? 'bg-ember-500 text-coal border-ember-500'
                    : 'bg-cream-light border-coal/10 text-coal hover:border-citron'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Blog;
