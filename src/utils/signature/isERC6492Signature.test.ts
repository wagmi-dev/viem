import { expect, test } from 'vitest'
import { isERC6492Signature } from './isERC6492Signature.js'

test('default', () => {
  const nonErc6492Signature =
    '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000170000000000000000000000000000000000000000000000000000000000000001517cb5e6438c7a32ba9bbc6766c6705c322c4f51bf28037af8f932e30e11c92e3b6b0080d3c2626ef4c6b0415ab036b47ca75ab9905753d7d3519fe09a56c98b0000000000000000000000000000000000000000000000000000000000000025f198086b2db17256731bc456673b96bcef23f51d1fbacdd7c4379ef65465572f0500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008a7b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a22507a435038462d5252384b387557513241574d7650677032554f776362725774564d6e656856336f4a6530222c226f726967696e223a2268747470733a2f2f6b6579732e636f696e626173652e636f6d222c2263726f73734f726967696e223a66616c73657d00000000000000000000000000000000000000000000'
  const erc6492Siganture =
    '0x0000000000000000000000000ba5ed0c6aa8c49038f819e587e2633c4a9f428a0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000e43ffba36f0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004093a5e054721e22912d422ba5fca7ac395246e7f466b72c078bb987b71c5bf8ddf92c381340e22a301b823549d04765cd155a9b52206044121881395ab82d72c80000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000260000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000170000000000000000000000000000000000000000000000000000000000000001946068e132450c0189690dc29c0eb20a504e6c5a02c42ebc647c83f4e4a2e61e786bea55ea4695b4b72ef88ea133647a07ef02f2e9c0bfd39457a7eb18b519bd0000000000000000000000000000000000000000000000000000000000000025f198086b2db17256731bc456673b96bcef23f51d1fbacdd7c4379ef65465572f050000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f77b2274797065223a22776562617574686e2e676574222c226368616c6c656e6765223a2234446462577159355831784c6b77735133584e31754736754a526f5a3731354a4643397767643332413767222c226f726967696e223a2268747470733a2f2f6b6579732e636f696e626173652e636f6d222c2263726f73734f726967696e223a66616c73652c226f746865725f6b6579735f63616e5f62655f61646465645f68657265223a22646f206e6f7420636f6d7061726520636c69656e74446174614a534f4e20616761696e737420612074656d706c6174652e205365652068747470733a2f2f676f6f2e676c2f796162506578227d0000000000000000006492649264926492649264926492649264926492649264926492649264926492'
  expect(isERC6492Signature(nonErc6492Signature)).toBe(false)
  expect(isERC6492Signature(erc6492Siganture)).toBe(true)
})
