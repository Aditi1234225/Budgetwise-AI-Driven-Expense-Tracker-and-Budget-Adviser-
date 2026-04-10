// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db"); // db.js import

dotenv.config();

const app = express();

// connect to MongoDB
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("Server is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});