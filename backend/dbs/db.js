

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const dBConn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
