import { expect, test } from 'vitest'

import * as utils from './index'

test('exports utils', () => {
  expect(utils).toMatchInlineSnapshot(`
    {
      "arrayRegex": /\\^\\(\\.\\*\\)\\\\\\[\\(\\[0-9\\]\\*\\)\\\\\\]\\$/,
      "assertRequest": [Function],
      "assertTransactionEIP1559": [Function],
      "assertTransactionEIP2930": [Function],
      "assertTransactionLegacy": [Function],
      "boolToBytes": [Function],
      "boolToHex": [Function],
      "buildRequest": [Function],
      "bytesRegex": /\\^bytes\\(\\[1-9\\]\\|1\\[0-9\\]\\|2\\[0-9\\]\\|3\\[0-2\\]\\)\\?\\$/,
      "bytesToBigint": [Function],
      "bytesToBool": [Function],
      "bytesToHex": [Function],
      "bytesToNumber": [Function],
      "bytesToString": [Function],
      "concat": [Function],
      "concatBytes": [Function],
      "concatHex": [Function],
      "containsNodeError": [Function],
      "decodeAbiParameters": [Function],
      "decodeErrorResult": [Function],
      "decodeEventLog": [Function],
      "decodeFunctionData": [Function],
      "decodeFunctionResult": [Function],
      "defineBlock": [Function],
      "defineChain": [Function],
      "defineFormatter": [Function],
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
      "extract": [Function],
      "extractFunctionName": [Function],
      "extractFunctionParams": [Function],
      "extractFunctionParts": [Function],
      "extractFunctionType": [Function],
      "format": [Function],
      "formatAbiItem": [Function],
      "formatAbiItemWithArgs": [Function],
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
      "getAccount": [Function],
      "getAddress": [Function],
      "getCallError": [Function],
      "getChainContractAddress": [Function],
      "getContractAddress": [Function],
      "getContractError": [Function],
      "getCreate2Address": [Function],
      "getCreateAddress": [Function],
      "getEstimateGasError": [Function],
      "getEventSelector": [Function],
      "getFunctionSelector": [Function],
      "getNodeError": [Function],
      "getSerializedTransactionType": [Function],
      "getSocket": [Function],
      "getTransactionError": [Function],
      "getTransactionType": [Function],
      "hashMessage": [Function],
      "hashTypedData": [Function],
      "hexToBigInt": [Function],
      "hexToBool": [Function],
      "hexToBytes": [Function],
      "hexToNumber": [Function],
      "hexToString": [Function],
      "integerRegex": /\\^\\(u\\?int\\)\\(8\\|16\\|24\\|32\\|40\\|48\\|56\\|64\\|72\\|80\\|88\\|96\\|104\\|112\\|120\\|128\\|136\\|144\\|152\\|160\\|168\\|176\\|184\\|192\\|200\\|208\\|216\\|224\\|232\\|240\\|248\\|256\\)\\?\\$/,
      "isAddress": [Function],
      "isAddressEqual": [Function],
      "isBytes": [Function],
      "isHash": [Function],
      "isHex": [Function],
      "keccak256": [Function],
      "numberToBytes": [Function],
      "numberToHex": [Function],
      "pad": [Function],
      "padBytes": [Function],
      "padHex": [Function],
      "parseAbi": [Function],
      "parseAbiItem": [Function],
      "parseAbiParameter": [Function],
      "parseAbiParameters": [Function],
      "parseAccount": [Function],
      "parseEther": [Function],
      "parseGwei": [Function],
      "parseTransaction": [Function],
      "parseUnits": [Function],
      "prepareRequest": [Function],
      "recoverAddress": [Function],
      "recoverMessageAddress": [Function],
      "recoverTypedDataAddress": [Function],
      "rpc": {
        "http": [Function],
        "webSocket": [Function],
        "webSocketAsync": [Function],
      },
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
      "verifyMessage": [Function],
      "verifyTypedData": [Function],
    }
  `)
})
