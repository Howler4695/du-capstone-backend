import { ApolloServer } from '@apollo/server';
import { resolvers, typeDefs } from '../../src/index.js';

const newTestServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers
  });
};

export default newTestServer;
