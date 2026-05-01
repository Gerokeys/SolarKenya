const express = require('express');
const router = express.Router();
const {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  getStats,
} = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

// Public
router.post('/', createLead);

// Admin protected
router.get('/stats/summary', protect, getStats);
router.get('/', protect, getLeads);
router.get('/:id', protect, getLead);
router.patch('/:id', protect, updateLead);
router.delete('/:id', protect, deleteLead);

module.exports = router;
