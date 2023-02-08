import { expect, test } from 'vitest'

import * as clients from './index'

test('exports clients', () => {
  expect(clients).toMatchInlineSnapshot(`
    {
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
      "panicReasons": {
        "1": "An \`assert\` condition failed.",
        "17": "Arithmic operation resulted in underflow or overflow.",
        "18": "Division or modulo by zero (e.g. \`5 / 0\` or \`23 % 0\`).",
        "33": "Attempted to convert to an invalid type.",
        "34": "Attempted to access a storage byte array that is incorrectly encoded.",
        "49": "Performed \`.pop()\` on an empty array",
        "50": "Array index is out of bounds.",
        "65": "Allocated too much memory or created an array which is too large.",
        "81": "Attempted to call a zero-initialized variable of internal function type.",
      },
      "solidityError": {
        "inputs": [
          {
            "internalType": "string",
            "name": "message",
            "type": "string",
          },
        ],
        "name": "Error",
        "type": "error",
      },
      "solidityPanic": {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "reason",
            "type": "uint256",
          },
        ],
        "name": "Panic",
        "type": "error",
      },
    }
  `)
})
