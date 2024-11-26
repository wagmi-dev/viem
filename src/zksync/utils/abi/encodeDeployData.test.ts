import { expect, test } from 'vitest'

import { encodeDeployData } from './encodeDeployData.js'

test('constructor()', () => {
  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00010000000000020000000101200190000000390000613d0000008001000039000000400010043f0000000001000416000000000101004b000000390000c13d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000190000613d000000150100004100000000001004350000002201000039000000040010043f00000016010000410000004200010430000000200130008c000000320000413d000100000003001d000000000000043500000011010000410000000002000414000000110320009c0000000002018019000000c00120021000000012011001c700008010020000390040003b0000040f0000000102200190000000390000613d000000000101043b00000001020000290000001f0220003900000005022002700000000002210019000000000321004b000000320000813d000000000001041b0000000101100039000000000321004b0000002e0000413d0000001301000041000000000010041b0000002001000039000001000010044300000120000004430000001401000041000000410001042e000000000100001900000042000104300000003e002104230000000102000039000000000001042d0000000002000019000000000001042d0000004000000432000000410001042e0000004200010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffff020000000000000000000000000000000000002000000000000000000000000048656c6c6f2c20576f726c64210000000000000000000000000000000000001a00000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000002af202f71edb0e2a8f1c84905315dc9c1758b4213e93ef36ce496650c9982e93',
    }),
  ).toEqual(
    '0x9c4d535b000000000000000000000000000000000000000000000000000000000000000001000019622c691ef99d244ed064aaedac4626adfa05c0a3d6ed34c96dcd39ce00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
  )

  expect(
    encodeDeployData({
      abi: [
        {
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00010000000000020000000101200190000000390000613d0000008001000039000000400010043f0000000001000416000000000101004b000000390000c13d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000190000613d000000150100004100000000001004350000002201000039000000040010043f00000016010000410000004200010430000000200130008c000000320000413d000100000003001d000000000000043500000011010000410000000002000414000000110320009c0000000002018019000000c00120021000000012011001c700008010020000390040003b0000040f0000000102200190000000390000613d000000000101043b00000001020000290000001f0220003900000005022002700000000002210019000000000321004b000000320000813d000000000001041b0000000101100039000000000321004b0000002e0000413d0000001301000041000000000010041b0000002001000039000001000010044300000120000004430000001401000041000000410001042e000000000100001900000042000104300000003e002104230000000102000039000000000001042d0000000002000019000000000001042d0000004000000432000000410001042e0000004200010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffff020000000000000000000000000000000000002000000000000000000000000048656c6c6f2c20576f726c64210000000000000000000000000000000000001a00000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000002af202f71edb0e2a8f1c84905315dc9c1758b4213e93ef36ce496650c9982e93',
    }),
  ).toEqual(
    '0x9c4d535b000000000000000000000000000000000000000000000000000000000000000001000019622c691ef99d244ed064aaedac4626adfa05c0a3d6ed34c96dcd39ce00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000',
  )
})

test('constructor(string)', () => {
  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [
            {
              name: '_greeting',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00050000000000020000000003010019000000600330027000000038033001970000000102200190000000510000613d0000008002000039000000400020043f0000000002000416000000000202004b000000510000c13d00000039023000410000003a0220009c000000140000213d0000003f0100004100000000001004350000004101000039000000040010043f0000004001000041000000de000104300000009f023000390000003b02200197000000400020043f0000001f0230018f0000000504300272000000230000613d00000000050000190000000506500210000000000761034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b0000001b0000413d000000000502004b000000320000613d0000000504400210000000000141034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000101043b0000010002200089000000000121022f00000000012101cf000000000151019f0000000000140435000000200130008c000000510000413d000000800400043d0000003c0140009c000000510000213d00000080033000390000009f01400039000000000131004b000000510000813d000000800240003900000000010204330000003c0510009c0000000e0000213d0000003f05100039000000200900008a000000000595016f000000400800043d0000000005580019000000000685004b000000000600001900000001060040390000003c0750009c0000000e0000213d00000001066001900000000e0000c13d000000400050043f00000000061804360000000004140019000000a004400039000000000334004b000000530000a13d0000000001000019000000de00010430000000000301004b0000005d0000613d000000000300001900000000046300190000002003300039000000000523001900000000050504330000000000540435000000000413004b000000560000413d0000000001160019000000000001043500000000040804330000003c0140009c0000000e0000213d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000710000613d0000003f0100004100000000001004350000002201000039000000110000013d000000200130008c000000970000413d000100000003001d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d000200000006001d00dc00d70000040f0000000206000029000000040900002900000005080000290000000102200190000000510000613d00000003040000290000001f024000390000000502200270000000200340008c0000000002004019000000000301043b00000001010000290000001f01100039000000050110027000000000011300190000000002230019000000000312004b000000970000813d000000000002041b0000000102200039000000000312004b000000930000413d0000001f0140008c000000c60000a13d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d00dc00d70000040f000000040300002900000005060000290000000102200190000000510000613d000000030700002900000000033701700000002002000039000000000101043b000000b80000613d0000002002000039000000000400001900000000056200190000000005050433000000000051041b000000200220003900000001011000390000002004400039000000000534004b000000b00000413d000000000373004b000000c30000813d0000000303700210000000f80330018f000000010400008a000000000334022f000000000343013f00000000026200190000000002020433000000000232016f000000000021041b00000001010000390000000102700210000000d00000013d000000000104004b0000000001000019000000ca0000613d00000000010604330000000302400210000000010300008a000000000223022f000000000232013f000000000221016f0000000101400210000000000112019f000000000010041b0000002001000039000001000010044300000120000004430000003e01000041000000dd0001042e000000da002104230000000102000039000000000001042d0000000002000019000000000001042d000000dc00000432000000dd0001042e000000de00010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000009fffffffffffffffffffffffffffffffffffffffffffffffff000000000000007f00000000000000000000000000000000000000000000000000000001ffffffe0000000000000000000000000000000000000000000000000ffffffffffffffff020000000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000007339aa929e1157106bd1ad24691c26f6c8f66cc7f001e5f865af008f9928ac2f',
      args: ['Hi there!'],
    }),
  ).toEqual(
    '0x9c4d535b000000000000000000000000000000000000000000000000000000000000000001000043dde2d7bdc56c1ae8ea23b93c50a76e6f92c750b1c399952811bff02400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000',
  )
})

test('args: deploymentType', () => {
  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [
            {
              name: '_greeting',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00050000000000020000000003010019000000600330027000000038033001970000000102200190000000510000613d0000008002000039000000400020043f0000000002000416000000000202004b000000510000c13d00000039023000410000003a0220009c000000140000213d0000003f0100004100000000001004350000004101000039000000040010043f0000004001000041000000de000104300000009f023000390000003b02200197000000400020043f0000001f0230018f0000000504300272000000230000613d00000000050000190000000506500210000000000761034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b0000001b0000413d000000000502004b000000320000613d0000000504400210000000000141034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000101043b0000010002200089000000000121022f00000000012101cf000000000151019f0000000000140435000000200130008c000000510000413d000000800400043d0000003c0140009c000000510000213d00000080033000390000009f01400039000000000131004b000000510000813d000000800240003900000000010204330000003c0510009c0000000e0000213d0000003f05100039000000200900008a000000000595016f000000400800043d0000000005580019000000000685004b000000000600001900000001060040390000003c0750009c0000000e0000213d00000001066001900000000e0000c13d000000400050043f00000000061804360000000004140019000000a004400039000000000334004b000000530000a13d0000000001000019000000de00010430000000000301004b0000005d0000613d000000000300001900000000046300190000002003300039000000000523001900000000050504330000000000540435000000000413004b000000560000413d0000000001160019000000000001043500000000040804330000003c0140009c0000000e0000213d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000710000613d0000003f0100004100000000001004350000002201000039000000110000013d000000200130008c000000970000413d000100000003001d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d000200000006001d00dc00d70000040f0000000206000029000000040900002900000005080000290000000102200190000000510000613d00000003040000290000001f024000390000000502200270000000200340008c0000000002004019000000000301043b00000001010000290000001f01100039000000050110027000000000011300190000000002230019000000000312004b000000970000813d000000000002041b0000000102200039000000000312004b000000930000413d0000001f0140008c000000c60000a13d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d00dc00d70000040f000000040300002900000005060000290000000102200190000000510000613d000000030700002900000000033701700000002002000039000000000101043b000000b80000613d0000002002000039000000000400001900000000056200190000000005050433000000000051041b000000200220003900000001011000390000002004400039000000000534004b000000b00000413d000000000373004b000000c30000813d0000000303700210000000f80330018f000000010400008a000000000334022f000000000343013f00000000026200190000000002020433000000000232016f000000000021041b00000001010000390000000102700210000000d00000013d000000000104004b0000000001000019000000ca0000613d00000000010604330000000302400210000000010300008a000000000223022f000000000232013f000000000221016f0000000101400210000000000112019f000000000010041b0000002001000039000001000010044300000120000004430000003e01000041000000dd0001042e000000da002104230000000102000039000000000001042d0000000002000019000000000001042d000000dc00000432000000dd0001042e000000de00010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000009fffffffffffffffffffffffffffffffffffffffffffffffff000000000000007f00000000000000000000000000000000000000000000000000000001ffffffe0000000000000000000000000000000000000000000000000ffffffffffffffff020000000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000007339aa929e1157106bd1ad24691c26f6c8f66cc7f001e5f865af008f9928ac2f',
      args: ['Hi there!'],
      deploymentType: 'createAccount',
    }),
  ).toEqual(
    '0xecf95b8a000000000000000000000000000000000000000000000000000000000000000001000043dde2d7bdc56c1ae8ea23b93c50a76e6f92c750b1c399952811bff024000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000',
  )

  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [
            {
              name: '_greeting',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00050000000000020000000003010019000000600330027000000038033001970000000102200190000000510000613d0000008002000039000000400020043f0000000002000416000000000202004b000000510000c13d00000039023000410000003a0220009c000000140000213d0000003f0100004100000000001004350000004101000039000000040010043f0000004001000041000000de000104300000009f023000390000003b02200197000000400020043f0000001f0230018f0000000504300272000000230000613d00000000050000190000000506500210000000000761034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b0000001b0000413d000000000502004b000000320000613d0000000504400210000000000141034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000101043b0000010002200089000000000121022f00000000012101cf000000000151019f0000000000140435000000200130008c000000510000413d000000800400043d0000003c0140009c000000510000213d00000080033000390000009f01400039000000000131004b000000510000813d000000800240003900000000010204330000003c0510009c0000000e0000213d0000003f05100039000000200900008a000000000595016f000000400800043d0000000005580019000000000685004b000000000600001900000001060040390000003c0750009c0000000e0000213d00000001066001900000000e0000c13d000000400050043f00000000061804360000000004140019000000a004400039000000000334004b000000530000a13d0000000001000019000000de00010430000000000301004b0000005d0000613d000000000300001900000000046300190000002003300039000000000523001900000000050504330000000000540435000000000413004b000000560000413d0000000001160019000000000001043500000000040804330000003c0140009c0000000e0000213d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000710000613d0000003f0100004100000000001004350000002201000039000000110000013d000000200130008c000000970000413d000100000003001d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d000200000006001d00dc00d70000040f0000000206000029000000040900002900000005080000290000000102200190000000510000613d00000003040000290000001f024000390000000502200270000000200340008c0000000002004019000000000301043b00000001010000290000001f01100039000000050110027000000000011300190000000002230019000000000312004b000000970000813d000000000002041b0000000102200039000000000312004b000000930000413d0000001f0140008c000000c60000a13d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d00dc00d70000040f000000040300002900000005060000290000000102200190000000510000613d000000030700002900000000033701700000002002000039000000000101043b000000b80000613d0000002002000039000000000400001900000000056200190000000005050433000000000051041b000000200220003900000001011000390000002004400039000000000534004b000000b00000413d000000000373004b000000c30000813d0000000303700210000000f80330018f000000010400008a000000000334022f000000000343013f00000000026200190000000002020433000000000232016f000000000021041b00000001010000390000000102700210000000d00000013d000000000104004b0000000001000019000000ca0000613d00000000010604330000000302400210000000010300008a000000000223022f000000000232013f000000000221016f0000000101400210000000000112019f000000000010041b0000002001000039000001000010044300000120000004430000003e01000041000000dd0001042e000000da002104230000000102000039000000000001042d0000000002000019000000000001042d000000dc00000432000000dd0001042e000000de00010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000009fffffffffffffffffffffffffffffffffffffffffffffffff000000000000007f00000000000000000000000000000000000000000000000000000001ffffffe0000000000000000000000000000000000000000000000000ffffffffffffffff020000000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000007339aa929e1157106bd1ad24691c26f6c8f66cc7f001e5f865af008f9928ac2f',
      args: ['Hi there!'],
      deploymentType: 'create',
    }),
  ).toEqual(
    '0x9c4d535b000000000000000000000000000000000000000000000000000000000000000001000043dde2d7bdc56c1ae8ea23b93c50a76e6f92c750b1c399952811bff02400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000',
  )

  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [
            {
              name: '_greeting',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00050000000000020000000003010019000000600330027000000038033001970000000102200190000000510000613d0000008002000039000000400020043f0000000002000416000000000202004b000000510000c13d00000039023000410000003a0220009c000000140000213d0000003f0100004100000000001004350000004101000039000000040010043f0000004001000041000000de000104300000009f023000390000003b02200197000000400020043f0000001f0230018f0000000504300272000000230000613d00000000050000190000000506500210000000000761034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b0000001b0000413d000000000502004b000000320000613d0000000504400210000000000141034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000101043b0000010002200089000000000121022f00000000012101cf000000000151019f0000000000140435000000200130008c000000510000413d000000800400043d0000003c0140009c000000510000213d00000080033000390000009f01400039000000000131004b000000510000813d000000800240003900000000010204330000003c0510009c0000000e0000213d0000003f05100039000000200900008a000000000595016f000000400800043d0000000005580019000000000685004b000000000600001900000001060040390000003c0750009c0000000e0000213d00000001066001900000000e0000c13d000000400050043f00000000061804360000000004140019000000a004400039000000000334004b000000530000a13d0000000001000019000000de00010430000000000301004b0000005d0000613d000000000300001900000000046300190000002003300039000000000523001900000000050504330000000000540435000000000413004b000000560000413d0000000001160019000000000001043500000000040804330000003c0140009c0000000e0000213d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000710000613d0000003f0100004100000000001004350000002201000039000000110000013d000000200130008c000000970000413d000100000003001d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d000200000006001d00dc00d70000040f0000000206000029000000040900002900000005080000290000000102200190000000510000613d00000003040000290000001f024000390000000502200270000000200340008c0000000002004019000000000301043b00000001010000290000001f01100039000000050110027000000000011300190000000002230019000000000312004b000000970000813d000000000002041b0000000102200039000000000312004b000000930000413d0000001f0140008c000000c60000a13d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d00dc00d70000040f000000040300002900000005060000290000000102200190000000510000613d000000030700002900000000033701700000002002000039000000000101043b000000b80000613d0000002002000039000000000400001900000000056200190000000005050433000000000051041b000000200220003900000001011000390000002004400039000000000534004b000000b00000413d000000000373004b000000c30000813d0000000303700210000000f80330018f000000010400008a000000000334022f000000000343013f00000000026200190000000002020433000000000232016f000000000021041b00000001010000390000000102700210000000d00000013d000000000104004b0000000001000019000000ca0000613d00000000010604330000000302400210000000010300008a000000000223022f000000000232013f000000000221016f0000000101400210000000000112019f000000000010041b0000002001000039000001000010044300000120000004430000003e01000041000000dd0001042e000000da002104230000000102000039000000000001042d0000000002000019000000000001042d000000dc00000432000000dd0001042e000000de00010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000009fffffffffffffffffffffffffffffffffffffffffffffffff000000000000007f00000000000000000000000000000000000000000000000000000001ffffffe0000000000000000000000000000000000000000000000000ffffffffffffffff020000000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000007339aa929e1157106bd1ad24691c26f6c8f66cc7f001e5f865af008f9928ac2f',
      args: ['Hi there!'],
      deploymentType: 'create2Account',
    }),
  ).toEqual(
    '0x5d382700000000000000000000000000000000000000000000000000000000000000000001000043dde2d7bdc56c1ae8ea23b93c50a76e6f92c750b1c399952811bff024000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000',
  )

  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [
            {
              name: '_greeting',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00050000000000020000000003010019000000600330027000000038033001970000000102200190000000510000613d0000008002000039000000400020043f0000000002000416000000000202004b000000510000c13d00000039023000410000003a0220009c000000140000213d0000003f0100004100000000001004350000004101000039000000040010043f0000004001000041000000de000104300000009f023000390000003b02200197000000400020043f0000001f0230018f0000000504300272000000230000613d00000000050000190000000506500210000000000761034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b0000001b0000413d000000000502004b000000320000613d0000000504400210000000000141034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000101043b0000010002200089000000000121022f00000000012101cf000000000151019f0000000000140435000000200130008c000000510000413d000000800400043d0000003c0140009c000000510000213d00000080033000390000009f01400039000000000131004b000000510000813d000000800240003900000000010204330000003c0510009c0000000e0000213d0000003f05100039000000200900008a000000000595016f000000400800043d0000000005580019000000000685004b000000000600001900000001060040390000003c0750009c0000000e0000213d00000001066001900000000e0000c13d000000400050043f00000000061804360000000004140019000000a004400039000000000334004b000000530000a13d0000000001000019000000de00010430000000000301004b0000005d0000613d000000000300001900000000046300190000002003300039000000000523001900000000050504330000000000540435000000000413004b000000560000413d0000000001160019000000000001043500000000040804330000003c0140009c0000000e0000213d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000710000613d0000003f0100004100000000001004350000002201000039000000110000013d000000200130008c000000970000413d000100000003001d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d000200000006001d00dc00d70000040f0000000206000029000000040900002900000005080000290000000102200190000000510000613d00000003040000290000001f024000390000000502200270000000200340008c0000000002004019000000000301043b00000001010000290000001f01100039000000050110027000000000011300190000000002230019000000000312004b000000970000813d000000000002041b0000000102200039000000000312004b000000930000413d0000001f0140008c000000c60000a13d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d00dc00d70000040f000000040300002900000005060000290000000102200190000000510000613d000000030700002900000000033701700000002002000039000000000101043b000000b80000613d0000002002000039000000000400001900000000056200190000000005050433000000000051041b000000200220003900000001011000390000002004400039000000000534004b000000b00000413d000000000373004b000000c30000813d0000000303700210000000f80330018f000000010400008a000000000334022f000000000343013f00000000026200190000000002020433000000000232016f000000000021041b00000001010000390000000102700210000000d00000013d000000000104004b0000000001000019000000ca0000613d00000000010604330000000302400210000000010300008a000000000223022f000000000232013f000000000221016f0000000101400210000000000112019f000000000010041b0000002001000039000001000010044300000120000004430000003e01000041000000dd0001042e000000da002104230000000102000039000000000001042d0000000002000019000000000001042d000000dc00000432000000dd0001042e000000de00010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000009fffffffffffffffffffffffffffffffffffffffffffffffff000000000000007f00000000000000000000000000000000000000000000000000000001ffffffe0000000000000000000000000000000000000000000000000ffffffffffffffff020000000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000007339aa929e1157106bd1ad24691c26f6c8f66cc7f001e5f865af008f9928ac2f',
      args: ['Hi there!'],
      deploymentType: 'create2',
    }),
  ).toEqual(
    '0x3cda3351000000000000000000000000000000000000000000000000000000000000000001000043dde2d7bdc56c1ae8ea23b93c50a76e6f92c750b1c399952811bff02400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000',
  )
})

test('args: salt', () => {
  expect(
    encodeDeployData({
      abi: [
        {
          inputs: [
            {
              name: '_greeting',
              type: 'string',
            },
          ],
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x00050000000000020000000003010019000000600330027000000038033001970000000102200190000000510000613d0000008002000039000000400020043f0000000002000416000000000202004b000000510000c13d00000039023000410000003a0220009c000000140000213d0000003f0100004100000000001004350000004101000039000000040010043f0000004001000041000000de000104300000009f023000390000003b02200197000000400020043f0000001f0230018f0000000504300272000000230000613d00000000050000190000000506500210000000000761034f000000000707043b000000800660003900000000007604350000000105500039000000000645004b0000001b0000413d000000000502004b000000320000613d0000000504400210000000000141034f00000003022002100000008004400039000000000504043300000000052501cf000000000525022f000000000101043b0000010002200089000000000121022f00000000012101cf000000000151019f0000000000140435000000200130008c000000510000413d000000800400043d0000003c0140009c000000510000213d00000080033000390000009f01400039000000000131004b000000510000813d000000800240003900000000010204330000003c0510009c0000000e0000213d0000003f05100039000000200900008a000000000595016f000000400800043d0000000005580019000000000685004b000000000600001900000001060040390000003c0750009c0000000e0000213d00000001066001900000000e0000c13d000000400050043f00000000061804360000000004140019000000a004400039000000000334004b000000530000a13d0000000001000019000000de00010430000000000301004b0000005d0000613d000000000300001900000000046300190000002003300039000000000523001900000000050504330000000000540435000000000413004b000000560000413d0000000001160019000000000001043500000000040804330000003c0140009c0000000e0000213d000000000100041a000000010210019000000001011002700000007f0310018f000000000301c0190000001f0130008c00000000010000190000000101002039000000010110018f000000000112004b000000710000613d0000003f0100004100000000001004350000002201000039000000110000013d000000200130008c000000970000413d000100000003001d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d000200000006001d00dc00d70000040f0000000206000029000000040900002900000005080000290000000102200190000000510000613d00000003040000290000001f024000390000000502200270000000200340008c0000000002004019000000000301043b00000001010000290000001f01100039000000050110027000000000011300190000000002230019000000000312004b000000970000813d000000000002041b0000000102200039000000000312004b000000930000413d0000001f0140008c000000c60000a13d000300000004001d000000000000043500000038010000410000000002000414000000380320009c0000000002018019000000c0012002100000003d011001c70000801002000039000500000008001d000400000009001d00dc00d70000040f000000040300002900000005060000290000000102200190000000510000613d000000030700002900000000033701700000002002000039000000000101043b000000b80000613d0000002002000039000000000400001900000000056200190000000005050433000000000051041b000000200220003900000001011000390000002004400039000000000534004b000000b00000413d000000000373004b000000c30000813d0000000303700210000000f80330018f000000010400008a000000000334022f000000000343013f00000000026200190000000002020433000000000232016f000000000021041b00000001010000390000000102700210000000d00000013d000000000104004b0000000001000019000000ca0000613d00000000010604330000000302400210000000010300008a000000000223022f000000000232013f000000000221016f0000000101400210000000000112019f000000000010041b0000002001000039000001000010044300000120000004430000003e01000041000000dd0001042e000000da002104230000000102000039000000000001042d0000000002000019000000000001042d000000dc00000432000000dd0001042e000000de00010430000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000009fffffffffffffffffffffffffffffffffffffffffffffffff000000000000007f00000000000000000000000000000000000000000000000000000001ffffffe0000000000000000000000000000000000000000000000000ffffffffffffffff020000000000000000000000000000000000002000000000000000000000000000000002000000000000000000000000000000400000010000000000000000004e487b7100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000000000000000000000000000000000000000000000000000000000000000000007339aa929e1157106bd1ad24691c26f6c8f66cc7f001e5f865af008f9928ac2f',
      args: ['Hi there!'],
      salt: '0x1234567890000000000000000000000000000000000000000000000000000000',
    }),
  ).toEqual(
    '0x9c4d535b123456789000000000000000000000000000000000000000000000000000000001000043dde2d7bdc56c1ae8ea23b93c50a76e6f92c750b1c399952811bff02400000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000094869207468657265210000000000000000000000000000000000000000000000',
  )
})

test('error: constructor not found', () => {
  expect(() =>
    encodeDeployData({
      abi: [{}],
      bytecode:
        '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220116554d4ba29ee08da9e97dc54ff9a2a65d67a648140d616fc225a25ff08c86364736f6c63430008070033',
      args: [69420n],
    }),
  ).toThrowErrorMatchingInlineSnapshot(`
    [AbiConstructorNotFoundError: A constructor was not found on the ABI.
    Make sure you are using the correct ABI and that the constructor exists on it.

    Docs: https://viem.sh/docs/contract/encodeDeployData
    Version: viem@x.y.z]
  `)
})

test('error: no inputs', () => {
  expect(() =>
    encodeDeployData({
      abi: [
        {
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220116554d4ba29ee08da9e97dc54ff9a2a65d67a648140d616fc225a25ff08c86364736f6c63430008070033',
      args: [69420n],
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `
    [AbiConstructorParamsNotFoundError: Constructor arguments were provided (\`args\`), but a constructor parameters (\`inputs\`) were not found on the ABI.
    Make sure you are using the correct ABI, and that the \`inputs\` attribute on the constructor exists.

    Docs: https://viem.sh/docs/contract/encodeDeployData
    Version: viem@x.y.z]
  `,
  )

  expect(() =>
    encodeDeployData({
      abi: [
        {
          inputs: undefined,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
      ],
      bytecode:
        '0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea2646970667358221220116554d4ba29ee08da9e97dc54ff9a2a65d67a648140d616fc225a25ff08c86364736f6c63430008070033',
      args: [69420n],
    }),
  ).toThrowErrorMatchingInlineSnapshot(
    `
    [AbiConstructorParamsNotFoundError: Constructor arguments were provided (\`args\`), but a constructor parameters (\`inputs\`) were not found on the ABI.
    Make sure you are using the correct ABI, and that the \`inputs\` attribute on the constructor exists.

    Docs: https://viem.sh/docs/contract/encodeDeployData
    Version: viem@x.y.z]
  `,
  )
})
