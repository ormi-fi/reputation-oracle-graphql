import { gql } from "apollo-server";

/*
 * Schema created from
 * https://cerscan.com/mainnet/stream/k3y52l7qbv1frynp3s4v5z0a9wrolxl7kjmbvj19jl9mck442dbtbnwqes5irx3pc
 * https://cerscan.com/mainnet/stream/k3y52l7qbv1frydjk40z9wgf1snwf6axdpc32svgu2jpxrmptldj8rroq2n6a2a68
 */
export default gql`
  type Proof {
    jws: String
    type: String
    created: String
    proofPurpose: String
    verificationMethod: String
  }

  type CredentialSubject {
    id: String
    hash: String
    address: String
    # @context
    provider: String
    challenge: String
  }

  type VerifiedCredential {
    type: [String]!
    credentialSubject: CredentialSubject!
    issuer: String!
    # @context
    issuanceDate: String!
    expirationDate: String!
    proof: Proof!
  }

  type Stamp {
    provider: String
    credential: VerifiedCredential
  }

  type GitcoinPassport {
    issuanceDate: String!
    expiryDate: String!
    stamps: [Stamp]
  }
`;