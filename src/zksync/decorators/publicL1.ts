import type { Chain } from '../../chains/index.js'
import type { Client } from '../../clients/createClient.js'
import type { Transport } from '../../clients/transports/createTransport.js'
import { getAllowanceL1, type AllowanceL1Parameters } from '../actions/getAllowanceL1.js'
import { getBalanceOfTokenL1, type BalanceOfTokenL1Parameters } from '../actions/getBalanceOfTokenL1.js'
import type { Account } from '../../types/account.js'

export type PublicActionsL1<
    TAccount extends Account | undefined = Account | undefined,
> = {
    /**
     * Returns the amount of approved tokens for a specific L1 bridge.
     *
     * - Docs: https://viem.sh/zksync/actions/getAllowanceL1
     *
     * @param client - Client to use
     * @param parameters - {@link AllowanceL1Parameters}
     * @returns The amount of approved tokens for a specific L1 bridge. {@link bigint}
     *
     * @example
     * import { createPublicClient, custom, parseEther } from 'viem'
     * import { base, mainnet } from 'viem/chains'
     * import { publicActionsL1 } from 'viem/zksync'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: custom(window.ethereum),
     * }).extend(publicActionsL1())
     *
     * const data = await client.getAllowanceL1({
     *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
     *   token: '0x5C221E77624690fff6dd741493D735a17716c26B'
     *   bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
     * })
     *
     * @example
     * // Account Hoisting
     * import { createWalletClient, http } from 'viem'
     * import { privateKeyToAccount } from 'viem/accounts'
     * import { base, mainnet } from 'viem/chains'
     * import { publicActionsL1 } from 'viem/zksync'
     *
     * const client = createWalletClient({
     *   account: privateKeyToAccount('0x…'),
     *   chain: mainnet,
     *   transport: http(),
     * }).extend(publicActionsL1())
     *
     * const data = await client.getAllowanceL1({
     *   token: '0x5C221E77624690fff6dd741493D735a17716c26B'
     *   bridgeAddress: '0x84DbCC0B82124bee38e3Ce9a92CdE2f943bab60D',
     * })
     */
    getAllowanceL1: (
        parameters: AllowanceL1Parameters<TAccount>,
    ) => Promise<bigint>
    /**
     * Returns the amount of the ERC20 token the client has on specific address.
     *
     * - Docs: https://viem.sh/zksync/actions/getBalanceOfTokenL1
     *
     * @param client - Client to use
     * @param parameters - {@link BalanceOfTokenL1Parameters}
     * @returns The amount of approved tokens for a specific L1 bridge. {@link bigint}
     *
     * @example
     * import { createPublicClient, custom, parseEther } from 'viem'
     * import { base, mainnet } from 'viem/chains'
     * import { publicActionsL1 } from 'viem/zksync'
     *
     * const client = createPublicClient({
     *   chain: mainnet,
     *   transport: custom(window.ethereum),
     * }).extend(publicActionsL1())
     *
     * const data = await client.getBalanceOfTokenL1({
     *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
     *   token: '0x5C221E77624690fff6dd741493D735a17716c26B'
     * })
     *
     * @example
     * // Account Hoisting
     * import { createWalletClient, http } from 'viem'
     * import { privateKeyToAccount } from 'viem/accounts'
     * import { base, mainnet } from 'viem/chains'
     * import { publicActionsL1 } from 'viem/zksync'
     *
     * const client = createWalletClient({
     *   account: privateKeyToAccount('0x…'),
     *   chain: mainnet,
     *   transport: http(),
     * }).extend(publicActionsL1())
     *
     * const data = await client.getBalanceOfTokenL1({
     *   token: '0x5C221E77624690fff6dd741493D735a17716c26B'
     * })
     */
    getBalanceOfTokenL1: (
        parameters: BalanceOfTokenL1Parameters<TAccount>,
    ) => Promise<bigint>
}

export function publicActionsL1() {
    return <
        TChain extends Chain | undefined = Chain | undefined,
        TAccount extends Account | undefined = Account | undefined
    >(
        client: Client<Transport, TChain, TAccount>,
    ): PublicActionsL1<TAccount> => ({
        getAllowanceL1: (args) => getAllowanceL1(client, args),
        getBalanceOfTokenL1: (args) => getBalanceOfTokenL1(client, args),
    })
}

