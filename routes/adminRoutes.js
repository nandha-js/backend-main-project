import express from 'express';
import {
  getDashboardSummary,
  getAllUsers,
  deleteUser,
  getAllAgents,
  deleteAgent,
  getAllProperties,
  deleteProperty,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @desc Protect all admin routes with authentication and admin role authorization
 */
router.use(protect, admin);

/**
 * @route   GET /api/admin/dashboard
 * @desc    Get dashboard summary (stats, counts, etc.)
 * @access  Private/Admin
 */
router.get('/dashboard', getDashboardSummary);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Private/Admin
 */
router.get('/users', getAllUsers);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user by ID
 * @access  Private/Admin
 */
router.delete('/users/:id', deleteUser);

/**
 * @route   GET /api/admin/agents
 * @desc    Get all agents
 * @access  Private/Admin
 */
router.get('/agents', getAllAgents);

/**
 * @route   DELETE /api/admin/agents/:id
 * @desc    Delete agent by ID
 * @access  Private/Admin
 */
router.delete('/agents/:id', deleteAgent);

/**
 * @route   GET /api/admin/properties
 * @desc    Get all properties
 * @access  Private/Admin
 */
router.get('/properties', getAllProperties);

/**
 * @route   DELETE /api/admin/properties/:id
 * @desc    Delete property by ID
 * @access  Private/Admin
 */
router.delete('/properties/:id', deleteProperty);

export default router;
