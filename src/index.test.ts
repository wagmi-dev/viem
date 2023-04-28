import { expect, test } from 'vitest'

import * as actions from './index.js'

test('exports actions', () => {
  expect(actions).toMatchInlineSnapshot(`
    {
      "AbiConstructorNotFoundError": [Function],
      "AbiConstructorParamsNotFoundError": [Function],
      "AbiDecodingDataSizeInvalidError": [Function],
      "AbiDecodingZeroDataError": [Function],
      "AbiEncodingArrayLengthMismatchError": [Function],
      "AbiEncodingLengthMismatchError": [Function],
      "AbiErrorInputsNotFoundError": [Function],
      "AbiErrorNotFoundError": [Function],
      "AbiErrorSignatureNotFoundError": [Function],
      "AbiEventNotFoundError": [Function],
      "AbiEventSignatureEmptyTopicsError": [Function],
      "AbiEventSignatureNotFoundError": [Function],
      "AbiFunctionNotFoundError": [Function],
      "AbiFunctionOutputsNotFoundError": [Function],
      "AbiFunctionSignatureNotFoundError": [Function],
      "BaseError": [Function],
      "BlockNotFoundError": [Function],
      "CallExecutionError": [Function],
      "ChainDisconnectedError": [Function],
      "ChainDoesNotSupportContract": [Function],
      "ClientChainNotConfiguredError": [Function],
      "ContractFunctionExecutionError": [Function],
      "ContractFunctionRevertedError": [Function],
      "ContractFunctionZeroDataError": [Function],
      "DataLengthTooLongError": [Function],
      "DataLengthTooShortError": [Function],
      "DecodeLogTopicsMismatch": [Function],
      "EnsAvatarUriResolutionError": [Function],
      "EstimateGasExecutionError": [Function],
      "ExecutionRevertedError": [Function],
      "FeeCapTooHighError": [Function],
      "FeeCapTooLowError": [Function],
      "FilterTypeNotSupportedError": [Function],
      "HttpRequestError": [Function],
      "InsufficientFundsError": [Function],
      "InternalRpcError": [Function],
      "IntrinsicGasTooHighError": [Function],
      "IntrinsicGasTooLowError": [Function],
      "InvalidAbiDecodingTypeError": [Function],
      "InvalidAbiEncodingTypeError": [Function],
      "InvalidAddressError": [Function],
      "InvalidArrayError": [Function],
      "InvalidBytesBooleanError": [Function],
      "InvalidChainIdError": [Function],
      "InvalidDefinitionTypeError": [Function],
      "InvalidHexBooleanError": [Function],
      "InvalidHexValueError": [Function],
      "InvalidInputRpcError": [Function],
      "InvalidLegacyVError": [Function],
      "InvalidParamsRpcError": [Function],
      "InvalidRequestRpcError": [Function],
      "JsonRpcVersionUnsupportedError": [Function],
      "LimitExceededRpcError": [Function],
      "MethodNotFoundRpcError": [Function],
      "MethodNotSupportedRpcError": [Function],
      "NonceMaxValueError": [Function],
      "NonceTooHighError": [Function],
      "NonceTooLowError": [Function],
      "OffsetOutOfBoundsError": [Function],
      "ParseRpcError": [Function],
      "ProviderDisconnectedError": [Function],
      "ProviderRpcError": [Function],
      "RawContractError": [Function],
      "ResourceNotFoundRpcError": [Function],
      "ResourceUnavailableRpcError": [Function],
      "RpcError": [Function],
      "RpcRequestError": [Function],
      "SizeExceedsPaddingSizeError": [Function],
      "SwitchChainError": [Function],
      "TimeoutError": [Function],
      "TipAboveFeeCapError": [Function],
      "TransactionExecutionError": [Function],
      "TransactionNotFoundError": [Function],
      "TransactionReceiptNotFoundError": [Function],
      "TransactionRejectedRpcError": [Function],
      "TransactionTypeNotSupportedError": [Function],
      "UnauthorizedProviderError": [Function],
      "UnknownNodeError": [Function],
      "UnknownRpcError": [Function],
      "UnsupportedProviderMethodError": [Function],
      "UrlRequiredError": [Function],
      "UserRejectedRequestError": [Function],
      "WaitForTransactionReceiptTimeoutError": [Function],
      "WebSocketRequestError": [Function],
      "assertRequest": [Function],
      "assertTransactionEIP1559": [Function],
      "assertTransactionEIP2930": [Function],
      "assertTransactionLegacy": [Function],
      "boolToBytes": [Function],
      "boolToHex": [Function],
      "bytesToBigint": [Function],
      "bytesToBool": [Function],
      "bytesToHex": [Function],
      "bytesToNumber": [Function],
      "bytesToString": [Function],
      "ccipFetch": [Function],
      "concat": [Function],
      "concatBytes": [Function],
      "concatHex": [Function],
      "createClient": [Function],
      "createPublicClient": [Function],
      "createTestClient": [Function],
      "createTransport": [Function],
      "createWalletClient": [Function],
      "custom": [Function],
      "decodeAbiParameters": [Function],
      "decodeErrorResult": [Function],
      "decodeEventLog": [Function],
      "decodeFunctionData": [Function],
      "decodeFunctionResult": [Function],
      "defineBlock": [Function],
      "defineChain": [Function],
      "defineTransaction": [Function],
      "defineTransactionReceipt": [Function],
      "defineTransactionRequest": [Function],
      "encodeAbiParameters": [Function],
      "encodeDeployData": [Function],
      "encodeErrorResult": [Function],
      "encodeEventTopics": [Function],
      "encodeFunctionData": [Function],
      "encodeFunctionResult": [Function],
      "encodePacked": [Function],
      "etherUnits": {
        "gwei": 9,
        "wei": 18,
      },
      "fallback": [Function],
      "formatBlock": [Function],
      "formatEther": [Function],
      "formatGwei": [Function],
      "formatTransaction": [Function],
      "formatTransactionRequest": [Function],
      "formatUnits": [Function],
      "fromBytes": [Function],
      "fromHex": [Function],
      "fromRlp": [Function],
      "getAbiItem": [Function],
      "getAddress": [Function],
      "getContract": [Function],
      "getContractAddress": [Function],
      "getContractError": [Function],
      "getCreate2Address": [Function],
      "getCreateAddress": [Function],
      "getEventSelector": [Function],
      "getFunctionSelector": [Function],
      "getSerializedTransactionType": [Function],
      "getTransactionType": [Function],
      "gweiUnits": {
        "ether": -9,
        "wei": 9,
      },
      "hashMessage": [Function],
      "hashTypedData": [Function],
      "hexToBigInt": [Function],
      "hexToBool": [Function],
      "hexToBytes": [Function],
      "hexToNumber": [Function],
      "hexToString": [Function],
      "http": [Function],
      "isAddress": [Function],
      "isAddressEqual": [Function],
      "isBytes": [Function],
      "isHash": [Function],
      "isHex": [Function],
      "keccak256": [Function],
      "labelhash": [Function],
      "multicall3Abi": [
        {
          "inputs": [
            {
              "components": [
                {
                  "name": "target",
                  "type": "address",
                },
                {
                  "name": "allowFailure",
                  "type": "bool",
                },
                {
                  "name": "callData",
                  "type": "bytes",
                },
              ],
              "name": "calls",
              "type": "tuple[]",
            },
          ],
          "name": "aggregate3",
          "outputs": [
            {
              "components": [
                {
                  "name": "success",
                  "type": "bool",
                },
                {
                  "name": "returnData",
                  "type": "bytes",
                },
              ],
              "name": "returnData",
              "type": "tuple[]",
            },
          ],
          "stateMutability": "view",
          "type": "function",
        },
      ],
      "namehash": [Function],
      "numberToBytes": [Function],
      "numberToHex": [Function],
      "offchainLookup": [Function],
      "offchainLookupAbiItem": {
        "inputs": [
          {
            "name": "sender",
            "type": "address",
          },
          {
            "name": "urls",
            "type": "string[]",
          },
          {
            "name": "callData",
            "type": "bytes",
          },
          {
            "name": "callbackFunction",
            "type": "bytes4",
          },
          {
            "name": "extraData",
            "type": "bytes",
          },
        ],
        "name": "OffchainLookup",
        "type": "error",
      },
      "offchainLookupSignature": "0x556f1830",
      "pad": [Function],
      "padBytes": [Function],
      "padHex": [Function],
      "parseAbi": [Function],
      "parseAbiItem": [Function],
      "parseAbiParameter": [Function],
      "parseAbiParameters": [Function],
      "parseEther": [Function],
      "parseGwei": [Function],
      "parseTransaction": [Function],
      "parseUnits": [Function],
      "prepareRequest": [Function],
      "recoverAddress": [Function],
      "recoverMessageAddress": [Function],
      "recoverPublicKey": [Function],
      "recoverTypedDataAddress": [Function],
      "serializeTransaction": [Function],
      "size": [Function],
      "slice": [Function],
      "sliceBytes": [Function],
      "sliceHex": [Function],
      "stringToBytes": [Function],
      "stringToHex": [Function],
      "stringify": [Function],
      "toBytes": [Function],
      "toHex": [Function],
      "toRlp": [Function],
      "transactionType": {
        "0x0": "legacy",
        "0x1": "eip2930",
        "0x2": "eip1559",
      },
      "trim": [Function],
      "validateTypedData": [Function],
      "verifyMessage": [Function],
      "verifyTypedData": [Function],
      "webSocket": [Function],
      "weiUnits": {
        "ether": -18,
        "gwei": -9,
      },
    }
  `)
})
