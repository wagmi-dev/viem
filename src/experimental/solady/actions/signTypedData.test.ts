import type { Address } from 'abitype'
import { beforeAll, describe, expect, test } from 'vitest'

import { accounts, typedData } from '~test/src/constants.js'
import { Mock4337AccountFactory } from '../../../../test/contracts/generated.js'
import { anvilMainnet } from '../../../../test/src/anvil.js'
import { deployMock4337Account } from '../../../../test/src/utils.js'
import { privateKeyToAccount } from '../../../accounts/privateKeyToAccount.js'
import {
  mine,
  readContract,
  simulateContract,
  verifyTypedData,
  writeContract,
} from '../../../actions/index.js'
import { encodeFunctionData, pad } from '../../../utils/index.js'
import { signTypedData } from './signTypedData.js'

const client = anvilMainnet.getClient()

let verifier: Address
beforeAll(async () => {
  const { factoryAddress } = await deployMock4337Account()
  const { result, request } = await simulateContract(client, {
    account: accounts[0].address,
    abi: Mock4337AccountFactory.abi,
    address: factoryAddress,
    functionName: 'createAccount',
    args: [accounts[0].address, pad('0x0')],
  })
  verifier = result
  await writeContract(client, request)
  await mine(client, { blocks: 1 })
})

describe('default', () => {
  test('json-rpc account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: accounts[0].address,
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })

  test('local account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: privateKeyToAccount(accounts[0].privateKey),
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })
})

test('inferred account', async () => {
  const clientWithAccount = anvilMainnet.getClient({ account: true })

  const signature = await signTypedData(clientWithAccount, {
    ...typedData.complex,
    primaryType: 'Mail',
    verifier,
  })

  const result = await verifyTypedData(client, {
    ...typedData.complex,
    address: verifier,
    signature,
    primaryType: 'Mail',
  })
  expect(result).toBeTruthy()
})

describe('args: accountDomain', () => {
  test('json-rpc account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: accounts[0].address,
      accountDomain: {
        name: 'Mock4337Account',
        version: '1',
        chainId: 1,
        salt: '0x0000000000000000000000000000000000000000000000000000000000000000',
        verifyingContract: verifier,
      },
      fields: '0x0f',
      extensions: [],
      primaryType: 'Mail',
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })

  test('local account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: privateKeyToAccount(accounts[0].privateKey),
      accountDomain: {
        name: 'Mock4337Account',
        version: '1',
        chainId: 1,
        salt: '0x0000000000000000000000000000000000000000000000000000000000000000',
        verifyingContract: verifier,
      },
      fields: '0x0f',
      extensions: [],
      primaryType: 'Mail',
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })
})

describe('args: domain empty', () => {
  test('json-rpc account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: accounts[0].address,
      domain: undefined,
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: undefined,
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })

  test('local account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      domain: undefined,
      account: privateKeyToAccount(accounts[0].privateKey),
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: undefined,
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })
})

describe('args: domain chainId', () => {
  test('json-rpc account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: accounts[0].address,
      domain: {
        chainId: 1,
      },
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: {
        chainId: 1,
      },
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })

  test('local account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: privateKeyToAccount(accounts[0].privateKey),
      domain: {
        chainId: 1,
      },
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: {
        chainId: 1,
      },
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })
})

describe('args: domain name', () => {
  test('json-rpc account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: accounts[0].address,
      domain: {
        name: 'lol',
      },
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: {
        name: 'lol',
      },
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })

  test('local account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: privateKeyToAccount(accounts[0].privateKey),
      domain: {
        name: 'lol',
      },
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: {
        name: 'lol',
      },
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })
})

describe('args: domain verifyingContract', () => {
  test('json-rpc account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: accounts[0].address,
      domain: {
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: {
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })

  test('local account', async () => {
    const signature = await signTypedData(client, {
      ...typedData.complex,
      account: privateKeyToAccount(accounts[0].privateKey),
      domain: {
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      primaryType: 'Mail',
      verifier,
    })

    const result = await verifyTypedData(client, {
      ...typedData.complex,
      domain: {
        verifyingContract: '0x0000000000000000000000000000000000000000',
      },
      address: verifier,
      signature,
      primaryType: 'Mail',
    })
    expect(result).toBeTruthy()
  })
})

test('counterfactual smart account', async () => {
  const { factoryAddress } = await deployMock4337Account()

  const factoryData = encodeFunctionData({
    abi: Mock4337AccountFactory.abi,
    functionName: 'createAccount',
    args: [accounts[0].address, pad('0x1')],
  })
  const verifier = await readContract(client, {
    account: accounts[0].address,
    abi: Mock4337AccountFactory.abi,
    address: factoryAddress,
    functionName: 'getAddress',
    args: [pad('0x1')],
  })

  const signature = await signTypedData(client, {
    ...typedData.complex,
    account: accounts[0].address,
    factory: factoryAddress,
    factoryData,
    primaryType: 'Mail',
    verifier,
  })

  const result = await verifyTypedData(client, {
    ...typedData.complex,
    address: verifier,
    factory: factoryAddress,
    factoryData,
    signature,
    primaryType: 'Mail',
  })
  expect(result).toBeTruthy()
})

test('no account', async () => {
  await expect(() =>
    // @ts-expect-error
    signTypedData(client, {
      ...typedData.complex,
      primaryType: 'Mail',
      verifier,
    }),
  ).rejects.toThrowErrorMatchingInlineSnapshot(`
    [AccountNotFoundError: Could not find an Account to execute with this Action.
    Please provide an Account with the \`account\` argument on the Action, or by supplying an \`account\` to the WalletClient.

    Docs: https://viem.sh/experimental/solady/signTypedData#account
    Version: viem@x.y.z]
  `)
})
