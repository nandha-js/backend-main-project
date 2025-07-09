import { body } from "express-validator";

/**
 * @desc   Validation for user registration
 */
export const registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .trim()
    .escape(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    // Optional: Uncomment below for stronger passwords
    // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    // .withMessage('Password must contain at least one letter and one number')
    .trim(),

  body("role")
    .optional()
    .isIn(["user", "agent", "admin"])
    .withMessage("Invalid role value"),
];

/**
 * @desc   Validation for user login
 */
export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required").trim(),
];

/**
 * @desc   Validation for user profile update
 */
export const updateProfileValidator = [
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long")
    .trim()
    .escape(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .custom((value) => {
      const phoneRegex = /^\+?[1-9]\d{9,14}$/; // E.164
      if (!phoneRegex.test(value)) {
        throw new Error("Please provide a valid phone number");
      }
      return true;
    }),
];
