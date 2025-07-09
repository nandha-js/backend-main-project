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

// Create appointment: inject propertyId param into body, then create
router.post(
  '/:propertyId',
  protect,
  authorize('user', 'agent', 'admin'), // allow all roles
  (req, res, next) => {
    req.body.property = req.params.propertyId;
    next();
  },
  createAppointment
);


// Get all appointments (admin & agent only)
router.get('/', protect, authorize('admin', 'agent'), getAppointments);

// Get appointment by ID (admin & agent), delete appointment (admin only)
router
  .route('/:id')
  .get(protect, authorize('admin', 'agent'), getAppointmentById)
  .delete(protect, authorize('admin'), deleteAppointment);

export default router;
