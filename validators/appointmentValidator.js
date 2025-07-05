import { body } from 'express-validator';

export const createAppointmentValidator = [
  body('property')
    .notEmpty()
    .withMessage('Property ID is required')
    .isMongoId()
    .withMessage('Invalid Property ID'),

  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid User ID'),

  body('date')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date'),

  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Invalid status value'),
];

export const updateAppointmentValidator = [
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date'),

  body('status')
    .optional()
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Invalid status value'),
];
