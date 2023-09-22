const DonationModel = require("../models/donation");
const UserModel = require("../models/user");
const AppError = require("../utils/AppError");
const {Op} = require("sequelize");



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


// single donation by a user to fellow user
const getSingleDonation = async (req, res, next) => {
  try {
    const { userId } = req.params; // The user requesting the donation
    const { donationId } = req.params; // The unique ID of the donation

    // Check if the user exists
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

   return res.status(200).json({
      donation,
    });

  } catch (error) {
    console.error("Error getting single donation:", error);
    return next(error);
  }
};



// user can view donation details made in specific of time 
const getDonationsInPeriod = async (req, res, next) => {
    try {
      const { userId } = req.params; // The user requesting the donations
      const { startDate, endDate, page, pageSize } = req.query; // The start and end date of the period
  
      // Check if the user exists
      const user = await UserModel.findByPk(userId);
  
      if (!user) {
        return next(new AppError('User not found', 404));
      }
  
      // Parse the start and end dates into JavaScript Date objects
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
   
       // Calculate the offset based on the page and pageSize
       const offset = (page - 1) * pageSize;

      // Find donations made by the user within the specified time range
      const donations = await DonationModel.findAll({
        where: {
          donorId: userId,
          createdAt: {
            [Op.between]: [startDateObj, endDateObj],
          },
        },
        limit: pageSize, // Limit the number of results per page
        offset: offset, // Offset to skip results on previous pages
      });
      res.status(200).json({
        donations,
      });
    } catch (error) {
      console.error('Error getting donations in period:', error);
      return next(error);
    }
  };


module.exports = {
  createDonation,
  getDonationCounts,
  getSingleDonation,
  getDonationsInPeriod,
};
