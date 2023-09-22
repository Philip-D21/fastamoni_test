const UserModel = require('../models/user');
const AppError = require('../utils/AppError');

const setTransactionPin = async (req, res, next) => {
  try {
    const { userId, transactionPin , confirmTransactionPin} = req.body;

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }
    if (transactionPin !== confirmTransactionPin) {
        return next(new AppError('PIN and confirmation PIN do not match', 400));
      }

    user.transactionPin = transactionPin;
    await user.save(); 

    res.status(200).json({
      message: 'Transaction PIN set successfully',
    });
  } catch (error) {
    console.error('Error setting transaction PIN:', error);
    return next(error);
  }
};

module.exports = {
  setTransactionPin,
};
