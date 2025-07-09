// backend-main-project/app.js

import dotenv from 'dotenv';
dotenv.config();  // Load .env early

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware imports
import { errorHandler, notFound } from './middleware/errorHandler.js';
import rateLimit from './middleware/rateLimit.js';

const app = express();

// Connect to MongoDB
connectDB();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'https://real-estate-client.onrender.com', // Your deployed frontend
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      callback(new Error(`CORS Error: Origin ${origin} not allowed.`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' })); // Protect against large payloads
app.use(helmet());
app.use(rateLimit);

// Use morgan logger in development mode only
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏡 Real Estate API is running ✅',
    version: '1.0.0',
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);

// 404 Not Found Middleware
app.use(notFound);

// Global Error Handling Middleware
app.use(errorHandler);

export default app;
