import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';

export default new GraphQLServer({
  typeDefs: './src/typeDefs/schema.graphql',
  resolvers,
});
