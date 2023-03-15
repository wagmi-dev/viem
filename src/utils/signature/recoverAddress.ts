import { secp256k1 } from '@noble/curves/secp256k1'
import type { Address, ByteArray, Hex } from '../../types'
import { checksumAddress } from '../address'
import { isHex } from '../data'
import { hexToNumber, toHex } from '../encoding'
import { keccak256 } from '../hash'

export type RecoverAddressParameters = {
  hash: Hex | ByteArray
  signature: Hex | ByteArray
}
export type RecoverAddressReturnType = Address

export function recoverAddress({
  hash,
  signature,
}: RecoverAddressParameters): RecoverAddressReturnType {
  const signatureHex = isHex(signature) ? signature : toHex(signature)
  const hashHex = isHex(hash) ? hash : toHex(hash)

  // Derive v = recoveryId + 27 from end of the signature (27 is added when signing the message)
  // The recoveryId represents the y-coordinate on the secp256k1 elliptic curve and can have a value [0, 1].
  const v = hexToNumber(`0x${signatureHex.slice(130)}`)

  const publicKey = secp256k1.Signature.fromCompact(
    signatureHex.substring(2, 130),
  )
    .addRecoveryBit(v - 27)
    .recoverPublicKey(hashHex.substring(2))
    .toHex(false)

  const address = keccak256(`0x${publicKey.substring(2)}`).substring(26)
  return checksumAddress(`0x${address}`) as Address
}
