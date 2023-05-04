import { sendTransaction } from '../wallet/sendTransaction.js'
import { expect, test } from 'vitest'

import { accounts } from '../../_test/constants.js'
import { testClient } from '../../_test/utils.js'
import { walletClient } from '../../_test/utils.js'
import { parseEther } from '../../utils/unit/parseEther.js'
import { inspectTxpool } from './inspectTxpool.js'
import { mine } from './mine.js'

test('inspects txpool (empty)', async () => {
  await mine(testClient, { blocks: 1 })

  expect(await inspectTxpool(testClient)).toMatchInlineSnapshot(`
    {
      "pending": {},
      "queued": {},
    }
  `)
})

test('inspects txpool (pending)', async () => {
  await sendTransaction(walletClient, {
    account: accounts[0].address,
    to: accounts[1].address,
    value: parseEther('2'),
  })
  await sendTransaction(walletClient, {
    account: accounts[2].address,
    to: accounts[3].address,
    value: parseEther('3'),
  })

  const txpool1 = await inspectTxpool(testClient)
  expect(Object.values(txpool1.pending).length).toBe(2)
  expect(Object.values(txpool1.queued).length).toBe(0)
  expect(txpool1.pending[accounts[0].address]).toBeDefined()
  expect(txpool1.pending[accounts[2].address]).toBeDefined()

  await mine(testClient, { blocks: 1 })

  const txpool2 = await inspectTxpool(testClient)
  expect(Object.values(txpool2.pending).length).toBe(0)
  expect(Object.values(txpool2.queued).length).toBe(0)
  expect(txpool2.pending[accounts[0].address]).toBeUndefined()
  expect(txpool2.pending[accounts[2].address]).toBeUndefined()
})
