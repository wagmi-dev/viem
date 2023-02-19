import { expect, test } from 'vitest'

import * as actions from './index'

test('exports actions', () => {
  expect(actions).toMatchInlineSnapshot(`
    {
      "AbiConstructorNotFoundError": [Function],
      "AbiConstructorParamsNotFoundError": [Function],
      "AbiDecodingDataSizeInvalidError": [Function],
      "AbiEncodingArrayLengthMismatchError": [Function],
      "AbiEncodingLengthMismatchError": [Function],
      "AbiErrorInputsNotFoundError": [Function],
      "AbiErrorNotFoundError": [Function],
      "AbiErrorSignatureNotFoundError": [Function],
      "AbiEventNotFoundError": [Function],
      "AbiFunctionNotFoundError": [Function],
      "AbiFunctionOutputsNotFoundError": [Function],
      "AbiFunctionSignatureNotFoundError": [Function],
      "BaseError": [Function],
      "BlockNotFoundError": [Function],
      "ContractFunctionExecutionError": [Function],
      "ContractFunctionRevertedError": [Function],
      "ContractFunctionZeroDataError": [Function],
      "DataLengthTooLongError": [Function],
      "DataLengthTooShortError": [Function],
      "FilterTypeNotSupportedError": [Function],
      "HttpRequestError": [Function],
      "InternalRpcError": [Function],
      "InvalidAbiDecodingTypeError": [Function],
      "InvalidAbiEncodingTypeError": [Function],
      "InvalidAddressError": [Function],
      "InvalidArrayError": [Function],
      "InvalidBytesBooleanError": [Function],
      "InvalidDefinitionTypeError": [Function],
      "InvalidGasArgumentsError": [Function],
      "InvalidHexBooleanError": [Function],
      "InvalidHexValueError": [Function],
      "InvalidInputRpcError": [Function],
      "InvalidParamsRpcError": [Function],
      "InvalidRequestRpcError": [Function],
      "JsonRpcVersionUnsupportedError": [Function],
      "LimitExceededRpcError": [Function],
      "MethodNotFoundRpcError": [Function],
      "MethodNotSupportedRpcError": [Function],
      "OffsetOutOfBoundsError": [Function],
      "ParseRpcError": [Function],
      "RequestError": [Function],
      "ResourceNotFoundRpcError": [Function],
      "ResourceUnavailableRpcError": [Function],
      "RpcError": [Function],
      "RpcRequestError": [Function],
      "SizeExceedsPaddingSizeError": [Function],
      "TimeoutError": [Function],
      "TransactionNotFoundError": [Function],
      "TransactionReceiptNotFoundError": [Function],
      "TransactionRejectedRpcError": [Function],
      "UnknownRpcError": [Function],
      "UrlRequiredError": [Function],
      "WaitForTransactionReceiptTimeoutError": [Function],
      "WebSocketRequestError": [Function],
      "boolToBytes": [Function],
      "boolToHex": [Function],
      "bytesToBigint": [Function],
      "bytesToBool": [Function],
      "bytesToHex": [Function],
      "bytesToNumber": [Function],
      "bytesToString": [Function],
      "createClient": [Function],
      "createPublicClient": [Function],
      "createTestClient": [Function],
      "createTransport": [Function],
      "createWalletClient": [Function],
      "custom": [Function],
      "decodeAbi": [Function],
      "decodeBytes": [Function],
      "decodeErrorResult": [Function],
      "decodeEventLog": [Function],
      "decodeFunctionData": [Function],
      "decodeFunctionResult": [Function],
      "decodeHex": [Function],
      "decodeRlp": [Function],
      "defineBlock": [Function],
      "defineChain": [Function],
      "defineTransaction": [Function],
      "defineTransactionReceipt": [Function],
      "defineTransactionRequest": [Function],
      "encodeAbi": [Function],
      "encodeBytes": [Function],
      "encodeDeployData": [Function],
      "encodeErrorResult": [Function],
      "encodeEventTopics": [Function],
      "encodeFunctionData": [Function],
      "encodeFunctionResult": [Function],
      "encodeHex": [Function],
      "encodeRlp": [Function],
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
      "formatUnit": [Function],
      "getAbiItem": [Function],
      "getAddress": [Function],
      "getContractAddress": [Function],
      "getContractError": [Function],
      "getCreate2Address": [Function],
      "getCreateAddress": [Function],
      "getEventSignature": [Function],
      "getFunctionSignature": [Function],
      "gweiUnits": {
        "ether": -9,
        "wei": 9,
      },
      "hexToBigInt": [Function],
      "hexToBool": [Function],
      "hexToBytes": [Function],
      "hexToNumber": [Function],
      "hexToString": [Function],
      "http": [Function],
      "isAddress": [Function],
      "isAddressEqual": [Function],
      "isBytes": [Function],
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
      "pad": [Function],
      "padBytes": [Function],
      "padHex": [Function],
      "parseEther": [Function],
      "parseGwei": [Function],
      "parseUnit": [Function],
      "size": [Function],
      "slice": [Function],
      "sliceBytes": [Function],
      "sliceHex": [Function],
      "stringToBytes": [Function],
      "stringToHex": [Function],
      "stringify": [Function],
      "transactionType": {
        "0x0": "legacy",
        "0x1": "eip2930",
        "0x2": "eip1559",
      },
      "trim": [Function],
      "webSocket": [Function],
      "weiUnits": {
        "ether": -18,
        "gwei": -9,
      },
    }
  `)
})
