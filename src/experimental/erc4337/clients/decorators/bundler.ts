import type { Address } from 'abitype'
import {
  type GetChainIdReturnType,
  getChainId,
} from '../../../../actions/public/getChainId.js'
import type { Client } from '../../../../clients/createClient.js'
import type { Transport } from '../../../../clients/transports/createTransport.js'
import type { Account } from '../../../../types/account.js'
import type { Chain } from '../../../../types/chain.js'
import {
  type EstimateUserOperationGasParameters,
  type EstimateUserOperationGasReturnType,
  estimateUserOperationGas,
} from '../../actions/estimateUserOperationGas.js'
import {
  type GetSupportedEntryPointsReturnType,
  getSupportedEntryPoints,
} from '../../actions/getSupportedEntryPoints.js'
import {
  type SendUserOperationParameters,
  type SendUserOperationReturnType,
  sendUserOperation,
} from '../../actions/sendUserOperation.js'
import type { EntryPointVersion } from '../../types/entryPointVersion.js'

export type BundlerActions<
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
  entryPointVersion extends EntryPointVersion | undefined =
    | EntryPointVersion
    | undefined,
> = {
  /**
   * Returns an estimate of gas values necessary to execute the User Operation.
   *
   * - Docs: https://viem.sh/erc4337/actions/estimateUserOperationGas
   *
   * @param client - Client to use
   * @param parameters - {@link EstimateUserOperationGasParameters}
   * @returns The gas estimate (in wei). {@link EstimateUserOperationGasReturnType}
   *
   * @example
   * import { createBundlerClient, http, parseEther } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { toSimpleAccount } from 'viem/experimental'
   *
   * const account = toSimpleAccount({
   *   owner: '0x...',
   * })
   * const bundlerClient = createBundlerClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const client = createClient({
   *   chain: mainnet,
   *   transport: http(),
   * }).extend({ bundlerClient })
   *
   * const values = await bundlerClient.estimateUserOperationGas({
   *   account,
   *   callData: {
   *     to: '0x...',
   *     value: parseEther('1'),
   *   },
   * })
   */
  estimateUserOperationGas: <
    chainOverride extends Chain | undefined = undefined,
    entryPointVersionOverride extends EntryPointVersion | undefined = undefined,
  >(
    parameters: EstimateUserOperationGasParameters<
      chain,
      account,
      entryPointVersion,
      chainOverride,
      entryPointVersionOverride
    >,
  ) => Promise<
    EstimateUserOperationGasReturnType<
      entryPointVersion,
      entryPointVersionOverride
    >
  >
  /**
   * Returns the chain ID associated with the bundler.
   *
   * - Docs: https://viem.sh/docs/actions/public/getChainId
   * - JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)
   *
   * @returns The current chain ID. {@link GetChainIdReturnType}
   *
   * @example
   * import { createPublicClient, http } from 'viem'
   * import { mainnet } from 'viem/chains'
   *
   * const client = createPublicClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const chainId = await client.getChainId()
   * // 1
   */
  getChainId: () => Promise<GetChainIdReturnType>
  /**
   * Returns the EntryPoints that the bundler supports.
   *
   * - Docs: https://viem.sh/erc4337/actions/getSupportedEntryPoints
   *
   * @param client - Client to use
   * @param parameters - {@link GetSupportedEntryPointsParameters}
   * @returns Supported Entry Points. {@link GetSupportedEntryPointsReturnType}
   *
   * @example
   * import { createBundlerClient, http, parseEther } from 'viem'
   * import { mainnet } from 'viem/chains'
   *
   * const bundlerClient = createBundlerClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   *
   * const addresses = await bundlerClient.getSupportedEntryPoints()
   */
  getSupportedEntryPoints: () => Promise<GetSupportedEntryPointsReturnType>
  /**
   * Broadcasts a User Operation to the Bundler.
   *
   * - Docs: https://viem.sh/erc4337/actions/sendUserOperation
   *
   * @param client - Client to use
   * @param parameters - {@link SendUserOperationParameters}
   * @returns The User Operation hash. {@link SendUserOperationReturnType}
   *
   * @example
   * import { createBundlerClient, http, parseEther } from 'viem'
   * import { mainnet } from 'viem/chains'
   * import { toSimpleAccount } from 'viem/experimental'
   *
   * const account = toSimpleAccount({
   *   owner: '0x...',
   * })
   * const bundlerClient = createBundlerClient({
   *   chain: mainnet,
   *   transport: http(),
   * })
   * const client = createClient({
   *   chain: mainnet,
   *   transport: http(),
   * }).extend({ bundlerClient })
   *
   * const values = await bundlerClient.sendUserOperation({
   *   account,
   *   callData: {
   *     to: '0x...',
   *     value: parseEther('1'),
   *   },
   * })
   */
  sendUserOperation: <
    chainOverride extends Chain | undefined = undefined,
    entryPointVersionOverride extends EntryPointVersion | undefined = undefined,
  >(
    parameters: SendUserOperationParameters<
      chain,
      account,
      entryPointVersion,
      chainOverride,
      entryPointVersionOverride
    >,
  ) => Promise<SendUserOperationReturnType>
}

export type BundlerActionsParameters = {
  entryPoint: Address
}

export function bundlerActions() {
  return <
    transport extends Transport = Transport,
    chain extends Chain | undefined = Chain | undefined,
    account extends Account | undefined = Account | undefined,
    entryPointVersion extends EntryPointVersion | undefined =
      | EntryPointVersion
      | undefined,
  >(
    client: Client<transport, chain, account> & {
      entryPointVersion?: entryPointVersion | undefined
    },
  ): BundlerActions<chain, account, entryPointVersion> => {
    return {
      estimateUserOperationGas: (parameters) =>
        estimateUserOperationGas(client, parameters),
      getChainId: () => getChainId(client),
      getSupportedEntryPoints: () => getSupportedEntryPoints(client),
      sendUserOperation: (parameters) => sendUserOperation(client, parameters),
    }
  }
}
