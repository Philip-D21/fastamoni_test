const { DataTypes } = require('sequelize')
const sequelize = require('./index')


const UserModel = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    },
    transactionPin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    confirmTransactionPin: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
},
  {
    tableName: "users",
  }
);


module.exports = UserModel;