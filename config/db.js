require('dotenv').config()
const mongoose = require("mongoose");
const mongoURI = process.env.mongoURI;
const connectDb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error");
    process.exit(1);
  }
};

module.exports = connectDb;
