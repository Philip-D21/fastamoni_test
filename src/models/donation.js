const {DataTypes}= require('sequelize');
const sequelize = require('./index');
const UserModel = require('./user')
const DonationModel = sequelize.define(
  'Donation', 
  {
   id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
 },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  beneficiaryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW()
  },
},
);


// Define associations
DonationModel.belongsTo(UserModel, { foreignKey: 'donorId', as: 'donor' });
DonationModel.belongsTo(UserModel, { foreignKey: 'beneficiaryId', as: 'beneficiary' });


module.exports = DonationModel;
