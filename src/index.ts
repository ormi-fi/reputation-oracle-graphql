import { ApolloServer } from 'apollo-server';
import { schema } from './schemas';
import { dataSources } from './dataSources';
import 'dotenv/config';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';

const server = new ApolloServer({
  schema,
  dataSources,
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
