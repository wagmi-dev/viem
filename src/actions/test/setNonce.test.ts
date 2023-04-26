import { expect, test } from 'vitest'

import { accounts, publicClient, testClient } from '../../_test/index.js'
import { getTransactionCount } from '../public/getTransactionCount.js'
import { setNonce } from './setNonce.js'
import { mine } from './mine.js'

const targetAccount = accounts[0]

test('sets nonce', async () => {
  await expect(
    setNonce(testClient, {
      address: targetAccount.address,
      nonce: 420,
    }),
  ).resolves.toBeUndefined()
  await mine(testClient, { blocks: 1 })
  expect(
    await getTransactionCount(publicClient, {
      address: targetAccount.address,
    }),
  ).toBe(420)
  await setNonce(testClient, {
    address: targetAccount.address,
    nonce: 69,
  })
  expect(
    await getTransactionCount(publicClient, {
      address: targetAccount.address,
    }),
  ).toBe(69)
})
