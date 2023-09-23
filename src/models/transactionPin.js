const {DataTypes}= require("sequelize");
const sequelize = require("./index");



const TransactionModel = sequelize.define(
  "TransactionPin",
  {
    transactionPin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    confirmTransactionPin: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
},

);


module.exports = TransactionModel;