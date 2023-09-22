const AppError = require("../utils/AppError").default;

const handleCastErrorDB = (err, req) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
};

const handleDuplicateFieldsError = (err) => {
  const message = `${err.keyValue} already exists in the database. Please use another value.`;
  return new AppError(message, 400);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((val) => val.message);
  const message = `Invalid input data: ${errors.join("; ")}`;
  return new AppError(message, 401);
};

const handleJsonWebTokenError = (err) => {
  const message = `${err.name}: ${err.message}`;
  return new AppError(message, 401);
};

const handleExpiredJWTError = (err) => {
  const message = `${err.message}! Please login again.`;
  return new AppError(message, 401);
};

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Operational error, trusted, send appropriate message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or unknown error, don't leak error details to the client
    console.error("ERROR", err);

    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (err.name === "CastError") {
      error = handleCastErrorDB(err, req);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsError(err);
    }
    if (err.name === "ValidationError") {
      error = handleValidationError(err);
    }
    if (err.name === "JsonWebTokenError") {
      error = handleJsonWebTokenError(err);
    }
    if (err.name === "TokenExpiredError") {
      error = handleExpiredJWTError(err);
    }

    sendErrorProd(error, req, res);
  }
};

