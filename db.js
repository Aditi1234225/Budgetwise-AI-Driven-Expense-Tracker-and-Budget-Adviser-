// backend/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // ⚡️ New Mongoose version does NOT need options
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;