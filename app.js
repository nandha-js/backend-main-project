// backend-main-project/app.js

import dotenv from 'dotenv';
dotenv.config(); // Load .env early

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
import emailRoutes from './routes/emailRoutes.js'; // ✅ Email route added

// Controller & Middleware imports for agent-specific appointment route
import { getAppointmentsForAgent } from './controllers/appointmentController.js';
import { protect } from './middleware/authMiddleware.js';
import { authorize } from './middleware/roleMiddleware.js';

// Error Middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';
import rateLimit from './middleware/rateLimit.js';

const app = express();

// Connect to MongoDB
connectDB();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173', // Vite dev server
  'https://real-estate-client.onrender.com', // Deployed frontend
];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
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
app.use(express.json({ limit: '10kb' }));
app.use(helmet());
app.use(rateLimit);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏡 Real Estate API is running ✅',
    version: '1.0.0',
  });
});

// Main API routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/email', emailRoutes); // ✅ Mount email routes here

// ✅ Agent-specific route to get all their property appointments
app.get(
  '/api/agent/appointments',
  protect,
  authorize('agent'),
  getAppointmentsForAgent
);

// 404 Not Found
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

export default app;
