import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: import.meta.env.VITE_APP_ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};

export const alchemy = new Alchemy(config);