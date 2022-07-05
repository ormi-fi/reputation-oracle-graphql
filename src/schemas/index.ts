import { gql } from 'apollo-server';
import {makeExecutableSchema } from '@graphql-tools/schema';
import { IResolvers } from '@graphql-tools/utils';
import GraphQLJSON from 'graphql-type-json';
import PassportSchema from './passportSchema';
import MoralisSchema from './moralisSchema';

const typeDefs = gql`
  scalar JSON
  
  ${PassportSchema}
  ${MoralisSchema}

  type Query {
    accountActivities(address: String!, chain: String!): AccountActivitiesResponse
    erc20Balances(address: String!, chain: String!): [Erc20BalanceResponse]
    gitcoinPassport(address: String!): GitcoinPassport
  }
`;

const resolvers: IResolvers = {
  JSON: GraphQLJSON,
  Query: {
    accountActivities(_, { address, chain }, { dataSources }) {
      return dataSources.moralisAPI.accountActivities(address, chain);
    },

    erc20Balances(_, { address, chain }, { dataSources }) {
      return dataSources.moralisAPI.erc20Balances(address, chain);
    },
    gitcoinPassport(_, { address }, { dataSources }) {
      return dataSources.gitcoinPassportAPI.getPassport(address);
    }
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
