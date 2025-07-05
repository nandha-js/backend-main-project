import express from 'express';
import {
  createAgent, 
  getAgents,
  getAgentById,
  updateAgent,
  deleteAgent
} from '../controllers/agentController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('admin'), createAgent)
  .get(protect, getAgents);

router
  .route('/:id')
  .get(protect, getAgentById)
  .put(protect, authorize('admin'), updateAgent)
  .delete(protect, authorize('admin'), deleteAgent);

export default router;
