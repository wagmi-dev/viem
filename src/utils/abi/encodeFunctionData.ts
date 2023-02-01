import { Abi, ExtractAbiFunctionNames } from 'abitype'

import { AbiFunctionNotFoundError } from '../../errors'
import { ExtractArgsFromAbi, ExtractFunctionNameFromAbi } from '../../types'
import { concatHex } from '../data'
import { getFunctionSignature } from '../hash'
import { encodeAbi } from './encodeAbi'
import { formatAbiItemWithParams } from './formatAbiItemWithParams'
import { getAbiItem } from './getAbiItem'

export type EncodeFunctionDataArgs<
  TAbi extends Abi = Abi,
  TFunctionName extends string = any,
> = {
  abi: TAbi
  functionName: ExtractFunctionNameFromAbi<TAbi, TFunctionName>
} & ExtractArgsFromAbi<TAbi, TFunctionName>

export function encodeFunctionData<
  TAbi extends Abi = Abi,
  TFunctionName extends string = any,
>({ abi, args, functionName }: EncodeFunctionDataArgs<TAbi, TFunctionName>) {
  const description = getAbiItem({ abi, name: functionName })
  if (!description)
    throw new AbiFunctionNotFoundError(functionName, {
      docsPath: '/docs/contract/encodeFunctionData',
    })
  const definition = formatAbiItemWithParams(description)
  const signature = getFunctionSignature(definition)
  const data =
    'inputs' in description && description.inputs
      ? encodeAbi({
          params: description.inputs,
          values: (args ?? []) as any,
        })
      : undefined
  return concatHex([signature, data ?? '0x'])
}
