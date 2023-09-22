const jwt = require("jsonwebtoken");
require("dotenv").config();
const AppError = require("../utils/AppError");
const UserModel = require("../model/user");


const authenticate = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("Please provide a JWT token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return next(new AppError("Invalid token", 401));
  }
};



module.exports = {
  authenticate
}