import { testClient } from '../../_test/utils.js'
import { getAutomine } from './getAutomine.js'
import { setAutomine } from './setAutomine.js'
import { expect, test } from 'vitest'

// TODO: Anvil sometimes stops interval mining when automining is programatically set.
test.skip('sets automine status', async () => {
  await expect(setAutomine(testClient, true)).resolves.toBeUndefined()
  expect(await getAutomine(testClient)).toEqual(true)
  await setAutomine(testClient, false)
  expect(await getAutomine(testClient)).toEqual(false)
})
