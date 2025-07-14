import express from 'express';
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  getAppointmentsForAgent, // ✅ Import the new controller
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

// ✅ Agent-only: Get all appointments for properties owned by the agent
router.get('/agent/appointments', protect, authorize('agent'), getAppointmentsForAgent); // ✅ New route

// ✅ Admin or Agent (owner): Get or delete appointment by ID
router
  .route('/:id')
  .get(protect, authorize('admin', 'agent'), getAppointmentById)
  .delete(protect, authorize('admin', 'agent'), deleteAppointment);

export default router;
