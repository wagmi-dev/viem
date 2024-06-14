import { expect, test } from 'vitest'
import { anvilOptimism } from '../../../test/src/anvil.js'
import { getTransactionReceipt } from '../../actions/index.js'
import { getWithdrawals } from './getWithdrawals.js'

const optimismClient = anvilOptimism.getClient()

test('default', async () => {
  const receipt = await getTransactionReceipt(optimismClient, {
    hash: '0x7b5cedccfaf9abe6ce3d07982f57bcb9176313b019ff0fc602a0b70342fe3147',
  })

  const withdrawals = getWithdrawals(receipt)

  expect(withdrawals).toMatchInlineSnapshot(`
    [
      {
        "data": "0xd764ad0b0001000000000000000000000000000000000000000000000000000000002d49000000000000000000000000420000000000000000000000000000000000001000000000000000000000000099c9fc46f92e8a1c0dec1b1747d010903e884be1000000000000000000000000000000000000000000000000002e2f6e5e148000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000a41635f5fd000000000000000000000000bcce5f55dfda11600e48e91598ad0f8645466142000000000000000000000000bcce5f55dfda11600e48e91598ad0f8645466142000000000000000000000000000000000000000000000000002e2f6e5e1480000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "gasLimit": 287624n,
        "nonce": 1766847064778384329583297500742918515827483896875618958121606201292631369n,
        "sender": "0x4200000000000000000000000000000000000007",
        "target": "0x25ace71c97B33Cc4729CF772ae268934F7ab5fA1",
        "value": 13000000000000000n,
        "withdrawalHash": "0x178f1e0216fb50bef160eb8af7d1d98000026a84371cef4a13d8d79996cc8589",
      },
    ]
  `)
})
