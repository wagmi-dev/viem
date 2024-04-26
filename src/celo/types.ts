import type { Address } from 'abitype'

import type { Block, BlockTag } from '../types/block.js'
import type { FeeValuesEIP1559 } from '../types/fee.js'
import type { Hex } from '../types/misc.js'
import type {
  Index,
  Quantity,
  RpcBlock,
  RpcTransaction as RpcTransaction_,
  RpcTransactionRequest as RpcTransactionRequest_,
  TransactionType,
} from '../types/rpc.js'
import type {
  AccessList,
  Transaction as Transaction_,
  TransactionBase,
  TransactionRequest as TransactionRequest_,
  TransactionRequestBase,
  TransactionSerializable,
  TransactionSerializableBase,
  TransactionSerialized,
} from '../types/transaction.js'
import type { ExactPartial, NeverBy, OneOf } from '../types/utils.js'

type CeloBlockExclude =
  | 'difficulty'
  | 'gasLimit'
  | 'mixHash'
  | 'nonce'
  | 'uncles'

export type CeloBlockOverrides = {
  randomness: {
    committed: Hex
    revealed: Hex
  }
}
export type CeloBlock<
  TIncludeTransactions extends boolean = boolean,
  TBlockTag extends BlockTag = BlockTag,
> = NeverBy<
  Block<
    bigint,
    TIncludeTransactions,
    TBlockTag,
    CeloTransaction<TBlockTag extends 'pending' ? true : false>
  >,
  CeloBlockExclude
> &
  CeloBlockOverrides

export type CeloRpcBlockOverrides = {
  randomness: {
    committed: Hex
    revealed: Hex
  }
}
export type CeloRpcBlock<
  TBlockTag extends BlockTag = BlockTag,
  TIncludeTransactions extends boolean = boolean,
> = NeverBy<
  RpcBlock<
    TBlockTag,
    TIncludeTransactions,
    RpcTransaction<TBlockTag extends 'pending' ? true : false>
  >,
  CeloBlockExclude
> &
  CeloRpcBlockOverrides

export type CeloRpcTransaction<TPending extends boolean = boolean> =
  | RpcTransaction<TPending>
  | RpcTransactionCIP42<TPending>
  | RpcTransactionCIP64<TPending>

export type CeloRpcTransactionRequest =
  | RpcTransactionRequest
  | RpcTransactionRequestCIP64

export type CeloTransaction<TPending extends boolean = boolean> =
  | Transaction<TPending>
  | TransactionCIP42<TPending>
  | TransactionCIP64<TPending>

export type CeloTransactionRequest =
  | TransactionRequest
  | TransactionRequestCIP64

export type CeloTransactionSerializable = OneOf<
  TransactionSerializable | TransactionSerializableCIP64
>

export type CeloTransactionSerialized<
  TType extends CeloTransactionType = CeloTransactionType,
> =
  | TransactionSerialized<TType>
  | TransactionSerializedCIP42
  | TransactionSerializedCIP64

export type CeloTransactionType = TransactionType | 'cip42' | 'cip64'

type RpcTransaction<TPending extends boolean = boolean> =
  RpcTransaction_<TPending> & {
    feeCurrency: Address | null
    gatewayFee: Hex | null
    gatewayFeeRecipient: Address | null
  }

type RpcTransactionRequest = RpcTransactionRequest_ & {
  feeCurrency?: Address | undefined
}

export type RpcTransactionCIP42<TPending extends boolean = boolean> = Omit<
  TransactionBase<Quantity, Index, TPending>,
  'typeHex'
> &
  FeeValuesEIP1559<Quantity> & {
    feeCurrency: Address | null
    gatewayFee: Hex | null
    gatewayFeeRecipient: Address | null
    type: '0x7c'
  }

export type RpcTransactionCIP64<TPending extends boolean = boolean> = Omit<
  TransactionBase<Quantity, Index, TPending>,
  'typeHex'
> &
  FeeValuesEIP1559<Quantity> & {
    feeCurrency: Address | null
    gatewayFee?: undefined
    gatewayFeeRecipient?: undefined
    type: '0x7b'
  }

export type RpcTransactionRequestCIP64 = TransactionRequestBase<
  Quantity,
  Index
> &
  ExactPartial<FeeValuesEIP1559<Quantity>> & {
    accessList?: AccessList | undefined
    feeCurrency?: Address | undefined
    type?: '0x7b' | undefined
  }

type Transaction<TPending extends boolean = boolean> = Transaction_<
  bigint,
  number,
  TPending
> & {
  feeCurrency: Address | null
  gatewayFee?: undefined
  gatewayFeeRecipient?: undefined
}

export type TransactionCIP42<TPending extends boolean = boolean> =
  TransactionBase<bigint, number, TPending> &
    FeeValuesEIP1559 & {
      feeCurrency: Address | null
      gatewayFee: bigint | null
      gatewayFeeRecipient: Address | null
      type: 'cip42'
    }

export type TransactionCIP64<TPending extends boolean = boolean> =
  TransactionBase<bigint, number, TPending> &
    FeeValuesEIP1559 & {
      feeCurrency: Address | null
      gatewayFee?: undefined
      gatewayFeeRecipient?: undefined
      type: 'cip64'
    }

type TransactionRequest = TransactionRequest_ & {
  feeCurrency?: Address | undefined
}

export type TransactionRequestCIP64 = TransactionRequestBase &
  ExactPartial<FeeValuesEIP1559> & {
    accessList?: AccessList | undefined
    feeCurrency?: Address | undefined
    type?: 'cip64' | undefined
  }

export type TransactionSerializableCIP42<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> &
  ExactPartial<FeeValuesEIP1559<TQuantity>> & {
    accessList?: AccessList | undefined
    feeCurrency?: Address | undefined
    gatewayFeeRecipient?: Address | undefined
    gatewayFee?: TQuantity | undefined
    chainId: number
    type?: 'cip42' | undefined
  }

export type TransactionSerializableCIP64<
  TQuantity = bigint,
  TIndex = number,
> = TransactionSerializableBase<TQuantity, TIndex> &
  ExactPartial<FeeValuesEIP1559<TQuantity>> & {
    accessList?: AccessList | undefined
    feeCurrency?: Address | undefined
    chainId: number
    type?: 'cip64' | undefined
  }

export type TransactionSerializedCIP42 = `0x7c${string}`
export type TransactionSerializedCIP64 = `0x7b${string}`
