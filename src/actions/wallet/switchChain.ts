import type { WalletClientArg } from '../../clients'
import type { Chain } from '../../types'
import { numberToHex } from '../../utils'

export type SwitchChainParameters = { id: Chain['id'] }

export async function switchChain(
  client: WalletClientArg,
  { id }: SwitchChainParameters,
) {
  await client.request({
    method: 'wallet_switchEthereumChain',
    params: [
      {
        chainId: numberToHex(id),
      },
    ],
  })
}
