import { describe, expect, test } from 'vitest'

import { createHttpServer } from '~test/src/utils.js'
import { BaseError } from '../errors/base.js'
import {
  HttpRequestError,
  RpcRequestError,
  TimeoutError,
} from '../errors/request.js'
import {
  ChainDisconnectedError,
  InternalRpcError,
  InvalidInputRpcError,
  InvalidParamsRpcError,
  InvalidRequestRpcError,
  JsonRpcVersionUnsupportedError,
  LimitExceededRpcError,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  ParseRpcError,
  ProviderDisconnectedError,
  ResourceNotFoundRpcError,
  ResourceUnavailableRpcError,
  SwitchChainError,
  TransactionRejectedRpcError,
  UnauthorizedProviderError,
  UnknownRpcError,
  UnsupportedProviderMethodError,
  UserRejectedRequestError,
} from '../errors/rpc.js'

import { buildRequest, shouldRetry } from './buildRequest.js'
import { getHttpRpcClient } from './rpc/http.js'

function request(url: string) {
  const httpClient = getHttpRpcClient(url)
  return async ({ method, params }: any) => {
    const { error, result } = await httpClient.request({
      body: {
        method,
        params,
      },
    })
    if (error)
      throw new RpcRequestError({
        body: { method, params },
        error,
        url,
      })
    return result
  }
}

test('default', async () => {
  const server = await createHttpServer((_req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(JSON.stringify({ result: '0x1' }))
  })

  expect(
    await buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
  ).toMatchInlineSnapshot('"0x1"')
})

describe('args', () => {
  test('retryCount', async () => {
    let retryCount = -1
    const server = await createHttpServer((_req, res) => {
      retryCount++
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          error: { code: InternalRpcError.code, message: 'message' },
        }),
      )
    })

    await expect(() =>
      buildRequest(request(server.url), { retryCount: 1 })({
        method: 'eth_blockNumber',
      }),
    ).rejects.toThrowError()
    expect(retryCount).toBe(1)
  })

  test('retryCount (lazy)', async () => {
    let retryCount = -1
    const server = await createHttpServer((_req, res) => {
      retryCount++
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          error: { code: InternalRpcError.code, message: 'message' },
        }),
      )
    })

    await expect(() =>
      buildRequest(request(server.url))(
        {
          method: 'eth_blockNumber',
        },
        { retryCount: 1 },
      ),
    ).rejects.toThrowError()
    expect(retryCount).toBe(1)
  })

  test('retryDelay', async () => {
    const start = Date.now()
    let end = 0

    const server = await createHttpServer((_req, res) => {
      end = Date.now() - start
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          error: { code: InternalRpcError.code, message: 'message' },
        }),
      )
    })

    await expect(() =>
      buildRequest(request(server.url), { retryDelay: 1000, retryCount: 1 })({
        method: 'eth_blockNumber',
      }),
    ).rejects.toThrowError()
    expect(end > 1000 && end < 1020).toBeTruthy()
  })
})

describe('behavior', () => {
  describe('error types', () => {
    test('BaseError', async () => {
      await expect(() =>
        buildRequest(() =>
          Promise.reject(new BaseError('foo', { details: 'bar' })),
        )({ method: 'eth_test' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [ViemError: foo

        Details: bar
        Version: viem@1.0.2]
      `)
    })

    test('ParseRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: ParseRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [ParseRpcError: Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('InvalidRpcRequestError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InvalidRequestRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [InvalidRequestRpcError: JSON is not a valid request object.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('MethodNotFoundRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: MethodNotFoundRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [MethodNotFoundRpcError: The method does not exist / is not available.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('InvalidParamsRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InvalidParamsRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [InvalidParamsRpcError: Invalid parameters were provided to the RPC method.
        Double check you have provided the correct parameters.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('InternalRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InternalRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [InternalRpcError: An internal error was received.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('InvalidInputRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InvalidInputRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [InvalidInputRpcError: Missing or invalid parameters.
        Double check you have provided the correct parameters.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('ResourceNotFoundRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: ResourceNotFoundRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [ResourceNotFoundRpcError: Requested resource not found.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('ResourceUnavailableRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: {
              code: ResourceUnavailableRpcError.code,
              message: 'message',
            },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [ResourceUnavailableRpcError: Requested resource not available.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('TransactionRejectedRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: {
              code: TransactionRejectedRpcError.code,
              message: 'message',
            },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `
        [TransactionRejectedRpcError: Transaction creation failed.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `,
      )
    })

    test('MethodNotSupportedRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: {
              code: MethodNotSupportedRpcError.code,
              message: 'message',
            },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [MethodNotSupportedRpcError: Method is not implemented.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('LimitExceededRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: LimitExceededRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [LimitExceededRpcError: Request exceeds defined limit.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('JsonRpcVersionUnsupportedError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: {
              code: JsonRpcVersionUnsupportedError.code,
              message: 'message',
            },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [JsonRpcVersionUnsupportedError: Version of JSON-RPC protocol is not supported.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('UserRejectedRequestError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: UserRejectedRequestError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [UserRejectedRequestError: User rejected the request.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('UserRejectedRequestError (CAIP-25 5000 error code)', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: 5000, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [UserRejectedRequestError: User rejected the request.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('UnauthorizedProviderError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: UnauthorizedProviderError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [UnauthorizedProviderError: The requested method and/or account has not been authorized by the user.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('UnsupportedProviderMethodError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: {
              code: UnsupportedProviderMethodError.code,
              message: 'message',
            },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [UnsupportedProviderMethodError: The Provider does not support the requested method.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('ProviderDisconnectedError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: ProviderDisconnectedError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [ProviderDisconnectedError: The Provider is disconnected from all chains.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('ChainDisconnectedError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: ChainDisconnectedError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [ChainDisconnectedError: The Provider is not connected to the requested chain.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('SwitchChainError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: SwitchChainError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [SwitchChainError: An error occurred when attempting to switch chain.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('InvalidParamsRpcError', async () => {
      const server = await createHttpServer((_req, res) => {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InvalidParamsRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [InvalidParamsRpcError: Invalid parameters were provided to the RPC method.
        Double check you have provided the correct parameters.

        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: message
        Version: viem@1.0.2]
      `)
    })

    test('UnknownRpcError', async () => {
      await expect(() =>
        buildRequest(() => Promise.reject(new Error('wat')))({
          method: 'eth_test',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [UnknownRpcError: An unknown RPC error occurred.

        Details: wat
        Version: viem@1.0.2]
      `)
    })

    test('TimeoutError', async () => {
      await expect(() =>
        buildRequest(() =>
          Promise.reject(
            new TimeoutError({
              body: { foo: 'bar' },
              url: 'http://localhost:8000',
            }),
          ),
        )({
          method: 'eth_test',
        }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [TimeoutError: The request took too long to respond.

        URL: http://localhost
        Request body: {"foo":"bar"}

        Details: The request timed out.
        Version: viem@1.0.2]
      `)
    })
  })

  describe('retry', () => {
    test('non-deterministic InternalRpcError', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InternalRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowError()
      expect(retryCount).toBe(3)
    })

    test('non-deterministic LimitExceededRpcError', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: LimitExceededRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowError()
      expect(retryCount).toBe(3)
    })

    test('non-deterministic UnknownRpcError', async () => {
      let retryCount = -1
      await expect(() =>
        buildRequest(() => {
          retryCount++
          return Promise.reject(new Error('wat'))
        })({
          method: 'eth_test',
        }),
      ).rejects.toThrowError()
      expect(retryCount).toBe(3)
    })

    test('non-deterministic HttpRequestError (500)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(500, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [HttpRequestError: HTTP request failed.

        Status: 500
        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: Internal Server Error
        Version: viem@1.0.2]
      `)
      expect(retryCount).toBe(3)
    })

    test('non-deterministic HttpRequestError (500 w/ Retry-After header)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Retry-After': 1,
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [HttpRequestError: HTTP request failed.

        Status: 500
        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: Internal Server Error
        Version: viem@1.0.2]
      `)
      expect(retryCount).toBe(3)
    })

    test('non-deterministic HttpRequestError (403)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(403, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [HttpRequestError: HTTP request failed.

        Status: 403
        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: Forbidden
        Version: viem@1.0.2]
      `)
      expect(retryCount).toBe(3)
    })

    test('non-deterministic HttpRequestError (408)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(408, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [HttpRequestError: HTTP request failed.

        Status: 408
        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: Request Timeout
        Version: viem@1.0.2]
      `)
      expect(retryCount).toBe(3)
    })

    test('non-deterministic HttpRequestError (413)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(413, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [HttpRequestError: HTTP request failed.

        Status: 413
        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: Payload Too Large
        Version: viem@1.0.2]
      `)
      expect(retryCount).toBe(3)
    })

    test('non-deterministic HttpRequestError (408)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(408, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowErrorMatchingInlineSnapshot(`
        [HttpRequestError: HTTP request failed.

        Status: 408
        URL: http://localhost
        Request body: {"method":"eth_blockNumber"}

        Details: Request Timeout
        Version: viem@1.0.2]
      `)
      expect(retryCount).toBe(3)
    })

    test('deterministic HttpRequestError (401)', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(401, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({}))
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowError()
      expect(retryCount).toBe(0)
    })

    test('deterministic RpcError', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: InvalidParamsRpcError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowError()
      expect(retryCount).toBe(0)
    })

    test('deterministic UserRejectedRequestError', async () => {
      let retryCount = -1
      const server = await createHttpServer((_req, res) => {
        retryCount++
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            error: { code: UserRejectedRequestError.code, message: 'message' },
          }),
        )
      })

      await expect(() =>
        buildRequest(request(server.url))({ method: 'eth_blockNumber' }),
      ).rejects.toThrowError()
      expect(retryCount).toBe(0)
    })
  })
})

describe('shouldRetry', () => {
  test('Error', () => {
    expect(shouldRetry(new BaseError('wat'))).toBe(true)
  })

  test('ParseRpcError', () => {
    expect(shouldRetry(new ParseRpcError({} as any))).toBe(false)
  })

  test('TimeoutError', () => {
    expect(shouldRetry(new TimeoutError({} as any))).toBe(true)
  })

  test('UnknownRpcError', () => {
    expect(shouldRetry(new UnknownRpcError(new Error('wat')))).toBe(true)
  })

  test('HttpRequestError (500)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 500, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (502)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 502, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (503)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 503, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (504)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 504, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (429)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 429, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (401)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 401, url: '' }),
      ),
    ).toBe(false)
  })

  test('HttpRequestError (403)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 403, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (408)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 408, url: '' }),
      ),
    ).toBe(true)
  })

  test('HttpRequestError (413)', () => {
    expect(
      shouldRetry(
        new HttpRequestError({ body: {}, details: '', status: 413, url: '' }),
      ),
    ).toBe(true)
  })

  test('InternalRpcError', () => {
    expect(shouldRetry(new InternalRpcError({} as any))).toBe(true)
  })

  test('LimitExceededRpcError', () => {
    expect(shouldRetry(new LimitExceededRpcError({} as any))).toBe(true)
  })
})
