import jwt from 'jsonwebtoken';

export const generateJWT = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7 days' })
};

export const getAuthUsername = request => {
  const authHeader = request.request.headers.authorization;

  // Return null if no auth header is passed
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  const jwtDecoded = jwt.verify(token, process.env.JWT_SECRET);

  // Return null if JWT could not be decoded
  if (!jwtDecoded) return null;

  return jwtDecoded.username;
};
