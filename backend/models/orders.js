const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
      },
      bookId: {
        type: String, 
        required: true,
      },

  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String }, 
  razorpaySignature: { type: String }, 

  amount: { type: Number, required: true }, 
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },

  createdAt: { type: Date, default: Date.now }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', orderSchema);