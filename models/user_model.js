const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    email: {
      trim: true,
      type: String,
      unique: true,
      required: true,
    },
    password: {
      trim: true,
      type: String,
      required: true,
    },
    name: {
      trim: true,
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      trim: true,
      type: String,
      enum: ["Male", "Female", "Others"],
      default: "Others",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    userType: {
      trim: true,
      type: String,
      enum: ["Admin", "User"],
      default: "Admin",
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Users", schema); 