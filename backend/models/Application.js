const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: [true, 'Job ID is required'],
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name must not exceed 100 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        resumeLink: {
            type: String,
            required: [true, 'Resume link is required'],
            match: [
                /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                'Please provide a valid URL for resume',
            ],
        },
        coverNote: {
            type: String,
            required: [true, 'Cover note is required'],
            minlength: [10, 'Cover note must be at least 10 characters'],
            maxlength: [1000, 'Cover note must not exceed 1000 characters'],
        },
        status: {
            type: String,
            enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'],
            default: 'Pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Application', applicationSchema);
