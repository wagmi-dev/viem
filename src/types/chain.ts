import type { Chain as Chain_ } from '@wagmi/chains'
import type { Address } from 'abitype'

import type { Formatters } from './formatter.js'
import type { IsUndefined } from './utils.js'
import type { SerializeTransactionFn } from '../utils/transaction/serializeTransaction.js'

export type Chain<
  TFormatters extends Formatters = Formatters,
  TSerializer extends SerializeTransactionFn = SerializeTransactionFn,
> = Chain_ & {
  formatters?: TFormatters
  serializer?: TSerializer
}

export type ChainContract = {
  address: Address
  blockCreated?: number
}

export type GetChain<
  TChain extends Chain | undefined,
  TChainOverride extends Chain | undefined = undefined,
> = IsUndefined<TChain> extends true
  ? { chain: TChainOverride | null }
  : { chain?: TChainOverride | null }
