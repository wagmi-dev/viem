import { defineChain } from '../../utils/chain/defineChain.js'

export const rootstockTestnet = /*#__PURE__*/ defineChain({
  id: 31,
  name: 'Rootstock Testnet',
  network: 'rootstock',
  nativeCurrency: {
    decimals: 18,
    name: 'Rootstock Bitcoin',
    symbol: 'tRBTC',
  },
  rpcUrls: {
    default: { http: ['https://public-node.testnet.rsk.co'] },
  },
  blockExplorers: {
    default: {
      name: 'RSK Explorer',
      url: 'https://explorer.testnet.rootstock.io',
    },
    blockscout: {
      name: 'Rootstock Testnet Blockscout',
      url: 'https://rootstock-testnet.blockscout.com',
      apiUrl: 'https://rootstock-testnet.blockscout.com/api',
    },
  },
  testnet: true,
})
