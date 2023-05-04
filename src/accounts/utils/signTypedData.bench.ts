import { accounts } from '../../_test/constants.js'
import { typedData } from '../../_test/constants.js'
import { signTypedData } from './signTypedData.js'
import { Wallet } from 'ethers'
import { Wallet as WalletV6 } from 'ethers@6'
import { bench, describe } from 'vitest'

const wallet = new Wallet(accounts[0].privateKey)
const walletV6 = new WalletV6(accounts[0].privateKey)

describe('Sign Typed Data', () => {
  bench('viem: `signTypedData`', async () => {
    await signTypedData({
      ...typedData.complex,
      primaryType: 'Mail',
      privateKey: accounts[0].privateKey,
    })
  })

  bench('ethers@5: `Wallet.signTypedData`', async () => {
    await wallet._signTypedData(
      typedData.complex.domain,
      typedData.complex.types as any,
      typedData.complex.message,
    )
  })

  bench('ethers@6: `Wallet.signTypedData`', async () => {
    await walletV6.signTypedData(
      typedData.complex.domain,
      typedData.complex.types as any,
      typedData.complex.message,
    )
  })
})
