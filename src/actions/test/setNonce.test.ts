import { accounts } from '../../_test/constants.js'
import { publicClient } from '../../_test/utils.js'
import { testClient } from '../../_test/utils.js'
import { getTransactionCount } from '../public/getTransactionCount.js'
import { mine } from './mine.js'
import { setNonce } from './setNonce.js'
import { expect, test } from 'vitest'

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
