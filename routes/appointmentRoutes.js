import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('agent', 'user', 'admin'), createAppointment)
  .get(protect, authorize('admin','agent'), getAppointments);

router
  .route('/:id')
  .get(protect, authorize('admin','agent'), getAppointmentById)
  .delete(protect, authorize('admin'), deleteAppointment);

export default router;
