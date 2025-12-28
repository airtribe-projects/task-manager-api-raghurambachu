const errorHandler = (error, req, res, next) => {
  if (error.isJoi) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.details,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development" ? error?.message : "Server error",
  });
};

module.exports = { errorHandler };
