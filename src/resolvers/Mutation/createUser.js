import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import messages from '../../utils/messages';

export default async function createUser(parent, args, { prisma }, info) {
  const { username, password } = args;

  // Validate username in use and password strength
  const isUsernameTaken = await prisma.exists.User({ username });
  if (isUsernameTaken) throw new Error(messages.errors.createUserUsernameTaken);
  if (password.length < 8) throw new Error(messages.errors.createUserWeakPassword);

  // Hash password and create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.mutation.createUser({
    data: {
      username,
      password: hashedPassword
    }
  });

  // Return new created user with JWT in place
  return {
    token: jwt.sign({ username }, 'pkYuq9H3'),
    user
  };
}
