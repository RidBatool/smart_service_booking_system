
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "agent", "admin"], default: "customer" } // consistent roles
});

// ------------------------
// STATIC ACCOUNT CREATION
// ------------------------
userSchema.statics.createAcc = async function (firstName, lastName, email, password, role = "customer") {
  // Validation
  if (!firstName || !lastName || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // Check if email exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email address already in use");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user
  const user = await this.create({
    firstName,
    lastName,
    email,
    password: hash,
    role
  });

  return user;
};

// ------------------------
// STATIC LOGIN METHOD
// ------------------------
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid email address and/or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid email address and/or password");
  }

  return user;
};

// Export the model
module.exports = mongoose.model("User", userSchema);
