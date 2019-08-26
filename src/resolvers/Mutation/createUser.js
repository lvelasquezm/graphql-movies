import messages from '../../utils/messages';

export default async function createUser(parent, args, { prisma }, info) {
  const isUsernameTaken = await prisma.exists.User({ username: args.username });

  if (isUsernameTaken) throw new Error(messages.errors.createUserUsernameTaken);

  return await prisma.mutation.createUser({
    data: {
      username: args.username,
      password: args.password
    }
  }, info);
}
