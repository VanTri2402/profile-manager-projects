const express = require("express");
const chineseController = require("../controllers/chineseController");
const middlewareController = require("../middleware/middlewareController");
const router = express.Router();
const { checkLastCheckIn } = require("../middleware/chineseMiddleware");

const initWebChineseApp = (app) => {
  // router.post("/register", chineseController.register);
  // router.post("/login", chineseController.login);
  router.delete(
    "/delete/:id",
    middlewareController.verifyTokenAndAdminAuth,
    chineseController.deleteUser
  );
  router.put("/update/:id", chineseController.updateUser);
  router.get(
    "/read",
    middlewareController.verifyToken,
    chineseController.getallUsers
  );
  // router.post("/refresh", chineseController.requestRefreshToken);
  // router.post(
  //   "/logout",
  //   middlewareController.verifyToken,
  //   chineseController.userLogout
  // );
  router.post(
    "/auth-admin",
    middlewareController.verifyToken,
    chineseController.authAdmin
  );

  // Chinese learning APIs
  router.get(
    "/words",
    middlewareController.verifyToken,
    chineseController.getWords
  );
  router.get(
    "/progress",
    middlewareController.verifyToken,
    chineseController.getProgress
  );
  router.post(
    "/check-in",
    middlewareController.verifyToken,
    checkLastCheckIn,
    chineseController.checkIn
  );
  router.put(
    "/settings",
    middlewareController.verifyToken,
    chineseController.updateSettings
  );
  router.post(
    "/reset-progress",
    middlewareController.verifyToken,
    chineseController.resetProgress
  );

  // Utility routes
  router.get("/health", (req, res) => {
    res.status(200).json({
      status: "OK",
      message: "Chinese API is running",
      timestamp: new Date().toISOString(),
    });
  });

  router.get("/docs", (req, res) => {
    res.status(200).json({
      message: "Chinese API Documentation",
      version: "1.0.0",
      endpoints: {
        auth: [
          "POST /api/chinese/register",
          "POST /api/chinese/login",
          "POST /api/chinese/logout",
          "POST /api/chinese/refresh",
        ],
        learning: [
          "GET /api/chinese/progress",
          "GET /api/chinese/words",
          "POST /api/chinese/check-in",
          "PUT /api/chinese/settings",
          "POST /api/chinese/reset-progress",
        ],
        utility: ["GET /api/chinese/health", "GET /api/chinese/docs"],
      },
    });
  });

  return app.use("/api/chinese", router);
};

module.exports = initWebChineseApp;
