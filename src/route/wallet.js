const express = require('express');
const router = express.Router();
const walletController = require('../controller/walletController');


router.post('/wallets', walletController.createWallet); 
router.get('/wallets/:userId', walletController.getWalletBalance); 



module.exports = router;
