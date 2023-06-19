import type { Address } from 'abitype'

import type { transactionType } from '../utils/formatters/transaction.js'

import type { FeeValuesEIP1559, FeeValuesLegacy } from './fee.js'
import type { Log } from './log.js'
import type { Hash, Hex, Signature } from './misc.js'
import type { ValueOf } from './utils.js'

export type AccessList = { address: Address; storageKeys: Hex[] }[]

export type TransactionType = ValueOf<typeof transactionType> | (string & {})

export type TransactionReceipt<
  TQuantity = bigint,
  TIndex = number,
  TStatus = 'success' | 'reverted',
  TType = TransactionType,
> = {
  /** Hash of block containing this transaction */
  blockHash: Hash
  /** Number of block containing this transaction */
  blockNumber: TQuantity
  /** Address of new contract or `null` if no contract was created */
  contractAddress: Address | null
  /** Gas used by this and all preceding transactions in this block */
  cumulativeGasUsed: TQuantity
  /** Pre-London, it is equal to the transaction's gasPrice. Post-London, it is equal to the actual gas price paid for inclusion. */
  effectiveGasPrice: TQuantity
  /** Transaction sender */
  from: Address
  /** Gas used by this transaction */
  gasUsed: TQuantity
  /** List of log objects generated by this transaction */
  logs: Log<TQuantity, TIndex>[]
  /** Logs bloom filter */
  logsBloom: Hex
  /** `1` if this transaction was successful or `0` if it failed */
  status: TStatus
  /** Transaction recipient or `null` if deploying a contract */
  to: Address | null
  /** Hash of this transaction */
  transactionHash: Hash
  /** Index of this transaction in the block */
  transactionIndex: TIndex
  /** Transaction type */
  type: TType
}

export type TransactionBase<TQuantity = bigint, TIndex = number> = {
  /** Hash of block containing this transaction or `null` if pending */
  blockHash: Hash | null
  /** Number of block containing this transaction or `null` if pending */
  blockNumber: TQuantity | null
  /** Transaction sender */
  from: Address
  /** Gas provided for transaction execution */
  gas: TQuantity
  /** Hash of this transaction */
  hash: Hash
  /** Contract code or a hashed method call */
  input: Hex
  /** Unique number identifying this transaction */
  nonce: TIndex
  /** ECDSA signature r */
  r: Hex
  /** ECDSA signature s */
  s: Hex
  /** Transaction recipient or `null` if deploying a contract */
  to: Address | null
  /** Index of this transaction in the block or `null` if pending */
  transactionIndex: TIndex | null
  /** ECDSA recovery ID */
  v: TQuantity
  /** Value in wei sent with this transaction */
  value: TQuantity
}
export type TransactionLegacy<
  TQuantity = bigint,
  TIndex = number,
  TType = 'legacy',
> = TransactionBase<TQuantity, TIndex> &
  FeeValuesLegacy<TQuantity> & {
    accessList?: never
    chainId?: TIndex
    type: TType
  }
export type TransactionEIP2930<
  TQuantity = bigint,
  TIndex = number,
  TType = 'eip2930',
> = TransactionBase<TQuantity, TIndex> &
  FeeValuesLegacy<TQuantity> & {
    accessList: AccessList
    chainId: TIndex
    type: TType
  }
export type TransactionEIP1559<
  TQuantity = bigint,
  TIndex = number,
  TType = 'eip1559',
> = TransactionBase<TQuantity, TIndex> &
  FeeValuesEIP1559<TQuantity> & {
    accessList: AccessList
    chainId: TIndex
    type: TType
  }
export type Transaction<TQuantity = bigint, TIndex = number> =
  | TransactionLegacy<TQuantity, TIndex>
  | TransactionEIP2930<TQuantity, TIndex>
  | TransactionEIP1559<TQuantity, TIndex>

export type TransactionRequestBase<TQuantity = bigint, TIndex = number> = {
  /** Contract code or a hashed method call with encoded args */
  data?: Hex
  /** Transaction sender */
  from: Address
  /** Gas provided for transaction execution */
  gas?: TQuantity
  /** Unique number identifying this transaction */
  nonce?: TIndex
  /** Transaction recipient */
  to?: Address
  /** Value in wei sent with this transaction */
  value?: TQuantity
}
export type TransactionRequestLegacy<
  TQuantity = bigint,
  TIndex = number,
> = TransactionRequestBase<TQuantity, TIndex> &
  Partial<FeeValuesLegacy<TQuantity>> & {
    accessList?: never
  }
export type TransactionRequestEIP2930<
  TQuantity = bigint,
  TIndex = number,
> = TransactionRequestBase<TQuantity, TIndex> &
  Partial<FeeValuesLegacy<TQuantity>> & {
    accessList?: AccessList
  }
export type TransactionRequestEIP1559<
  TQuantity = bigint,
  TIndex = number,
> = TransactionRequestBase<TQuantity, TIndex> &
  Partial<FeeValuesEIP1559<TQuantity>> & {
    accessList?: AccessList
  }
export type TransactionRequest<TQuantity = bigint, TIndex = number> =
  | TransactionRequestLegacy<TQuantity, TIndex>
  | TransactionRequestEIP2930<TQuantity, TIndex>
  | TransactionRequestEIP1559<TQuantity, TIndex>

export type TransactionSerializedEIP1559 = `0x02${string}`
export type TransactionSerializedEIP2930 = `0x01${string}`
export type TransactionSerializedLegacy = Hex
export type TransactionSerializedGeneric = Hex
export type TransactionSerialized<TType extends TransactionType = 'legacy'> =
  TType extends 'eip1559'
    ? TransactionSerializedEIP1559
    : TType extends 'eip2930'
    ? TransactionSerializedEIP2930
    : TType extends 'legacy'
    ? TransactionSerializedLegacy
    : TransactionSerializedGeneric

export type TransactionSerializableBase<
  TQuantity = bigint,
  TIndex = number,
> = Omit<TransactionRequestBase<TQuantity, TIndex>, 'from'> & Partial<Signature>
export type TransactionSerializableLegacy<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> &
  Partial<FeeValuesLegacy<TQuantity>> & {
    accessList?: never
    chainId?: number
    type?: 'legacy'
  }
export type TransactionSerializableEIP2930<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> &
  Partial<FeeValuesLegacy<TQuantity>> & {
    accessList?: AccessList
    chainId: number
    type?: 'eip2930'
    yParity?: number
  }
export type TransactionSerializableEIP1559<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> &
  Partial<FeeValuesEIP1559<TQuantity>> & {
    accessList?: AccessList
    chainId: number
    type?: 'eip1559'
    yParity?: number
  }
export type TransactionSerializableGeneric<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> & {
  accessList?: AccessList
  chainId?: number
  gasPrice?: TQuantity
  maxFeePerGas?: TQuantity
  maxPriorityFeePerGas?: TQuantity
  type: string
}

export type TransactionSerializable<TQuantity = bigint, TIndex = number> =
  | TransactionSerializableLegacy<TQuantity, TIndex>
  | TransactionSerializableEIP2930<TQuantity, TIndex>
  | TransactionSerializableEIP1559<TQuantity, TIndex>
  | TransactionSerializableGeneric<TQuantity, TIndex>
