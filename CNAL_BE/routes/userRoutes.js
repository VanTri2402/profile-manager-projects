const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const middlewareController = require("../middleware/middlewareController");

const initWebUserRoutes = (app) => {
  router.post("/register", UserController.register); // URL: /register
  router.post("/login", UserController.login);
  router.delete(
    "/delete/:id",
    middlewareController.verifyTokenAndAdminAuth,
    UserController.deleteUser
  );
  router.put("/update/:id", UserController.updateUser);
  router.get(
    "/read",
    middlewareController.verifyToken,
    UserController.getallUsers
  );
  router.post("/refresh", UserController.requestRefreshToken);
  router.post(
    "/logout",
    middlewareController.verifyToken,
    UserController.userLogout
  );
  router.post(
    "/auth-admin",
    middlewareController.verifyToken,
    UserController.authAdmin
  );
  return app.use("/", router); // Gắn trực tiếp vào root
};

module.exports = initWebUserRoutes;
