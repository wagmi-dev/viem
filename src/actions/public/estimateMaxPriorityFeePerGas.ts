import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { Eip1559FeesNotSupportedError } from '../../errors/fee.js'
import type { Account } from '../../types/account.js'
import type { Chain, GetChain } from '../../types/chain.js'
import { hexToBigInt } from '../../utils/encoding/fromHex.js'
import type { PrepareRequestParameters } from '../../utils/transaction/prepareRequest.js'
import { getBlock } from './getBlock.js'
import { getGasPrice } from './getGasPrice.js'

export type EstimateMaxPriorityFeePerGasParameters<
  chain extends Chain | undefined = Chain | undefined,
  chainOverride extends Chain | undefined = Chain | undefined,
> = GetChain<chain, chainOverride>
export type EstimateMaxPriorityFeePerGasReturnType = bigint

/**
 * Returns an estimate for the max priority fee per gas (in wei) for a
 * transaction to be likely included in the next block.
 * Defaults to [`chain.fees.defaultPriorityFee`](#TODO) if set.
 *
 * - Docs: https://viem.sh/docs/actions/public/estimateMaxPriorityFeePerGas.html
 *
 * @param client - Client to use
 * @returns An estimate (in wei) for the max priority fee per gas. {@link EstimateMaxPriorityFeePerGasReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { estimateMaxPriorityFeePerGas } from 'viem/actions'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const maxPriorityFeePerGas = await estimateMaxPriorityFeePerGas(client)
 * // 10000000n
 */
export async function estimateMaxPriorityFeePerGas<
  chain extends Chain | undefined,
  chainOverride extends Chain | undefined,
>(
  client: Client<Transport, chain>,
  args?: EstimateMaxPriorityFeePerGasParameters<chain, chainOverride>,
): Promise<EstimateMaxPriorityFeePerGasReturnType> {
  return internal_estimateMaxPriorityFeePerGas(client, args as any)
}

export async function internal_estimateMaxPriorityFeePerGas<
  chain extends Chain | undefined,
  chainOverride extends Chain | undefined,
>(
  client: Client<Transport, chain>,
  args: EstimateMaxPriorityFeePerGasParameters<chain, chainOverride> & {
    request?: PrepareRequestParameters<
      chain,
      Account | undefined,
      chainOverride
    >
  },
): Promise<EstimateMaxPriorityFeePerGasReturnType> {
  const { chain = client.chain } = args || {}
  if (typeof chain?.fees?.defaultPriorityFee === 'function') {
    const block = await getBlock(client)
    return chain.fees.defaultPriorityFee({
      block,
      client: client as Client<Transport, Chain>,
      request: args?.request as PrepareRequestParameters,
    })
  } else if (chain?.fees?.defaultPriorityFee)
    return chain?.fees?.defaultPriorityFee

  try {
    const maxPriorityFeePerGasHex = await client.request({
      method: 'eth_maxPriorityFeePerGas',
    })
    return hexToBigInt(maxPriorityFeePerGasHex)
  } catch {
    // If the RPC Provider does not support `eth_maxPriorityFeePerGas`
    // fall back to calculating it manually via `gasPrice - baseFeePerGas`.
    // See: https://github.com/ethereum/pm/issues/328#:~:text=eth_maxPriorityFeePerGas%20after%20London%20will%20effectively%20return%20eth_gasPrice%20%2D%20baseFee
    const [block, gasPrice] = await Promise.all([
      getBlock(client),
      getGasPrice(client),
    ])

    if (typeof block.baseFeePerGas !== 'bigint')
      throw new Eip1559FeesNotSupportedError()

    const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas

    if (maxPriorityFeePerGas < 0n) return 0n
    return maxPriorityFeePerGas
  }
}
