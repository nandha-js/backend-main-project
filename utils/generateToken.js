import jwt from 'jsonwebtoken';

/**
 * @desc    Generate JWT token for a user
 * @param   {string} id - User ID to sign in the token payload
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const expiresIn = process.env.JWT_EXPIRE || '30d'; // Default to 30 days if not set

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export default generateToken;
