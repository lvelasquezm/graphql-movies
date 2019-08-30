import 'cross-fetch/polyfill';
import getClient from './utils/client';
import seedDB, { firstTestUser } from './utils/seed';
import { getMovies } from './utils/queries';

// Seed database before running all test cases
beforeAll(seedDB);

describe('Movies', () => {
  it('should fetch movies info with authors and directors (user is not authenticated)', async () => {
    const client = getClient();
    const response = await client.query({
      query: getMovies
    });
    const movies = response.data.movies;

    expect(movies.length).toBe(2);
    expect(movies[0].title).toBe('Titanic');
    expect(movies[0].actors.length).toBe(2);
    expect(movies[0].actors[0].name).toBe('Leo Di Caprio');
    expect(movies[0].scoutbase_rating).toBeNull();
  });

  it('should fetch movies info with authors and directors (user is authenticated)', async () => {
    const authClient = getClient(firstTestUser.jwt);
    const response = await authClient.query({
      query: getMovies
    });
    const movies = response.data.movies;

    expect(movies.length).toBe(2);
    expect(movies[1].title).toBe('The Martian');
    expect(movies[1].directors.length).toBe(2);
    expect(movies[1].directors[0].name).toBe('Matt Damon');
    expect(movies[1].scoutbase_rating).toBeDefined();
    expect(movies[1].scoutbase_rating).toBe(8);
  });
});
