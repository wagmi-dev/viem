import { expect, test } from 'vitest'

import type { Formatter } from '../chains'

import { format } from './format'

const data = {
  baseFeePerGas: '0x0',
  difficulty: '0x2d3a678cddba9b',
  extraData: '0x',
  gasLimit: '0x1c9c347',
  gasUsed: '0x0',
  hash: '0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd',
  logsBloom:
    '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  miner: '0x0000000000000000000000000000000000000000',
  mixHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  nonce: '0x0000000000000000',
  number: '0xec6fc6',
  parentHash:
    '0xe55516ad8029e53cd32087f14653d851401b05245abb1b2d6ed4ddcc597ac5a6',
  receiptsRoot:
    '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  sealFields: [
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    '0x0000000000000000',
  ],
  sha3Uncles:
    '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  size: '0x208',
  stateRoot:
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  timestamp: '0x63198f6f',
  totalDifficulty: null,
  transactions: [],
  transactionsRoot:
    '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  uncles: [],
}

const replacer: Formatter<any, any> = {
  baseFeePerGas: (block) =>
    block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
  difficulty: (block) => BigInt(block.difficulty),
  gasLimit: (block) => BigInt(block.gasLimit),
  gasUsed: (block) => BigInt(block.gasUsed),
  number: (block) => (block.number ? BigInt(block.number) : null),
  size: (block) => BigInt(block.size),
  timestamp: (block) => BigInt(block.timestamp),
  totalDifficulty: (block) =>
    block.totalDifficulty ? BigInt(block.totalDifficulty) : null,
}

test('formats', () => {
  expect(
    format(data, {
      replacer,
    }),
  ).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": 0n,
      "difficulty": 12730590371363483n,
      "extraData": "0x",
      "gasLimit": 29999943n,
      "gasUsed": 0n,
      "hash": "0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "miner": "0x0000000000000000000000000000000000000000",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x0000000000000000",
      "number": 15495110n,
      "parentHash": "0xe55516ad8029e53cd32087f14653d851401b05245abb1b2d6ed4ddcc597ac5a6",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "sealFields": [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000",
      ],
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 520n,
      "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1662619503n,
      "totalDifficulty": null,
      "transactions": [],
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "uncles": [],
    }
  `)
})

test('args: formatter', () => {
  expect(
    format(data, {
      replacer: {
        baseFeePerGas: (block) =>
          block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
        difficulty: (block) => BigInt(block.difficulty),
        gasLimit: (block) => BigInt(block.gasLimit),
        gasUsed: (block) => BigInt(block.gasUsed),
        number: (block) => (block.number ? BigInt(block.number) : null),
        size: (block) => BigInt(block.size),
        timestamp: (block) => BigInt(block.timestamp),
        totalDifficulty: (block) =>
          block.totalDifficulty ? BigInt(block.totalDifficulty) : null,
      },
      formatter: {
        difficulty: () => undefined,
      },
    }),
  ).toMatchInlineSnapshot(`
    {
      "baseFeePerGas": null,
      "difficulty": undefined,
      "extraData": "0x",
      "gasLimit": 29999943n,
      "gasUsed": 0n,
      "hash": "0xebc3644804e4040c0a74c5a5bbbc6b46a71a5d4010fe0c92ebb2fdf4a43ea5dd",
      "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "miner": "0x0000000000000000000000000000000000000000",
      "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "nonce": "0x0000000000000000",
      "number": 15495110n,
      "parentHash": "0xe55516ad8029e53cd32087f14653d851401b05245abb1b2d6ed4ddcc597ac5a6",
      "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "sealFields": [
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000",
      ],
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": 520n,
      "stateRoot": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1662619503n,
      "totalDifficulty": null,
      "transactions": [],
      "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
      "uncles": [],
    }
  `)
})
