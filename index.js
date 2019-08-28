import graphqlServer from './src';

const options = {
  port: process.env.PORT || 4000,
  playground: '/',
  endpoint: '/graphql'
};

graphqlServer.start(options, () => {
  console.log('The server is up!');
});
