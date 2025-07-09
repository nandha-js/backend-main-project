/**
 * @desc    General error handling middleware
 * @access  Global
 * @param   {Error} err
 * @param   {import('express').Request} req
 * @param   {import('express').Response} res
 */
const errorHandler = (err, req, res) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with ID of ${err.value}`;
  }

  // Handle duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue).join(', ');
    message = `Duplicate field value entered: ${field}`;
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map(val => val.message);
    message = `Validation error: ${errors.join(', ')}`;
  }

  // Handle JWT issues
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token, authorization denied';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired, please log in again';
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

/**
 * @desc    404 Not Found middleware
 * @access  Global
 * @param   {import('express').Request} req
 * @param   {import('express').Response} res
 * @param   {import('express').NextFunction} next
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };
 