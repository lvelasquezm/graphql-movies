import { authUtils } from '../utils';

export default {
  scoutbase_rating(parent, args, { prisma, request }, info) {
    const authUsername = authUtils.getAuthUsername(request);

    // Return actual value for authenticated users
    if (authUsername) {
      return parent.scoutbase_rating;
    }

    // Return null otherwise
    return null;
  }
};
