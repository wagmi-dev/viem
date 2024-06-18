import { afterAll, expect, test, vi } from 'vitest'
import {
  mockAddress,
  zkSyncClientLocalNodeWithAccountL1,
} from '~test/src/zksync.js'
import { mockClientPublicActionsL2 } from '~test/src/zksyncPublicActionsL2MockData.js'
import * as readContract from '../../../actions/public/readContract.js'
import { getERC20DefaultBridgeData } from './getERC20DefaultBridgeData.js'

const client = { ...zkSyncClientLocalNodeWithAccountL1 }

mockClientPublicActionsL2(client)

const spy = vi.spyOn(readContract, 'readContract').mockResolvedValue('0x123')

afterAll(() => {
  spy.mockRestore()
})

test('getBaseCostFromFeeData', async () => {
  const defaultData = await getERC20DefaultBridgeData(client, {
    l1TokenAddress: mockAddress,
  })
  expect(defaultData).toMatchInlineSnapshot(`
  "0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000053078313233000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000005307831323300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000123"`)
})