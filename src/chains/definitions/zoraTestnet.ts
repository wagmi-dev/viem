import { defineChain } from '../../utils/chain/defineChain.js'
import { chainConfig } from '../opStack/chainConfig.js'

export const zoraTestnet = /*#__PURE__*/ defineChain({
  ...chainConfig,
  id: 999,
  name: 'Zora Goerli Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Zora Goerli',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.rpc.zora.energy'],
      webSocket: ['wss://testnet.rpc.zora.energy'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://testnet.explorer.zora.energy',
    },
  },
  contracts: {
    ...chainConfig.contracts,
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 189123,
    },
  },
  testnet: true,
})
