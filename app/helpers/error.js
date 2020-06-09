class ErrorHandler extends Error {
  constructor(statusCode, message, details = {}) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.details = details;
  }
}

const handleError = (err, res) => {
  const { statusCode, message, details } = err;
  res.status(statusCode).json({
    statusCode,
    message,
    details,
  });
};

module.exports = { ErrorHandler, handleError };
