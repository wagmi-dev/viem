import type { Abi, Address, TypedData } from 'abitype'

import type { Client } from '../clients/createClient.js'
import type { Transport } from '../clients/transports/createTransport.js'
import type { HDKey } from '../types/account.js'
import type { EntryPointVersion } from '../types/entryPointVersion.js'
import type { Hash, Hex, SignableMessage } from '../types/misc.js'
import type {
  TransactionSerializable,
  TransactionSerialized,
} from '../types/transaction.js'
import type { TypedDataDefinition } from '../types/typedData.js'
import type {
  PackedUserOperation,
  UserOperation,
} from '../types/userOperation.js'
import type {
  Assign,
  IsNarrowable,
  OneOf,
  UnionPartialBy,
} from '../types/utils.js'
import type { NonceManager } from '../utils/nonceManager.js'
import type { GetTransactionType } from '../utils/transaction/getTransactionType.js'
import type { SerializeTransactionFn } from '../utils/transaction/serializeTransaction.js'

export type Account<address extends Address = Address> = OneOf<
  JsonRpcAccount<address> | LocalAccount<string, address> | SmartAccount
>

///////////////////////////////////////////////////////////////////////////////////////////////////
// Sources
///////////////////////////////////////////////////////////////////////////////////////////////////

export type AccountSource = Address | CustomSource
export type CustomSource = {
  address: Address
  nonceManager?: NonceManager | undefined
  signMessage: ({ message }: { message: SignableMessage }) => Promise<Hash>
  signTransaction: <
    serializer extends
      SerializeTransactionFn<TransactionSerializable> = SerializeTransactionFn<TransactionSerializable>,
    transaction extends Parameters<serializer>[0] = Parameters<serializer>[0],
  >(
    transaction: transaction,
    args?:
      | {
          serializer?: serializer | undefined
        }
      | undefined,
  ) => Promise<
    IsNarrowable<
      TransactionSerialized<GetTransactionType<transaction>>,
      Hash
    > extends true
      ? TransactionSerialized<GetTransactionType<transaction>>
      : Hash
  >
  signTypedData: <
    const typedData extends TypedData | Record<string, unknown>,
    primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  >(
    typedDataDefinition: TypedDataDefinition<typedData, primaryType>,
  ) => Promise<Hash>
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Accounts
///////////////////////////////////////////////////////////////////////////////////////////////////

export type JsonRpcAccount<address extends Address = Address> = {
  address: address
  type: 'json-rpc'
}

export type LocalAccount<
  source extends string = string,
  address extends Address = Address,
> = CustomSource & {
  address: address
  publicKey: Hex
  source: source
  type: 'local'
}

export type HDAccount = LocalAccount<'hd'> & {
  getHdKey(): HDKey
}

export type HDOptions =
  | {
      /** The account index to use in the path (`"m/44'/60'/${accountIndex}'/0/0"`). */
      accountIndex?: number | undefined
      /** The address index to use in the path (`"m/44'/60'/0'/0/${addressIndex}"`). */
      addressIndex?: number | undefined
      /** The change index to use in the path (`"m/44'/60'/0'/${changeIndex}/0"`). */
      changeIndex?: number | undefined
      path?: undefined
    }
  | {
      accountIndex?: undefined
      addressIndex?: undefined
      changeIndex?: undefined
      /** The HD path. */
      path: `m/44'/60'/${string}`
    }

export type PrivateKeyAccount = LocalAccount<'privateKey'>

///////////////////////////////////////////////////////////////////////////////////////////////////
// Smart Account
///////////////////////////////////////////////////////////////////////////////////////////////////

type Call = {
  to: Hex
  data?: Hex | undefined
  value?: bigint | undefined
}

type SignMessageParameters = { message: SignableMessage }

type SignUserOperationParameters<
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
> = {
  chainId?: number | undefined
  userOperation: UnionPartialBy<UserOperation<entryPointVersion>, 'sender'>
}

export type SmartAccountImplementationFn<
  implementation extends
    SmartAccountImplementation = SmartAccountImplementation,
> = (parameters: {
  address?: Address | undefined
  client: Client<Transport>
}) => implementation

export type SmartAccountImplementation<
  abi extends Abi | readonly unknown[] = Abi,
  factoryAbi extends Abi | readonly unknown[] = Abi,
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
> = {
  /** ABI of the Smart Account implementation. */
  abi: abi
  /** Compatible EntryPoint of the Smart Account. */
  entryPoint: {
    /** Compatible EntryPoint address. */
    address: Address
    /** Compatible EntryPoint version. */
    version: entryPointVersion
  }
  /** Factory of the Smart Account. */
  factory: {
    /** Address of the Smart Account's Factory. */
    address: Address
    /** ABI of the Smart Account's Factory. */
    abi: factoryAbi
  }
  /**
   * Retrieves the Smart Account's address.
   *
   * @example
   * ```ts
   * const address = await account.getAddress()
   * // '0x...'
   * ```
   */
  getAddress: () => Promise<Address>
  /**
   * Retrieves the calldata for executing a User Operation.
   *
   * @example
   * ```ts
   * const callData = await account.getCallData([
   *   { to: '0x...', data: '0x...' },
   *   { to: '0x...', data: '0x...', value: 100n },
   * ])
   * // '0x...'
   * ```
   */
  getCallData: (calls: readonly Call[]) => Promise<Hex>
  /**
   * Retrieves the calldata for factory call to deploy a Smart Account.
   * If the Smart Account has already been deployed, this will return undefined values.
   *
   * @example Counterfactual account
   * ```ts
   * const { factory, factoryData } = await account.getFactoryArgs()
   * // { factory: '0x...', factoryData: '0x...' }
   * ```
   *
   * @example Deployed account
   * ```ts
   * const { factory, factoryData } = await account.getFactoryArgs()
   * // { factory: undefined, factoryData: undefined }
   * ```
   */
  getFactoryArgs: () => {
    factory?: Address | undefined
    factoryData?: Hex | undefined
  }
  /**
   * Retrieves the nonce of the Account.
   *
   * @example
   * ```ts
   * const nonce = await account.getNonce()
   * // 1n
   * ```
   */
  getNonce: () => Promise<bigint>
  /**
   * Formats the User Operation signature.
   *
   * @example Dummy signature
   * ```ts
   * const signature = await account.formatSignature()
   * // '0x...'
   * ```
   *
   * @example User Operation signature
   * ```ts
   * const signature = await account.formatSignature(userOperation)
   * // '0x...'
   * ```
   */
  formatSignature: (
    packedUserOperation?: Partial<PackedUserOperation> | undefined,
  ) => Promise<Hex>
  /**
   * Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.
   *
   * @example
   * ```ts
   * const signature = await account.signMessage({
   *   message: 'Hello, World!'
   * })
   * // '0x...'
   * ```
   */
  signMessage: (parameters: SignMessageParameters) => Promise<Hex>
  /**
   * Signs typed data and calculates an Ethereum-specific signature in [https://eips.ethereum.org/EIPS/eip-712](https://eips.ethereum.org/EIPS/eip-712): `sign(keccak256("\x19\x01" ‖ domainSeparator ‖ hashStruct(message)))`
   *
   * @example
   * ```ts
   * const signature = await account.signTypedData({
   *   domain,
   *   types,
   *   primaryType: 'Mail',
   *   message,
   * })
   * ```
   */
  signTypedData: <
    const typedData extends TypedData | Record<string, unknown>,
    primaryType extends keyof typedData | 'EIP712Domain' = keyof typedData,
  >(
    parameters: TypedDataDefinition<typedData, primaryType>,
  ) => Promise<Hex>
  /**
   * Signs the User Operation.
   *
   * @example
   * ```ts
   * const signature = await account.signUserOperation({
   *   chainId: 1,
   *   userOperation,
   * })
   * ```
   */
  signUserOperation: (
    parameters: SignUserOperationParameters<entryPointVersion>,
  ) => Promise<Hex>
}

export type SmartAccount<
  implementation extends
    SmartAccountImplementation = SmartAccountImplementation,
> = Assign<
  implementation,
  {
    /** Address of the Smart Account. */
    address: Address
    getFactoryArgs: () => Promise<{
      factory?: Address | undefined
      factoryData?: Hex | undefined
    }>
    /** Whether or not the Smart Account has been deployed. */
    isDeployed: () => Promise<boolean>
    /** Type of account. */
    type: 'smart'
  }
>
