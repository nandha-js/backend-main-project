// 📍 File: server/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';

// 📦 Route imports
import authRoutes from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import agentRoutes from './routes/agentRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

// 🛡️ Middleware
import { errorHandler, notFound } from './middleware/errorHandler.js';
import rateLimit from './middleware/rateLimit.js';

dotenv.config();

const app = express();

// 🔗 Connect MongoDB
connectDB();

// 🌐 Allowed Origins
const allowedOrigins = [
  'http://localhost:5173', // Vite Dev
  'https://real-estate-client.onrender.com', // ✅ Your deployed frontend
];

// 🌐 CORS Config
const corsOptions = {
  origin: (origin, callback) => {
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

app.use(cors(corsOptions));

// 🧠 Core Middlewares
app.use(express.json());
app.use(helmet());
app.use(rateLimit);
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ✅ Root Route (Health check for Render)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🏡 Real Estate API is running ✅',
    version: '1.0.0',
  });
});

// 📌 Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/messages', messageRoutes);

// ❌ 404 + Error Handler
app.use(notFound);
app.use(errorHandler);

export default app;
