import uuidv4 from 'uuid/v4';

export default function createUser(parent, args, ctx, info) {
  return {
    id: uuidv4(),
    ...args
  };
}
