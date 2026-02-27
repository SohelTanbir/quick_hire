const express = require('express');
const {
    getAllJobs,
    getJobById,
    createJob,
    deleteJob,
} = require('../controllers/jobController');

const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Admin routes
router.post('/', createJob);
router.delete('/:id', deleteJob);

module.exports = router;
