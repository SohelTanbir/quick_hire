const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
            minlength: [3, 'Job title must be at least 3 characters'],
            maxlength: [100, 'Job title must not exceed 100 characters'],
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
            minlength: [2, 'Company name must be at least 2 characters'],
            maxlength: [100, 'Company name must not exceed 100 characters'],
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
            minlength: [20, 'Description must be at least 20 characters'],
        },
        salary: {
            type: String,
            default: 'Competitive',
        },
        jobType: {
            type: String,
            enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
            default: 'Full-time',
        },
        requirements: [
            {
                type: String,
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Job', jobSchema);
