const express = require('express');
const router = express.Router();
const donationController = require('../controller/donationController');


// Create a new donation
router.post('/donations', donationController.createDonation);
router.get('/donations/count/:userId', donationController.getDonationCounts);
router.get('/donations/:userId/:donationId', donationController.getSingleDonation);
router.get('/donations/:userId', donationController.getDonationsInPeriod);




module.exports = router;