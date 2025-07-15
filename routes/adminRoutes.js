import express from 'express';
import {
  getAdminStats,       
  getAllUsers,
  deleteUser,
  getAllAgents,
  deleteAgent,
  getAllProperties,
  deleteProperty,
} from '../controllers/adminController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ✅ Protect all admin routes
router.use(protect, authorize('admin'));

// ✅ Dashboard statistics route
router.get('/stats', getAdminStats);

// ✅ User management
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

// ✅ Agent management
router.get('/agents', getAllAgents);
router.delete('/agents/:id', deleteAgent);

// ✅ Property management
router.get('/properties', getAllProperties);
router.delete('/properties/:id', deleteProperty);

export default router;
