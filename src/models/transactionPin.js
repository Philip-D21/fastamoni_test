const {DataTypes}= require("sequelize");
const sequelize = require("./index");
const User = require('./user')



const TransactionModel = sequelize.define(
  "TransactionPin",
  {
    userId: {
        type: DataTypes.INTEGER
    },
    transactionPin: {
        type: DataTypes.INTEGER(4),
        allowNull: false
    },
    confirmTransactionPin: {
        type: DataTypes.INTEGER(4),
        allowNull: false, 
    },
},
    // {
    //     tableName: "TransactionPin"
    // }
);


TransactionModel.belongsTo(User, { foreignKey: 'userId' });

module.exports = TransactionModel;