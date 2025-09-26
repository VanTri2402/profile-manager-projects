const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  exposedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

module.exports = cors(corsOptions);
