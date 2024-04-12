import type { Address } from 'abitype'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { ChainEIP712 } from '../types/chain.js'

export async function getMainContractAddress<
  chain extends ChainEIP712 | undefined,
>(client: Client<Transport, chain>): Promise<Address> {
  const address = await client.request({ method: 'zks_getMainContract' })
  return address
}
