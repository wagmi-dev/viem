import { expect, test } from 'vitest'

import { anvilMainnet } from '../../../test/src/anvil.js'
import { accounts } from '../../../test/src/constants.js'
import { deploySoladyAccount_07 } from '../../../test/src/utils.js'
import { mine, writeContract } from '../../actions/index.js'
import { pad } from '../../utils/index.js'
import { toSoladySmartAccount } from './implementations/toSoladySmartAccount.js'

const client = anvilMainnet.getClient({ account: true })

test('default', async () => {
  const { factoryAddress } = await deploySoladyAccount_07()

  const account = await toSoladySmartAccount({
    client,
    factoryAddress,
    owner: accounts[1].address,
  })

  expect({
    ...account,
    client: null,
    _internal: null,
    abi: null,
    factory: null,
  }).toMatchInlineSnapshot(`
    {
      "_internal": null,
      "abi": null,
      "address": "0xE911628bF8428C23f179a07b081325cAe376DE1f",
      "client": null,
      "encodeCalls": [Function],
      "entryPoint": {
        "abi": [
          {
            "inputs": [
              {
                "internalType": "bool",
                "name": "success",
                "type": "bool",
              },
              {
                "internalType": "bytes",
                "name": "ret",
                "type": "bytes",
              },
            ],
            "name": "DelegateAndRevert",
            "type": "error",
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "opIndex",
                "type": "uint256",
              },
              {
                "internalType": "string",
                "name": "reason",
                "type": "string",
              },
            ],
            "name": "FailedOp",
            "type": "error",
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "opIndex",
                "type": "uint256",
              },
              {
                "internalType": "string",
                "name": "reason",
                "type": "string",
              },
              {
                "internalType": "bytes",
                "name": "inner",
                "type": "bytes",
              },
            ],
            "name": "FailedOpWithRevert",
            "type": "error",
          },
          {
            "inputs": [
              {
                "internalType": "bytes",
                "name": "returnData",
                "type": "bytes",
              },
            ],
            "name": "PostOpReverted",
            "type": "error",
          },
          {
            "inputs": [],
            "name": "ReentrancyGuardReentrantCall",
            "type": "error",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
            ],
            "name": "SenderAddressResult",
            "type": "error",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "aggregator",
                "type": "address",
              },
            ],
            "name": "SignatureValidationFailed",
            "type": "error",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userOpHash",
                "type": "bytes32",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "factory",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "paymaster",
                "type": "address",
              },
            ],
            "name": "AccountDeployed",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [],
            "name": "BeforeExecution",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalDeposit",
                "type": "uint256",
              },
            ],
            "name": "Deposited",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userOpHash",
                "type": "bytes32",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "revertReason",
                "type": "bytes",
              },
            ],
            "name": "PostOpRevertReason",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "aggregator",
                "type": "address",
              },
            ],
            "name": "SignatureAggregatorChanged",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalStaked",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "unstakeDelaySec",
                "type": "uint256",
              },
            ],
            "name": "StakeLocked",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "withdrawTime",
                "type": "uint256",
              },
            ],
            "name": "StakeUnlocked",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "withdrawAddress",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
            ],
            "name": "StakeWithdrawn",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userOpHash",
                "type": "bytes32",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "paymaster",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bool",
                "name": "success",
                "type": "bool",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "actualGasCost",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "actualGasUsed",
                "type": "uint256",
              },
            ],
            "name": "UserOperationEvent",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userOpHash",
                "type": "bytes32",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256",
              },
            ],
            "name": "UserOperationPrefundTooLow",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "bytes32",
                "name": "userOpHash",
                "type": "bytes32",
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256",
              },
              {
                "indexed": false,
                "internalType": "bytes",
                "name": "revertReason",
                "type": "bytes",
              },
            ],
            "name": "UserOperationRevertReason",
            "type": "event",
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "address",
                "name": "withdrawAddress",
                "type": "address",
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
            ],
            "name": "Withdrawn",
            "type": "event",
          },
          {
            "inputs": [
              {
                "internalType": "uint32",
                "name": "unstakeDelaySec",
                "type": "uint32",
              },
            ],
            "name": "addStake",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "target",
                "type": "address",
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes",
              },
            ],
            "name": "delegateAndRevert",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
            ],
            "name": "depositTo",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address",
              },
            ],
            "name": "deposits",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "deposit",
                "type": "uint256",
              },
              {
                "internalType": "bool",
                "name": "staked",
                "type": "bool",
              },
              {
                "internalType": "uint112",
                "name": "stake",
                "type": "uint112",
              },
              {
                "internalType": "uint32",
                "name": "unstakeDelaySec",
                "type": "uint32",
              },
              {
                "internalType": "uint48",
                "name": "withdrawTime",
                "type": "uint48",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address",
              },
            ],
            "name": "getDepositInfo",
            "outputs": [
              {
                "components": [
                  {
                    "internalType": "uint256",
                    "name": "deposit",
                    "type": "uint256",
                  },
                  {
                    "internalType": "bool",
                    "name": "staked",
                    "type": "bool",
                  },
                  {
                    "internalType": "uint112",
                    "name": "stake",
                    "type": "uint112",
                  },
                  {
                    "internalType": "uint32",
                    "name": "unstakeDelaySec",
                    "type": "uint32",
                  },
                  {
                    "internalType": "uint48",
                    "name": "withdrawTime",
                    "type": "uint48",
                  },
                ],
                "internalType": "struct IStakeManager.DepositInfo",
                "name": "info",
                "type": "tuple",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address",
              },
              {
                "internalType": "uint192",
                "name": "key",
                "type": "uint192",
              },
            ],
            "name": "getNonce",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "bytes",
                "name": "initCode",
                "type": "bytes",
              },
            ],
            "name": "getSenderAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address",
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256",
                  },
                  {
                    "internalType": "bytes",
                    "name": "initCode",
                    "type": "bytes",
                  },
                  {
                    "internalType": "bytes",
                    "name": "callData",
                    "type": "bytes",
                  },
                  {
                    "internalType": "bytes32",
                    "name": "accountGasLimits",
                    "type": "bytes32",
                  },
                  {
                    "internalType": "uint256",
                    "name": "preVerificationGas",
                    "type": "uint256",
                  },
                  {
                    "internalType": "bytes32",
                    "name": "gasFees",
                    "type": "bytes32",
                  },
                  {
                    "internalType": "bytes",
                    "name": "paymasterAndData",
                    "type": "bytes",
                  },
                  {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes",
                  },
                ],
                "internalType": "struct PackedUserOperation",
                "name": "userOp",
                "type": "tuple",
              },
            ],
            "name": "getUserOpHash",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address",
                      },
                      {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256",
                      },
                      {
                        "internalType": "bytes",
                        "name": "initCode",
                        "type": "bytes",
                      },
                      {
                        "internalType": "bytes",
                        "name": "callData",
                        "type": "bytes",
                      },
                      {
                        "internalType": "bytes32",
                        "name": "accountGasLimits",
                        "type": "bytes32",
                      },
                      {
                        "internalType": "uint256",
                        "name": "preVerificationGas",
                        "type": "uint256",
                      },
                      {
                        "internalType": "bytes32",
                        "name": "gasFees",
                        "type": "bytes32",
                      },
                      {
                        "internalType": "bytes",
                        "name": "paymasterAndData",
                        "type": "bytes",
                      },
                      {
                        "internalType": "bytes",
                        "name": "signature",
                        "type": "bytes",
                      },
                    ],
                    "internalType": "struct PackedUserOperation[]",
                    "name": "userOps",
                    "type": "tuple[]",
                  },
                  {
                    "internalType": "contract IAggregator",
                    "name": "aggregator",
                    "type": "address",
                  },
                  {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes",
                  },
                ],
                "internalType": "struct IEntryPoint.UserOpsPerAggregator[]",
                "name": "opsPerAggregator",
                "type": "tuple[]",
              },
              {
                "internalType": "address payable",
                "name": "beneficiary",
                "type": "address",
              },
            ],
            "name": "handleAggregatedOps",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "sender",
                    "type": "address",
                  },
                  {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256",
                  },
                  {
                    "internalType": "bytes",
                    "name": "initCode",
                    "type": "bytes",
                  },
                  {
                    "internalType": "bytes",
                    "name": "callData",
                    "type": "bytes",
                  },
                  {
                    "internalType": "bytes32",
                    "name": "accountGasLimits",
                    "type": "bytes32",
                  },
                  {
                    "internalType": "uint256",
                    "name": "preVerificationGas",
                    "type": "uint256",
                  },
                  {
                    "internalType": "bytes32",
                    "name": "gasFees",
                    "type": "bytes32",
                  },
                  {
                    "internalType": "bytes",
                    "name": "paymasterAndData",
                    "type": "bytes",
                  },
                  {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes",
                  },
                ],
                "internalType": "struct PackedUserOperation[]",
                "name": "ops",
                "type": "tuple[]",
              },
              {
                "internalType": "address payable",
                "name": "beneficiary",
                "type": "address",
              },
            ],
            "name": "handleOps",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "uint192",
                "name": "key",
                "type": "uint192",
              },
            ],
            "name": "incrementNonce",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "bytes",
                "name": "callData",
                "type": "bytes",
              },
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address",
                      },
                      {
                        "internalType": "uint256",
                        "name": "nonce",
                        "type": "uint256",
                      },
                      {
                        "internalType": "uint256",
                        "name": "verificationGasLimit",
                        "type": "uint256",
                      },
                      {
                        "internalType": "uint256",
                        "name": "callGasLimit",
                        "type": "uint256",
                      },
                      {
                        "internalType": "uint256",
                        "name": "paymasterVerificationGasLimit",
                        "type": "uint256",
                      },
                      {
                        "internalType": "uint256",
                        "name": "paymasterPostOpGasLimit",
                        "type": "uint256",
                      },
                      {
                        "internalType": "uint256",
                        "name": "preVerificationGas",
                        "type": "uint256",
                      },
                      {
                        "internalType": "address",
                        "name": "paymaster",
                        "type": "address",
                      },
                      {
                        "internalType": "uint256",
                        "name": "maxFeePerGas",
                        "type": "uint256",
                      },
                      {
                        "internalType": "uint256",
                        "name": "maxPriorityFeePerGas",
                        "type": "uint256",
                      },
                    ],
                    "internalType": "struct EntryPoint.MemoryUserOp",
                    "name": "mUserOp",
                    "type": "tuple",
                  },
                  {
                    "internalType": "bytes32",
                    "name": "userOpHash",
                    "type": "bytes32",
                  },
                  {
                    "internalType": "uint256",
                    "name": "prefund",
                    "type": "uint256",
                  },
                  {
                    "internalType": "uint256",
                    "name": "contextOffset",
                    "type": "uint256",
                  },
                  {
                    "internalType": "uint256",
                    "name": "preOpGas",
                    "type": "uint256",
                  },
                ],
                "internalType": "struct EntryPoint.UserOpInfo",
                "name": "opInfo",
                "type": "tuple",
              },
              {
                "internalType": "bytes",
                "name": "context",
                "type": "bytes",
              },
            ],
            "name": "innerHandleOp",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "actualGasCost",
                "type": "uint256",
              },
            ],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address",
              },
              {
                "internalType": "uint192",
                "name": "",
                "type": "uint192",
              },
            ],
            "name": "nonceSequenceNumber",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4",
              },
            ],
            "name": "supportsInterface",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool",
              },
            ],
            "stateMutability": "view",
            "type": "function",
          },
          {
            "inputs": [],
            "name": "unlockStake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address payable",
                "name": "withdrawAddress",
                "type": "address",
              },
            ],
            "name": "withdrawStake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "inputs": [
              {
                "internalType": "address payable",
                "name": "withdrawAddress",
                "type": "address",
              },
              {
                "internalType": "uint256",
                "name": "withdrawAmount",
                "type": "uint256",
              },
            ],
            "name": "withdrawTo",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
          },
          {
            "stateMutability": "payable",
            "type": "receive",
          },
        ],
        "address": "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
        "version": "0.7",
      },
      "factory": null,
      "getAddress": [Function],
      "getFactoryArgs": [Function],
      "getNonce": [Function],
      "getStubSignature": [Function],
      "isDeployed": [Function],
      "signMessage": [Function],
      "signTypedData": [Function],
      "signUserOperation": [Function],
      "type": "smart",
    }
  `)
})

test('return value: `isDeployed`', async () => {
  const { factoryAddress } = await deploySoladyAccount_07()

  const account = await toSoladySmartAccount({
    client,
    factoryAddress,
    owner: accounts[1].address,
  })
  expect(await account.isDeployed()).toBe(false)

  await writeContract(client, {
    ...account.factory,
    functionName: 'createAccount',
    args: [account.address, pad('0x0')],
  })
  await mine(client, {
    blocks: 1,
  })

  expect(await account.isDeployed()).toBe(true)
  expect(await account.isDeployed()).toBe(true)
})

test('return value: `getFactoryArgs`', async () => {
  const { factoryAddress } = await deploySoladyAccount_07()

  const account = await toSoladySmartAccount({
    client,
    factoryAddress,
    owner: accounts[1].address,
  })

  expect(await account.getFactoryArgs()).toMatchInlineSnapshot(`
    {
      "factory": "0xd73bab8f06db28c87932571f87d0d2c0fdf13d94",
      "factoryData": "0xf14ddffc00000000000000000000000070997970c51812dc3a010c7d01b50e0d17dc79c80000000000000000000000000000000000000000000000000000000000000000",
    }
  `)

  await writeContract(client, {
    ...account.factory,
    functionName: 'createAccount',
    args: [account.address, pad('0x0')],
  })
  await mine(client, {
    blocks: 1,
  })

  expect(await account.getFactoryArgs()).toMatchInlineSnapshot(`
    {
      "factory": undefined,
      "factoryData": undefined,
    }
  `)
})