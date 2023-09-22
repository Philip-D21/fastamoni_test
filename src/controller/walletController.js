const WalletModel = require("../models/wallet");
const UserModel = require("../models/user");
const AppError = require("../utils/AppError");

const createWallet = async (req, res, next) => {
  try {
    const { userId,  walletName, currency } = req.body;

    const existingWallet = await WalletModel.findOne({ where: { userId } });

    if (existingWallet) {
      return next(new AppError("User already has a wallet", 401));
    }

    const newWallet = await WalletModel.create({ 
        userId,
        walletName, 
        currency
    });

    res.status(201).json({
      message: "Wallet created successfully",
      wallet: newWallet,
    });
  } catch (error) {
    console.error("Error creating wallet:", error);
    return next(error);
  }
};

//get user wallet
const getWalletBalance = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const wallet = await WalletModel.findOne({ where: { userId } });
    if (!wallet) {
      return next(new AppError("Wallet not found for this user", 404));
    }
    res.status(200).json({
      balance: wallet.balance,
      walletName: wallet.walletName,
      currency: wallet.currency,
    });
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    return next(error);
  }
};

module.exports = {
  createWallet,
  getWalletBalance,
};
