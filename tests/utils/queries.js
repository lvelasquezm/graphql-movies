import { gql } from 'apollo-boost';

export const createUser = (username, password) => gql`
  mutation {
    createUser(
      username: "${username}"
      password: "${password}"
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

export const login = (username, password) => gql`
  mutation {
    login(
      username: "${username}"
      password: "${password}"
    ) {
      token
      user {
        id
        username
      }
    }
  }
`;
