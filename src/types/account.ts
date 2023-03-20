import type { Address, TypedData } from 'abitype'
import type { Hash } from './misc'
import type { TransactionRequest } from './transaction'
import type { TypedDataDefinition } from './typedData'

export type Account = JsonRpcAccount | LocalAccount

export type GetAccountParameter<
  TAccount extends Account | undefined = undefined,
> = TAccount extends undefined
  ? { account: Account | Address }
  : { account?: Account | Address }

export type JsonRpcAccount = {
  address: Address
  type: 'json-rpc'
}

export type LocalAccount = {
  address: Address
  signMessage: (message: string) => Promise<Hash>
  signTransaction: (
    transaction: Omit<TransactionRequest, 'from'> & {
      chainId: number
      from: Address
    },
  ) => Promise<Hash>
  signTypedData: <
    TTypedData extends TypedData | { [key: string]: unknown },
    TPrimaryType extends string = string,
  >(
    typedData: TypedDataDefinition<TTypedData, TPrimaryType>,
  ) => Promise<Hash>
  type: 'local'
}

export type ParseAccount<TAccount extends Account | Address | undefined> =
  | (TAccount extends Account ? TAccount : never)
  | (TAccount extends Address ? JsonRpcAccount : never)
  | (TAccount extends undefined ? undefined : never)
