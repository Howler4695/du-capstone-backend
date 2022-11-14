import { ApolloServer } from "@apollo/server";
import { resolvers, typeDefs } from "../../src/index";

export const getTestServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};
