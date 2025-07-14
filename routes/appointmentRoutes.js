import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} from '../controllers/appointmentController.js';

import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ✅ User-only route to create an appointment
router.post(
  '/:propertyId',
  protect,
  authorize('user'), // ❗ Only users can create appointments
  (req, res, next) => {
    req.body.property = req.params.propertyId;
    next();
  },
  createAppointment
);

// ✅ Admin-only: Get all appointments
router.get('/', protect, authorize('admin'), getAppointments);

// ✅ Admin or Agent (owner): Get or delete appointment by ID
router
  .route('/:id')
  .get(protect, authorize('admin', 'agent'), getAppointmentById)
  .delete(protect, authorize('admin', 'agent'), deleteAppointment);

export default router;
