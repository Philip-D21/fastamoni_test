const DonationModel = require("../models/donation");
const UserModel = require("../models/user");
const AppError = require("../utils/AppError");
const {Op} = require("sequelize");
const mailer = require("../helpers/mailer");


// Allow user donate
const createDonation = async (req, res, next) => {
  try {
    const { donorId, beneficiaryId, amount } = req.body;

    const [donor, beneficiary] = await Promise.all([
      UserModel.findByPk(donorId),
      UserModel.findByPk(beneficiaryId),
    ]);

    if (!donor || !beneficiary) {
      return next(new AppError("Donor or beneficiary not found", 404));
    }

    const donation = await DonationModel.create({
      donorId,
      beneficiaryId,
      amount,
    });

    res.status(201).json({
      message: "Donation created successfully",
      donation,
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    return next(error);
  }
};



//Allow a user check how many donations he/she has made
const getDonationCounts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findByPk(userId);

    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const donationCount = await DonationModel.count({
      where: { donorId: userId },
    });

    res.status(200).json({
      donationCount,
    });
  } catch (error) {
    console.error("Error getting donation count:", error);
    return next(error);
  }
};


// single donation by a user to fellow user ======================Having with these function===================================
const getSingleDonation = async (req, res, next) => {
  try {
    const { userId, donationId } = req.params;

    const user = await UserModel.findByPk(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const donation = await DonationModel.findByPk(donationId);
    if (!donation) {
      return next(new AppError("Donation not found", 404));
    }
    if (donation.donorId !== userId) {
      return next(new AppError("Unauthorized access to this donation", 403));
    }
    const result = await DonationModel.findByPk({
      where: {donorId: userId}
  })

   return res.status(200).json({
      result
    });

  } catch (error) {
    console.log("Error getting single donation:", error);
    return res.status(500).json({
        error: error.message
    })
  }
};


// user can view donation details made in specific of time 
const getDonationsInPeriod = async (req, res, next) => {
    try {
      const { userId } = req.params; 
      const { startDate, endDate, page, pageSize } = req.query; 
  
      // Check if the user exists
      const user = await UserModel.findByPk(userId);
  
      if (!user) {
        return next(new AppError('User not found', 404));
      }
  
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
  
      // Calculate the offset based on the page and pageSize
      const offset = (page - 1) * pageSize;
 
      const { rows: donations, count: totalCount } = await DonationModel.findAndCountAll({
        where: {
          donorId: userId,
          createdAt: {
            [Op.between]: [startDateObj, endDateObj],
          },
        },
        limit: pageSize, 
        offset: offset, 
      });
  
      res.status(200).json({
        donations,
        totalCount,
      });
    } catch (error) {
      console.error('Error getting donations in period:', error);
      return next(error);
    }
  };
  
// ====================================== stop here ========================================




// Function to increment donation count and send thank you message if needed
const processDonation = async (userId) => {
  try {
    // Find the user
    const user = await UserModel.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.donationCount += 1;
    await user.save();

    if (user.donationCount >= 2) {
    
      await mailer(user); 
    }
  } catch (error) {
    console.error('Error processing donation:', error);
  }
};




module.exports = {
  createDonation,
  getDonationCounts,
  getSingleDonation,
  getDonationsInPeriod,
  processDonation
};
