import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const AdminNav = ({ title }) => (
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
    <div className="flex items-center gap-4">
      <span className="font-sans text-xs tracking-widest uppercase text-white/40">{title}</span>
      <Link
        to="/admin/posts/new"
        className="bg-ember-500 hover:bg-ember-600 text-coal font-sans font-bold px-4 py-2 tracking-widest uppercase text-xs transition-colors"
      >
        + New Post
      </Link>
    </div>
  </nav>
);

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = () => {
    setLoading(true);
    api.get('/blog?limit=50&status=all')
      .then(({ data }) => setPosts(data.data))
      .catch(() => toast.error('Failed to load posts'))
      .finally(() => setLoading(false));
  };

  useEffect(fetchPosts, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      await api.delete(`/blog/${id}`);
      toast.success('Post deleted');
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.error('Failed to delete post');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav title="Blog Posts" />

      <div className="max-w-screen-xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-cream-light border-2 border-coal/10 p-4 animate-pulse flex gap-4">
                <div className="w-24 h-16 bg-coal/10" />
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-coal/10 w-2/3" />
                  <div className="h-3 bg-coal/10 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 border-2 border-dashed border-coal/10">
            <div className="w-16 h-16 border-2 border-coal/10 flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-ash">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <p className="font-display text-3xl tracking-widest text-coal mb-2">NO POSTS YET</p>
            <p className="font-sans text-ash text-sm mb-6">Start building your content library</p>
            <Link
              to="/admin/posts/new"
              className="inline-block bg-ember-500 hover:bg-ember-600 text-coal font-sans font-bold px-6 py-3 tracking-widest uppercase text-sm transition-colors"
            >
              Create First Post
            </Link>
          </div>
        ) : (
          <div className="bg-cream-light border-2 border-coal/10 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-12 gap-0 border-b-2 border-coal/10 bg-coal/5 px-6 py-3">
              <div className="col-span-6 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold">Title</div>
              <div className="col-span-2 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold hidden md:block">Category</div>
              <div className="col-span-2 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold hidden lg:block">Status</div>
              <div className="col-span-1 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold hidden lg:block">Views</div>
              <div className="col-span-4 md:col-span-2 lg:col-span-1 font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold text-right">Actions</div>
            </div>

            <div className="divide-y-2 divide-coal/5">
              {posts.map((post) => (
                <div key={post._id} className="grid grid-cols-12 gap-0 px-6 py-4 items-center hover:bg-ember-500/5 transition-colors">
                  <div className="col-span-6">
                    <p className="font-sans font-semibold text-sm text-coal leading-snug line-clamp-1">{post.title}</p>
                    <p className="font-sans text-xs text-ash mt-0.5">
                      {new Date(post.createdAt).toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="font-sans text-xs text-ash">{post.category}</span>
                  </div>
                  <div className="col-span-2 hidden lg:block">
                    <span className={`font-sans text-xs tracking-wider uppercase px-2 py-1 font-semibold ${
                      post.status === 'published' ? 'bg-citron text-coal' : 'bg-coal/10 text-ash'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                  <div className="col-span-1 hidden lg:block">
                    <span className="font-sans text-xs text-ash">{post.views ?? 0}</span>
                  </div>
                  <div className="col-span-6 md:col-span-2 lg:col-span-1 flex items-center justify-end gap-1">
                    <Link
                      to={`/blog/${post.slug}`}
                      target="_blank"
                      className="font-sans text-xs text-ash hover:text-coal px-2 py-1.5 hover:bg-coal/5 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => navigate(`/admin/posts/edit/${post._id}`)}
                      className="font-sans text-xs text-ember-500 hover:text-ember-600 px-2 py-1.5 hover:bg-ember-500/10 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id, post.title)}
                      disabled={deleting === post._id}
                      className="font-sans text-xs text-coal/30 hover:text-red-500 px-2 py-1.5 hover:bg-red-50 transition-colors disabled:opacity-40"
                    >
                      {deleting === post._id ? '...' : 'Del'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 border-t-2 border-coal/5 bg-coal/5">
              <span className="font-sans text-xs text-ash tracking-widest uppercase">{posts.length} post{posts.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
