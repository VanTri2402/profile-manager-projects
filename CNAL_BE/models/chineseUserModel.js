const mongoose = require("mongoose");

const userChineseSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    // Streak tracking
    streak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastCheckIn: {
      type: Date,
      default: null,
    },
    // HSK Learning Progress
    currentHSK: {
      type: Number,
      default: 1,
      min: 1,
      max: 6, // Support up to HSK 6 for future expansion
    },
    currentWordId: {
      type: Number,
      default: 0, // Start from index 0 (first word)
    },
    progress: {
      type: Number,
      default: 0, // Total words learned
    },
    dailyWordCount: {
      type: Number,
      default: 5, // Number of words to add per check-in
    },
    // Deprecated field (keeping for backward compatibility)
    level: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true, // ✅ Tự động tạo createdAt & updatedAt
  }
);

const ChineseUserModel = mongoose.model("ChineseUser", userChineseSchema);
module.exports = ChineseUserModel;
