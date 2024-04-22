import { expect, test } from 'vitest'
import { zkSyncClientLocalNode } from '../../../test/src/zksync.js'
import {
  mockAddress,
  mockClientPublicActionsL2,
  mockTestnetPaymasterAddress,
} from '../../../test/src/zksyncPublicActionsL2MockData.js'
import type { EIP1193RequestFn } from '../../types/eip1193.js'
import { getTestnetPaymasterAddress } from './getTestnetPaymasterAddress.js'

const client = { ...zkSyncClientLocalNode }

mockClientPublicActionsL2(client)

test('default', async () => {
  const address = await getTestnetPaymasterAddress(client)
  expect(address).to.equal(mockTestnetPaymasterAddress)
})

test('returns null as address', async () => {
  client.request = (async ({ method }) => {
    if (method === 'zks_getTestnetPaymaster') return null
    return mockAddress
  }) as EIP1193RequestFn

  const address = await getTestnetPaymasterAddress(client)
  expect(address).to.equal(null)
})
