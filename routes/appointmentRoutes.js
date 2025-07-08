import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// ✅ Create appointment for specific property (user only)
router.post('/:propertyId', protect, authorize('user', 'admin'), createAppointment);

// ✅ Get all appointments (agent and admin)
router.get('/', protect, authorize('admin', 'agent'), getAppointments);

// ✅ Get and delete appointment by ID
router
  .route('/byid/:id')
  .get(protect, authorize('admin', 'agent'), getAppointmentById)
  .delete(protect, authorize('admin'), deleteAppointment);

export default router;
