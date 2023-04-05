import { test, expectTypeOf } from 'vitest'
import type {
  Contains,
  Filter,
  IsNarrowable,
  IsNever,
  IsUndefined,
  RequiredBy,
} from './utils'

test('Contains', () => {
  expectTypeOf<Contains<[true, false, true], true>>().toEqualTypeOf<true>()
  expectTypeOf<Contains<[false, false, false], true>>().toEqualTypeOf<false>()
  expectTypeOf<Contains<['a', 'b', 'c'], 'a'>>().toEqualTypeOf<true>()
})

test('Filter', () => {
  expectTypeOf<Filter<[1, 'foo', false, 'baz'], 1 | boolean>>().toEqualTypeOf<
    readonly [1, false]
  >()
})

test('IsNarrowable', () => {
  expectTypeOf<IsNarrowable<'foo', string>>().toEqualTypeOf<true>()
  expectTypeOf<IsNarrowable<string, string>>().toEqualTypeOf<false>()
})

test('IsNever', () => {
  expectTypeOf<IsNever<never>>().toEqualTypeOf<true>()

  expectTypeOf<IsNever<'never'>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<undefined>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<null>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<0>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<false>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<[]>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<{}>>().toEqualTypeOf<false>()
  expectTypeOf<IsNever<never[]>>().toEqualTypeOf<false>()
})

test('IsUndefined', () => {
  expectTypeOf<IsUndefined<undefined>>().toEqualTypeOf<true>()

  expectTypeOf<IsUndefined<never>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<'never'>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<null>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<0>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<false>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<[]>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<{}>>().toEqualTypeOf<false>()
  expectTypeOf<IsUndefined<undefined[]>>().toEqualTypeOf<false>()
})

test('RequiredBy', () => {
  expectTypeOf<
    RequiredBy<{ a?: number; b?: string; c: boolean }, 'a' | 'c'>
  >().toEqualTypeOf<{ a: number; b?: string; c: boolean }>()
})
