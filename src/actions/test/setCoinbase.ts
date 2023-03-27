import type { TestClient } from '../../clients/index.js'
import type { Address } from '../../types/index.js'

export type SetCoinbaseParameters = {
  /** The coinbase address. */
  address: Address
}

export async function setCoinbase(
  client: TestClient,
  { address }: SetCoinbaseParameters,
) {
  return await client.request({
    method: `${client.mode}_setCoinbase`,
    params: [address],
  })
}
