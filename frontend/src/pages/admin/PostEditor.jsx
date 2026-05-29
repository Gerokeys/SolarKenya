import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../api/axios';

const CATEGORIES = [
  'Solar 101',
  'Solar Panels - Cost Guides',
  'Solar Panels - System Sizes',
  'Battery 101',
  'Solar Batteries - Cost Guides',
  'Solar Batteries - System Sizes',
  'Solar Inverters',
  'Solar Hot Water Systems',
  'Reviews',
  'News',
];

const AdminNav = ({ title }) => (
  <nav className="bg-coal border-b-2 border-ember-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-4">
      <Link to="/admin/posts" className="text-white/40 hover:text-ember-400 transition-colors font-sans text-sm tracking-wide">
        ← Posts
      </Link>
      <span className="text-white/20">|</span>
      <span className="font-display text-xl tracking-wider text-white leading-none">
        SOLAR<span className="text-ember-500">LINK</span><span className="text-citron"> KENYA</span>
        <span className="text-white/30 text-xs ml-3 font-sans tracking-[0.2em] uppercase">Admin</span>
      </span>
    </div>
    <span className="font-sans text-xs tracking-widest uppercase text-white/40">{title}</span>
  </nav>
);

const PostEditor = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', excerpt: '', content: '', category: 'Solar Panels',
    tags: '', status: 'draft', metaTitle: '', metaDescription: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/blog/${id}`)
      .then(({ data }) => {
        const p = data.data;
        setForm({
          title: p.title, excerpt: p.excerpt, content: p.content,
          category: p.category, tags: p.tags?.join(', ') || '',
          status: p.status, metaTitle: p.metaTitle || '', metaDescription: p.metaDescription || '',
        });
        if (p.coverImage) setImagePreview(p.coverImage);
      })
      .catch(() => toast.error('Failed to load post'));
  }, [id, isEdit]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt || !form.content) {
      toast.error('Title, excerpt, and content are required.');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append('coverImage', image);

      if (isEdit) {
        await api.put(`/blog/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Post updated!');
      } else {
        await api.post('/blog', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Post created!');
      }
      navigate('/admin/posts');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save post.');
    } finally {
      setLoading(false);
    }
  };

  const labelClass = 'block font-sans text-xs tracking-[0.15em] uppercase text-ash font-semibold mb-2';
  const inputClass = 'w-full px-4 py-3 border-2 border-coal/20 bg-white focus:outline-none focus:border-ember-400 transition-colors font-sans text-coal placeholder-ash';

  return (
    <div className="min-h-screen bg-cream">
      <AdminNav title={isEdit ? 'Edit Post' : 'New Post'} />

      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">

            {/* ── Main content ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Title */}
              <div className="bg-cream-light border-2 border-coal/10 p-6">
                <label className={labelClass}>Post Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className={`${inputClass} font-display text-2xl tracking-wide`}
                  placeholder="YOUR POST TITLE HERE"
                  required
                />
              </div>

              {/* Excerpt */}
              <div className="bg-cream-light border-2 border-coal/10 p-6">
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass + ' mb-0'}>Excerpt *</label>
                  <span className="font-sans text-xs text-ash">{form.excerpt.length}/300</span>
                </div>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  rows={3}
                  placeholder="Short description shown in blog listings..."
                  maxLength={300}
                  required
                />
              </div>

              {/* Content */}
              <div className="bg-cream-light border-2 border-coal/10 p-6">
                <label className={labelClass}>Content * <span className="normal-case tracking-normal text-ash/60 ml-1">— HTML supported</span></label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className={`${inputClass} resize-y font-mono text-sm leading-relaxed`}
                  rows={22}
                  placeholder={'<h2>Introduction</h2>\n<p>Write your post content here...</p>'}
                  required
                />
              </div>

              {/* SEO */}
              <div className="bg-coal p-6 space-y-5">
                <div>
                  <span className="section-label text-ember-400">SEO Settings</span>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-sans text-xs tracking-[0.15em] uppercase text-white/50 font-semibold">Meta Title</label>
                    <span className="font-sans text-xs text-white/30">{form.metaTitle.length}/60</span>
                  </div>
                  <input
                    name="metaTitle"
                    value={form.metaTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-white/10 bg-white/5 text-white focus:outline-none focus:border-ember-400 transition-colors font-sans placeholder-white/20"
                    maxLength={60}
                    placeholder="Defaults to post title"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-sans text-xs tracking-[0.15em] uppercase text-white/50 font-semibold">Meta Description</label>
                    <span className="font-sans text-xs text-white/30">{form.metaDescription.length}/160</span>
                  </div>
                  <textarea
                    name="metaDescription"
                    value={form.metaDescription}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-white/10 bg-white/5 text-white focus:outline-none focus:border-ember-400 transition-colors font-sans placeholder-white/20 resize-none"
                    rows={2}
                    maxLength={160}
                    placeholder="Defaults to excerpt"
                  />
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">

              {/* Publish */}
              <div className="bg-coal p-6 space-y-5 sticky top-20">
                <span className="section-label text-ember-400">Publish</span>

                <div>
                  <label className="font-sans text-xs tracking-[0.15em] uppercase text-white/50 font-semibold block mb-2">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-white/10 bg-coal text-white focus:outline-none focus:border-ember-400 transition-colors font-sans"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs tracking-[0.15em] uppercase text-white/50 font-semibold block mb-2">Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-white/10 bg-coal text-white focus:outline-none focus:border-ember-400 transition-colors font-sans"
                  >
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="font-sans text-xs tracking-[0.15em] uppercase text-white/50 font-semibold block mb-2">Tags <span className="normal-case tracking-normal text-white/30 text-xs">(comma-separated)</span></label>
                  <input
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-white/10 bg-white/5 text-white focus:outline-none focus:border-ember-400 transition-colors font-sans placeholder-white/20"
                    placeholder="kenya, solar, kplc"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-ember-500 hover:bg-ember-600 text-coal font-sans font-bold py-4 tracking-widest uppercase text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : isEdit ? 'Update Post' : 'Publish Post'}
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/admin/posts')}
                  className="w-full border-2 border-white/10 text-white/40 hover:border-white/20 hover:text-white/60 font-sans text-sm py-3 transition-all tracking-widest uppercase"
                >
                  Cancel
                </button>
              </div>

              {/* Cover image */}
              <div className="bg-cream-light border-2 border-coal/10 p-6">
                <span className="section-label">Cover Image</span>

                {imagePreview ? (
                  <div className="relative mb-4">
                    <img src={imagePreview} alt="Preview" className="w-full aspect-video object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImage(null); setImagePreview(null); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-coal/70 text-white flex items-center justify-center text-xs hover:bg-coal transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block mb-2">
                    <div className="border-2 border-dashed border-coal/20 p-8 text-center hover:border-ember-400 hover:bg-ember-50 transition-all group">
                      <div className="w-12 h-12 bg-ember-100 flex items-center justify-center mx-auto mb-3 group-hover:bg-ember-200 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-ember-500" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                      </div>
                      <p className="font-sans text-sm font-semibold text-coal">Click to upload</p>
                      <p className="text-xs text-ash mt-1">JPEG, PNG or WebP · Max 5MB</p>
                    </div>
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                  </label>
                )}

                {imagePreview && (
                  <label className="cursor-pointer block">
                    <div className="border-2 border-dashed border-coal/20 p-3 text-center hover:border-ember-400 transition-colors">
                      <p className="font-sans text-xs text-ash">Change image</p>
                    </div>
                    <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostEditor;
