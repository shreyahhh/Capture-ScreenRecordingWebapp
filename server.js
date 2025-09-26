// Import required dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recordingsRouter from './routes/recordings.js';

// Initialize dotenv configuration
dotenv.config();

// Create Express app instance
const app = express();

// Define PORT from environment variables, defaulting to 8080
const PORT = process.env.PORT || 8080;

// Middleware configuration
// Configure CORS to allow requests from frontend URL
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend API is running successfully!" });
});

// Mount recordings routes
app.use('/api/recordings', recordingsRouter);

// Server listener
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
