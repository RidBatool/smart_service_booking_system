// /** TAC SERVICE BOOKING APP BACKEND USER CONTROLLER FILE **/

// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();

// /* Importing the user database Schema Model */
// const User = require("../models/userModel");

// /* Updated JWT creation function to include role */
// const createToken = (_id, role) => {
//   return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "3d" });
// };

// /* CREATE USER ACCOUNT CONTROLLER FUNCTION */
// const userCreateAcc = async (req, res) => {
//   const { firstName, lastName, email, password, role } = req.body; // <-- add role

//   try {
//     const user = await User.create({
//       firstName,
//       lastName,
//       email,
//       password,
//       role: role || "customer" // default role
//     });

//     // Generate JWT with role
//     const token = createToken(user._id, user.role);

//     res.status(200).json({ firstName, lastName, email, role: user.role, token });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// /* USER LOGIN CONTROLLER FUNCTION */
// const userLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.login(email, password);

//     // Generate JWT with role
//     const token = createToken(user._id, user.role);

//     const { firstName, lastName, role } = user;

//     res.status(200).json({ firstName, lastName, email, role, token });
//   } catch (error) {
//     res.status(400).json({
//       message: "login-error-response",
//       error: error.message,
//     });
//   }
// };

// module.exports = { userCreateAcc, userLogin };
// backend/controllers/userController.js
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Helper: create JWT token
const createToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: "3d" });
};

// POST /api/create-acc
const userCreateAcc = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const user = await User.createAcc(firstName, lastName, email, password, role);
    const token = createToken(user._id, user.role);
    res.status(201).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, token });
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
    res.status(200).json({ _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { userLogin, userCreateAcc };
