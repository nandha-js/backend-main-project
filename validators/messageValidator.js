import { body } from 'express-validator';

/**
 * @desc   Validation for creating a message
 */
export const createMessageValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters')
    .trim()
    .escape(),

  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('message')
    .notEmpty()
    .withMessage('Message content is required')
    .trim()
    .escape(),

  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('property')
    .optional()
    .isMongoId()
    .withMessage('Invalid property ID'),

  body('user')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID'),
];
