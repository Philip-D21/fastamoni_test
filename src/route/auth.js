const express = require("express");
const { register, login} = require("../controller/auth");
const router = express.Router();


//user route
router.post("/signup", register);
router.post("/login", login);



module.exports = router;

