[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
```
     OOOOOOOOO     RRRRRRRRRRRRRRRRR   MMMMMMMM               MMMMMMMMIIIIIIIIII
   OO:::::::::OO   R::::::::::::::::R  M:::::::M             M:::::::MI::::::::I
 OO:::::::::::::OO R::::::RRRRRR:::::R M::::::::M           M::::::::MI::::::::I
O:::::::OOO:::::::ORR:::::R     R:::::RM:::::::::M         M:::::::::MII::::::II
O::::::O   O::::::O  R::::R     R:::::RM::::::::::M       M::::::::::M  I::::I
O:::::O     O:::::O  R::::R     R:::::RM:::::::::::M     M:::::::::::M  I::::I
O:::::O     O:::::O  R::::RRRRRR:::::R M:::::::M::::M   M::::M:::::::M  I::::I
O:::::O     O:::::O  R:::::::::::::RR  M::::::M M::::M M::::M M::::::M  I::::I
O:::::O     O:::::O  R::::RRRRRR:::::R M::::::M  M::::M::::M  M::::::M  I::::I
O:::::O     O:::::O  R::::R     R:::::RM::::::M   M:::::::M   M::::::M  I::::I
O:::::O     O:::::O  R::::R     R:::::RM::::::M    M:::::M    M::::::M  I::::I
O::::::O   O::::::O  R::::R     R:::::RM::::::M     MMMMM     M::::::M  I::::I
O:::::::OOO:::::::ORR:::::R     R:::::RM::::::M               M::::::MII::::::II
 OO:::::::::::::OO R::::::R     R:::::RM::::::M               M::::::MI::::::::I
   OO:::::::::OO   R::::::R     R:::::RM::::::M               M::::::MI::::::::I
     OOOOOOOOO     RRRRRRRR     RRRRRRRMMMMMMMM               MMMMMMMMIIIIIIIIII

```
# Ormi Reputation Oracle GraphQL Server
GraphQL server for Ormi's reputation oracle. This server is built on top of GraphQL and Apollo and is the one stop destination for fetching data assoicated with a user's identifier such as a wallet address. Via GraphQL, anyone can query verifiable information associated with an address such as ERC20 assets in the wallet, NFT/POAP collections, Lens Protocol, DIDs and Verifiable credentials.

## What is Ormi?

Ormi is a decentralized permissionless, decentralized credit protocol for issuing undercollateralized loans to anyone without relying on real world identities.

## Setup

Create an enviroment file named `.env` based on the .env.example file and fill out the stubbed enviroment variables.

```
$ cp .env.example > .env
```

Install associated packages via yarn
```
$ yarn
```

Start the GraphQL server
```
$ yarn start
```

Follow the command line output, go to the localhost server to access GraphQL playground to begin query.

## Sample Query commands
```
query {
  accountActivities(address: "0x5680589efd50d8170e11b7ac26839dc24fc28975", chain: "eth") {
    transactionsPerMonth
    monthsSinceFirstTransaction
    activeBuyerSeller
    existedLongEnough
    userIsActive
  },
  
  erc20Balances(address: "0x5680589efd50d8170e11b7ac26839dc24fc28975", chain: "eth") {
      symbol
      name
      balance
      price
      value
      token_address
      logo
  }
}
```