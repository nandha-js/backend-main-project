import { body } from 'express-validator';

export const createAgentValidator = [
  body('name')
    .notEmpty()
    .withMessage('Agent name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .notEmpty()
    .withMessage('Agent email is required')
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('phone')
    .notEmpty()
    .withMessage('Agent phone number is required')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string'),

  body('photo')
    .optional()
    .isString()
    .withMessage('Photo must be a string URL or filename'),
];

export const updateAgentValidator = [
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email'),

  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string'),

  body('photo')
    .optional()
    .isString()
    .withMessage('Photo must be a string URL or filename'),
];
