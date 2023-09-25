const {DataTypes} = require('sequelize');
const sequelize = require('./index');
const UserModel = require("./user");

const WalletModel = sequelize.define(
'Wallet', 
{
  id: {
    type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
  },
  balance: {
    type: DataTypes.FLOAT, 
    defaultValue: 0.00, 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  walletName: {
    type: DataTypes.STRING, 
  },
  currency: {
    type: DataTypes.STRING, 
  },
  transactionHistory: {
    type: DataTypes.JSON,
  },
},
)


WalletModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' })

module.exports = WalletModel;