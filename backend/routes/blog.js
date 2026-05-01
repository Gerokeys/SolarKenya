const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getCategoryStats,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', getPosts);
router.get('/categories/stats', protect, getCategoryStats);
router.get('/:slug', getPostBySlug);

// Protected admin routes
router.post('/', protect, upload.single('coverImage'), createPost);
router.put('/:id', protect, upload.single('coverImage'), updatePost);
router.delete('/:id', protect, deletePost);

module.exports = router;
