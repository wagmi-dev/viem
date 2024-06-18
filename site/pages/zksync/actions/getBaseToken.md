---
description: Returns the address of a Base Token.
---

# getBaseToken

## Usage

:::code-group
```ts [example.ts]
import { client } from './config'

  const address = await client.getBaseToken({
    bridgehubContractAddress:'0x05b30BE4e32E6dD6eEe2171E0746e987BeCc9b36'
  })
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { zkSyncLocalNode } from 'viem/chains'
import { publicActionsL1 } from 'viem/zksync'

export const client = createPublicClient({
  chain: zkSyncLocalNodeL1,
  transport: http(),
}).extend(publicActionsL1())

```
:::

## Returns

`Address`

Address of the base token.

## Parameters

### bridgehubContractAddress

- **Type:** `Address`

The address of the Bridgehub Smart Contract.

```ts
import { client } from './config'

  const address = await client.getBaseToken({
    bridgehubContractAddress:'0x05b30BE4e32E6dD6eEe2171E0746e987BeCc9b36' //[!code focus]
  })
```