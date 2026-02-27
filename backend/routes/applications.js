const express = require('express');
const {
    submitApplication,
    getApplicationsByJobId,
    getAllApplications,
} = require('../controllers/applicationController');

const router = express.Router();

// Public routes
router.post('/', submitApplication);

// Admin routes
router.get('/', getAllApplications);
router.get('/job/:jobId', getApplicationsByJobId);

module.exports = router;
