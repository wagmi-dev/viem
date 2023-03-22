import type { PublicRequests } from '../types/eip1193'
import type { Transport } from './transports/createTransport'
import type { Client, ClientConfig } from './createClient'
import { createClient } from './createClient'
import { publicActions, PublicActions } from './decorators'
import type { Chain } from '../types'

export type PublicClientConfig<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain,
> = Pick<
  ClientConfig<TTransport, TChain>,
  'chain' | 'key' | 'name' | 'pollingInterval' | 'transport'
>

export type PublicClient<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain,
  TIncludeActions extends boolean = true,
> = Client<TTransport, TChain, PublicRequests> &
  (TIncludeActions extends true ? PublicActions<TChain> : {})

export type PublicClientArg<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
  TIncludeActions extends boolean = boolean,
> = PublicClient<TTransport, TChain, TIncludeActions>

/**
 * @description Creates a public client with a given transport.
 */
export function createPublicClient<
  TTransport extends Transport,
  TChain extends Chain | undefined,
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
    ...publicActions(client as PublicClient),
  }
}
