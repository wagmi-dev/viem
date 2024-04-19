import type { Address } from 'abitype'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import type { Chain } from '../../types/chain.js'
import type { Hash } from '../../types/misc.js'
import type { PublicZkSyncRpcSchema } from '../types/zksRpcScheme.js'

export type GetTransactionDetailsParameters = {
  txHash: Hash
}

export type TransactionDetails = {
  isL1Originated: boolean
  status: string
  fee: bigint
  gasPerPubdata: bigint
  initiatorAddress: Address
  receivedAt: Date
  ethCommitTxHash?: Hash
  ethProveTxHash?: Hash
  ethExecuteTxHash?: Hash
}

export async function getTransactionDetails<
  TChain extends Chain | undefined,
  TAccount extends Account | undefined,
>(
  client: Client<Transport, TChain, TAccount, PublicZkSyncRpcSchema>,
  parameters: GetTransactionDetailsParameters,
): Promise<TransactionDetails> {
  const result = await client.request({
    method: 'zks_getTransactionDetails',
    params: [parameters.txHash],
  })
  return result
}
