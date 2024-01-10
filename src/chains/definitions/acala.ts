import { defineChain } from '../../utils/chain/defineChain.js'

export const acala = /*#__PURE__*/ defineChain({
  id: 787,
  name: 'Acala',
  network: 'acala',
  nativeCurrency: {
    name: 'Acala',
    symbol: 'ACA',
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ['https://eth-rpc-acala.aca-api.network'],
      webSocket: ['wss://eth-rpc-acala.aca-api.network'],
    },
    default: {
      http: ['https://eth-rpc-acala.aca-api.network'],
      webSocket: ['wss://eth-rpc-acala.aca-api.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Acala Blockscout',
      url: 'https://blockscout.acala.network',
    },
  },
  testnet: false,
})
