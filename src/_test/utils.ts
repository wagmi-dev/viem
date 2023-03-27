/* c8 ignore start */
import type { Abi } from 'abitype'
import { Wallet } from 'ethers@6'
import errorsExample from '../../contracts/out/ErrorsExample.sol/ErrorsExample.json.js'
import {
  deployContract,
  DeployContractParameters,
  getTransactionReceipt,
  mine,
} from '../actions/index.js'
import { Chain, localhost, mainnet } from '../chains.js'
import {
  createPublicClient,
  createTestClient,
  createWalletClient,
  custom,
  http,
  webSocket,
} from '../clients/index.js'
import { getAccount as getEthersAccount } from '../ethers.js'
import type { Hex } from '../types/index.js'
import { RpcError } from '../types/eip1193.js'
import { getAccount, rpc } from '../utils/index.js'
import { baycContractConfig } from './abis.js'
import { accounts, localWsUrl } from '../constants/index.js'
import { errorsExampleABI } from './generated.js'

import type { RequestListener } from 'http'
import { createServer } from 'http'
import type { AddressInfo } from 'net'

export const anvilChain = {
  ...localhost,
  id: 1,
  contracts: mainnet.contracts,
} as const satisfies Chain

export const publicClient =
  process.env.VITE_NETWORK_TRANSPORT_MODE === 'webSocket'
    ? createPublicClient({
        chain: anvilChain,
        pollingInterval: 1_000,
        transport: webSocket(localWsUrl),
      })
    : createPublicClient({
        chain: anvilChain,
        pollingInterval: 1_000,
        transport: http(),
      })

export const walletClient = createWalletClient({
  transport: custom({
    on: (message: string, listener: (...args: any[]) => null) => {
      if (message === 'accountsChanged') {
        listener([accounts[0].address] as any)
      }
    },
    removeListener: () => null,
    request: async ({ method, params }: any) => {
      if (method === 'eth_requestAccounts') {
        return [accounts[0].address]
      }
      if (method === 'personal_sign') {
        method = 'eth_sign'
        params = [params[1], params[0]]
      }
      if (method === 'wallet_watchAsset') {
        if (params[0].type === 'ERC721') {
          throw new RpcError(-32602, 'Token type ERC721 not supported.')
        }
        return true
      }
      if (method === 'wallet_addEthereumChain') return null
      if (method === 'wallet_switchEthereumChain') {
        if (params[0].chainId === '0xfa') {
          throw new RpcError(-4902, 'Unrecognized chain.')
        }
        return null
      }
      if (
        method === 'wallet_getPermissions' ||
        method === 'wallet_requestPermissions'
      )
        return [
          {
            invoker: 'https://example.com',
            parentCapability: 'eth_accounts',
            caveats: [
              {
                type: 'filterResponse',
                value: ['0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb'],
              },
            ],
          },
        ]

      const { result } = await rpc.http(anvilChain.rpcUrls.default.http[0], {
        body: {
          method,
          params,
        },
      })
      return result
    },
  }),
})

export const testClient = createTestClient({
  chain: anvilChain,
  mode: 'anvil',
  transport: http(),
})

export const getLocalAccount = (privateKey: Hex) =>
  getEthersAccount(new Wallet(privateKey))

export function createHttpServer(
  handler: RequestListener,
): Promise<{ close: () => Promise<unknown>; url: string }> {
  const server = createServer(handler)

  const closeAsync = () =>
    new Promise((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve(undefined))),
    )

  return new Promise((resolve) => {
    server.listen(() => {
      const { port } = server.address() as AddressInfo
      resolve({ close: closeAsync, url: `http://localhost:${port}` })
    })
  })
}

export async function deploy<TAbi extends Abi = Abi>(
  args: DeployContractParameters<Chain, TAbi>,
) {
  const hash = await deployContract(walletClient, args)
  await mine(testClient, { blocks: 1 })
  const { contractAddress } = await getTransactionReceipt(publicClient, {
    hash,
  })
  return { contractAddress }
}

export async function deployBAYC() {
  return deploy({
    ...baycContractConfig,
    args: ['Bored Ape Wagmi Club', 'BAYC', 69420n, 0n],
    account: getAccount(accounts[0].address),
  })
}

export async function deployErrorExample() {
  return deploy({
    abi: errorsExampleABI,
    bytecode: errorsExample.bytecode.object as Hex,
    account: getAccount(accounts[0].address),
  })
}
/* c8 ignore stop */
