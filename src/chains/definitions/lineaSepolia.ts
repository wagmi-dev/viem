import { defineChain } from '../../utils/chain/defineChain.js'
import { lineaEstimateFeesPerGas } from '../../linea/index.js'

export const lineaSepolia = /*#__PURE__*/ defineChain({
  id: 59_141,
  name: 'Linea Sepolia Testnet',
  nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.sepolia.linea.build'],
      webSocket: ['wss://rpc.sepolia.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://sepolia.lineascan.build',
      apiUrl: 'https://api-sepolia.lineascan.build/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 227427,
    },
  },
  testnet: true,
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
