import { bench, describe } from 'vitest'

import { publicClient, setupAnvil } from '../../_test/index.js'
import { createPendingTransactionFilter } from './createPendingTransactionFilter.js'
import { getFilterChanges } from './getFilterChanges.js'

setupAnvil()

const filter = await createPendingTransactionFilter(publicClient)

describe.skip('Get Filter Changes', () => {
  bench('viem: `getFilterChanges`', async () => {
    await getFilterChanges(publicClient, { filter })
  })
})
