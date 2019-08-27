import '@babel/polyfill/noConflict';
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers';
import prisma from './prisma';

export default new GraphQLServer({
  typeDefs: './src/typeDefs/schema.graphql',
  resolvers,
  context(request) {
    return {
      prisma,
      request
    };
  }
});
