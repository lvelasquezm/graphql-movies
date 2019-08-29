import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import prisma from '../src/prisma';

import seed from './utils/seed';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
});

// Seed database before each test case
beforeEach(seed);

describe('User type', () => {
  it('should create a new user', async () => {
    const username = 'testuser123';

    const createUser = gql`
      mutation {
        createUser(
          username: "${username}"
          password: "testpassword123"
        ) {
          token
          user {
            id
            username
            password
          }
        }
      }
    `;

    const response = await client.mutate({
      mutation: createUser
    });
    const exists = await prisma.exists.User({
      id: response.data.createUser.user.id
    });

    expect(exists).toBe(true);
    expect(response.data.createUser.user.username).toBe(username);
    expect(response.data.createUser.user.password).toBeNull();
  });
});
