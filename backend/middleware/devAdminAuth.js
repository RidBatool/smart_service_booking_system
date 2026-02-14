
const devAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];

  // hardcoded admin token
  if (token === "dev-admin-bypass") {
    req.user = {
      role: "admin",
      email: "admin@service.com",
    };
    return next();
  }

  return res.status(403).json({ message: "Access denied, admin only" });
};

module.exports = devAdminAuth;
