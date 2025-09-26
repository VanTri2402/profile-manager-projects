const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModels");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let refreshTokens = [];

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const generateAccessToken = (existingUser) => {
  return jwt.sign(
    {
      id: existingUser._id,
      admin: existingUser.admin,
    },
    process.env.JWT_ACCESS_TOKEN,
    { expiresIn: "3d" }
  );
};

const generateRefreshToken = (existingUser) => {
  return jwt.sign(
    {
      id: existingUser._id,
      admin: existingUser.admin,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "365d" }
  );
};

const register = asyncHandler(async (req, res) => {
  try {
    const { gmail, password } = req.body;
    if (!isValidEmail(gmail)) {
      return res.status(400).json({ message: "Email is invalid!" });
    }

    if (!gmail || !password || !gmail.trim() || !password.trim()) {
      return res
        .status(400)
        .json({ message: "Email and password are required!" });
    }
    const existingUser = await UserModel.findOne({ gmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      gmail: gmail.trim(),
      password: hashedPassword,
    });
    const { password: _, ...userWithoutPass } = user._doc;
    return res
      .status(201)
      .json({ message: "User registered successfully", user: userWithoutPass });
  } catch (error) {
    res.status(500).json(error);
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { gmail, password } = req.body;
    if (!isValidEmail(gmail)) {
      return res.status(400).json({ message: "Email is invalid!" });
    }
    if (!gmail || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    if (!process.env.JWT_ACCESS_TOKEN) {
      console.error("JWT_ACCESS_TOKEN is not defined");
      return res.status(400).json("JWT secret key missing");
    }
    if (!gmail.trim() || !password.trim()) {
      return res.status(400).json({ message: "no spaces in input" });
    }
    const existingUser = await UserModel.findOne({ gmail });
    if (!existingUser) {
      return res.status(400).json({ message: "Email is not exist" });
    }

    const isMatchPass = await bcrypt.compare(password, existingUser.password);
    if (!isMatchPass) {
      return res.status(400).json({ message: "password is not match" });
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);
    const { password: _, ...userWithoutPass } = existingUser._doc;
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    console.log("refresh token : ", refreshToken);
    console.log("access token : ", accessToken);
    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPass,
      accessToken,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

const requestRefreshToken = asyncHandler(async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("Cookies: ", req.cookies);

    if (!refreshToken) {
      return res.status(401).json("You 're not authenticate");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ message: "refresh token is not valid" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "refresh token is not valid" });
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const userLogout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  refreshTokens = refreshTokens.filter(
    (token) => token !== req.cookies.refreshToken
  );
  res.status(200).json("Logged out success !");
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id not found !" });
    }
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      return res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { gmail, password } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!password || !gmail) {
      return res
        .status(400)
        .json({ message: "Password and Gmail are required" });
    }
    if (!isValidEmail(gmail)) {
      return res.status(400).json({ message: "gmail is not Valid !" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updateNewUser = await UserModel.findByIdAndUpdate(
      id,
      {
        gmail: gmail,
        password: hashedPassword,
      },
      { new: true }
    );
    const { password: _, ...userUpdateWithoutPass } = updateNewUser._doc;
    return res
      .status(200)
      .json({ message: "Update successfully", user: userUpdateWithoutPass });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

const getallUsers = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find();
    if (users) {
      const usersWithoutPass = users.map((user) => {
        const { password, ...userWithoutPass } = user._doc;
        return userWithoutPass;
      });
      return res
        .status(200)
        .json({ message: "get all user success .!", users: usersWithoutPass });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  try {
    const { gmail } = req.body;

    if (!gmail) {
      return res.status(400).json({
        message: "Gmail is required",
      });
    }
    const existUser = await UserModel.findOne({ gmail: gmail });
    if (!existUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (existUser.admin === true) {
      return res.status(200).json({
        message: "User is already admin",
        user: existUser,
      });
    }
    existUser.admin = true;
    await existUser.save();

    return res.status(200).json({
      message: "Update auth admin success!",
      user: {
        id: existUser._id,
        gmail: existUser.gmail,
        admin: existUser.admin,
      },
    });
  } catch (error) {
    console.error("Error in authAdmin : ", error);
    return res.status(500).json({
      message: "Interval server error",
      error: error?.message,
    });
  }
});
module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  getallUsers,
  requestRefreshToken,
  userLogout,
  authAdmin,
};
