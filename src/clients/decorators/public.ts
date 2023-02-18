import {
  call,
  CallArgs,
  CallResponse,
  createBlockFilter,
  CreateBlockFilterResponse,
  createEventFilter,
  CreateEventFilterArgs,
  CreateEventFilterResponse,
  createPendingTransactionFilter,
  CreatePendingTransactionFilterResponse,
  estimateGas,
  EstimateGasArgs,
  getBalance,
  GetBalanceArgs,
  GetBalanceResponse,
  getBlock,
  GetBlockArgs,
  getBlockNumber,
  GetBlockNumberArgs,
  GetBlockNumberResponse,
  GetBlockResponse,
  getBlockTransactionCount,
  GetBlockTransactionCountArgs,
  GetBlockTransactionCountResponse,
  getBytecode,
  GetBytecodeArgs,
  GetBytecodeResponse,
  getChainId,
  GetChainIdResponse,
  getFeeHistory,
  GetFeeHistoryArgs,
  GetFeeHistoryResponse,
  getFilterChanges,
  GetFilterChangesArgs,
  GetFilterChangesResponse,
  getFilterLogs,
  GetFilterLogsArgs,
  GetFilterLogsResponse,
  getGasPrice,
  GetGasPriceResponse,
  getLogs,
  getTransaction,
  GetTransactionArgs,
  getTransactionConfirmations,
  GetTransactionConfirmationsArgs,
  GetTransactionConfirmationsResponse,
  getTransactionReceipt,
  GetTransactionReceiptArgs,
  GetTransactionReceiptResponse,
  GetTransactionResponse,
  uninstallFilter,
  UninstallFilterArgs,
  UninstallFilterResponse,
  waitForTransactionReceipt,
  WaitForTransactionReceiptArgs,
  WaitForTransactionReceiptResponse,
  watchBlockNumber,
  WatchBlockNumberArgs,
  watchBlocks,
  WatchBlocksArgs,
  watchEvent,
  watchPendingTransactions,
  WatchPendingTransactionsArgs,
  GetLogsArgs,
  GetLogsResponse,
  getStorageAt,
  GetStorageAtArgs,
  GetStorageAtResponse,
  multicall,
  MulticallArgs,
  readContract,
  ReadContractArgs,
  ReadContractResponse,
  simulateContract,
  SimulateContractArgs,
  SimulateContractResponse,
  watchContractEvent,
  WatchContractEventArgs,
  WatchEventArgs,
} from '../../actions/public'
import {
  createContractEventFilter,
  CreateContractEventFilterArgs,
  CreateContractEventFilterResponse,
  estimateContractGas,
  EstimateContractGasArgs,
  EstimateContractGasResponse,
  MulticallResponse,
} from '../../contract'
import type { PublicClient } from '../createPublicClient'
import { Chain } from '../../types'

export type PublicActions<TChain extends Chain = Chain> = {
  call: (args: CallArgs<TChain>) => Promise<CallResponse>
  createBlockFilter: () => Promise<CreateBlockFilterResponse>
  createContractEventFilter: (
    args: CreateContractEventFilterArgs,
  ) => Promise<CreateContractEventFilterResponse>
  createEventFilter: (
    args: CreateEventFilterArgs,
  ) => Promise<CreateEventFilterResponse>
  createPendingTransactionFilter: () => Promise<CreatePendingTransactionFilterResponse>
  estimateContractGas: (
    args: EstimateContractGasArgs,
  ) => Promise<EstimateContractGasResponse>
  estimateGas: (args: EstimateGasArgs) => Promise<EstimateContractGasResponse>
  getBalance: (args: GetBalanceArgs) => Promise<GetBalanceResponse>
  getBlock: (args: GetBlockArgs) => Promise<GetBlockResponse<TChain>>
  getBlockNumber: (args: GetBlockNumberArgs) => Promise<GetBlockNumberResponse>
  getBlockTransactionCount: (
    args: GetBlockTransactionCountArgs,
  ) => Promise<GetBlockTransactionCountResponse>
  getBytecode: (args: GetBytecodeArgs) => Promise<GetBytecodeResponse>
  getChainId: () => Promise<GetChainIdResponse>
  getFeeHistory: (args: GetFeeHistoryArgs) => Promise<GetFeeHistoryResponse>
  getFilterChanges: (
    args: GetFilterChangesArgs,
  ) => Promise<GetFilterChangesResponse>
  getFilterLogs: (args: GetFilterLogsArgs) => Promise<GetFilterLogsResponse>
  getGasPrice: () => Promise<GetGasPriceResponse>
  getLogs: (args: GetLogsArgs) => Promise<GetLogsResponse>
  getStorageAt: (args: GetStorageAtArgs) => Promise<GetStorageAtResponse>
  getTransaction: (args: GetTransactionArgs) => Promise<GetTransactionResponse>
  getTransactionConfirmations: (
    args: GetTransactionConfirmationsArgs<TChain>,
  ) => Promise<GetTransactionConfirmationsResponse>
  getTransactionReceipt: (
    args: GetTransactionReceiptArgs,
  ) => Promise<GetTransactionReceiptResponse>
  multicall: (args: MulticallArgs) => Promise<MulticallResponse>
  readContract: (args: ReadContractArgs) => Promise<ReadContractResponse>
  simulateContract: (
    args: SimulateContractArgs,
  ) => Promise<SimulateContractResponse<TChain>>
  uninstallFilter: (
    args: UninstallFilterArgs,
  ) => Promise<UninstallFilterResponse>
  waitForTransactionReceipt: (
    args: WaitForTransactionReceiptArgs,
  ) => Promise<WaitForTransactionReceiptResponse>
  watchBlockNumber: (
    args: WatchBlockNumberArgs,
  ) => ReturnType<typeof watchBlockNumber>
  watchBlocks: (args: WatchBlocksArgs) => ReturnType<typeof watchBlocks>
  watchContractEvent: (
    args: WatchContractEventArgs,
  ) => ReturnType<typeof watchContractEvent>
  watchEvent: (args: WatchEventArgs) => ReturnType<typeof watchEvent>
  watchPendingTransactions: (
    args: WatchPendingTransactionsArgs,
  ) => ReturnType<typeof watchPendingTransactions>
}

export const publicActions = <
  TChain extends Chain,
  TClient extends PublicClient<any, any>,
>(
  client: TClient,
): PublicActions<TChain> => ({
  call: (args) => call(client, args),
  createBlockFilter: () => createBlockFilter(client),
  createContractEventFilter: (args) => createContractEventFilter(client, args),
  createEventFilter: (args) => createEventFilter(client, args),
  createPendingTransactionFilter: () => createPendingTransactionFilter(client),
  estimateContractGas: (args) => estimateContractGas(client, args),
  estimateGas: (args) => estimateGas(client, args),
  getBalance: (args) => getBalance(client, args),
  getBlock: (args) => getBlock(client, args),
  getBlockNumber: (args) => getBlockNumber(client, args),
  getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
  getBytecode: (args) => getBytecode(client, args),
  getChainId: () => getChainId(client),
  getFeeHistory: (args) => getFeeHistory(client, args),
  getFilterChanges: (args) => getFilterChanges(client, args),
  getFilterLogs: (args) => getFilterLogs(client, args),
  getGasPrice: () => getGasPrice(client),
  getLogs: (args) => getLogs(client, args),
  getStorageAt: (args) => getStorageAt(client, args),
  getTransaction: (args) => getTransaction(client, args),
  getTransactionConfirmations: (args) =>
    getTransactionConfirmations(client, args),
  getTransactionReceipt: (args) => getTransactionReceipt(client, args),
  multicall: (args) => multicall(client, args),
  readContract: (args) => readContract(client, args),
  simulateContract: (args) => simulateContract(client, args),
  uninstallFilter: (args) => uninstallFilter(client, args),
  waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
  watchBlocks: (args) => watchBlocks(client, args),
  watchBlockNumber: (args) => watchBlockNumber(client, args),
  watchContractEvent: (args) => watchContractEvent(client, args),
  watchEvent: (args) => watchEvent(client, args),
  watchPendingTransactions: (args) => watchPendingTransactions(client, args),
})
