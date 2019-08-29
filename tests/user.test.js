import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
});

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        username: "lvelasquezm"
        password: "ingenieria"
      ) {
        token
        user {
          id
          username
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser
  });
});
