import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
import messages from '../../utils/messages';

export default async function login(parent, args, { prisma }, info) {
  const { username, password } = args;

  // Query user with given username
  const user = await prisma.query.user({
    where: {
      username
    }
  });

  // Validate that user exists
  if (!user) throw new Error(messages.errors.loginUserNotFound);

  // Validate that password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new Error(messages.errors.loginPasswordNotCorrect);

  // Return user with JWT in place
  return {
    token: jwt.sign({ username: user.username }, 'pkYuq9H3'),
    user
  };
}
