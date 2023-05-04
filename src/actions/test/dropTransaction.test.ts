import { accounts } from '../../_test/constants.js'
import { publicClient } from '../../_test/utils.js'
import { testClient } from '../../_test/utils.js'
import { walletClient } from '../../_test/utils.js'
import { parseEther } from '../../utils/unit/parseEther.js'
import { getBalance } from '../public/getBalance.js'
import { sendTransaction } from '../wallet/sendTransaction.js'
import { dropTransaction } from './dropTransaction.js'
import { mine } from './mine.js'
import { setIntervalMining } from './setIntervalMining.js'
import { expect, test } from 'vitest'

const sourceAccount = accounts[0]
const targetAccount = accounts[1]

test('drops transaction', async () => {
  await setIntervalMining(testClient, { interval: 0 })

  const balance = await getBalance(publicClient, {
    address: sourceAccount.address,
  })
  const hash = await sendTransaction(walletClient, {
    account: sourceAccount.address,
    to: targetAccount.address,
    value: parseEther('2'),
  })
  await expect(dropTransaction(testClient, { hash })).resolves.toBeUndefined()
  await mine(testClient, { blocks: 1 })
  expect(
    await getBalance(publicClient, {
      address: sourceAccount.address,
    }),
  ).not.toBeLessThan(balance)

  await setIntervalMining(testClient, { interval: 1 })
})
