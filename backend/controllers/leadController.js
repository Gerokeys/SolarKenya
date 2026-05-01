const Lead = require('../models/Lead');
const { sendLeadNotification } = require('../utils/mailer');

// POST /api/leads  — public form submission
exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, location, message, type, monthlyBill, estimatedSystemSize, estimatedCost } = req.body;

    const ipAddress =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      null;

    const lead = await Lead.create({
      name,
      phone,
      email,
      location,
      message,
      type: type || 'contact',
      monthlyBill: monthlyBill || null,
      estimatedSystemSize: estimatedSystemSize || null,
      estimatedCost: estimatedCost || null,
      ipAddress,
    });

    // Send email notification — fire-and-forget, don't block the response
    sendLeadNotification(lead).catch((err) =>
      console.error('Email notification failed:', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! We will contact you shortly.',
      id: lead._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/leads  — admin: get all leads with filters
exports.getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type } = req.query;
    const query = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: leads,
      pagination: { total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/leads/:id  — admin: single lead
exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/leads/:id  — admin: update status/notes
exports.updateLead = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/leads/:id  — admin delete
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found.' });
    res.json({ success: true, message: 'Lead deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/leads/stats/summary  — admin dashboard
exports.getStats = async (req, res) => {
  try {
    const [total, newLeads, contacted, converted, quotes, contacts] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'new' }),
      Lead.countDocuments({ status: 'contacted' }),
      Lead.countDocuments({ status: 'converted' }),
      Lead.countDocuments({ type: 'quote' }),
      Lead.countDocuments({ type: 'contact' }),
    ]);

    // Last 30 days breakdown
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentLeads = await Lead.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });

    res.json({
      success: true,
      data: { total, newLeads, contacted, converted, quotes, contacts, recentLeads },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
