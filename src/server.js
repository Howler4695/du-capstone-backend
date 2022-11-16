import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone.js';
import { typeDefs, resolvers } from './index.js';

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
