// Apollo types
export interface DataSourceConfig<TContext = any> {
  context: TContext;
  cache: KeyValueCache;
}

// Moralis types
export interface WalletBalance {
  symbol: string;
  name: string;
  balance: number;
  price?: number;
  value?: number;
  token_address: string;
  logo?: string;
}

export interface Erc20TokenBalance {
  token_address: string;
  name: string;
  symbol: string;
  logo?: string;
  thumbnail?: string;
  decimals: number;
  balance: string;
}

export interface ActivityInfo {
  transactionsPerMonth: number;
  activeBuyerSeller: boolean;
  monthsSinceFirstTransaction: number;
  existedLongEnough: boolean;
  userIsActive: boolean;
}

export type MoralisChainOptions =
  | 'eth'
  | '0x1'
  | 'ropsten'
  | '0x3'
  | 'rinkeby'
  | '0x4'
  | 'goerli'
  | '0x5'
  | 'kovan'
  | '0x2a'
  | 'polygon'
  | '0x89'
  | 'mumbai'
  | '0x13881'
  | 'bsc'
  | '0x38'
  | 'bsc testnet'
  | '0x61'
  | 'avalanche'
  | '0xa86a'
  | 'avalanche testnet'
  | '0xa869'
  | 'fantom'
  | '0xfa'
  | undefined;
