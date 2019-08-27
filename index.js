import graphqlServer from './src';

graphqlServer.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up!');
});
