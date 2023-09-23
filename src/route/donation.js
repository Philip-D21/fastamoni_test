const express = require('express');
const router = express.Router();
const donationController = require('../controller/donationController');




// Create a new donation
router.post('/', donationController.createDonation);
router.get('/count/:userId', donationController.getDonationCounts);
router.get('/:userId/:donationId', donationController.getSingleDonation);
router.get('/:userId', donationController.getDonationsInPeriod);




module.exports = router;