import { Link } from 'react-router-dom';

const CATEGORY_COLORS = {
  'Solar Panels': 'bg-ember-500 text-coal',
  'Batteries':    'bg-coal text-ember-500',
  'Costs':        'bg-citron text-coal',
  'Installation': 'bg-coal text-citron',
  'News':         'bg-coal/80 text-white',
  'Tips':         'bg-citron/20 text-coal',
};

const SunPlaceholder = ({ size = 'lg' }) => (
  <div className="w-full h-full bg-coal flex items-center justify-center">
    <svg
      viewBox="0 0 200 200"
      className={size === 'lg' ? 'w-24 h-24 opacity-15' : 'w-16 h-16 opacity-15'}
      fill="none"
    >
      <circle cx="100" cy="100" r="28" fill="#F59E0B" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={100 + 42 * Math.cos(a)} y1={100 + 42 * Math.sin(a)}
            x2={100 + 72 * Math.cos(a)} y2={100 + 72 * Math.sin(a)}
            stroke="#F59E0B"
            strokeWidth="2"
          />
        );
      })}
    </svg>
  </div>
);

const API_BASE = (import.meta.env.VITE_API_URL || '').replace('/api', '');
const imgSrc = (src) => src?.startsWith('/uploads/') ? `${API_BASE}${src}` : src;

const BlogCard = ({ post, featured = false }) => {
  const { title, slug, excerpt, coverImage, category, readTime, createdAt, author } = post;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (featured) {
    return (
      <Link
        to={`/blog/${slug}`}
        className="group block col-span-full border-2 border-coal/10 hover:border-citron transition-all bg-cream-light overflow-hidden"
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative overflow-hidden aspect-video md:aspect-auto min-h-[240px]">
            {coverImage ? (
              <img
                src={imgSrc(coverImage)}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <SunPlaceholder size="lg" />
            )}
          </div>
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-sans font-bold tracking-widest uppercase px-3 py-1 ${CATEGORY_COLORS[category] || 'bg-coal text-white'}`}>
                {category}
              </span>
              <span className="text-xs text-ash font-sans uppercase tracking-widest">Featured</span>
            </div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-coal mb-3 group-hover:text-citron transition-colors leading-snug">
              {title}
            </h2>
            <p className="text-ash text-sm line-clamp-3 mb-6 font-sans leading-relaxed">{excerpt}</p>
            <div className="flex items-center gap-3 text-xs text-ash mt-auto font-sans tracking-wide">
              <span>{formattedDate}</span>
              <span className="w-1 h-1 bg-ash rounded-full" />
              <span>{readTime} min read</span>
              {author && (
                <>
                  <span className="w-1 h-1 bg-ash rounded-full" />
                  <span>By {author.name}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/blog/${slug}`}
      className="group block border-2 border-coal/10 hover:border-citron transition-all bg-cream-light overflow-hidden"
    >
      <div className="relative overflow-hidden aspect-video">
        {coverImage ? (
          <img
            src={imgSrc(coverImage)}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <SunPlaceholder size="sm" />
        )}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-sans font-bold tracking-widest uppercase px-3 py-1 ${CATEGORY_COLORS[category] || 'bg-coal text-white'}`}>
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-heading font-bold text-coal mb-2 line-clamp-2 group-hover:text-citron transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-ash text-sm line-clamp-2 mb-4 font-sans leading-relaxed">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-ash font-sans tracking-wide">
          <span>{formattedDate}</span>
          <span>{readTime} min read</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
