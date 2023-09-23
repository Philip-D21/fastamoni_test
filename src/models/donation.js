const {DataTypes}= require('sequelize');
const sequelize = require('./index');

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

// Define associations (e.g., Donation.belongsTo(User, { as: 'donor' }))
// You should set up two associations for donor and beneficiary

module.exports = DonationModel;
