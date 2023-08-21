import type { ChainFees } from '../types.js'

export const feesOptimism = {
  defaultPriorityFee: 1_000_000n, // 0.001 gwei
} as const satisfies ChainFees
