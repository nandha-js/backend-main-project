import express from 'express';
import {
  sendMessage,
  getMessages,
  deleteMessage
} from '../controllers/messageController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(sendMessage) // anyone can send
  .get(protect, authorize('admin'), getMessages); // admin only

router.route('/:id')
  .delete(protect, authorize('admin'), deleteMessage); // admin only

export default router;
