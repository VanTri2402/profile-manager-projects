const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Server error, please try again later",
    error: err.message,
  });
};

module.exports = errorHandler;