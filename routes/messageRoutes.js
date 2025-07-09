import express from 'express';
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from '../controllers/messageController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public route to send a message
router.route('/')
  .post(sendMessage) // Anyone can send a message
  .get(protect, authorize('admin'), getMessages); // Admin only can view all messages

// Admin-only delete message by ID
router.route('/:id')
  .delete(protect, authorize('admin'), deleteMessage);

export default router;
