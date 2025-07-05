import rateLimit from 'express-rate-limit';

/**
 * @desc    Rate limiting middleware to prevent brute-force attacks and abuse
 * @access  Global
 */
const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // Default: 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100, // Default: 100 requests per windowMs

  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },

  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers (deprecated)

  /**
   * @desc    Customize handler to log and respond uniformly
   */
  handler: (req, res, next, options) => {
    console.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

export default rateLimiter;
