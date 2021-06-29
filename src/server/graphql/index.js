
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';

import typeDefs from './types';
import resolvers from './resolvers';


export const schema = makeExecutableSchema({
  logger: console,

  typeDefs,
  resolvers,
});

export const context = ({ req }) => ({
  user: req.user,
  db: req.db,
});

export function createClient(req) {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema, context: context({ req }) }),
    cache: new InMemoryCache(),
  });
}

export default new ApolloServer({
  schema,
  context,
});
