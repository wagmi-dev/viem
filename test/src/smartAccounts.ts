import { solady } from '../../src/accounts/implementations/solady.js'
import { toSmartAccount } from '../../src/accounts/toSmartAccount.js'
import { mine, writeContract } from '../../src/actions/index.js'
import { entryPoint06Abi } from '../../src/constants/abis.js'
import { parseEther } from '../../src/index.js'
import { anvilMainnet } from './anvil.js'
import { accounts } from './constants.js'
import { deployMock4337Account_06, deployMock4337Account_07 } from './utils.js'

const client = anvilMainnet.getClient()

export async function getSmartAccounts_07() {
  const { factoryAddress } = await deployMock4337Account_07()

  const accounts_ = []

  for (const salt of [
    '0x0',
    '0x1',
    '0x2',
    '0x3',
    '0x4',
    '0x5',
    '0x6',
    '0x7',
    '0x8',
    '0x9',
  ] as const) {
    const account = await toSmartAccount({
      client,
      implementation: solady({
        factoryAddress,
        owner: accounts[0].address,
        salt,
      }),
    })
    await writeContract(client, {
      account: accounts[9].address,
      address: account.address,
      abi: account.abi,
      functionName: 'addDeposit',
      value: parseEther('100'),
    })
    accounts_.push(account)
  }

  await mine(client, {
    blocks: 1,
  })

  return accounts_
}

export async function getSmartAccounts_06() {
  const { factoryAddress } = await deployMock4337Account_06()

  const accounts_ = []

  for (const salt of [
    '0x0',
    '0x1',
    '0x2',
    '0x3',
    '0x4',
    '0x5',
    '0x6',
    '0x7',
    '0x8',
    '0x9',
  ] as const) {
    const account = await toSmartAccount({
      client,
      implementation: solady({
        entryPoint: {
          abi: entryPoint06Abi,
          address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
          version: '0.6',
        },
        factoryAddress,
        owner: accounts[0].address,
        salt,
      }),
    })
    await writeContract(client, {
      account: accounts[9].address,
      address: account.address,
      abi: account.abi,
      functionName: 'addDeposit',
      value: parseEther('100'),
    })
    accounts_.push(account)
  }

  await mine(client, {
    blocks: 1,
  })

  return accounts_
}
