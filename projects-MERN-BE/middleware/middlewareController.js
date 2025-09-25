const jwt = require("jsonwebtoken");
require("dotenv").config();

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      // Fix: Check if token has space before split
      const accessToken = token.includes(" ") ? token.split(" ")[1] : token;
      jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) {
          console.log("error", err);
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authenticated");
    }
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) {
        next();
      } else {
        return res.status(403).json("You're not authorized");
      }
    });
  },
};
module.exports = middlewareController;
