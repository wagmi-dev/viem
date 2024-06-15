import type { Address, TypedDataDomain } from 'abitype'
import type { Account } from '../../../accounts/types.js'
import { parseAccount } from '../../../accounts/utils/parseAccount.js'
import {
  type GetEip712DomainParameters,
  getEip712Domain,
} from '../../../actions/public/getEip712Domain.js'
import { signTypedData } from '../../../actions/wallet/signTypedData.js'
import type { Client } from '../../../clients/createClient.js'
import type { Transport } from '../../../clients/transports/createTransport.js'
import { AccountNotFoundError } from '../../../errors/account.js'
import type { ErrorType } from '../../../errors/utils.js'
import type { GetAccountParameter } from '../../../types/account.js'
import type { Chain } from '../../../types/chain.js'
import type { Hex, SignableMessage } from '../../../types/misc.js'
import type { OneOf, RequiredBy } from '../../../types/utils.js'
import { getAction } from '../../../utils/getAction.js'
import { toPrefixedMessage } from '../../../utils/signature/toPrefixedMessage.js'

export type SignMessageParameters<
  account extends Account | undefined = Account | undefined,
> = GetAccountParameter<account> &
  Pick<GetEip712DomainParameters, 'factory' | 'factoryData'> & {
    message: SignableMessage
  } & OneOf<
    | {
        accountDomain: RequiredBy<
          TypedDataDomain,
          'chainId' | 'name' | 'verifyingContract' | 'version'
        >
      }
    | {
        accountDomain?:
          | RequiredBy<
              TypedDataDomain,
              'chainId' | 'name' | 'verifyingContract' | 'version'
            >
          | undefined
        verifier: Address
      }
  >

export type SignMessageReturnType = Hex

export type SignMessageErrorType = ErrorType

/**
 * Signs a [EIP-191](https://eips.ethereum.org/EIPS/eip-191) personal sign message via Solady's [ERC1271 `PersonalSign` format](https://github.com/Vectorized/solady/blob/678c9163550810b08f0ffb09624c9f7532392303/src/accounts/ERC1271.sol#L154-L166).
 *
 * This Action is suitable to sign messages for Smart Accounts that implement (or conform to) Solady's [ERC1271.sol](https://github.com/Vectorized/solady/blob/main/src/accounts/ERC1271.sol).
 *
 * - Docs: https://viem.sh/experimental/solady/signMessage
 *
 * With the calculated signature, you can:
 * - use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature,
 *
 * @param client - Client to use
 * @param parameters - {@link SignMessageParameters}
 * @returns The signed message. {@link SignMessageReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { signMessage } from 'viem/experimental/solady'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signMessage(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   message: 'hello world',
 *   verifier: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',
 * })
 *
 * @example
 * // Account Hoisting
 * import { createWalletClient, custom } from 'viem'
 * import { privateKeyToAccount } from 'viem/accounts'
 * import { mainnet } from 'viem/chains'
 * import { signMessage } from 'viem/experimental/solady'
 *
 * const client = createWalletClient({
 *   account: privateKeyToAccount('0x…'),
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const signature = await signMessage(client, {
 *   message: 'hello world',
 *   verifier: '0xE8Df82fA4E10e6A12a9Dab552bceA2acd26De9bb',
 * })
 */
export async function signMessage<
  chain extends Chain | undefined,
  account extends Account | undefined,
>(
  client: Client<Transport, chain, account>,
  parameters: SignMessageParameters<account>,
): Promise<SignMessageReturnType> {
  const {
    account: account_ = client.account,
    factory,
    factoryData,
    message,
    verifier,
  } = parameters

  if (!account_)
    throw new AccountNotFoundError({
      docsPath: '/experimental/solady/signMessage',
    })
  const account = parseAccount(account_)

  const domain = await (async () => {
    if (parameters.accountDomain) return parameters.accountDomain
    const {
      domain: { salt, ...domain },
    } = await getAction(
      client,
      getEip712Domain,
      'getEip712Domain',
    )({
      address: verifier!,
      factory,
      factoryData,
    })
    return domain
  })()

  return getAction(
    client,
    signTypedData,
    'signTypedData',
  )({
    account,
    domain,
    types: {
      PersonalSign: [{ name: 'prefixed', type: 'bytes' }],
    },
    primaryType: 'PersonalSign',
    message: {
      prefixed: toPrefixedMessage(message),
    },
  })
}
