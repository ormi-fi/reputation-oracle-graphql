import { gql, IResolvers, makeExecutableSchema } from 'apollo-server';

const typeDefs = gql`
  type Erc20BalanceResponse {
    symbol: String
    name: String
    balance: Float
    price: Float
    value: Float
    token_address: String
    logo: String
  }

  type AccountActivitiesResponse {
    transactionsPerMonth: Float!
    activeBuyerSeller: Boolean!
    monthsSinceFirstTransaction: Int!
    existedLongEnough: Boolean!
    userIsActive: Boolean!
  }

  type Query {
    accountActivities(address: String!, chain: String!): AccountActivitiesResponse
    erc20Balances(address: String!, chain: String!): [Erc20BalanceResponse]
  }
`;

const resolvers: IResolvers = {
  Query: {
    accountActivities(_, { address, chain }, { dataSources }) {
      return dataSources.moralisAPI.accountActivities(address, chain);
    },

    erc20Balances(_, { address, chain }, { dataSources }) {
      return dataSources.moralisAPI.erc20Balances(address, chain);
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
