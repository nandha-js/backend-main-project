// middleware/roleMiddleware.js

/**
 * @desc    Role-based authorization middleware
 * @param   {...string} roles - Allowed user roles (e.g. 'admin', 'agent')
 * @access  Private (after authentication)
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    next();
  };
};
