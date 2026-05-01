import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import BlogCard from '../components/BlogCard';
import api from '../api/axios';

const SingleBlog = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    api.get(`/blog/${slug}`)
      .then(({ data }) => {
        setPost(data.data);
        setRelated(data.related || []);
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-ember-200 border-t-ember-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
        <div className="font-display text-8xl text-coal/10 leading-none">404</div>
        <h1 className="font-heading font-bold text-2xl text-coal">Post not found</h1>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      <PageMeta
        title={post.metaTitle || post.title}
        description={post.metaDescription || post.excerpt}
        image={post.coverImage}
        url={`/blog/${post.slug}`}
      />

      {/* Hero */}
      <section className="bg-coal pt-32 pb-16 relative overflow-hidden grain-overlay">
        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-ember-500" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-ember-400 hover:text-ember-300 text-sm mb-6 transition-colors font-sans tracking-wide"
          >
            ← Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <span className="bg-ember-500 text-coal font-sans font-bold text-xs px-3 py-1 tracking-widest uppercase">
              {post.category}
            </span>
            <span className="text-white/40 text-sm font-sans">{post.readTime} min read</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            {post.title}
          </h1>
          <p className="text-white/55 text-lg mb-8 font-sans leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center gap-4 text-sm text-white/40 font-sans">
            {post.author && (
              <span className="flex items-center gap-2">
                <span className="w-7 h-7 bg-ember-500 flex items-center justify-center text-coal text-xs font-bold font-sans">
                  {post.author.name?.[0]?.toUpperCase()}
                </span>
                {post.author.name}
              </span>
            )}
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>{formattedDate}</span>
            {post.views > 0 && (
              <>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{post.views} views</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Cover image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 -mt-6 relative z-10">
          <div className="overflow-hidden border-2 border-coal/10 aspect-video">
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div
          className="prose-solar font-sans"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t-2 border-coal/10">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`/blog?search=${tag}`}
                className="text-xs bg-cream-dark text-coal/60 hover:bg-ember-100 hover:text-ember-700 px-3 py-1.5 font-sans transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* In-article CTA */}
        <div className="mt-10 border-2 border-ember-500 bg-ember-50 p-6">
          <h3 className="font-heading font-bold text-coal text-lg mb-2">
            Interested in Solar for Your Home?
          </h3>
          <p className="text-ash text-sm mb-5 font-sans leading-relaxed">
            Get a free consultation with our certified solar engineers — no obligation, no pressure.
          </p>
          <Link to="/contact?type=quote" className="btn-primary text-sm">
            Request a Free Quote
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="bg-cream-light py-16">
          <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
            <span className="section-label">Keep reading</span>
            <h2 className="section-title mb-10">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <BlogCard key={p._id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBlog;
