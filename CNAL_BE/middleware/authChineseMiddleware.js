const jwt = require("jsonwebtoken");
const ChineseUser = require("../models/chineseUserModel");

/**
 * Authentication middleware specifically for Chinese App
 * Uses chineseUserModel instead of shared userModel
 */
const authChineseMiddleware = async (req, res, next) => {
  try {
    // Extract token from different sources
    let token = null;
    
    // Check Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
    
    // Check custom token header
    if (!token && req.headers.token) {
      const tokenHeader = req.headers.token;
      if (tokenHeader.startsWith("Bearer ")) {
        token = tokenHeader.substring(7);
      } else {
        token = tokenHeader;
      }
    }
    
    // Check cookies
    if (!token && req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
        code: "NO_TOKEN"
      });
    }

    // Verify JWT token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user in Chinese App database
      const user = await ChineseUser.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid token. User not found in Chinese App.",
          code: "USER_NOT_FOUND"
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Account is deactivated.",
          code: "ACCOUNT_DEACTIVATED"
        });
      }

      // Attach user info to request
      req.userId = user._id;
      req.userEmail = user.gmail;
      req.user = user;
      req.isAdmin = user.admin || false;
      
      // Update last activity
      user.lastActivity = new Date();
      await user.save();
      
      console.log(`✅ Chinese App auth successful for user: ${user.gmail}`);
      next();
      
    } catch (jwtError) {
      console.error("❌ JWT verification failed:", jwtError.message);
      
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
        code: "INVALID_TOKEN",
        details: process.env.NODE_ENV === "development" ? jwtError.message : undefined
      });
    }

  } catch (error) {
    console.error("❌ Chinese App auth middleware error:", error);
    return res.status(500).json({
      success: false,
      message: "Authentication service error",
      code: "AUTH_SERVICE_ERROR"
    });
  }
};

/**
 * Optional authentication middleware for Chinese App
 * Continues even if no token is provided
 */
const optionalChineseAuth = async (req, res, next) => {
  try {
    await authChineseMiddleware(req, res, () => {
      // Token was valid, continue with user info
      next();
    });
  } catch (error) {
    // No token or invalid token, continue without user info
    req.userId = null;
    req.userEmail = null;
    req.user = null;
    req.isAdmin = false;
    next();
  }
};

/**
 * Admin-only middleware for Chinese App
 */
const adminChineseOnly = async (req, res, next) => {
  await authChineseMiddleware(req, res, () => {
    if (!req.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
        code: "ADMIN_REQUIRED"
      });
    }
    next();
  });
};

module.exports = {
  authChineseMiddleware,
  optionalChineseAuth,
  adminChineseOnly
};