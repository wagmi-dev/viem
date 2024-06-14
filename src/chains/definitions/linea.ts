import { defineChain } from '../../utils/chain/defineChain.js'
import { lineaEstimateFeesPerGas } from '../../linea/index.js'

export const linea = /*#__PURE__*/ defineChain({
  id: 59_144,
  name: 'Linea Mainnet',
  nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.linea.build'],
      webSocket: ['wss://rpc.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://lineascan.build',
      apiUrl: 'https://api.lineascan.build/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xcA11bde05977b3631167028862bE2a173976CA11',
      blockCreated: 42,
    },
  },
  testnet: false,
  fees: {
    // Override the fees calculation to accurately price the fees
    // on Linea using the rpc call linea_estimateGas
    estimateFeesPerGas: lineaEstimateFeesPerGas,
    async defaultPriorityFee(args): Promise<bigint> {
      const { maxPriorityFeePerGas } = await lineaEstimateFeesPerGas({
        client: args.client,
        request: args.request,
        type: 'eip1559',
      } as any)

      if (maxPriorityFeePerGas === undefined) {
        throw new Error('maxPriorityFeePerGas is undefined')
      }

      return maxPriorityFeePerGas
    },
  },
})
