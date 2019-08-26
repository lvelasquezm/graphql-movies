import jwt from 'jsonwebtoken';

export const getAuthUsername = request => {
  const authHeader = request.request.headers.authorization;

  // Return null if no auth header is passed
  if (!authHeader) return null;

  const token = authHeader.replace('Bearer ', '');
  const jwtDecoded = jwt.verify(token, 'pkYuq9H3');

  // Return null if JWT could not be decoded
  if (!jwtDecoded) return null;

  return jwtDecoded.username;
};
