/**
 * TODO:
 * - Humanized errors.
 * - More test cases (100% coverage).
 */

import {
  AbiParameter,
  AbiParametersToPrimitiveTypes,
  AbiParameterToPrimitiveType,
} from 'abitype'
import { Hex } from '../../types'
import { concat, padHex, size } from '../data'
import { boolToHex, numberToHex, stringToHex } from '../encoding'

type PreparedParam = { dynamic: boolean; encoded: Hex }

export function encodeAbi<TParams extends readonly AbiParameter[]>({
  params,
  values,
}: {
  params: TParams
  values: AbiParametersToPrimitiveTypes<TParams>
}) {
  if (params.length !== values.length) throw new Error('TODO: length mismatch')
  const preparedParams = prepareParams({ params, values })
  return encodeParams(preparedParams)
}

/////////////////////////////////////////////////////////////////

function prepareParams<TParams extends readonly AbiParameter[]>({
  params,
  values,
}: {
  params: TParams
  values: AbiParametersToPrimitiveTypes<TParams>
}) {
  let preparedParams: PreparedParam[] = []
  for (let i = 0; i < params.length; i++) {
    preparedParams.push(prepareParam({ param: params[i], value: values[i] }))
  }
  return preparedParams
}

function prepareParam<TParam extends AbiParameter>({
  param,
  value,
}: {
  param: TParam
  value: AbiParameterToPrimitiveType<TParam>
}): PreparedParam {
  const arrayComponents = getArrayComponents(param.type)
  if (arrayComponents) {
    const [length, type] = arrayComponents
    return encodeArray(value as any, { length, param: { ...param, type } })
  }
  if (param.type === 'tuple') {
    return encodeTuple(value as any, {
      param: param as any,
    })
  }
  if (param.type === 'address') {
    return encodeAddress(value as unknown as Hex)
  }
  if (param.type === 'bool') {
    return encodeBool(value as unknown as boolean)
  }
  if (param.type.startsWith('uint') || param.type.startsWith('int')) {
    const signed = param.type.startsWith('int')
    return encodeNumber(value as unknown as number, { signed })
  }
  if (param.type.startsWith('bytes')) {
    return encodeBytes(value as unknown as Hex, { param })
  }
  if (param.type === 'string') return encodeString(value as unknown as string)

  throw new Error('TODO')
}

/////////////////////////////////////////////////////////////////

function encodeParams(preparedParams: PreparedParam[]): Hex {
  let staticSize = 0
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i]
    if (dynamic) staticSize += 32
    else staticSize += size(encoded)
  }

  let staticParams: Hex[] = []
  let dynamicParams: Hex[] = []
  let dynamicSize = 0
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i]
    if (dynamic) {
      staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }))
      dynamicParams.push(encoded)
      dynamicSize += size(encoded)
    } else {
      staticParams.push(encoded)
    }
  }

  return concat([...staticParams, ...dynamicParams])
}

/////////////////////////////////////////////////////////////////

function encodeArray<TParam extends AbiParameter>(
  value: AbiParameterToPrimitiveType<TParam>,
  {
    length,
    param,
  }: {
    length: number | null
    param: TParam
  },
): PreparedParam {
  let dynamic = length === null

  if (!Array.isArray(value)) throw new Error('TODO')
  if (!dynamic && value.length !== length) throw new Error('TODO')

  let dynamicChild = false
  let preparedParams: PreparedParam[] = []
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParam({ param, value: value[i] })
    if (preparedParam.dynamic) dynamicChild = true
    preparedParams.push(preparedParam)
  }

  if (dynamic || dynamicChild) {
    const data = encodeParams(preparedParams)
    if (dynamic) {
      const length = numberToHex(preparedParams.length, { size: 32 })
      return { dynamic: true, encoded: concat([length, data]) }
    }
    if (dynamicChild) return { dynamic: true, encoded: data }
  }
  return {
    dynamic: false,
    encoded: concat(preparedParams.map(({ encoded }) => encoded)),
  }
}

function encodeTuple<
  TParam extends AbiParameter & { components: readonly AbiParameter[] },
>(
  value: AbiParameterToPrimitiveType<TParam>,
  { param }: { param: TParam },
): PreparedParam {
  let dynamic = false
  let preparedParams: PreparedParam[] = []
  for (let i = 0; i < param.components.length; i++) {
    const param_ = param.components[i]
    const index = Array.isArray(value) ? i : param_.name
    const preparedParam = prepareParam({
      param: param_,
      value: (value as any)[index!] as any,
    })
    preparedParams.push(preparedParam)
    dynamic = preparedParam.dynamic
  }
  return {
    dynamic,
    encoded: dynamic
      ? encodeParams(preparedParams)
      : concat(preparedParams.map(({ encoded }) => encoded)),
  }
}

function encodeAddress(value: Hex): PreparedParam {
  return { dynamic: false, encoded: padHex(value.toLowerCase() as Hex) }
}

function encodeBytes<TParam extends AbiParameter>(
  value: Hex,
  { param }: { param: TParam },
): PreparedParam {
  const [_, size_] = param.type.split('bytes')
  if (!size_)
    return {
      dynamic: true,
      encoded: concat([
        padHex(numberToHex(size(value), { size: 32 })),
        padHex(value, { dir: 'right' }),
      ]),
    }
  return { dynamic: false, encoded: padHex(value) }
}

function encodeBool(value: boolean): PreparedParam {
  return { dynamic: false, encoded: padHex(boolToHex(value)) }
}

function encodeNumber(
  value: number,
  { signed }: { signed: boolean },
): PreparedParam {
  return {
    dynamic: false,
    encoded: numberToHex(value, {
      size: 32,
      signed,
    }),
  }
}

function encodeString(value: string): PreparedParam {
  return {
    dynamic: true,
    encoded: concat([
      padHex(numberToHex(value.length, { size: 32 })),
      padHex(stringToHex(value), { dir: 'right' }),
    ]),
  }
}

export function getArrayComponents(
  type: string,
): [length: number | null, innerType: string] | undefined {
  const matches = type.match(/^(.*)\[(\d+)?\]$/)
  return matches
    ? // Return `null` if the array is dynamic.
      [matches[2] ? Number(matches[2]) : null, matches[1]]
    : undefined
}
