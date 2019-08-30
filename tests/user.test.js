import 'cross-fetch/polyfill';
import prisma from '../src/prisma';

import getClient from './utils/client';
import seedDB, { firstTestUser } from './utils/seed';
import { createUser, login } from './utils/queries';

const client = getClient();

// Seed database before running all test cases
beforeAll(seedDB);

describe('Users', () => {
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

  it('should not create a user if username already exists', () => {
    expect(
      client.mutate({
        mutation: createUser(firstTestUser.input.username, 'testpassword123')
      })
    ).rejects.toThrow();
  });

  it('should allow a user to login with username and password', async () => {
    const username = firstTestUser.input.username;
    const response = await client.mutate({
      mutation: login(username, 'firsttestpassword')
    });

    expect(typeof response.data.login.token).toBe('string');
    expect(response.data.login.user.username).toBe(username);
  });

  it('should not allow a user to login if username does not exist', () => {
    expect(
      client.mutate({
        mutation: login('wrongusername', 'password')
      })
    ).rejects.toThrow();
  });

  it('should not allow a user to login if password is wrong', () => {
    expect(
      client.mutate({
        mutation: login(firstTestUser.input.username, 'wrongpassword')
      })
    ).rejects.toThrow();
  });
});
