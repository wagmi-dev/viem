# Sending Transactions with EIP-7702

The guide below demonstrates how to send EIP-7702 Transactions to invoke Contract functions on an Externally Owned Account.

## Overview

Here is an end-to-end overview of how to broadcast an EIP-7702 Transaction to send a batch of Calls. We will break it down into [Steps](#steps) below.

:::code-group

```ts twoslash [example.ts]
import { parseEther } from 'viem'
import { client } from './config'
import { abi, contractAddress } from './contract'
 
const authorization = await client.signAuthorization({
  contractAddress,
})

const hash = await client.sendTransaction({
  authorizationList: [authorization],
  data: encodeFunctionData({
    abi,
    functionName: 'execute',
    args: [
      {
        data: '0x',
        to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
        value: parseEther('0.001'),
      },
      {
        data: '0x',
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', 
        value: parseEther('0.002'), 
      },  
    ],
  }),
  to: client.account.address,
})
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

```ts twoslash [config.ts] filename="config.ts"
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts' 
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
```

```solidity [BatchCallInvoker.sol]
pragma solidity ^0.8.20;

contract BatchCallInvoker {
  struct Call {
    bytes data;
    address to;
    uint256 value;
  }

  function execute(Call[] calldata calls) external payable {
    for (uint256 i = 0; i < calls.length; i++) {
      Call memory call = calls[i];
      (bool success, ) = call.to.call{value: call.value}(call.data);
      require(success, "call reverted");
    }
  }
}
```

:::

## Steps

### 1. Set up Smart Contract

We will need to set up a Smart Contract to interact with. For the purposes of this guide, we will [create](https://book.getfoundry.sh/reference/forge/forge-init) and [deploy](https://book.getfoundry.sh/forge/deploying) a `BatchCallInvoker.sol` contract, however, you can use any existing deployed contract.

Firstly, [deploy a Contract](https://book.getfoundry.sh/forge/deploying) to the Network with the following source:

```solidity [BatchCallInvoker.sol]
pragma solidity ^0.8.20;

contract BatchCallInvoker {
  struct Call {
    bytes data;
    address to;
    uint256 value;
  }

  function execute(Call[] calldata calls) external payable {
    for (uint256 i = 0; i < calls.length; i++) {
      Call memory call = calls[i];
      (bool success, ) = call.to.call{value: call.value}(call.data);
      require(success, "call reverted");
    }
  }
}
```

### 2. Set up Client & Account

Next, we will need to set up a Client and Externally Owned Account to sign EIP-7702 Authorizations.

This code snippet uses the [Extending Client](/experimental/eip7702/client) guide.

```ts twoslash [config.ts]
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
```

### 3. Authorize Contract Bytecode Injection

We will need to sign an Authorization to authorize the injection of the Contract's bytecode onto the Account.

In the example below, we are:
- using the `account` attached to the `client` to sign the Authorization – this will be the Account that the Contract's bytecode will be injected into.
- creating a `contract.ts` file to store our deployed Contract artifacts (ABI and deployed Address).

:::code-group

```ts twoslash [example.ts]
import { client } from './config'
import { contractAddress } from './contract'
 
const authorization = await client.signAuthorization({ // [!code focus]
  contractAddress, // [!code focus]
}) // [!code focus]
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

```ts twoslash [config.ts]
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
```

:::

### 4. Invoke Contract Function

We can now perform batch calls by sending a Transaction to the Account (`account`) with the Authorization (`authorizationList`).

:::code-group

```ts twoslash [example.ts]
import { encodeFunctionData, parseEther } from 'viem'
import { client } from './config'
import { contractAddress } from './contract'
 
const authorization = await client.signAuthorization({
  contractAddress,
})

const hash = await client.sendTransaction({ // [!code focus]
  authorizationList: [authorization], // [!code focus]
  data: encodeFunctionData({ // [!code focus]
    abi, // [!code focus]
    functionName: 'execute', // [!code focus]
    args: [ // [!code focus]
      { // [!code focus]
        data: '0x', // [!code focus]
        to: '0xcb98643b8786950F0461f3B0edf99D88F274574D', // [!code focus]
        value: parseEther('0.001'), // [!code focus]
      }, // [!code focus]
      { // [!code focus]
        data: '0x', // [!code focus]
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B', // [!code focus]
        value: parseEther('0.002'), // [!code focus]
      }, // [!code focus]
    ], // [!code focus]
  }), // [!code focus]
  to: client.account.address, // [!code focus]
}) // [!code focus]
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

```ts twoslash [config.ts]
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')
 
export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
```

:::

### 5. Optional: Use an Invoker

We can also utilize an Invoker Account to execute a call on behalf of the authorizing Account. This is useful for cases where we want to "sponsor" the Transaction for the user (i.e. pay for their gas fees).

:::code-group

```ts twoslash [config.ts]
// @noErrors
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'

export const account = privateKeyToAccount('0x...')

export const invoker = privateKeyToAccount('0x...') // [!code ++]
 
export const client = createWalletClient({
  account, // [!code --]
  account: invoker, // [!code ++]
  chain: mainnet,
  transport: http(),
}).extend(eip7702Actions())
```

```ts twoslash [example.ts]
import { encodeFunctionData{ parseEther } from 'viem'
import { client } from './config'
import { contractAddress } from './contract'
 
const authorization = await client.signAuthorization({
  contractAddress,
})

const hash = await client.sendTransaction({
  authorizationList: [authorization],
  data: encodeFunctionData({
    abi,
    functionName: 'execute',
    args: [
      {
        data: '0x',
        to: '0xcb98643b8786950F0461f3B0edf99D88F274574D',
        value: parseEther('0.001'),
      },
      {
        data: '0x',
        to: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        value: parseEther('0.002'),
      },
    ],
  }),
  to: client.account.address,
})
```

```ts twoslash [contract.ts] filename="contract.ts"
export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const

export const contractAddress = '0x...'
```

:::