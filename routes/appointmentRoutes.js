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
  .post(protect, authorize('agent', 'admin'), createAppointment)
  .get(protect, authorize('admin'), getAppointments);

router
  .route('/:id')
  .get(protect, authorize('admin'), getAppointmentById)
  .delete(protect, authorize('admin'), deleteAppointment);

export default router;
