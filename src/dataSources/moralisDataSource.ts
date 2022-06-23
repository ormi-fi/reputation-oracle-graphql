import { DataSource } from 'apollo-datasource';
import { DataSourceConfig, WalletBalance, MoralisChainOptions, Erc20TokenBalance, ActivityInfo } from '../type';
import Moralis from 'moralis/node';
import 'dotenv/config'

const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

// Retrieving price data is expensive operation on Moralis and often results in rate limit getting
// hit. That is why we provide the option to disable fetching the price for the erc20 tokens.
const PRICE_ENABLED = false;

const getErc20TokenPrice = async (
  erc20Token: Erc20TokenBalance,
  chain: MoralisChainOptions
): Promise<number | null> => {
  // Setting delay to rate limit price fetching, as price fetching is expensive operation on
  // Moralis and will result in rate limit getting hit.
  await new Promise((resolve) => setTimeout(resolve, 1200));
  console.log('Fetching price data for: ' + erc20Token.name);
  const price: number | null = await Moralis.Web3API.token
    .getTokenPrice({ address: erc20Token.token_address, chain: chain })
    .then((token) => token.usdPrice)
    .catch((err) => {
      console.log(err);
      return null;
    });
  return price;
};

const getErc20TokenBalances = async (address: string, chain: MoralisChainOptions): Promise<WalletBalance[] | null> => {
  // fetch token balance from address
  const tokens: Erc20TokenBalance[] | null = await Moralis.Web3API.account
    .getTokenBalances({ address: address, chain: chain })
    .catch((err) => {
      console.log(err);
      return null;
    });
  console.log('Fetched all ERC20 balances for chain: %s, number of tokens: %s', chain, tokens.length);

  if (tokens === null || tokens.length === 0) return null;

  // Using Map() to store token balances, populate with info from API call.
  const tokenBalances: Map<String, WalletBalance> = new Map();
  for (const token of tokens!) {
    const tokenInfo: WalletBalance = {
      logo: token.logo,
      name: token.name,
      symbol: token.symbol,
      balance: parseFloat(token.balance) * Math.pow(10, -1 * token.decimals),
      price: undefined,
      value: undefined,
      token_address: token.token_address,
    };

    // Retrieve price data for each token.
    // Note: Retrieving price data is expensive operation on Moralis and often results in rate limit
    // getting hit. That is why we provide the option to disable fetching the price for the erc20
    // token.
    if (PRICE_ENABLED) {
      const price: number | null = await getErc20TokenPrice(token, chain);
      if (price) {
        tokenInfo.price = price;
        tokenInfo.value = tokenInfo.price * tokenInfo.balance;
      }
    }

    tokenBalances.set(token.token_address, tokenInfo);
  }

  return Array.from(tokenBalances.values());
};

export class MoralisAPI extends DataSource {
  context: any;

  constructor() {
    super();
    Moralis.start({ serverUrl, appId, masterKey }).then(() => {
      console.log('Moralis server started ...');
    });
  }

  initialize(config: DataSourceConfig) {
    this.context = config.context;
  }

  accountActivities = async (address: string, chain: string) => {
    // TODO: needs to be implemented.
    const activityInfo: ActivityInfo = {
      transactionsPerMonth: 0,
      activeBuyerSeller: false,
      monthsSinceFirstTransaction: 0,
      existedLongEnough: false,
      userIsActive: false,
    };
    return activityInfo;
  };

  erc20Balances = async (address: string, chain: string) => {
    const balances = await getErc20TokenBalances(address, chain as MoralisChainOptions);
    return balances;
  };
}

const moralisAPI = new MoralisAPI();

export const dataSources = () => ({ moralisAPI });
