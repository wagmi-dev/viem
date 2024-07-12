import { type Abi, type Address, type TypedData, parseAbi } from 'abitype'

import { readContract } from '../../actions/public/readContract.js'
import { signMessage as signMessage_ } from '../../actions/wallet/signMessage.js'
import { entryPoint07Abi } from '../../constants/abis.js'
import { signMessage } from '../../experimental/solady/actions/signMessage.js'
import { signTypedData } from '../../experimental/solady/actions/signTypedData.js'
import type { Account } from '../../types/account.js'
import type { EntryPointVersion } from '../../types/entryPointVersion.js'
import type { Hex } from '../../types/misc.js'
import type { TypedDataDefinition } from '../../types/typedData.js'
import type { UserOperation } from '../../types/userOperation.js'
import { encodeFunctionData } from '../../utils/abi/encodeFunctionData.js'
import { pad } from '../../utils/data/pad.js'
import { getAction } from '../../utils/getAction.js'
import { getUserOperationHash } from '../../utils/userOperation/getUserOperationHash.js'
import { parseAccount } from '../utils/parseAccount.js'
import {
  type SmartAccountImplementation,
  type SmartAccountImplementationFn,
  defineImplementation,
} from './defineImplementation.js'

export type SoladyImplementation<
  entryPointAbi extends Abi = Abi,
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
> = SmartAccountImplementation<
  typeof abi,
  typeof factoryAbi,
  entryPointAbi,
  entryPointVersion
>

export type SoladyImplementationParameters<
  entryPointAbi extends Abi = Abi,
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
> = {
  entryPoint?:
    | {
        abi: entryPointAbi
        address: Address
        version: entryPointVersion | EntryPointVersion
      }
    | undefined
  factoryAddress: Address
  owner: Address | Account
  salt?: Hex | undefined
}

export type SoladyImplementationReturnType<
  entryPointAbi extends Abi = Abi,
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
> = SmartAccountImplementationFn<
  SoladyImplementation<entryPointAbi, entryPointVersion>
>

/**
 * @description Smart account implementation for [Solady's `ERC4337.sol`](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC4337.sol).
 *
 * @param parameters - {@link SoladyImplementationParameters}
 * @returns Solady implementation. {@link SoladyImplementationReturnType}
 *
 * @example
 * import { solady } from 'viem/accounts'
 *
 * const implementation = solady({
 *   factoryAddress: '0x...',
 *   owner: '0x...',
 * })
 */
export function solady<
  entryPointAbi extends Abi = typeof entryPoint07Abi,
  entryPointVersion extends EntryPointVersion = '0.7',
>(
  parameters: SoladyImplementationParameters<entryPointAbi, entryPointVersion>,
): SoladyImplementationReturnType<entryPointAbi, entryPointVersion> {
  return defineImplementation(({ address, client }) => {
    const {
      entryPoint = {
        abi: entryPoint07Abi,
        address: '0x0000000071727De22E5E9d8BAf0edAc6f37da032',
        version: '0.7',
      },
      factoryAddress,
      salt = '0x0',
    } = parameters

    const owner = parseAccount(parameters.owner)

    return {
      abi,
      entryPoint: {
        abi: entryPoint.abi as entryPointAbi,
        address: entryPoint.address,
        version: entryPoint.version as entryPointVersion,
      },
      factory: {
        abi: factoryAbi,
        address: factoryAddress,
      },

      async encodeCalls(calls) {
        if (calls.length === 1)
          return encodeFunctionData({
            abi,
            functionName: 'execute',
            args: [calls[0].to, calls[0].value ?? 0n, calls[0].data ?? '0x'],
          })
        return encodeFunctionData({
          abi,
          functionName: 'executeBatch',
          args: [
            calls.map((call) => ({
              data: call.data ?? '0x',
              target: call.to,
              value: call.value ?? 0n,
            })),
          ],
        })
      },

      async getAddress() {
        if (address) return address
        return await readContract(client, {
          ...this.factory,
          account: owner,
          functionName: 'getAddress',
          args: [pad(salt)],
        })
      },

      async getFactoryArgs() {
        const factoryData = encodeFunctionData({
          abi: this.factory.abi,
          functionName: 'createAccount',
          args: [owner.address, pad(salt)],
        })
        return { factory: this.factory.address, factoryData }
      },

      async getNonce() {
        const address = await this.getAddress()
        const nonce = await readContract(client, {
          abi: parseAbi([
            'function getNonce(address, uint192) pure returns (uint256)',
          ]),
          address: this.entryPoint.address,
          functionName: 'getNonce',
          args: [address, 0n],
        })
        return nonce
      },

      async getSignature(userOperation) {
        if (!userOperation?.signature)
          return '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c'
        return userOperation.signature
      },

      async signMessage(parameters) {
        const { message } = parameters
        const [address, { factory, factoryData }] = await Promise.all([
          this.getAddress(),
          this.getFactoryArgs(),
        ])
        return signMessage(client, {
          account: owner,
          factory,
          factoryData,
          message,
          verifier: address,
        })
      },

      async signTypedData(parameters) {
        const { domain, types, primaryType, message } =
          parameters as TypedDataDefinition<TypedData, string>
        const [address, { factory, factoryData }] = await Promise.all([
          this.getAddress(),
          this.getFactoryArgs(),
        ])
        return signTypedData(client, {
          account: owner,
          domain,
          message,
          factory,
          factoryData,
          primaryType,
          types,
          verifier: address,
        })
      },

      async signUserOperation(parameters) {
        const { chainId = client.chain!.id, ...userOperation } = parameters

        const address = await this.getAddress()
        const userOpHash = getUserOperationHash({
          chainId,
          entryPointAddress: this.entryPoint.address,
          entryPointVersion: this.entryPoint.version,
          userOperation: {
            ...(userOperation as unknown as UserOperation<entryPointVersion>),
            sender: address,
          },
        })
        const signature = await getAction(
          client,
          signMessage_,
          'signMessage',
        )({
          account: owner,
          message: {
            raw: userOpHash,
          },
        })
        return await this.getSignature({
          signature,
        })
      },
    }
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////
// Constants

const abi = [
  {
    type: 'fallback',
    stateMutability: 'payable',
  },
  {
    type: 'receive',
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'addDeposit',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'cancelOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'completeOwnershipHandover',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'delegateExecute',
    inputs: [
      {
        name: 'delegate',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'eip712Domain',
    inputs: [],
    outputs: [
      {
        name: 'fields',
        type: 'bytes1',
        internalType: 'bytes1',
      },
      {
        name: 'name',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'version',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'chainId',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'verifyingContract',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'salt',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'extensions',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'entryPoint',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'execute',
    inputs: [
      {
        name: 'target',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'value',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'executeBatch',
    inputs: [
      {
        name: 'calls',
        type: 'tuple[]',
        internalType: 'struct ERC4337.Call[]',
        components: [
          {
            name: 'target',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'value',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'data',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
    ],
    outputs: [
      {
        name: 'results',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getDeposit',
    inputs: [],
    outputs: [
      {
        name: 'result',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initialize',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'isValidSignature',
    inputs: [
      {
        name: 'hash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'signature',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'bytes4',
        internalType: 'bytes4',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [
      {
        name: 'result',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'ownershipHandoverExpiresAt',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'proxiableUUID',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'requestOwnershipHandover',
    inputs: [],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'storageLoad',
    inputs: [
      {
        name: 'storageSlot',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: 'result',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'storageStore',
    inputs: [
      {
        name: 'storageSlot',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'storageValue',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [
      {
        name: 'newOwner',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'upgradeToAndCall',
    inputs: [
      {
        name: 'newImplementation',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'data',
        type: 'bytes',
        internalType: 'bytes',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'validateUserOp',
    inputs: [
      {
        name: 'userOp',
        type: 'tuple',
        internalType: 'struct ERC4337.PackedUserOperation',
        components: [
          {
            name: 'sender',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'nonce',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'initCode',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'callData',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'accountGasLimits',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'preVerificationGas',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'gasFees',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 'paymasterAndData',
            type: 'bytes',
            internalType: 'bytes',
          },
          {
            name: 'signature',
            type: 'bytes',
            internalType: 'bytes',
          },
        ],
      },
      {
        name: 'userOpHash',
        type: 'bytes32',
        internalType: 'bytes32',
      },
      {
        name: 'missingAccountFunds',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'validationData',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'withdrawDepositTo',
    inputs: [
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'amount',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'OwnershipHandoverCanceled',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipHandoverRequested',
    inputs: [
      {
        name: 'pendingOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'oldOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Upgraded',
    inputs: [
      {
        name: 'implementation',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'AlreadyInitialized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'FnSelectorNotRecognized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NewOwnerIsZeroAddress',
    inputs: [],
  },
  {
    type: 'error',
    name: 'NoHandoverRequest',
    inputs: [],
  },
  {
    type: 'error',
    name: 'Unauthorized',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UnauthorizedCallContext',
    inputs: [],
  },
  {
    type: 'error',
    name: 'UpgradeFailed',
    inputs: [],
  },
] as const

const factoryAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'erc4337',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createAccount',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'salt',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getAddress',
    inputs: [
      {
        name: 'salt',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'implementation',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'initCodeHash',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
] as const
