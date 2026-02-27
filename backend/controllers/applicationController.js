const Application = require('../models/Application');
const Job = require('../models/Job');
const { validateApplicationData } = require('../middleware/validation');

// Submit a job application
exports.submitApplication = async (req, res) => {
    try {
        const { jobId, name, email, resumeLink, coverNote } = req.body;

        // Validate application data
        const { isValid, errors } = validateApplicationData(req.body);

        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors,
            });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        const applicationData = {
            jobId,
            name: name.trim(),
            email: email.toLowerCase().trim(),
            resumeLink: resumeLink.trim(),
            coverNote: coverNote.trim(),
            status: 'Pending',
        };

        const application = await Application.create(applicationData);

        // Populate job details
        await application.populate('jobId', 'title company');

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully',
            data: application,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting application',
            error: error.message,
        });
    }
};

// Get applications by job ID (Admin)
exports.getApplicationsByJobId = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found',
            });
        }

        const applications = await Application.find({ jobId }).sort({ createdAt: -1 }).populate('jobId', 'title company');

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message,
        });
    }
};

// Get all applications (Admin)
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .sort({ createdAt: -1 })
            .populate('jobId', 'title company');

        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching applications',
            error: error.message,
        });
    }
};
