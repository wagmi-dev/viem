import type { PublicRequests } from '../types/eip1193.js'
import type { Transport } from './transports/createTransport.js'
import type { Client, ClientConfig } from './createClient.js'
import { createClient } from './createClient.js'
import { publicActions, PublicActions } from './decorators/index.js'
import type { Chain } from '../types/index.js'

export type PublicClientConfig<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
> = Pick<
  ClientConfig<TTransport, TChain>,
  'chain' | 'key' | 'name' | 'pollingInterval' | 'transport'
>

export type PublicClient<
  TTransport extends Transport = Transport,
  TChain extends Chain = Chain,
  TIncludeActions extends boolean = true,
> = Client<TTransport, TChain, PublicRequests> &
  (TIncludeActions extends true ? PublicActions<TChain> : {})

/**
 * @description Creates a public client with a given transport.
 */
export function createPublicClient<
  TTransport extends Transport,
  TChain extends Chain,
>({
  chain,
  key = 'public',
  name = 'Public Client',
  transport,
  pollingInterval,
}: PublicClientConfig<TTransport, TChain>): PublicClient<
  TTransport,
  TChain,
  true
> {
  const client = createClient({
    chain,
    key,
    name,
    pollingInterval,
    transport,
    type: 'publicClient',
  })
  return {
    ...client,
    ...publicActions(client as PublicClient<any, any>),
  }
}
