const {DataTypes} = require('sequelize');
const sequelize = require('./index');

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
{
    tableName: "Wallet",
  }
);

// Define associations (e.g., Wallet.belongsTo(User))

module.exports = WalletModel;