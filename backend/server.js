require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB for local development
connectDB();

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Backend server is running on http://localhost:${PORT}`);
    console.log(`📌 API health check: http://localhost:${PORT}/api/health`);
    console.log(`📌 Jobs endpoint: http://localhost:${PORT}/api/jobs`);
    console.log(
        `📌 Applications endpoint: http://localhost:${PORT}/api/applications`
    );
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});
