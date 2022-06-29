import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { dataSources } from './dataSources'
require('dotenv').config()

const server = new ApolloServer({ schema, dataSources })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
});
