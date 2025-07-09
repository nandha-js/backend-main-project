import { body } from 'express-validator';

export const createAgentValidator = [
  body('name')
    .notEmpty()
    .withMessage('Agent name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .trim()
    .escape(),

  body('email')
    .notEmpty()
    .withMessage('Agent email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .notEmpty()
    .withMessage('Agent phone number is required')
    .isMobilePhone('any') // you can specify locale(s) like 'en-IN', 'en-US', etc.
    .withMessage('Please provide a valid phone number'),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string')
    .trim()
    .escape(),

  body('photo')
    .optional()
    .isString()
    .withMessage('Photo must be a string (URL or filename)')
    .trim(),
];

export const updateAgentValidator = [
  body('name')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long')
    .trim()
    .escape(),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),

  body('bio')
    .optional()
    .isString()
    .withMessage('Bio must be a string')
    .trim()
    .escape(),

  body('photo')
    .optional()
    .isString()
    .withMessage('Photo must be a string (URL or filename)')
    .trim(),
];
