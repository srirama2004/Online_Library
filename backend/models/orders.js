const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String, // changed from ObjectId
        required: true,
      },
      bookId: {
        type: String, // changed from ObjectId
        required: true,
      },

  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String }, // filled after successful payment
  razorpaySignature: { type: String }, // for verification

  amount: { type: Number, required: true }, // in paise
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },

  createdAt: { type: Date, default: Date.now }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', orderSchema);