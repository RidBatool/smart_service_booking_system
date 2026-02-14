const express = require("express");
const router = express.Router();
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
