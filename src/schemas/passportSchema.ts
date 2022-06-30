import { gql } from "apollo-server";

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