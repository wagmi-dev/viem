import { defineChain } from '../../utils/chain/defineChain.js'

export const shibarium = /*#__PURE__*/ defineChain({
  id: 109,
  name: 'Shibarium',
  network: 'shibarium',
  nativeCurrency: { name: 'Bone', symbol: 'BONE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.shibrpc.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://shibariumscan.io',
    },
    blockscout: {
      name: 'Shibarium Blockscout',
      url: 'https://www.shibariumscan.io',
      apiUrl: 'https://www.shibariumscan.io/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0x864Bf681ADD6052395188A89101A1B37d3B4C961',
      blockCreated: 265900,
    },
  },
})
