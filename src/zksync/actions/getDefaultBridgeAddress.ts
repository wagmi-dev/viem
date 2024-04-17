import type { Address } from 'abitype'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { PublicZkSyncRpcSchema } from '../../types/eip1193.js'
import type { ChainEIP712 } from '../types/chain.js'

export type BridgeContractsParameters = {
  address: `0x${string}`
}

export type BridgeContractsReturnType = {
  erc20L1: Address
  sharedL1: Address
  sharedL2: Address
}

export type ZksBridgeContractsReturnType = {
  l1Erc20DefaultBridge: Address
  l2Erc20DefaultBridge: Address
  l1WethBridge: Address
  l2WethBridge: Address
  l1SharedDefaultBridge: Address
  l2SharedDefaultBridge: Address
}

export async function getDefaultBridgeAddresses<
  chain extends ChainEIP712 | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account, PublicZkSyncRpcSchema>,
): Promise<BridgeContractsReturnType> {
  const addresses = await client.request({ method: 'zks_getBridgeContracts' })
  return {
    erc20L1: addresses.l1Erc20DefaultBridge,
    sharedL1: addresses.l1SharedDefaultBridge,
    sharedL2: addresses.l2SharedDefaultBridge,
  }
}
