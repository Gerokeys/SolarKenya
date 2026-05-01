const BlogPost = require('../models/BlogPost');
const path = require('path');
const fs = require('fs');

// GET /api/blog  — public listing with pagination, category filter, search
exports.getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 9, category, search, status = 'published' } = req.query;

    const query = {};

    // Admins can see drafts; public only sees published
    if (req.user) {
      if (status) query.status = status;
    } else {
      query.status = 'published';
    }

    if (category) query.category = category;

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await BlogPost.countDocuments(query);

    const posts = await BlogPost.find(query)
      .populate('author', 'name avatar')
      .select('-content')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blog/:slug  — public single post
exports.getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found.' });
    }

    // Related posts (same category, excluding current)
    const related = await BlogPost.find({
      category: post.category,
      status: 'published',
      _id: { $ne: post._id },
    })
      .select('title slug excerpt coverImage readTime createdAt')
      .limit(3);

    res.json({ success: true, data: post, related });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/blog  — admin create
exports.createPost = async (req, res) => {
  try {
    const { title, excerpt, content, category, tags, status, metaTitle, metaDescription } = req.body;

    const coverImage = req.file
      ? `/uploads/${req.file.filename}`
      : null;

    const post = await BlogPost.create({
      title,
      excerpt,
      content,
      category,
      tags: tags ? JSON.parse(tags) : [],
      status,
      metaTitle,
      metaDescription,
      coverImage,
      author: req.user._id,
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/blog/:id  — admin update
exports.updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    const updates = { ...req.body };
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = JSON.parse(updates.tags);
    }

    if (req.file) {
      // Remove old image
      if (post.coverImage) {
        const oldPath = path.join(__dirname, '..', post.coverImage);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updates.coverImage = `/uploads/${req.file.filename}`;
    }

    Object.assign(post, updates);
    await post.save();

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/blog/:id  — admin delete
exports.deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' });

    if (post.coverImage) {
      const imgPath = path.join(__dirname, '..', post.coverImage);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await post.deleteOne();
    res.json({ success: true, message: 'Post deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/blog/categories/stats  — admin dashboard stats
exports.getCategoryStats = async (req, res) => {
  try {
    const stats = await BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
