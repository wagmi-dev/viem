import { defineChain } from '../../utils/chain/defineChain.js'

export const cyberTestnet = /*#__PURE__*/ defineChain({
  id: 111557560,
  name: 'Cyber Testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://cyber-testnet.alt.technology/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://cyber-testnet-explorer.alt.technology',
      apiUrl: 'https://cyber-testnet-explorer.alt.technology/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xffc391F0018269d4758AEA1a144772E8FB99545E',
      blockCreated: 304545,
    },
  },
  testnet: true,
})