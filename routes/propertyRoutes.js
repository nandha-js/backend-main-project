import express from 'express';
const router = express.Router();

import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.post('/', protect, authorize('agent', 'admin'), createProperty);
router.put('/:id', protect, authorize('agent', 'admin'), updateProperty);
router.delete('/:id', protect, authorize('agent', 'admin'), deleteProperty);

export default router;
