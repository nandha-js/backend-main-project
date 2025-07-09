// routes/adminRoutes.js
import express from 'express';
import {
  getDashboardSummary,
  getAllUsers,
  deleteUser,
  getAllAgents,
  deleteAgent,
  getAllProperties,
  deleteProperty,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect all admin routes with authentication and admin role
router.use(protect, authorize('admin'));

// Dashboard Summary
router.get('/dashboard', getDashboardSummary);

// Users
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// Agents
router.get('/agents', getAllAgents);
router.delete('/agents/:id', deleteAgent);

// Properties
router.get('/properties', getAllProperties);
router.delete('/properties/:id', deleteProperty);

export default router;
 