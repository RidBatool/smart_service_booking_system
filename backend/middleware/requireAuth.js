
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  try {
    // Get Authorization header
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }

    // Format: "Bearer <token>"
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authorization token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded || !decoded._id) {
      return res.status(401).json({ error: "Token is invalid" });
    }

    // Attach user object to request
    const user = await User.findById(decoded._id).select("_id role firstName lastName email");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("RequireAuth error:", err);
    return res.status(401).json({ error: "Request is NOT AUTHORIZED" });
  }
};

module.exports = requireAuth;
