import { expect, test } from 'vitest'
import {
  InternalRpcError,
  InvalidInputRpcError,
  InvalidParamsRpcError,
  InvalidRequestRpcError,
  JsonRpcVersionUnsupportedError,
  LimitExceededRpcError,
  MethodNotFoundRpcError,
  MethodNotSupportedRpcError,
  ParseRpcError,
  RpcError,
  ResourceNotFoundRpcError,
  ResourceUnavailableRpcError,
  SwitchChainError,
  TransactionRejectedRpcError,
  UnknownRpcError,
  UserRejectedRequestError,
} from './request.js'
import { RpcRequestError } from './rpc.js'

test('RpcError', () => {
  expect(
    new RpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: { code: 1337, message: 'error details' },
      }),
      {
        code: 1337,
        shortMessage: 'An internal error was received.',
      },
    ),
  ).toMatchInlineSnapshot(`
    [RpcRequestError: An internal error was received.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: error details
    Version: viem@1.0.2]
  `)
})

test('RpcError', () => {
  expect(
    new RpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: { code: 1337, message: 'error details' },
      }),
      {
        shortMessage: 'An internal error was received.',
        docsPath: '/lol',
      },
    ),
  ).toMatchInlineSnapshot(`
    [RpcRequestError: An internal error was received.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Docs: https://viem.sh/lol.html
    Details: error details
    Version: viem@1.0.2]
  `)
})

test('ParseRpcError', () => {
  expect(
    new ParseRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32700,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [ParseRpcError: Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('InvalidRequestRpcError', () => {
  expect(
    new InvalidRequestRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32600,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [InvalidRequestRpcError: JSON is not a valid request object.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('MethodNotFoundRpcError', () => {
  expect(
    new MethodNotFoundRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32601,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [MethodNotFoundRpcError: The method does not exist / is not available.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('InvalidParamsRpcError', () => {
  expect(
    new InvalidParamsRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32602,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [InvalidParamsRpcError: Invalid parameters were provided to the RPC method.
    Double check you have provided the correct parameters.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('InternalRpcError', () => {
  expect(
    new InternalRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32603,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [InternalRpcError: An internal error was received.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('InvalidInputRpcError', () => {
  expect(
    new InvalidInputRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32000,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [InvalidInputRpcError: Missing or invalid parameters.
    Double check you have provided the correct parameters.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('ResourceNotFoundRpcError', () => {
  expect(
    new ResourceNotFoundRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32001,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [ResourceNotFoundRpcError: Requested resource not found.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('ResourceUnavailableRpcError', () => {
  expect(
    new ResourceUnavailableRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32002,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [ResourceUnavailableRpcError: Requested resource not available.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('TransactionRejectedRpcError', () => {
  expect(
    new TransactionRejectedRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32003,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [TransactionRejectedRpcError: Transaction creation failed.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('MethodNotSupportedRpcError', () => {
  expect(
    new MethodNotSupportedRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32004,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [MethodNotSupportedRpcError: Method is not implemented.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('LimitExceededRpcError', () => {
  expect(
    new LimitExceededRpcError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32005,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [LimitExceededRpcError: Request exceeds defined limit.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('JsonRpcVersionUnsupportedError', () => {
  expect(
    new JsonRpcVersionUnsupportedError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: -32006,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [JsonRpcVersionUnsupportedError: Version of JSON-RPC protocol is not supported.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('UserRejectedRequestError', () => {
  expect(
    new UserRejectedRequestError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: 4001,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [UserRejectedRequestError: User rejected the request.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('SwitchChainError', () => {
  expect(
    new SwitchChainError(
      new RpcRequestError({
        body: { foo: 'bar' },
        url: 'https://viem.sh',
        error: {
          code: 4902,
          message: 'message',
        },
      }),
    ),
  ).toMatchInlineSnapshot(`
    [SwitchChainError: An error occurred when attempting to switch chain.

    URL: http://localhost
    Request body: {"foo":"bar"}

    Details: message
    Version: viem@1.0.2]
  `)
})

test('UnknownRpcError', async () => {
  expect(new UnknownRpcError(new Error('oh no'))).toMatchInlineSnapshot(`
    [UnknownRpcError: An unknown RPC error occurred.

    Details: oh no
    Version: viem@1.0.2]
  `)
})
