import { body } from 'express-validator';

/**
 * @desc   Validation for sending a new message
 */
export const createMessageValidator = [
  body('sender')
    .notEmpty()
    .withMessage('Sender ID is required')
    .isMongoId()
    .withMessage('Sender ID must be a valid MongoDB ObjectId'),

  body('receiver')
    .notEmpty()
    .withMessage('Receiver ID is required')
    .isMongoId()
    .withMessage('Receiver ID must be a valid MongoDB ObjectId'),

  body('content')
    .notEmpty()
    .withMessage('Message content is required')
    .isLength({ min: 1 })
    .withMessage('Message content cannot be empty'),
];
