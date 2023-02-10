import { expect, test } from 'vitest'
import { localhost, mainnet, optimism } from '../../chains'
import { createPublicClient, http } from '../../clients'

import { address, publicClient } from '../../_test'

import { getEnsName } from './getEnsName'

test('gets primary name for address', async () => {
  await expect(
    getEnsName(publicClient, {
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
    }),
  ).resolves.toMatchInlineSnapshot('"awkweb.eth"')
})

test('address with no primary name', async () => {
  await expect(
    getEnsName(publicClient, {
      address: address.burn,
    }),
  ).resolves.toMatchInlineSnapshot('null')
})

test('custom universal resolver address', async () => {
  await expect(
    getEnsName(publicClient, {
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      universalResolverAddress: '0x74E20Bd2A1fE0cdbe45b9A1d89cb7e0a45b36376',
    }),
  ).resolves.toMatchInlineSnapshot('"awkweb.eth"')
})

test('universal resolver contract not configured for chain', async () => {
  await expect(
    getEnsName(
      createPublicClient({
        chain: optimism,
        transport: http(),
      }),
      {
        address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      },
    ),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Chain \\"Optimism\\" does not support contract \\"ensUniversalResolver\\".

    This could be due to any of the following:
    - The chain does not have the contract \\"ensUniversalResolver\\" configured.

    Version: viem@1.0.2"
  `)
})

test('universal resolver contract deployed on later block', async () => {
  await expect(
    getEnsName(publicClient, {
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      blockNumber: 14353601n,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "Chain \\"Localhost\\" does not support contract \\"ensUniversalResolver\\".

    This could be due to any of the following:
    - The contract \\"ensUniversalResolver\\" was not deployed until block 16172161 (current block 14353601).

    Version: viem@1.0.2"
  `)
})

test('invalid universal resolver address', async () => {
  await expect(
    getEnsName(publicClient, {
      address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
      universalResolverAddress: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    "The contract function \\"reverse\\" reverted with the following reason:
    execution reverted

    Contract:  0x0000000000000000000000000000000000000000
    Function:  reverse(bytes reverseName)
    Arguments:        (0x28613063663739383831366434623962393836366235333330656561343661313833383266323531650461646472077265766572736500)

    Docs: https://viem.sh/docs/contract/readContract
    Version: viem@1.0.2"
  `)
})
