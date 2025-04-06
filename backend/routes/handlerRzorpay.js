const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orders");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 📌 CREATE ORDER API
router.post("/create", async (req, res) => {
  try {
    const { userId, bookId, amount } = req.body;

    const options = {
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 1000}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = new Order({
      userId,
      bookId,
      amount: options.amount,
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    res.status(200).json({
      orderId: razorpayOrder.id,
      amount: options.amount,
      currency: options.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error in /create:", error);
    res.status(500).json({ error: "Unable to create Razorpay order" });
  }
});

// 📌 PAYMENT SUCCESS API
router.post("/success", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

    if (!order) return res.status(404).json({ error: "Order not found" });

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.status = "paid";

    await order.save();

    res.status(200).json({ message: "Payment successful", order });
  } catch (error) {
    console.error("Error in /success:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
});



router.get("/check/:userId/:bookId", async (req, res) => {
  try {
    console.log("Inside CHECK")
    const { userId, bookId } = req.params;

    const order = await Order.findOne({
      userId,
      bookId,
      status: "paid",
    });

    const owns = !!order; // true if order exists and is paid
    res.status(200).json({ owns });
  } catch (error) {
    console.error("Error in /check:", error);
    res.status(500).json({ error: "Failed to check ownership" });
  }
});



module.exports = router;
