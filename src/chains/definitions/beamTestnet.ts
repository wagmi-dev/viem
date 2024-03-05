import { defineChain } from '../../utils/chain/defineChain.js'

export const beamTestnet = /*#__PURE__*/ defineChain({
  id: 13337,
  name: 'Beam Testnet',
  network: 'beam',
  nativeCurrency: {
    decimals: 18,
    name: 'Beam',
    symbol: 'BEAM',
  },
  rpcUrls: {
    public: {
        http: ['https://subnets.avax.network/beam/testnet/rpc']
    },
    default: {
        http: ['https://subnets.avax.network/beam/testnet/rpc']
    },
  },
  blockExplorers: {
    default: {
      name: 'Beam Explorer',
      url: 'https://subnets-test.avax.network/beam',
    },
  },
  contracts: {
    multicall3: {
      address: '0x9bf49b704ee2a095b95c1f2d4eb9010510c41c9e',
      blockCreated: 3,
    },
  },
  testnet: true,
})
