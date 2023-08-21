import type { CallParameters } from '../../actions/public/call.js'
import type { Chain } from '../../chains/types.js'
import type { BaseError } from '../../errors/base.js'
import { CallExecutionError } from '../../errors/contract.js'

import {
  type GetNodeErrorParameters,
  containsNodeError,
  getNodeError,
} from './getNodeError.js'

export function getCallError(
  err: BaseError,
  {
    docsPath,
    ...args
  }: CallParameters & {
    chain?: Chain
    docsPath?: string
  },
) {
  let cause = err
  if (containsNodeError(err))
    cause = getNodeError(err, args as GetNodeErrorParameters)
  return new CallExecutionError(cause, {
    docsPath,
    ...args,
  })
}
