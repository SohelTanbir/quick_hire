const Job = require('../models/Job');
const { validateJobData } = require('../middleware/validation');

// Get all jobs (with optional search and filter)
exports.getAllJobs = async (req, res) => {
    try {
        const { search, category, location, jobType } = req.query;

        // Build filter object
        let filter = {};

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (location) {
            filter.location = location;
        }

        if (jobType) {
            filter.jobType = jobType;
        }

        const jobs = await Job.find(filter).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching jobs',
            error: error.message,
        });
    }
};

// Get single job by ID
exports.getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        res.status(200).json({
            success: true,
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching job',
            error: error.message,
        });
    }
};

// Create a new job (Admin)
exports.createJob = async (req, res) => {
    try {
        const { title, company, location, category, description, salary, jobType, requirements } = req.body;

        // Validate job data
        const { isValid, errors } = validateJobData(req.body);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors,
            });
        }

        const jobData = {
            title: title.trim(),
            company: company.trim(),
            location: location.trim(),
            category: category.trim(),
            description: description.trim(),
            salary: salary || 'Competitive',
            jobType: jobType || 'Full-time',
            requirements: requirements || [],
        };

        const job = await Job.create(jobData);

        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating job',
            error: error.message,
        });
    }
};

// Delete a job (Admin)
exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Job deleted successfully',
            data: job,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting job',
            error: error.message,
        });
    }
};
