const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");

const requireAuth = require("../middleware/requireAuth");

const requireAdminRole = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
  return next();
};

// GET all users
router.get("/users", requireAuth, requireAdminRole, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET pending provider approvals
router.get("/providers/pending", requireAuth, requireAdminRole, async (_req, res) => {
  try {
    const providers = await User.find({ role: "agent", isApproved: false }).select("-password");
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH approve provider
router.patch("/providers/:id/approve", requireAuth, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }

    const provider = await User.findOneAndUpdate(
      { _id: id, role: "agent" },
      { isApproved: true },
      { new: true }
    ).select("-password");

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    return res.json(provider);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// PATCH reject provider
router.patch("/providers/:id/reject", requireAuth, requireAdminRole, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User not found" });
    }

    const provider = await User.findOneAndUpdate(
      { _id: id, role: "agent" },
      { isApproved: false },
      { new: true }
    ).select("-password");

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    return res.json(provider);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// GET all bookings
router.get("/bookings", requireAuth, requireAdminRole, async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
