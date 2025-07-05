// routes/appointmentRoutes.js
import express from 'express';
import {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from '../controllers/appointmentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, bookAppointment)
  .get(protect, authorize('admin'), getAppointments);

router.route('/:id')
  .get(protect, getAppointmentById)
  .delete(protect, deleteAppointment);

export default router;
