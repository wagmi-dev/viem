import { type CreateAnvilOptions, startProxy } from '@viem/anvil'
import { poolId } from './constants.js'

export const anvilMainnet = defineAnvil({
  forkUrl: ['VITE_ANVIL_FORK_URL', 'https://cloudflare-eth.com'],
  forkBlockNumber: 16280770n,
  noMining: true,
  port: 8545,
})

export const anvilSepolia = defineAnvil({
  forkUrl: ['VITE_ANVIL_FORK_URL_SEPOLIA', 'https://rpc.sepolia.org'],
  forkBlockNumber: 5528904n,
  noMining: true,
  port: 8845,
})

export const anvilOptimism = defineAnvil({
  forkUrl: ['VITE_ANVIL_FORK_URL_OPTIMISM', 'https://mainnet.optimism.io'],
  forkBlockNumber: 113624777n,
  port: 8645,
})

export const anvilOptimismSepolia = defineAnvil({
  forkUrl: [
    'VITE_ANVIL_FORK_URL_OPTIMISM_SEPOLIA',
    'https://sepolia.optimism.io',
  ],
  forkBlockNumber: 9596779n,
  noMining: true,
  port: 8945,
})

export const anvilZkSync = defineAnvil({
  forkUrl: ['VITE_ANVIL_FORK_URL_ZKSYNC', 'https://mainnet.era.zksync.io'],
  forkBlockNumber: 25734n,
  port: 8745,
})

////////////////////////////////////////////////

type EnvKey = string
type EnvEntry<fallback> = [EnvKey, fallback]

function defineAnvil({
  forkUrl,
  forkBlockNumber,
  port,
  ...options
}: Omit<CreateAnvilOptions, 'forkBlockNumber' | 'forkUrl'> & {
  forkBlockNumber: bigint
  forkUrl: EnvEntry<string>
  port: number
}) {
  return {
    forkBlockNumber,
    forkUrl: getEnv(forkUrl)!,
    async start() {
      return await startProxy({
        port,
        options: {
          ...options,
          timeout: 60_000,
          forkUrl: getEnv(forkUrl),
          forkBlockNumber,
          startTimeout: 20_000,
        },
      })
    },
    rpcUrl: {
      http: `http://127.0.0.1:${port}/${poolId}`,
      ipc: `/tmp/anvil-${poolId}.ipc`,
      ws: `ws://127.0.0.1:${port}/${poolId}`,
    },
  }
}

const messages = new Map()
function warn(message: string) {
  if (!messages.has(message)) {
    messages.set(message, true)
    console.warn(message)
  }
}

function getEnv([key, fallback]: [EnvKey, string]) {
  if (process.env[key]) return process.env[key]
  warn(`\`process.env.${key}\` not found. Falling back to \`${fallback}\`.`)
  return fallback
}
