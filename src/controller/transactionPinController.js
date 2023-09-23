const TransactionModel = require('../models/transactionPin');
const AppError = require('../utils/AppError');
const UserModel = require('../models/user');


const setTransactionPin = async (req, res, next) => {
  try {
    const { userId, transactionPin, confirmTransactionPin } = req.body;

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (transactionPin !== confirmTransactionPin) {
      return next(new AppError('PIN and confirmation PIN do not match', 422));
    }

     // Validate that transactionPin is exactly 4 digits
     if (typeof transactionPin !== 'number' || transactionPin < 1000 || transactionPin > 9999) {
        return next(new AppError('Transaction PIN must be a 4-digit number', 409));
      }

    const transactionPinRecord = await TransactionModel.create({
      transactionPin,
      confirmTransactionPin,
      userId: user.id,
    });

    res.status(200).json({
      message: 'Transaction PIN set successfully',
      transactionPinRecord,
    });
  } catch (error) {
    console.error('Error setting transaction PIN:', error);
    return next(error);
  }
};

module.exports = {
  setTransactionPin,
};
