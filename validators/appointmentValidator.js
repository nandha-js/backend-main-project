import { body } from 'express-validator';

export const createAppointmentValidator = [
  body('property')
    .notEmpty()
    .withMessage('Property ID is required')
    .isMongoId()
    .withMessage('Invalid Property ID'),

  body('date')
    .notEmpty()
    .withMessage('Appointment date is required')
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date'),

  body('time')
    .notEmpty()
    .withMessage('Appointment time is required')
    .isString()
    .withMessage('Time must be a string')
    .trim()
    .escape()
    .custom((value) => {
      // Optional: Validate time format HH:mm or HH:mm:ss (24-hour)
      if (!/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(value)) {
        throw new Error('Time must be in HH:mm or HH:mm:ss 24-hour format');
      }
      return true;
    }),

  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isString()
    .withMessage('Message must be a string')
    .trim()
    .escape(),
];

export const updateAppointmentValidator = [
  body('date')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Please provide a valid date'),

  body('time')
    .optional()
    .isString()
    .withMessage('Time must be a string')
    .trim()
    .escape()
    .custom((value) => {
      if (!/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(value)) {
        throw new Error('Time must be in HH:mm or HH:mm:ss 24-hour format');
      }
      return true;
    }),

  body('message')
    .optional()
    .isString()
    .withMessage('Message must be a string')
    .trim()
    .escape(),
];
