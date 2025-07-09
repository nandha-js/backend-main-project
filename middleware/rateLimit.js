import rateLimit from 'express-rate-limit';

/**
 * @desc    Rate limiting middleware to prevent brute-force attacks and abuse
 * @access  Global
 */
const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100, // Max 100 requests per window

  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },

  standardHeaders: true,  // Send rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,   // Disable the deprecated `X-RateLimit-*` headers

  /**
   * @desc    Handler for rate limit exceeded
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {Function} _next
   * @param {Object} options
   */
  handler: (req, res, _next, options) => {
    console.warn(`🔒 Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).json(options.message);
  },
});

export default rateLimiter;
 