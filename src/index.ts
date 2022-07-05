import { ApolloServer } from 'apollo-server'
import { schema } from './schemas'
import { dataSources } from './dataSources'
require('dotenv').config()

const server = new ApolloServer({ schema, dataSources })

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});
