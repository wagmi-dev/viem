import type { SendTransactionParameters } from '../../actions/wallet/sendTransaction.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import type { Account } from '../../types/account.js'
import { parseAccount } from '../../utils/accounts.js'
import type { ChainEIP712 } from '../types/chain.js'
import type { PublicZkSyncRpcSchema } from '../types/eip1193.js'
import { applyL1ToL2Alias } from '../utils/applyL1ToL2Alias.js'

export type EstimateGasL1ToL2Parameters<
  chain extends ChainEIP712 | undefined = ChainEIP712 | undefined,
  account extends Account | undefined = Account | undefined,
> = SendTransactionParameters<chain, account>

export type EstimateGasL1ToL2ReturnType = bigint

export async function estimateGasL1ToL2<
  chain extends ChainEIP712 | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account, PublicZkSyncRpcSchema>,
  parameters: EstimateGasL1ToL2Parameters<chain, account>,
): Promise<EstimateGasL1ToL2ReturnType> {
  const { account: account_, ...request } = parameters
  const account = account_ ? parseAccount(account_) : client.account

  const formatters = client.chain?.formatters
  const formatted = formatters?.transactionRequest?.format({
    ...request,
    from: applyL1ToL2Alias(account!.address),
  })

  const result = await client.request({
    method: 'zks_estimateGasL1ToL2',
    params: [formatted],
  })

  return result
}
