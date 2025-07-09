import jwt from 'jsonwebtoken';

/**
 * @desc    Generate JWT token for a user
 * @param   {string} id - User ID to sign in the token payload
 * @returns {string} Signed JWT token
 */
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('Missing JWT_SECRET in environment variables');
  }

  const expiresIn = process.env.JWT_EXPIRE || '30d';

  return jwt.sign({ id }, secret, {
    expiresIn,
  });
};

export default generateToken;
