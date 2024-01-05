import { describe, expect, test } from 'vitest'
import { accounts } from '~test/src/constants.js'

import { greeterContract } from '~test/src/abis.js'
import { privateKeyToAccount } from '~viem/accounts/privateKeyToAccount.js'
import { simulateContract } from '~viem/actions/index.js'
import { eip712Actions } from './eip712.js'
import { zkSyncMockClient } from '~test/src/zksync.js'


test('default', async () => {
  expect(eip712Actions(zkSyncMockClient)).toMatchInlineSnapshot(`
    {
      "prepareTransactionRequest": [Function],
      "sendTransaction": [Function],
      "signTransaction": [Function],
      "writeContract": [Function],
    }
  `)
})

describe('Action tests', () => {
  test('prepareTransactionRequest', async () => {
    const request = await zkSyncMockClient.prepareTransactionRequest({
      account: privateKeyToAccount(accounts[0].privateKey),
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      maxFeePerGas: 10000000000n,
      maxPriorityFeePerGas: 10000000000n,
      gas: 158774n,
      value: 10000000000n,
      data: '0x01',
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    expect(request).toBeDefined()
  })

  test('sendTransaction', async () => {
    const request = await zkSyncMockClient.sendTransaction({
      account: privateKeyToAccount(accounts[0].privateKey),
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      maxFeePerGas: 10000000000n,
      maxPriorityFeePerGas: 10000000000n,
      gas: 158774n,
      value: 10000000000n,
      data: '0x01',
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    expect(request).toBeDefined()
  })

  test('signTransaction', async () => {
    const signature = await zkSyncMockClient.signTransaction({
      account: privateKeyToAccount(accounts[0].privateKey),
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      maxFeePerGas: 10000000000n,
      maxPriorityFeePerGas: 10000000000n,
      gas: 158774n,
      value: 10000000000n,
      data: '0x01',
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    expect(signature).toBeDefined()
  })

  test('writeContract', async () => {
    const { request } = await simulateContract(zkSyncMockClient, {
      ...greeterContract,
      account: privateKeyToAccount(accounts[0].privateKey),
      functionName: 'setGreeting',
      args: ['Viem ZkSync works!'],
      maxFeePerGas: 250000000n,
      maxPriorityFeePerGas: 0n,
      paymaster: '0xFD9aE5ebB0F6656f4b77a0E99dCbc5138d54b0BA',
      paymasterInput:
        '0x8c5a344500000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000',
      type: 'eip712',
      gasPerPubdata: 50000n,
    })
    const tx = await zkSyncMockClient.writeContract(request)
    expect(tx).toBeDefined()
  })
})
