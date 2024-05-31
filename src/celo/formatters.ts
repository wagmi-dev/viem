import type { ChainFormatters } from '../types/chain.js'
import type { Hash } from '../types/misc.js'
import type { RpcTransaction } from '../types/rpc.js'
import { hexToBigInt } from '../utils/encoding/fromHex.js'
import { defineBlock } from '../utils/formatters/block.js'
import {
  defineTransaction,
  formatTransaction,
} from '../utils/formatters/transaction.js'
import { defineTransactionRequest } from '../utils/formatters/transactionRequest.js'
import type {
  CeloBlockOverrides,
  CeloRpcTransaction,
  CeloRpcTransactionRequest,
  CeloTransaction,
  CeloTransactionRequest,
} from './types.js'
import { isCIP64 } from './utils.js'

export const formatters = {
  block: /*#__PURE__*/ defineBlock({
    format(
      args: CeloBlockOverrides & {
        transactions: readonly Hash[] | readonly CeloRpcTransaction[]
      },
    ): CeloBlockOverrides & {
      transactions: readonly Hash[] | readonly CeloTransaction[]
    } {
      const transactions = args.transactions?.map((transaction) => {
        if (typeof transaction === 'string') return transaction

        return {
          ...formatTransaction(transaction as RpcTransaction),
          feeCurrency: transaction.feeCurrency,
          ...(transaction.type !== '0x7b' // this should be changed to === 0x7c because that is the only type that uses the fields. there is nothing special about 7b
            ? {
                gatewayFee: transaction.gatewayFee
                  ? hexToBigInt(transaction.gatewayFee)
                  : null,
                gatewayFeeRecipient: transaction.gatewayFeeRecipient || null,
              }
            : {}),
        }
      }) as readonly Hash[] | readonly CeloTransaction[]
      return {
        transactions,
      }
    },
  }),
  transaction: /*#__PURE__*/ defineTransaction({
    format(args: CeloRpcTransaction): CeloTransaction {
      // it is an OP deposit transaction
      if (args.type === '0x7e')
        return {
          isSystemTx: args.isSystemTx,
          mint: args.mint ? hexToBigInt(args.mint) : undefined,
          sourceHash: args.sourceHash,
          type: 'deposit',
        } as CeloTransaction

      const transaction = { feeCurrency: args.feeCurrency } as CeloTransaction

      if (args.type === '0x7b') transaction.type = 'cip64'
      else {
        if (args.type === '0x7c') transaction.type = 'cip42'

        transaction.gatewayFee = args.gatewayFee
          ? hexToBigInt(args.gatewayFee)
          : null
        transaction.gatewayFeeRecipient = args.gatewayFeeRecipient
      }

      return transaction
    },
  }),

  transactionRequest: /*#__PURE__*/ defineTransactionRequest({
    format(args: CeloTransactionRequest): CeloRpcTransactionRequest {
      const request = {
        feeCurrency: args.feeCurrency,
      } as CeloRpcTransactionRequest

      if (isCIP64(args)) request.type = '0x7b'

      return request
    },
  }),
} as const satisfies ChainFormatters
