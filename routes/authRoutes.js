import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateDetails,
  updatePassword,
} from '../controllers/authController.js';

import { protect } from '../middleware/authMiddleware.js';
import {
  registerValidator,
  loginValidator,
  updateProfileValidator,
} from '../validators/authValidator.js';

import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware to handle validation errors from express-validator
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// @route    POST /api/auth/register
// @desc     Register a new user
router.post('/register', registerValidator, validate, registerUser);

// @route    POST /api/auth/login
// @desc     Login user and get token
router.post('/login', loginValidator, validate, loginUser);

// @route    GET /api/auth/profile
// @desc     Get logged in user profile
router.get('/profile', protect, getUserProfile);

// @route    PUT /api/auth/profile
// @desc     Update logged in user profile
router.put('/profile', protect, updateProfileValidator, validate, updateDetails);

// @route    PUT /api/auth/password
// @desc     Update logged in user password
router.put('/password', protect, updatePassword);

export default router;
