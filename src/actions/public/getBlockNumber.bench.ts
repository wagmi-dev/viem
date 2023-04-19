import { bench, describe } from 'vitest'

import {
  ethersProvider,
  ethersV6Provider,
  publicClient,
  setupAnvil,
} from '../../_test/index.js'

import { getBlockNumber } from './getBlockNumber.js'

setupAnvil()

describe('Get Block Number', () => {
  bench('viem: `getBlockNumber`', async () => {
    await getBlockNumber(publicClient)
  })

  bench('ethers@5: `getBlockNumber`', async () => {
    await ethersProvider.getBlockNumber()
  })

  bench('ethers@6: `getBlockNumber`', async () => {
    await ethersV6Provider.getBlockNumber()
  })
})
