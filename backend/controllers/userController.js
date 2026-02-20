
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Helper: create JWT token
const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "3d" });
};

// POST /api/create-acc
const userCreateAcc = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  const safeRole = role === "agent" ? "agent" : "customer";

  try {
    const user = await User.createAcc(firstName, lastName, email, password, safeRole);
    const token = createToken(user._id, user.role);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// POST /api/login
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id, user.role);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { userLogin, userCreateAcc };
