import type { Address } from 'abitype'
import type { EntryPointVersion } from './entryPointVersion.js'
import type { Log } from './log.js'
import type { Hash, Hex } from './misc.js'
import type { TransactionReceipt } from './transaction.js'
import type { Assign, OneOf, UnionPartialBy } from './utils.js'

type Call = {
  to: Hex
  data?: Hex | undefined
  value?: bigint | undefined
}

/** @link https://eips.ethereum.org/EIPS/eip-4337#-eth_estimateuseroperationgas */
export type EstimateUserOperationGasReturnType<
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
  uint256 = bigint,
> = OneOf<
  | (entryPointVersion extends '0.7'
      ? {
          preVerificationGas: uint256
          verificationGasLimit: uint256
          callGasLimit: uint256
          paymasterVerificationGasLimit?: uint256 | undefined
          paymasterPostOpGasLimit?: uint256 | undefined
        }
      : never)
  | (entryPointVersion extends '0.6'
      ? {
          preVerificationGas: uint256
          verificationGasLimit: uint256
          callGasLimit: uint256
        }
      : never)
>

/** @link https://eips.ethereum.org/EIPS/eip-4337#-eth_getuseroperationbyhash */
export type GetUserOperationByHashReturnType<
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
  uint256 = bigint,
  pending extends boolean = boolean,
> = {
  blockHash: pending extends true ? null : Hash
  blockNumber: pending extends true ? null : uint256
  entryPoint: Address
  transactionHash: pending extends true ? null : Hash
  userOperation: UserOperation<entryPointVersion, uint256>
}

/** @link https://eips.ethereum.org/EIPS/eip-4337#entrypoint-definition */
export type PackedUserOperation<
  _entryPointVersion extends EntryPointVersion = EntryPointVersion,
  uint256 = bigint,
> = {
  /** Concatenation of {@link UserOperation`verificationGasLimit`} (16 bytes) and {@link UserOperation`callGasLimit`} (16 bytes) */
  accountGasLimits: Hex
  /** The data to pass to the `sender` during the main execution call. */
  callData: Hex
  /** Concatenation of {@link UserOperation`factory`} and {@link UserOperation`factoryData`}. */
  initCode?: Hex | undefined
  /** Concatenation of {@link UserOperation`maxPriorityFee`} (16 bytes) and {@link UserOperation`maxFeePerGas`} (16 bytes) */
  gasFees: Hex
  /** Anti-replay parameter. */
  nonce: uint256
  /** Concatenation of paymaster fields (or empty). */
  paymasterAndData?: Hex | undefined
  /** Extra gas to pay the bunder. */
  preVerificationGas: uint256
  /** The account making the operation. */
  sender: Address
  /** Data passed into the account to verify authorization. */
  signature: Hex
}

/** @link https://eips.ethereum.org/EIPS/eip-4337#useroperation */
export type UserOperation<
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
  uint256 = bigint,
> = OneOf<
  | (entryPointVersion extends '0.7'
      ? {
          /** The data to pass to the `sender` during the main execution call. */
          callData: Hex
          /** The amount of gas to allocate the main execution call */
          callGasLimit: uint256
          /** Account factory. Only for new accounts. */
          factory?: Address | undefined
          /** Data for account factory. */
          factoryData?: Hex | undefined
          /** Maximum fee per gas. */
          maxFeePerGas: uint256
          /** Maximum priority fee per gas. */
          maxPriorityFeePerGas: uint256
          /** Anti-replay parameter. */
          nonce: uint256
          /** Address of paymaster contract. */
          paymaster?: Address | undefined
          /** Data for paymaster. */
          paymasterData?: Hex | undefined
          /** The amount of gas to allocate for the paymaster post-operation code. */
          paymasterPostOpGasLimit?: uint256 | undefined
          /** The amount of gas to allocate for the paymaster validation code. */
          paymasterVerificationGasLimit?: uint256 | undefined
          /** Extra gas to pay the bunder. */
          preVerificationGas: uint256
          /** The account making the operation. */
          sender: Address
          /** Data passed into the account to verify authorization. */
          signature: Hex
          /** The amount of gas to allocate for the verification step. */
          verificationGasLimit: uint256
        }
      : never)
  | (entryPointVersion extends '0.6'
      ? {
          /** The data to pass to the `sender` during the main execution call. */
          callData: Hex
          /** The amount of gas to allocate the main execution call */
          callGasLimit: uint256
          /** Account init code. Only for new accounts. */
          initCode?: Hex | undefined
          /** Maximum fee per gas. */
          maxFeePerGas: uint256
          /** Maximum priority fee per gas. */
          maxPriorityFeePerGas: uint256
          /** Anti-replay parameter. */
          nonce: uint256
          /** Paymaster address with calldata. */
          paymasterAndData?: Hex | undefined
          /** Extra gas to pay the bunder. */
          preVerificationGas: uint256
          /** The account making the operation. */
          sender: Address
          /** Data passed into the account to verify authorization. */
          signature: Hex
          /** The amount of gas to allocate for the verification step. */
          verificationGasLimit: uint256
        }
      : never)
>

export type UserOperationRequest<
  entryPointVersion extends EntryPointVersion = EntryPointVersion,
  uint256 = bigint,
> = Assign<
  OneOf<
    | (entryPointVersion extends '0.7'
        ? UnionPartialBy<
            UserOperation<'0.7', uint256>,
            // We are able to calculate these via `prepareUserOperation`.
            | keyof EstimateUserOperationGasReturnType<'0.7'>
            | 'callData'
            | 'maxFeePerGas'
            | 'maxPriorityFeePerGas'
            | 'nonce'
            | 'sender'
            | 'signature'
          >
        : never)
    | (entryPointVersion extends '0.6'
        ? UnionPartialBy<
            UserOperation<'0.6', uint256>,
            // We are able to calculate these via `prepareUserOperation`.
            | keyof EstimateUserOperationGasReturnType<'0.6'>
            | 'callData'
            | 'maxFeePerGas'
            | 'maxPriorityFeePerGas'
            | 'nonce'
            | 'sender'
            | 'signature'
          >
        : never)
  >,
  OneOf<{ calls: readonly Call[] } | { callData: Hex }>
>

/** @link https://eips.ethereum.org/EIPS/eip-4337#-eth_getuseroperationreceipt */
export type UserOperationReceipt<
  _entryPointVersion extends EntryPointVersion = EntryPointVersion,
  uint256 = bigint,
  int32 = number,
  status = 'success' | 'reverted',
> = {
  /** Actual gas cost. */
  actualGasCost: uint256
  /** Actual gas used. */
  actualGasUsed: uint256
  /** Entrypoint address. */
  entryPoint: Address
  /** Logs emitted during execution. */
  logs: Log<uint256, int32, false>[]
  /** Anti-replay parameter. */
  nonce: uint256
  /** Paymaster for the user operation. */
  paymaster?: Address | undefined
  /** Revert reason, if unsuccessful. */
  reason?: string | undefined
  /** Transaction receipt of the user operation execution. */
  receipt: TransactionReceipt<uint256, int32, status>
  sender: Address
  /** If the user operation execution was successful. */
  success: boolean
  /** Hash of the user operation. */
  userOpHash: Hash
}
