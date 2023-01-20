import { describe, expect, test } from 'vitest'

import {
  Abi,
  AbiFunction,
  ExtractAbiFunction,
  ExtractAbiFunctionNames,
} from 'abitype'

import { mixedAbi } from '../../../test'
import { encodeAbi, getArrayComponents } from './encodeAbi'

export function extractFunction<
  TAbi extends Abi,
  TName extends ExtractAbiFunctionNames<TAbi>,
>({
  abi,
  name,
}: {
  abi: TAbi
  name: TName
}): ExtractAbiFunction<TAbi, TName> {
  return (abi.find(
    (abi) => abi.type === 'function' && abi.name === name,
  ) as AbiFunction & {
    type: 'function'
  })! as ExtractAbiFunction<TAbi, TName>
}

describe('static', () => {
  test('uint', () => {
    expect(
      encodeAbi({
        params: extractFunction({
          abi: mixedAbi,
          name: 'staticUint',
        }).inputs,
        values: [69420n],
      }),
    ).toBe('0x0000000000000000000000000000000000000000000000000000000000010f2c')
  })

  describe('uint8', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUint8',
          }).inputs,
          values: [32],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000020',
      )
    })

    test('invalid value', () => {
      try {
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUint8',
          }).inputs,
          // @ts-expect-error
          values: [69420n],
        })
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUint8',
          }).inputs,
          // @ts-expect-error
          values: ['lol'],
        })
      } catch {}
    })
  })

  describe('uint32', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUint32',
          }).inputs,
          values: [69420],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000010f2c',
      )
    })

    test('invalid value', () => {
      try {
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUint32',
          }).inputs,
          // @ts-expect-error
          values: [69420n],
        })
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUint32',
          }).inputs,
          // @ts-expect-error
          values: ['lol'],
        })
      } catch {}
    })
  })

  describe('int', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt',
          }).inputs,
          values: [69420n],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000010f2c',
      )
    })

    test('negative (twos compliment)', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt',
          }).inputs,
          values: [-69420n],
        }),
      ).toBe(
        '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffef0d4',
      )
    })
  })

  describe('int8', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt8',
          }).inputs,
          values: [127],
        }),
      ).toBe(
        '0x000000000000000000000000000000000000000000000000000000000000007f',
      )
    })

    test('negative (twos compliment)', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt8',
          }).inputs,
          values: [-128],
        }),
      ).toBe(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff80',
      )
    })

    test('invalid value', () => {
      try {
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt8',
          }).inputs,
          // @ts-expect-error
          values: [69420n],
        })
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt8',
          }).inputs,
          // @ts-expect-error
          values: ['lol'],
        })
      } catch {}
    })
  })

  describe('int32', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt32',
          }).inputs,
          values: [2147483647],
        }),
      ).toBe(
        '0x000000000000000000000000000000000000000000000000000000007fffffff',
      )
    })

    test('negative (twos compliment)', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt8',
          }).inputs,
          values: [-2147483648],
        }),
      ).toBe(
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffff80000000',
      )
    })

    test('invalid value', () => {
      try {
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt32',
          }).inputs,
          // @ts-expect-error
          values: [69420n],
        })
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticInt32',
          }).inputs,
          // @ts-expect-error
          values: ['lol'],
        })
      } catch {}
    })
  })

  describe('address', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticAddress',
          }).inputs,
          values: ['0x14dC79964da2C08b23698B3D3cc7Ca32193d9955'],
        }),
      ).toBe(
        '0x00000000000000000000000014dc79964da2c08b23698b3d3cc7ca32193d9955',
      )
    })
  })

  describe('bool', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBoolean',
          }).inputs,
          values: [true],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000001',
      )
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBoolean',
          }).inputs,
          values: [false],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      )
    })
  })

  describe('bytes8', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBytes8',
          }).inputs,
          values: ['0x420'],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000000000000000420',
      )
    })

    test('overflow', () => {
      expect(() =>
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBytes8',
          }).inputs,
          values: [
            '0x00000000000000000000000000000000000000000000000000000000000000420',
          ],
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "Hex size (33) exceeds padding size (32).

        Version: viem@1.0.2"
      `)
    })
  })

  describe('bytes16', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBytes16',
          }).inputs,
          values: ['0x4206942069420'],
        }),
      ).toBe(
        '0x0000000000000000000000000000000000000000000000000004206942069420',
      )
    })

    test('overflow', () => {
      expect(() =>
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBytes16',
          }).inputs,
          values: [
            '0x00000000000000000000000000000000000000000000000000000000000000420',
          ],
        }),
      ).toThrowErrorMatchingInlineSnapshot(`
        "Hex size (33) exceeds padding size (32).

        Version: viem@1.0.2"
      `)
    })
  })

  describe('uint[3]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUintArray',
          }).inputs,
          values: [[69420n, 42069n, 420420420n]],
        }),
      ).toMatchInlineSnapshot(
        '"0x0000000000000000000000000000000000000000000000000000000000010f2c000000000000000000000000000000000000000000000000000000000000a45500000000000000000000000000000000000000000000000000000000190f1b44"',
      )
    })
  })

  describe('int[3]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticIntArray',
          }).inputs,
          values: [[69420n, -42069n, 420420420n]],
        }),
      ).toMatchInlineSnapshot(
        '"0x0000000000000000000000000000000000000000000000000000000000010f2cffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff5bab00000000000000000000000000000000000000000000000000000000190f1b44"',
      )
    })
  })

  describe('address[2]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticAddressArray',
          }).inputs,
          values: [
            [
              '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
              '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            ],
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000c961145a54c96e3ae9baa048c4f4d6b04c13916b000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac"',
      )
    })
  })

  describe('bool[2]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBooleanArray',
          }).inputs,
          values: [[true, false]],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('bytes8[2]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticBytes8Array',
          }).inputs,
          values: [['0x123', '0x111']],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000001230000000000000000000000000000000000000000000000000000000000000111"',
      )
    })
  })

  describe('uint[3][2]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUintNestedArray',
          }).inputs,
          values: [
            [
              [69420n, 42069n, 420420420n],
              [420n, 44n, 422n],
            ],
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x0000000000000000000000000000000000000000000000000000000000010f2c000000000000000000000000000000000000000000000000000000000000a45500000000000000000000000000000000000000000000000000000000190f1b4400000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000002c00000000000000000000000000000000000000000000000000000000000001a6"',
      )
    })
  })

  describe('uint[3][2][4]', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticUintNestedArray2',
          }).inputs,
          values: [
            [
              [
                [1n, 2n, 3n],
                [4n, 5n, 6n],
              ],
              [
                [7n, 8n, 9n],
                [10n, 11n, 12n],
              ],
              [
                [13n, 14n, 15n],
                [16n, 17n, 18n],
              ],
              [
                [19n, 20n, 21n],
                [22n, 23n, 24n],
              ],
            ],
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000700000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000009000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000b000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000f000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000110000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000001300000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000015000000000000000000000000000000000000000000000000000000000000001600000000000000000000000000000000000000000000000000000000000000170000000000000000000000000000000000000000000000000000000000000018"',
      )
    })
  })

  describe('struct: (uint256,bool,address)', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a((uint256,bool,address))" "(420,true,0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC)"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticStruct',
          }).inputs,
          values: [
            {
              x: 420n,
              y: true,
              z: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
            },
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac"',
      )
    })
  })

  describe('struct: ((uint256,bool,address),(uint256,bool,address),uint8[2])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(((uint256,bool,address),(uint256,bool,address),uint8[2]))" "((420,true,0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC),(69,false,0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b),[1,2])"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'staticStruct2',
          }).inputs,
          values: [
            {
              foo: {
                x: 420n,
                y: true,
                z: '0xa5cc3c03994DB5b0d9A5eEdD10CabaB0813678AC',
              },
              baz: {
                x: 69n,
                y: false,
                z: '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b',
              },
              x: [1, 2],
            },
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a5cc3c03994db5b0d9a5eedd10cabab0813678ac00000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c961145a54c96e3ae9baa048c4f4d6b04c13916b00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"',
      )
    })
  })

  describe('multiple params: (uint,bool,address)', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'uintBoolAddress',
          }).inputs,
          values: [420n, true, '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b'],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c961145a54c96e3ae9baa048c4f4d6b04c13916b"',
      )
    })
  })

  describe('multiple params unnamed: (uint,bool,address)', () => {
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'uintBoolAddressReturnUnnamed',
          }).outputs,
          values: [420n, true, '0xc961145a54C96E3aE9bAA048c4F4D6b04C13916b'],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c961145a54c96e3ae9baa048c4f4d6b04c13916b"',
      )
    })
  })
})

describe('dynamic', () => {
  describe('(string)', () => {
    // cast abi-encode "a(string)" "wagmi"
    test('default', () => {
      expect(
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicString',
          }).outputs,
          values: ['wagmi'],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('(string,uint,bool)', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(string,uint,bool)" "wagmi" 420 true
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'stringUintBool',
          }).inputs,
          values: ['wagmi', 420n, true],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('(uint[2],bool,string)', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(uint[2],bool,string)" "[420,69]" true "wagmi"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'uintArrayBoolString',
          }).inputs,
          values: [[420n, 69n], true, 'wagmi'],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000001a400000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000057761676d69000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('(bytes)', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(bytes)" "0x042069"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicBytes',
          }).inputs,
          values: ['0x042069'],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000030420690000000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('(uint[])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(uint[])" "[420,69,22,55]"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicUintArray',
          }).inputs,
          values: [[420n, 69n, 22n, 55n]],
        }),
      ).toMatchInlineSnapshot(
        '"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000004500000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000037"',
      )
    })
  })

  describe('(uint[][])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(uint[][])" "[[420,69]]"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicUintNestedArray',
          }).inputs,
          values: [[[420n, 69n]]],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000045"',
      )
    })

    test('complex', () => {
      expect(
        // cast abi-encode "a(uint[][])" "[[420,69],[22,55,22],[51,52,66,11]]"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicUintNestedArray',
          }).inputs,
          values: [
            [
              [420n, 69n],
              [22n, 55n, 22n],
              [51n, 52n, 66n, 11n],
            ],
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000004500000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000003700000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003300000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000000b"',
      )
    })
  })

  describe('(uint[][][])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(uint[][][])" "[[[420,69]]]"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicUintNestedNestedArray',
          }).inputs,
          values: [[[[420n, 69n]]]],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000001a40000000000000000000000000000000000000000000000000000000000000045"',
      )
    })
  })

  describe('(string[2])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(string[2])" "["wagmi","viem"]"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicStringStaticArray',
          }).inputs,
          values: [['wagmi', 'viem']],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000057761676d6900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047669656d00000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('(string[2][3])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(string[2][3])" "[["wagmi","viem"],["jake","tom"],["lol","haha"]]"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicStringNestedStaticArray',
          }).inputs,
          values: [
            [
              ['wagmi', 'viem'],
              ['jake', 'tom'],
              ['lol', 'haha'],
            ],
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000057761676d6900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047669656d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000046a616b65000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003746f6d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000036c6f6c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000046861686100000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('((uint256[],bool,string[]))', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a((uint256[],bool,string[]))" "([1,2,3,4],true,[hello,world])"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicStruct',
          }).inputs,
          values: [
            {
              x: [1n, 2n, 3n, 4n],
              y: true,
              z: ['hello', 'world'],
            },
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000568656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005776f726c64000000000000000000000000000000000000000000000000000000"',
      )
    })
  })

  describe('(((uint256[],bool,string[])),uint256,string[])', () => {
    test('default', () => {
      expect(
        // cast abi-encode "a(((uint256[],bool,string[]),uint256,string[]))" "(([1,2,3,4],true,[hello,world]),420,[wagmi,viem])"
        encodeAbi({
          params: extractFunction({
            abi: mixedAbi,
            name: 'dynamicStruct2',
          }).inputs,
          values: [
            {
              foo: {
                x: [1n, 2n, 3n, 4n],
                y: true,
                z: ['hello', 'world'],
              },
              a: 420n,
              b: ['wagmi', 'viem'],
            },
          ],
        }),
      ).toMatchInlineSnapshot(
        '"0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001a4000000000000000000000000000000000000000000000000000000000000024000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000568656c6c6f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005776f726c6400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000057761676d6900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000047669656d00000000000000000000000000000000000000000000000000000000"',
      )
    })
  })
})

test('getArrayComponents', () => {
  expect(getArrayComponents('uint256[2]')).toEqual([2, 'uint256'])
  expect(getArrayComponents('uint256[2][3]')).toEqual([3, 'uint256[2]'])
  expect(getArrayComponents('uint256[][3]')).toEqual([3, 'uint256[]'])
  expect(getArrayComponents('uint256[]')).toEqual([null, 'uint256'])
  expect(getArrayComponents('uint256[][]')).toEqual([null, 'uint256[]'])
  expect(getArrayComponents('uint256')).toBeUndefined()
})
