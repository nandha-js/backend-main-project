import { body } from 'express-validator';

/**
 * @desc   Validation for creating a new property
 */
export const createPropertyValidator = [
  body('title')
    .notEmpty()
    .withMessage('Property title is required'),

  body('description')
    .notEmpty()
    .withMessage('Property description is required'),

  body('price')
    .notEmpty()
    .withMessage('Property price is required')
    .isNumeric()
    .withMessage('Price must be a number'),

  body('address')
    .notEmpty()
    .withMessage('Property address is required'),

  body('location')
    .notEmpty()
    .withMessage('Property location is required')
    .custom((value) => {
      if (!value.coordinates || !Array.isArray(value.coordinates) || value.coordinates.length !== 2) {
        throw new Error('Location coordinates must be an array of [longitude, latitude]');
      }
      return true;
    }),

  body('type')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn(['Apartment', 'House', 'Studio', 'Villa', 'Plot', 'Commercial'])
    .withMessage('Invalid property type'),

  body('size')
    .notEmpty()
    .withMessage('Property size is required')
    .isNumeric()
    .withMessage('Size must be a number'),

  body('rooms')
    .notEmpty()
    .withMessage('Number of rooms is required')
    .isInt({ min: 1 })
    .withMessage('Rooms must be at least 1'),
];

/**
 * @desc   Validation for updating a property (partial update allowed)
 */
export const updatePropertyValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Property title cannot be empty'),

  body('description')
    .optional()
    .notEmpty()
    .withMessage('Property description cannot be empty'),

  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),

  body('address')
    .optional()
    .notEmpty()
    .withMessage('Property address cannot be empty'),

  body('location')
    .optional()
    .custom((value) => {
      if (value && (!value.coordinates || !Array.isArray(value.coordinates) || value.coordinates.length !== 2)) {
        throw new Error('Location coordinates must be an array of [longitude, latitude]');
      }
      return true;
    }),

  body('type')
    .optional()
    .isIn(['Apartment', 'House', 'Studio', 'Villa', 'Plot', 'Commercial'])
    .withMessage('Invalid property type'),

  body('size')
    .optional()
    .isNumeric()
    .withMessage('Size must be a number'),

  body('rooms')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Rooms must be at least 1'),
];
