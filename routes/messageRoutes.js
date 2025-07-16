import express from 'express';
import {
  sendMessage,
  sendMessageToUser,
  getMessages,
  getMyMessages,
  deleteMessage,
} from '../controllers/messageController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// 📨 Anyone can contact (message admin or agent)
router
  .route('/')
  .post(sendMessage) // Public access
  .get(protect, authorize('admin', 'agent'), getMessages); // Admin & Agent see all

// 🧑‍💼 Agent/Admin contact user
router
  .route('/send-to-user')
  .post(protect, authorize('admin', 'agent'), sendMessageToUser); // Agent/Admin → User

// 👤 User views own received messages
router
  .route('/my-messages')
  .get(protect, authorize('user'), getMyMessages); // User → Own messages

// ❌ Delete message by ID (admin only)
router
  .route('/:id')
  .delete(protect, authorize('admin'), deleteMessage);

export default router;
