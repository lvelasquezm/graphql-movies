import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import prisma from '../src/prisma';

import seed from './utils/seed';
import { createUser } from './utils/queries';
import { messages } from '../src/utils';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
});

// Seed database before each test case
beforeEach(seed);

describe('User type', () => {
  it('should create a new user', async () => {
    const username = 'testuser123';
    const response = await client.mutate({
      mutation: createUser(username, 'testpassword123')
    });
    const exists = await prisma.exists.User({
      id: response.data.createUser.user.id
    });

    expect(exists).toBe(true);
    expect(response.data.createUser.user.username).toBe(username);
    expect(response.data.createUser.user.password).toBeNull();
  });

  it('should not create a user if username already exists', async () => {
    expect(
      client.mutate({
        mutation: createUser('firsttestuser', 'testpassword123')
      })
    ).rejects.toThrow(messages.errors.createUserUsernameTaken);
  });
});
