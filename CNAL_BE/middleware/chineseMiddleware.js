const ChineseUser = require("../models/chineseUserModel");

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// Middleware: determine check-in action based on lastCheckIn
// Attaches req.checkInAction = 'already-today' | 'consecutive' | 'missed' | 'first'
// Also attaches req.userDoc
module.exports.checkLastCheckIn = async (req, res, next) => {
  try {
    const userId = req.user?.id || req.body?.id || req.query?.id;
    if (!userId) {
      return res.status(400).json({ message: "User id is required" });
    }
    const user = await ChineseUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const now = new Date();
    if (!user.lastCheckIn) {
      req.checkInAction = "first";
      req.userDoc = user;
      return next();
    }

    const last = startOfDay(new Date(user.lastCheckIn));
    const today = startOfDay(now);
    const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) req.checkInAction = "already-today";
    else if (diffDays === 1) req.checkInAction = "consecutive";
    else req.checkInAction = "missed";

    req.userDoc = user;
    return next();
  } catch (err) {
    return res.status(500).json({ message: err?.message || "Server error" });
  }
};
