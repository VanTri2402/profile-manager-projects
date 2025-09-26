const express = require("express");
const connectDB = require("./config/db");
const hskRoutes = require("./routes/hskRoutes");
const corsMiddleware = require("./middleware/cors");
const initWebUserRoutes = require("./routes/userRoutes");
const path = require("path");
const viewsServer = require("./config/viewServer");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const initWebProductRouter = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(corsMiddleware);

connectDB();

// Routes
initWebUserRoutes(app);
initWebProductRouter(app);
console.log("Registering product router...");
// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
// Static files (CSS, images)
app.use(express.static(path.join(__dirname, "public")));
viewsServer(app);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, "public")}`);
});
// Clean shutdown
process.on("SIGTERM", async () => {
  console.log("Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});

console.log("MONGO_URI:", process.env.MONGO_URI);
