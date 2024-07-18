---
description: Estimates the gas values for a User Operation to be executed successfully.
---

# estimateUserOperationGas

Estimates the gas values for a User Operation to be executed successfully.

## Usage

:::code-group

```ts [example.ts]
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({ // [!code focus:7]
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { createBundlerClient, toCoinbaseSmartAccount } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')],
})

export const bundlerClient = createBundlerClient({
  client,
  transport: http('https://public.stackup.sh/api/v1/node/ethereum-mainnet')
})
```

:::

### Account Hoisting

If you do not wish to pass an `account` to every `estimateUserOperationGas`, you can also hoist the Account on the Bundler Client (see `config.ts`).

[Learn more](/docs/clients/wallet#account).

:::code-group

```ts [example.ts]
import { parseEther } from 'viem'
import { bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({ // [!code focus:7]
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { createBundlerClient, toSmartAccount, solady } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')],
})

export const bundlerClient = createBundlerClient({
  account, // [!code ++]
  client,
  transport: http('https://public.stackup.sh/api/v1/node/ethereum-mainnet')
})
```

:::

### Contract Calls

The `calls` property also accepts **Contract Calls**, and can be used via the `abi`, `functionName`, and `args` properties.

:::code-group

```ts [example.ts]
import { parseEther } from 'viem'
import { bundlerClient, publicClient } from './config'
import { wagmiAbi } from './abi' // [!code focus]

const gas = await bundlerClient.estimateUserOperationGas({ // [!code focus:7]
  calls: [{
    abi: wagmiAbi,
    functionName: 'mint',
    to: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  }],
})
```

```ts [abi.ts] filename="abi.ts"
export const wagmiAbi = [
  // ...
  {
    inputs: [],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  // ...
] as const;
```

```ts [config.ts]
import { createPublicClient, http } from 'viem'
import { createBundlerClient, toSmartAccount, solady } from 'viem/account-abstraction'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})

export const account = await toCoinbaseSmartAccount({
  client,
  owners: [privateKeyToAccount('0x...')],
})

export const bundlerClient = createBundlerClient({
  account,
  client,
  transport: http('https://public.stackup.sh/api/v1/node/ethereum-mainnet')
})
```

:::

## Returns

```ts
{
  callGasLimit: bigint;
  preVerificationGas: bigint;
  verificationGasLimit: bigint;
  paymasterVerificationGasLimit: bigint | undefined;
  paymasterPostOpGasLimit: bigint | undefined;
}
```

The estimated gas values.

## Parameters

### account

- **Type:** `SmartAccount`

The Account to use for User Operation execution.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account, // [!code focus]
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }]
})
```

### calls

- **Type:** `{ data: Hex, to: Address, value: bigint }[]`

The calls to execute in the User Operation.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{ // [!code focus]
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8', // [!code focus]
    value: parseEther('1') // [!code focus]
  }] // [!code focus]
})
```

:::tip
You can also pass raw call data via the `callData` property:

```ts
const gas = await bundlerClient.estimateUserOperationGas({
  account,
  callData: '0xdeadbeef', // [!code focus]
})
```
:::

### callGasLimit (optional)

- **Type:** `bigint`

The amount of gas to allocate the main execution call.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  callGasLimit: 69420n, // [!code focus]
})
```

### factory (optional)

- **Type:** `Address`

Account Factory address. 

:::warning
This property should only be populated when the Smart Account has not been deployed yet.
:::

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  factory: '0x1234567890123456789012345678901234567890', // [!code focus]
  factoryData: '0xdeadbeef',
})
```

### factoryData (optional)

- **Type:** `Hex`

Call data to execute on the Account Factory to deploy a Smart Account.

:::warning
This property should only be populated when the Smart Account has not been deployed yet.
:::

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  factory: '0x1234567890123456789012345678901234567890',
  factoryData: '0xdeadbeef', // [!code focus]
})
```

### maxFeePerGas (optional)

- **Type:** `bigint`

Maximum fee per gas for User Operation execution.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  maxFeePerGas: 420n, // [!code focus]
})
```

### maxPriorityFeePerGas (optional)

- **Type:** `bigint`

Maximum priority fee per gas for User Operation execution.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  maxPriorityFeePerGas: 420n, 
  maxFeePerGas: 10n, // [!code focus]
})
```

### nonce (optional)

- **Type:** `bigint`

Nonce for the User Operation.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  nonce: 10n, // [!code focus]
})
```

### paymaster (optional)

- **Type:** `Address`

Paymaster address.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB', // [!code focus]
  paymasterData: '0xdeadbeef',
})
```

### paymasterData (optional)

- **Type:** `Address`

Call data to execute on the Paymaster contract.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef', // [!code focus]
})
```

### paymasterPostOpGasLimit (optional)

- **Type:** `bigint`

The amount of gas to allocate for the Paymaster post-operation code.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef',
  paymasterPostOpGasLimit: 69420n, // [!code focus]
})
```

### paymasterVerificationGasLimit (optional)

- **Type:** `bigint`

The amount of gas to allocate for the Paymaster validation code.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  paymaster: '0x942fD5017c0F60575930D8574Eaca13BEcD6e1bB',
  paymasterData: '0xdeadbeef',
  paymasterVerificationGasLimit: 69420n, // [!code focus]
})
```

### preVerificationGas (optional)

- **Type:** `bigint`

Extra gas to pay the Bunder.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  preVerificationGas: 69420n, // [!code focus]
})
```

### signature (optional)

- **Type:** `Hex`

Signature for the User Operation.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  signature: '0x...', // [!code focus]
})
```

### verificationGasLimit (optional)

- **Type:** `bigint`

The amount of gas to allocate for the verification step.

```ts
import { parseEther } from 'viem'
import { account, bundlerClient } from './config'

const gas = await bundlerClient.estimateUserOperationGas({
  account,
  calls: [{
    to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    value: parseEther('1')
  }],
  verificationGasLimit: 69420n, // [!code focus]
})
```