import type { SmartAccount } from '../accounts/types.js'

/** @link https://github.com/eth-infinitism/account-abstraction/releases */
export type EntryPointVersion = '0.0' | '0.7'

export type DeriveEntryPointVersion<account extends SmartAccount | undefined> =
  account extends SmartAccount
    ? account['entryPointVersion']
    : EntryPointVersion

export type GetEntryPointVersionParameter<
  version extends EntryPointVersion | undefined,
  versionOverride extends EntryPointVersion | undefined =
    | EntryPointVersion
    | undefined,
> = {
  entryPointVersion?:
    | version
    | versionOverride
    | EntryPointVersion
    | null
    | undefined
}
