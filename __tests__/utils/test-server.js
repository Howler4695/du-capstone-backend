import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from '../../src/index.js';

const getTestServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers
  });
};

export default getTestServer;
