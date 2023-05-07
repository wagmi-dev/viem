import type { Abi, AbiEvent, ExtractAbiEvent } from 'abitype'

import type { PublicClient } from '../../clients/createPublicClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Chain } from '../../types/chain.js'
import type { Filter, FilterType } from '../../types/filter.js'
import type { Log } from '../../types/log.js'
import type { Hash } from '../../types/misc.js'
import { decodeEventLog } from '../../utils/abi/decodeEventLog.js'
import { formatLog } from '../../utils/formatters/log.js'

export type GetFilterChangesParameters<
  TFilterType extends FilterType = FilterType,
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string | undefined = string,
> = {
  filter: Filter<TFilterType, TAbi, TEventName, any>
}

export type GetFilterChangesReturnType<
  TFilterType extends FilterType = FilterType,
  TAbi extends Abi | readonly unknown[] = Abi,
  TEventName extends string | undefined = string,
  _AbiEvent extends AbiEvent | undefined = TAbi extends Abi
    ? TEventName extends string
      ? ExtractAbiEvent<TAbi, TEventName>
      : undefined
    : undefined,
> = TFilterType extends 'event'
  ? Log<bigint, number, _AbiEvent, TAbi, TEventName>[]
  : Hash[]

/**
 * Returns a list of logs or hashes based on a [Filter](/docs/glossary/terms#filter) since the last time it was called.
 *
 * - Docs: https://viem.sh/docs/actions/public/getFilterChanges.html
 * - JSON-RPC Methods: [`eth_getFilterChanges`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)
 *
 * A Filter can be created from the following actions:
 *
 * - [`createBlockFilter`](https://viem.sh/docs/actions/public/createBlockFilter)
 * - [`createContractEventFilter`](https://viem.sh/docs/contract/createContractEventFilter)
 * - [`createEventFilter`](https://viem.sh/docs/actions/public/createEventFilter)
 * - [`createPendingTransactionFilter`](https://viem.sh/docs/actions/public/createPendingTransactionFilter)
 *
 * Depending on the type of filter, the return value will be different:
 *
 * - If the filter was created with `createContractEventFilter` or `createEventFilter`, it returns a list of logs.
 * - If the filter was created with `createPendingTransactionFilter`, it returns a list of transaction hashes.
 * - If the filter was created with `createBlockFilter`, it returns a list of block hashes.
 *
 * @param client - Client to use
 * @param parameters - {@link GetFilterChangesParameters}
 * @returns Logs or hashes. {@link GetFilterChangesReturnType}
 *
 * @example
 * // Blocks
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { createBlockFilter, getFilterChanges } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const filter = await createBlockFilter(client)
 * const hashes = await getFilterChanges(client, { filter })
 *
 * @example
 * // Contract Events
 * import { createPublicClient, http, parseAbi } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { createContractEventFilter, getFilterChanges } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const filter = await createContractEventFilter(client, {
 *   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
 *   abi: parseAbi(['event Transfer(address indexed, address indexed, uint256)']),
 *   eventName: 'Transfer',
 * })
 * const logs = await getFilterChanges(client, { filter })
 *
 * @example
 * // Raw Events
 * import { createPublicClient, http, parseAbiItem } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { createEventFilter, getFilterChanges } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const filter = await createEventFilter(client, {
 *   address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
 *   event: parseAbiItem('event Transfer(address indexed, address indexed, uint256)'),
 * })
 * const logs = await getFilterChanges(client, { filter })
 *
 * @example
 * // Transactions
 * import { createPublicClient, http } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { createPendingTransactionFilter, getFilterChanges } from 'viem/public'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 * const filter = await createPendingTransactionFilter(client)
 * const hashes = await getFilterChanges(client, { filter })
 */
export async function getFilterChanges<
  TTransport extends Transport,
  TChain extends Chain | undefined,
  TFilterType extends FilterType,
  TAbi extends Abi | readonly unknown[],
  TEventName extends string | undefined,
>(
  _client: PublicClient<TTransport, TChain>,
  { filter }: GetFilterChangesParameters<TFilterType, TAbi, TEventName>,
) {
  const logs = await filter.request({
    method: 'eth_getFilterChanges',
    params: [filter.id],
  })
  return logs
    .map((log) => {
      if (typeof log === 'string') return log
      try {
        const { eventName, args } =
          'abi' in filter && filter.abi
            ? decodeEventLog({
                abi: filter.abi,
                data: log.data,
                topics: log.topics as any,
              })
            : { eventName: undefined, args: undefined }
        return formatLog(log, { args, eventName })
      } catch {
        // Skip log if there is an error decoding (e.g. indexed/non-indexed params mismatch).
        return
      }
    })
    .filter(Boolean) as GetFilterChangesReturnType<
    TFilterType,
    TAbi,
    TEventName
  >
}
