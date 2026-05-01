const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ['contact', 'quote'],
      default: 'contact',
    },
    // Quote-specific fields
    monthlyBill: { type: Number, default: null },
    estimatedSystemSize: { type: String, default: null },
    estimatedCost: { type: String, default: null },

    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'closed'],
      default: 'new',
    },
    notes: {
      type: String,
      default: '',
    },
    ipAddress: { type: String, default: null },
  },
  { timestamps: true }
);

leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ email: 1 });

module.exports = mongoose.model('Lead', leadSchema);
