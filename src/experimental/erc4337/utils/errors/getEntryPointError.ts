import type { BaseError } from '../../../../errors/base.js'
import type { ExactPartial } from '../../../../types/utils.js'
import {
  InitCodeFailedError,
  type InitCodeFailedErrorType,
  UnknownEntryPointError,
  type UnknownEntryPointErrorType,
} from '../../errors/entryPoint.js'
import type { UserOperation } from '../../types/userOperation.js'

export type GetEntryPointErrorParameters = ExactPartial<UserOperation>

export type GetEntryPointErrorReturnType =
  | InitCodeFailedErrorType
  | UnknownEntryPointErrorType

export function getEntryPointError(
  err: BaseError,
  args: GetEntryPointErrorParameters,
): GetEntryPointErrorReturnType {
  const message = (err.details || '').toLowerCase()

  if (InitCodeFailedError.bundlerMessage.test(message))
    return new InitCodeFailedError({
      cause: err,
      factory: args.factory,
      factoryData: args.factoryData,
      initCode: args.initCode,
    }) as any
  return new UnknownEntryPointError({
    cause: err,
  }) as any
}
