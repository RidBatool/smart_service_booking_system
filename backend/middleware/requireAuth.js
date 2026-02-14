// /** TAC SERVICE BOOKING APP - AUTHENTICATION MIDDLEWARE FILE **/

// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");

// /* Verification and Middleware functions to verify and authenticate the user */

// const requireAuth = async (req, res, next) => {
//   // Authorization Header - verify if user is authenticated (should contain our json web token [jwt]).
//   const { authorization } = req.headers;

//   // Check whether the Authorization Header has a value. If not, return an error.
//   if (!authorization) {
//     return res.status(401).json({ error: "Authorization token required" });
//   }

//   // Authorization Header value is a string. To get the jwt portion, we define this command.
//   const token = authorization.split(" ")[1];

//   // Verify the jwt using the jwt package - returns the payload from that token.
//   try {
//     const { _id } = jwt.verify(token, process.env.SECRET);

//     req.user = await User.findOne({ _id }).select("_id");
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ error: "Request is NOT AUTHORIZED" });
//   }
// };/** TAC SERVICE BOOKING APP EXPRESSJS BACKEND TASK USER ROUTES FILE **/
/*
 * This file contains the Express.js backend routes for user login related tasks in the TAC Service Booking App.
 * These routes handle all operations corresponding to controller functions defined in "userController.js", to manage user account creation and login requests.
 */

// const router = require("express").Router();

// /* Importing the user controller functions into the user routes file */
// const { userLogin, userCreateAcc } = require("../controllers/userController");

// /* POST request sign-up route to handle a user account creation request */
// router.post("/create-acc", userCreateAcc);

// /* POST request login route to handle a user login request */
// router.post("/login", userLogin);

// module.exports = router;
// Authentication middleware for protected routes
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

    req.user = user; // ✅ this is used in adminMiddleware
    next();
  } catch (err) {
    console.error("RequireAuth error:", err);
    return res.status(401).json({ error: "Request is NOT AUTHORIZED" });
  }
};

module.exports = requireAuth;
