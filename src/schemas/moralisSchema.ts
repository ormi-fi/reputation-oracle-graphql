import { gql } from "apollo-server";

export default gql`
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
`;