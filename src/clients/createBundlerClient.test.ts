import { expect, test } from 'vitest'
import { bundlerMainnet } from '../../test/src/bundler.js'
import { createBundlerClient } from './createBundlerClient.js'
import { http } from './transports/http.js'

test('creates', () => {
  const { uid, transport, ...client } = createBundlerClient({
    transport: http(bundlerMainnet.rpcUrl.http),
  })

  expect(uid).toBeDefined()
  expect(transport).toBeDefined()
  expect(client).toMatchInlineSnapshot(`
    {
      "account": undefined,
      "batch": undefined,
      "cacheTime": 4000,
      "ccipRead": undefined,
      "chain": undefined,
      "estimateUserOperationGas": [Function],
      "extend": [Function],
      "getChainId": [Function],
      "getSupportedEntryPoints": [Function],
      "getUserOperationReceipt": [Function],
      "key": "bundler",
      "name": "Bundler Client",
      "pollingInterval": 4000,
      "prepareUserOperation": [Function],
      "request": [Function],
      "sendUserOperation": [Function],
      "type": "bundlerClient",
    }
  `)
})

test('smoke', async () => {
  const client = createBundlerClient({
    transport: http(bundlerMainnet.rpcUrl.http),
  })

  const chainId = await client.request({ method: 'eth_chainId' })

  expect(chainId).toMatchInlineSnapshot(`"0x1"`)
})
