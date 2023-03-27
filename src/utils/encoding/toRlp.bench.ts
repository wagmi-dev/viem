import { RLP } from 'ethers/lib/utils'
import { encodeRlp } from 'ethers@6'
import { bench, describe } from 'vitest'

import { toRlp } from './toRlp.js'

describe('RLP Encoding (128 bytes)', () => {
  bench('viem: `toRlp`', () => {
    toRlp(
      '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
    )
  })

  bench('ethers@5: `RLP.encode`', () => {
    RLP.encode(
      '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
    )
  })

  bench('ethers@6: `encodeRlp`', () => {
    encodeRlp(
      '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
    )
  })
})

describe.skip('RLP Encoding (nested array)', () => {
  bench('viem: `toRlp`', () => {
    toRlp([['0x11'], [['0x11']], [['0x11'], [['0x11']]]])
  })

  bench('ethers@5: `RLP.encode`', () => {
    RLP.encode([['0x11'], [['0x11']], [['0x11'], [['0x11']]]])
  })

  bench('ethers: `encodeRlp`', () => {
    encodeRlp([['0x11'], [['0x11']], [['0x11'], [['0x11']]]])
  })
})

describe('RLP Encoding (nested array of 128 bytes)', () => {
  bench('viem: `toRlp`', () => {
    toRlp([
      '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
      [
        '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
        [
          '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
        ],
      ],
    ])
  })

  bench('ethers@5: `RLP.encode`', () => {
    RLP.encode([
      '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
      [
        '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
        [
          '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
        ],
      ],
    ])
  })

  bench('ethers@6: `encodeRlp`', () => {
    encodeRlp([
      '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
      [
        '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
        [
          '0x1000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000010000100001000000000000000000000000000000000',
        ],
      ],
    ])
  })
})
