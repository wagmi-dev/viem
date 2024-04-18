export {
  type SendTransactionErrorType,
  type SendTransactionParameters,
  type SendTransactionReturnType,
  sendTransaction,
} from './actions/sendTransaction.js'
export {
  type SendEip712TransactionErrorType,
  type SendEip712TransactionParameters,
  type SendEip712TransactionReturnType,
  sendEip712Transaction,
} from './actions/sendEip712Transaction.js'
export {
  type SignEip712TransactionErrorType,
  type SignEip712TransactionParameters,
  type SignEip712TransactionReturnType,
  signEip712Transaction,
} from './actions/signEip712Transaction.js'
export {
  type SignTransactionErrorType,
  type SignTransactionParameters,
  type SignTransactionReturnType,
  signTransaction,
} from './actions/signTransaction.js'
export {
  type DeployContractErrorType,
  type DeployContractParameters,
  type DeployContractReturnType,
  deployContract,
} from './actions/deployContract.js'

export {
  zkSync,
  zkSyncTestnet,
  zkSyncSepoliaTestnet,
} from './chains.js'

export { chainConfig } from './chainConfig.js'

export {
  eip712WalletActions,
  type Eip712WalletActions,
} from './decorators/eip712.js'

export { serializeTransaction } from './serializers.js'

export {
  publicActionsL2,
  type PublicActionsL2,
} from './decorators/publicL2.js'

export type {
  ZkSyncBlock,
  ZkSyncBlockOverrides,
  ZkSyncRpcBlock,
  ZkSyncRpcBlockOverrides,
} from './types/block.js'
export type { ChainEIP712 } from './types/chain.js'
export type {
  EIP712Domain,
  EIP712DomainFn,
  ZkSyncEip712Meta,
} from './types/eip712.js'
export type { ZkSyncFeeValues } from './types/fee.js'
export type {
  ZkSyncL2ToL1Log,
  ZkSyncLog,
  ZkSyncRpcL2ToL1Log,
  ZkSyncRpcLog,
} from './types/log.js'
export type {
  TransactionRequestEIP712,
  ZkSyncEIP712TransactionSignable,
  ZkSyncRpcTransaction,
  ZkSyncRpcTransactionEIP712,
  ZkSyncRpcTransactionPriority,
  ZkSyncRpcTransactionReceiptOverrides,
  ZkSyncRpcTransactionRequest,
  ZkSyncRpcTransactionRequestEIP712,
  ZkSyncTransaction,
  ZkSyncTransactionEIP712,
  ZkSyncTransactionReceipt,
  ZkSyncTransactionReceiptOverrides,
  ZkSyncTransactionRequest,
  ZkSyncTransactionRequestEIP712,
  ZkSyncTransactionSerializable,
  ZkSyncTransactionSerializableEIP712,
  ZkSyncTransactionSerialized,
  ZkSyncTransactionSerializedEIP712,
  ZkSyncTransactionType,
} from './types/transaction.js'

export {
  type Fee,
  type EstimateFeeParameters,
  type TransactionRequest,
  estimateFee,
} from './actions/estimateFee.js'

export {
  type GetAllBalancesParameters,
  type GetAllBalancesReturnType,
  type ZksGetAllBalancesReturnType,
  getAllBalances,
} from './actions/getAllBalances.js'

export {
  type GetBlockDetailsParameters,
  type BaseBlockDetails,
  getBlockDetails,
} from './actions/getBlockDetails.js'

export {
  type BridgeContractsReturnType,
  type ZksBridgeContractsReturnType,
  getDefaultBridgeAddresses,
} from './actions/getDefaultBridgeAddress.js'

export {
  type GetL1BatchBlockRangeParameters,
  type GetL1BatchBlockRangeReturnParameters,
  getL1BatchBlockRange,
} from './actions/getL1BatchBlockRange.js'

export {
  type GetL1BatchDetailsParameters,
  type BatchDetails,
  getL1BatchDetails,
} from './actions/getL1BatchDetails.js'

export {
  type MessageProof,
  type GetLogProofParameters,
  getLogProof,
} from './actions/getLogProof.js'

export {
  type GetRawBlockTransactionParameters,
  type RawBlockTransactions,
  getRawBlockTransactions,
} from './actions/getRawBlockTransaction.js'

export {
  type GetTransactionDetailsParameters,
  type TransactionDetails,
  getTransactionDetails,
} from './actions/getTransactionDetails.js'
