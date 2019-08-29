import 'cross-fetch/polyfill';
import prisma from '../src/prisma';

import getClient from './utils/client';
import seedDB from './utils/seed';
// import { } from './utils/queries';

const client = getClient();

// Seed database before running all test cases
beforeAll(seedDB);

describe('Movies', () => {
  it('should run', () => console.log('running!'));
});
