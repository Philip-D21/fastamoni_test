const express = require("express");
const { setTransactionPin } = require("../controller/transactionPinController");
const router = express.Router();


router.post('/set-pin', setTransactionPin);


module.exports = router;