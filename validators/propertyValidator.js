import { body } from 'express-validator';

/**
 * @desc   Validation for creating a new property
 */
export const createPropertyValidator = [
  body('title')
    .notEmpty()
    .withMessage('Property title is required')
    .trim()
    .escape(),

  body('description')
    .notEmpty()
    .withMessage('Property description is required')
    .trim()
    .escape(),

  body('price')
    .notEmpty()
    .withMessage('Property price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .toFloat(),

  body('address')
    .notEmpty()
    .withMessage('Property address is required')
    .trim()
    .escape(),

  body('type')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn(['apartment', 'house', 'villa'])
    .withMessage('Invalid property type'),

  body('size')
    .notEmpty()
    .withMessage('Property size is required')
    .isNumeric()
    .withMessage('Size must be a number')
    .toFloat(),

  body('rooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Rooms must be a valid number')
    .toInt(),

  body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a valid number')
    .toInt(),

  body('bathrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a valid number')
    .toInt(),
];

/**
 * @desc   Validation for updating a property (partial update allowed)
 */
export const updatePropertyValidator = [
  body('title')
    .optional()
    .notEmpty()
    .withMessage('Property title cannot be empty')
    .trim()
    .escape(),

  body('description')
    .optional()
    .notEmpty()
    .withMessage('Property description cannot be empty')
    .trim()
    .escape(),

  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number')
    .toFloat(),

  body('address')
    .optional()
    .notEmpty()
    .withMessage('Property address cannot be empty')
    .trim()
    .escape(),

  body('type')
    .optional()
    .isIn(['apartment', 'house', 'villa'])
    .withMessage('Invalid property type'),

  body('size')
    .optional()
    .isNumeric()
    .withMessage('Size must be a number')
    .toFloat(),

  body('rooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Rooms must be a valid number')
    .toInt(),

  body('bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a valid number')
    .toInt(),

  body('bathrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a valid number')
    .toInt(),
];
 