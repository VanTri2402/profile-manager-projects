const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true, // ✅ Tự động tạo createdAt & updatedAt
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
