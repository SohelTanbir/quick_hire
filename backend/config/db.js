const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
    // If connection already exists and is ready, return it
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached MongoDB connection');
        return cachedConnection;
    }

    try {
        // Check if MONGO_URI exists
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            retryWrites: true,
            w: 'majority',
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000,
        });

        cachedConnection = conn;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        cachedConnection = null;

        // Don't exit process in serverless environment
        if (process.env.VERCEL) {
            throw error; // Let the serverless function handle the error
        } else {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
