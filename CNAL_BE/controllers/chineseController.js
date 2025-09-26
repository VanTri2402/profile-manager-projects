const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ChineseUser = require("../models/chineseUserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let refreshTokens = [];

// Import HSK data from frontend data files
// Note: Since we can't directly import JSX files in Node.js, we'll use the JSON data
const path = require("path");
const fs = require("fs");

// Load HSK data from JSON files (converted from JSX)
const loadHSKData = (level) => {
  try {
    const dataPath = path.join(__dirname, "..", "data", `hsk${level}.json`);
    if (fs.existsSync(dataPath)) {
      const data = fs.readFileSync(dataPath, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error loading HSK ${level} data:`, error);
    return [];
  }
};

// Cache for HSK data - expandable to HSK 6
const hskData = {
  1: loadHSKData(1),
  2: loadHSKData(2),
  3: loadHSKData(3),
  4: [], // Placeholder for future expansion
  5: [], // Placeholder for future expansion
  6: [], // Placeholder for future expansion
};
const getNextWords = (currentHSK = 1, currentWordId = 0, count = 5) => {
  const words = [];
  let level = Math.max(1, Math.min(currentHSK, 3)); // Ensure level is between 1-3
  let wordId = Math.max(0, currentWordId); // Ensure wordId is not negative

  let remainingCount = count;

  while (remainingCount > 0 && level <= 3) {
    const levelData = hskData[level] || [];

    if (levelData.length === 0) {
      level++;
      wordId = 0;
      continue;
    }

    // Get words from current level starting from current position
    const availableWords = levelData.slice(wordId);
    const wordsToTake = Math.min(remainingCount, availableWords.length);

    if (wordsToTake > 0) {
      words.push(...availableWords.slice(0, wordsToTake));
      wordId += wordsToTake;
      remainingCount -= wordsToTake;
    }

    // If we've reached the end of current level, move to next level
    if (wordId >= levelData.length) {
      level++;
      wordId = 0;
    }
  }

  // Determine final position
  let lastLevel = level;
  let lastWordId = wordId;

  // If we've gone beyond level 3, stay at level 3 at the end
  if (lastLevel > 3) {
    lastLevel = 3;
    lastWordId = hskData[3] ? hskData[3].length : 0;
  }

  return {
    words,
    lastLevel,
    lastWordId,
  };
};

const getHSKLevelWordCount = (level) => {
  const levelData = hskData[level] || [];
  return levelData.length;
};
const searchWords = (query, level = null) => {
  const results = [];
  const searchLevels = level ? [level] : [1, 2, 3];

  searchLevels.forEach((lvl) => {
    const levelData = hskData[lvl] || [];
    const matches = levelData.filter(
      (word) =>
        word.chinese.toLowerCase().includes(query.toLowerCase()) ||
        word.pinyin.toLowerCase().includes(query.toLowerCase()) ||
        word.vietnamese.toLowerCase().includes(query.toLowerCase())
    );
    results.push(...matches);
  });

  return results;
};

module.exports = {};
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// const generateAccessToken = (existingUser) => {
//   return jwt.sign(
//     {
//       id: existingUser._id,
//       email: existingUser.gmail,
//       admin: existingUser.admin,
//     },
//     process.env.JWT_SECRET || process.env.JWT_ACCESS_TOKEN,
//     { expiresIn: "7d" } // Extended for better UX
//   );
// };

// const generateRefreshToken = (existingUser) => {
//   return jwt.sign(
//     {
//       id: existingUser._id,
//       email: existingUser.gmail,
//       admin: existingUser.admin,
//     },
//     process.env.JWT_REFRESH_KEY,
//     { expiresIn: "365d" }
//   );
// };

// const register = asyncHandler(async (req, res) => {
//   try {
//     const { gmail, password } = req.body;
//     if (!isValidEmail(gmail)) {
//       return res.status(400).json({ message: "Email is invalid!" });
//     }

//     if (!gmail || !password || !gmail.trim() || !password.trim()) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required!" });
//     }
//     const existingUser = await ChineseUser.findOne({ gmail });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }
//     const hashedPassword = bcrypt.hashSync(password, 10);
//     const user = await ChineseUser.create({
//       gmail: gmail.trim(),
//       password: hashedPassword,
//     });
//     const { password: _, ...userWithoutPass } = user._doc;
//     return res
//       .status(201)
//       .json({ message: "User registered successfully", user: userWithoutPass });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// const login = asyncHandler(async (req, res) => {
//   try {
//     const { gmail, password } = req.body;
//     if (!isValidEmail(gmail)) {
//       return res.status(400).json({ message: "Email is invalid!" });
//     }
//     if (!gmail || !password) {
//       return res.status(400).json({
//         message: "Email and password are required",
//       });
//     }
//     if (!gmail.trim() || !password.trim()) {
//       return res.status(400).json({ message: "no spaces in input" });
//     }
//     const existingUser = await ChineseUser.findOne({ gmail });
//     if (!existingUser) {
//       return res.status(400).json({ message: "Email is not exist" });
//     }

//     const isMatchPass = await bcrypt.compare(password, existingUser.password);
//     if (!isMatchPass) {
//       return res.status(400).json({ message: "password is not match" });
//     }

//     const accessToken = generateAccessToken(existingUser);
//     const refreshToken = generateRefreshToken(existingUser);
//     const { password: _, ...userWithoutPass } = existingUser._doc;
//     refreshTokens.push(refreshToken);
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//       path: "/",
//       sameSite: "strict",
//     });
//     console.log("refresh token : ", refreshToken);
//     console.log("access token : ", accessToken);
//     return res.status(200).json({
//       message: "Login successful",
//       user: userWithoutPass,
//       accessToken,
//     });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// const requestRefreshToken = asyncHandler(async (req, res) => {
//   try {
//     const refreshToken = req.cookies.refreshToken;
//     console.log("Cookies: ", req.cookies);

//     if (!refreshToken) {
//       return res.status(401).json("You 're not authenticate");
//     }
//     if (!refreshTokens.includes(refreshToken)) {
//       return res.status(403).json({ message: "refresh token is not valid" });
//     }
//     jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "refresh token is not valid" });
//       }
//       refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
//       const newAccessToken = generateAccessToken(user);
//       const newRefreshToken = generateRefreshToken(user);
//       refreshTokens.push(newRefreshToken);
//       res.cookie("refreshToken", newRefreshToken, {
//         httpOnly: true,
//         secure: false,
//         path: "/",
//         sameSite: "strict",
//       });
//       res.status(200).json({ accessToken: newAccessToken });
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// const userLogout = asyncHandler(async (req, res) => {
//   res.clearCookie("refreshToken");
//   refreshTokens = refreshTokens.filter(
//     (token) => token !== req.cookies.refreshToken
//   );
//   res.status(200).json("Logged out success !");
// });

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "Id not found !" });
    }
    const user = await ChineseUser.findByIdAndDelete(id);
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
    const user = await ChineseUser.findById(id);
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
    const updateNewUser = await ChineseUser.findByIdAndUpdate(
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
    const users = await ChineseUser.find();
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
    const existUser = await ChineseUser.findOne({ gmail: gmail });
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

// ==================== CHINESE LEARNING FUNCTIONS ====================

const checkIn = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await ChineseUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize defaults for new users
    if (!user.currentHSK) user.currentHSK = 1;
    if (user.currentWordId === undefined || user.currentWordId === null)
      user.currentWordId = 0;
    if (!user.dailyWordCount) user.dailyWordCount = 5;
    if (!user.streak) user.streak = 0;
    if (!user.longestStreak) user.longestStreak = 0;
    if (!user.progress) user.progress = 0;

    const now = new Date();
    const startOfDay = (d) =>
      new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = startOfDay(now);

    // Determine check-in action
    let action = "first";
    if (user.lastCheckIn) {
      const lastCheckIn = startOfDay(new Date(user.lastCheckIn));
      const diffDays = Math.floor(
        (today - lastCheckIn) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === 0) {
        action = "already-today";
      } else if (diffDays === 1) {
        action = "consecutive";
      } else {
        action = "missed";
      }
    }

    // Handle already checked in today
    if (action === "already-today") {
      return res.status(200).json({
        message: "Already checked in today",
        streak: user.streak,
        longestStreak: user.longestStreak,
        currentHSK: user.currentHSK,
        currentWordId: user.currentWordId,
        progress: user.progress,
        dailyWordCount: user.dailyWordCount,
        lastCheckIn: user.lastCheckIn,
      });
    }

    // Update streak based on action
    if (action === "first") {
      user.streak = 1;
    } else if (action === "consecutive") {
      user.streak = user.streak + 1;
    } else if (action === "missed") {
      user.streak = 1; // Reset to 1 for new check-in after missed days
    }

    // Update longest streak if current streak is higher
    if (user.streak > user.longestStreak) {
      user.longestStreak = user.streak;
    }

    // Add daily words using HSK service
    const count = user.dailyWordCount;
    const { words, lastLevel, lastWordId } = getNextWords(
      user.currentHSK,
      user.currentWordId,
      count
    );

    // Update user progress
    user.currentHSK = Math.min(lastLevel, 3); // Support up to HSK 3 for now
    user.currentWordId = lastWordId;
    user.progress = user.progress + words.length;
    user.lastCheckIn = now;

    await user.save();

    // Prepare response message
    let message = "Check-in successful";
    if (action === "first") {
      message = "First check-in! Welcome to your HSK learning journey!";
    } else if (action === "consecutive") {
      message = `Consecutive day ${user.streak}! Keep up the great work!`;
    } else if (action === "missed") {
      message =
        "Welcome back! Your streak has been reset, but you're back on track!";
    }

    return res.status(200).json({
      message,
      streak: user.streak,
      longestStreak: user.longestStreak,
      currentHSK: user.currentHSK,
      currentWordId: user.currentWordId,
      progress: user.progress,
      dailyWordCount: user.dailyWordCount,
      addedWords: words,
      lastCheckIn: user.lastCheckIn,
      action: action,
    });
  } catch (error) {
    console.error("Check-in error:", error);
    return res.status(500).json({ message: error?.message || "Server error" });
  }
});

const getWords = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await ChineseUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.currentHSK) user.currentHSK = 1;
    if (user.currentWordId === undefined || user.currentWordId === null)
      user.currentWordId = 0;
    if (!user.dailyWordCount) user.dailyWordCount = 5;

    // Get preview words using HSK service
    const { words } = getNextWords(
      user.currentHSK,
      user.currentWordId,
      user.dailyWordCount
    );

    return res.status(200).json({
      currentHSK: user.currentHSK,
      currentWordId: user.currentWordId,
      previewWords: words,
    });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Server error" });
  }
});

const getProgress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await ChineseUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      streak: user.streak || 0,
      longestStreak: user.longestStreak || 0,
      currentHSK: user.currentHSK || 1,
      currentWordId: user.currentWordId || 0,
      progress: user.progress || 0,
      lastCheckIn: user.lastCheckIn || null,
      dailyWordCount: user.dailyWordCount || 5,
    });
  } catch (error) {
    return res.status(500).json({ message: error?.message || "Server error" });
  }
});

const updateSettings = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const { dailyWordCount } = req.body;
    if (!dailyWordCount || dailyWordCount < 1 || dailyWordCount > 50) {
      return res.status(400).json({
        message: "Daily word count must be between 1 and 50",
      });
    }

    const user = await ChineseUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.dailyWordCount = dailyWordCount;
    await user.save();

    return res.status(200).json({
      message: "Settings updated successfully",
      dailyWordCount: user.dailyWordCount,
    });
  } catch (error) {
    console.error("Update settings error:", error);
    return res.status(500).json({ message: error?.message || "Server error" });
  }
});

const resetProgress = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await ChineseUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset learning progress but keep streak data
    user.currentHSK = 1;
    user.currentWordId = 0;
    user.progress = 0;

    await user.save();

    return res.status(200).json({
      message: "Learning progress reset successfully",
      currentHSK: user.currentHSK,
      currentWordId: user.currentWordId,
      progress: user.progress,
      streak: user.streak,
      longestStreak: user.longestStreak,
    });
  } catch (error) {
    console.error("Reset progress error:", error);
    return res.status(500).json({ message: error?.message || "Server error" });
  }
});

module.exports = {
  register,
  login,
  deleteUser,
  getNextWords,
  getHSKLevelWordCount,
  searchWords,
  updateUser,
  getallUsers,
  authAdmin,
  checkIn,
  getWords,
  getProgress,
  updateSettings,
  resetProgress,
};
