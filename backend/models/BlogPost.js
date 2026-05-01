const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    coverImage: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: ['Solar Panels', 'Batteries', 'Costs', 'Installation', 'News', 'Tips'],
      required: [true, 'Category is required'],
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readTime: {
      type: Number, // minutes
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    metaTitle: { type: String, maxlength: 60 },
    metaDescription: { type: String, maxlength: 160 },
  },
  { timestamps: true }
);

// Auto-generate slug from title
blogPostSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// Auto-calculate read time from content length (~200 words/min)
blogPostSchema.pre('save', function (next) {
  if (this.isModified('content')) {
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / 200);
  }
  next();
});

blogPostSchema.index({ category: 1, status: 1 });
blogPostSchema.index({ title: 'text', content: 'text', tags: 'text' });

module.exports = mongoose.model('BlogPost', blogPostSchema);
