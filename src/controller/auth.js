const AppError = require("../utils/AppError");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



//creates a user
const register = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please provide email and password");
  }
  const userNameExit = await UserModel.findOne({
    where: { username: username },
  });
  if (userNameExit) {
    return res.status(404).json('username exit already');
  }
  const emailExits = await UserModel.findOne({ where: { email: email } });
  if (emailExits) {
    return res.status(404).json("Email already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  let user = await UserModel.create({
    fullname,
    username,
    email,
    password: hashedPassword,
  })

  return res.status(201).json({
    status: "success",
    message: "User created successfully",
    user
  });
};


//login user
const login = async (req, res, next) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please provide valid email address and password.")
  }
  const user = await UserModel.findOne({ where: { email } });

  if (!user) {
    return res.status(401).json("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json("Invalid  password");
  }

  const token = jwt.sign({ id: user.id, fullname: user.fullname, username: user.username, email: user.email }, process.env.JWT_KEY, {
    expiresIn: "1d",
  });


  return res.status(200).json({
    status: "success",
    token,
  });
};



module.exports = {
    register,
    login
}