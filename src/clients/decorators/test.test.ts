import { describe, expect, test } from 'vitest'
import { getAccount, parseEther, parseGwei } from '../../utils/index.js'
import {
  accounts,
  address,
  initialBlockNumber,
  publicClient,
  testClient,
  walletClient,
} from '../../_test.js'
import { testActions } from './test.js'

const bytecode =
  '0x60806040526000600355600019600955600c80546001600160a01b031916737a250d5630b4cf539739df2c5dacb4c659f2488d1790553480156200004257600080fd5b506040516200197138038062001971833981810160405260808110156200006857600080fd5b81019080805160405193929190846401000000008211156200008957600080fd5b9083019060208201858111156200009f57600080fd5b8251640100000000811182820188101715620000ba57600080fd5b82525081516020918201929091019080838360005b83811015620000e9578181015183820152602001620000cf565b50505050905090810190601f168015620001175780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200013b57600080fd5b9083019060208201858111156200015157600080fd5b82516401000000008111828201881017156200016c57600080fd5b82525081516020918201929091019080838360005b838110156200019b57818101518382015260200162000181565b50505050905090810190601f168015620001c95780820380516001836020036101000a031916815260200191505b506040908152602082810151929091015186519294509250620001f291600691870190620003db565b50825162000208906007906020860190620003db565b506008805460ff19166012179055600a80546001600160a01b038084166001600160a01b0319928316811793849055600b805490931617909155620002629116670de0b6b3a764000084026001600160e01b036200026c16565b5050505062000480565b600a546001600160a01b03163314620002cc576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b620002e8816005546200037960201b620013691790919060201c565b600555600a546001600160a01b0316600090815260208181526040909120546200031d9183906200136962000379821b17901c565b600a546001600160a01b0390811660009081526020818152604080832094909455835185815293519286169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600082820183811015620003d4576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200041e57805160ff19168380011785556200044e565b828001600101855582156200044e579182015b828111156200044e57825182559160200191906001019062000431565b506200045c92915062000460565b5090565b6200047d91905b808211156200045c576000815560010162000467565b90565b6114e180620004906000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806352b0f19611610097578063a9059cbb11610066578063a9059cbb14610472578063b2bdfa7b1461049e578063dd62ed3e146104c2578063e1268115146104f0576100f5565b806352b0f196146102f457806370a082311461041e57806380b2122e1461044457806395d89b411461046a576100f5565b806318160ddd116100d357806318160ddd1461025a57806323b872dd14610274578063313ce567146102aa5780634e6ec247146102c8576100f5565b8063043fa39e146100fa57806306fdde031461019d578063095ea7b31461021a575b600080fd5b61019b6004803603602081101561011057600080fd5b810190602081018135600160201b81111561012a57600080fd5b82018360208201111561013c57600080fd5b803590602001918460208302840111600160201b8311171561015d57600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610591945050505050565b005b6101a5610686565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101df5781810151838201526020016101c7565b50505050905090810190601f16801561020c5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102466004803603604081101561023057600080fd5b506001600160a01b03813516906020013561071c565b604080519115158252519081900360200190f35b610262610739565b60408051918252519081900360200190f35b6102466004803603606081101561028a57600080fd5b506001600160a01b0381358116916020810135909116906040013561073f565b6102b26107cc565b6040805160ff9092168252519081900360200190f35b61019b600480360360408110156102de57600080fd5b506001600160a01b0381351690602001356107d5565b61019b6004803603606081101561030a57600080fd5b81359190810190604081016020820135600160201b81111561032b57600080fd5b82018360208201111561033d57600080fd5b803590602001918460208302840111600160201b8311171561035e57600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295949360208101935035915050600160201b8111156103ad57600080fd5b8201836020820111156103bf57600080fd5b803590602001918460208302840111600160201b831117156103e057600080fd5b9190808060200260200160405190810160405280939291908181526020018383602002808284376000920191909152509295506108d1945050505050565b6102626004803603602081101561043457600080fd5b50356001600160a01b03166109ea565b61019b6004803603602081101561045a57600080fd5b50356001600160a01b0316610a05565b6101a5610a6f565b6102466004803603604081101561048857600080fd5b506001600160a01b038135169060200135610ad0565b6104a6610ae4565b604080516001600160a01b039092168252519081900360200190f35b610262600480360360408110156104d857600080fd5b506001600160a01b0381358116916020013516610af3565b61019b6004803603602081101561050657600080fd5b810190602081018135600160201b81111561052057600080fd5b82018360208201111561053257600080fd5b803590602001918460208302840111600160201b8311171561055357600080fd5b919080806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250929550610b1e945050505050565b600a546001600160a01b031633146105d9576040805162461bcd60e51b815260206004820152600660248201526510b7bbb732b960d11b604482015290519081900360640190fd5b60005b8151811015610682576001600260008484815181106105f757fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff02191690831515021790555060006001600084848151811061064857fe5b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff19169115159190911790556001016105dc565b5050565b60068054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107125780601f106106e757610100808354040283529160200191610712565b820191906000526020600020905b8154815290600101906020018083116106f557829003601f168201915b5050505050905090565b6000610730610729610c0e565b8484610c12565b50600192915050565b60055490565b600061074c848484610cfe565b6107c284610758610c0e565b6107bd8560405180606001604052806028815260200161143b602891396001600160a01b038a16600090815260046020526040812090610796610c0e565b6001600160a01b03168152602081019190915260400160002054919063ffffffff6112d216565b610c12565b5060019392505050565b60085460ff1690565b600a546001600160a01b03163314610834576040805162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015290519081900360640190fd5b600554610847908263ffffffff61136916565b600555600a546001600160a01b0316600090815260208190526040902054610875908263ffffffff61136916565b600a546001600160a01b0390811660009081526020818152604080832094909455835185815293519286169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35050565b600a546001600160a01b03163314610919576040805162461bcd60e51b815260206004820152600660248201526510b7bbb732b960d11b604482015290519081900360640190fd5b60005b82518110156109e45761095583828151811061093457fe5b602002602001015183838151811061094857fe5b6020026020010151610ad0565b50838110156109dc57600180600085848151811061096f57fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff0219169083151502179055506109dc8382815181106109bd57fe5b6020908102919091010151600c546001600160a01b0316600019610c12565b60010161091c565b50505050565b6001600160a01b031660009081526020819052604090205490565b600a546001600160a01b03163314610a4d576040805162461bcd60e51b815260206004820152600660248201526510b7bbb732b960d11b604482015290519081900360640190fd5b600b80546001600160a01b0319166001600160a01b0392909216919091179055565b60078054604080516020601f60026000196101006001881615020190951694909404938401819004810282018101909252828152606093909290918301828280156107125780601f106106e757610100808354040283529160200191610712565b6000610730610add610c0e565b8484610cfe565b600a546001600160a01b031681565b6001600160a01b03918216600090815260046020908152604080832093909416825291909152205490565b600a546001600160a01b03163314610b66576040805162461bcd60e51b815260206004820152600660248201526510b7bbb732b960d11b604482015290519081900360640190fd5b60005b8151811015610682576001806000848481518110610b8357fe5b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060006101000a81548160ff021916908315150217905550600060026000848481518110610bd457fe5b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff1916911515919091179055600101610b69565b3390565b6001600160a01b038316610c575760405162461bcd60e51b81526004018080602001828103825260248152602001806114886024913960400191505060405180910390fd5b6001600160a01b038216610c9c5760405162461bcd60e51b81526004018080602001828103825260228152602001806113f36022913960400191505060405180910390fd5b6001600160a01b03808416600081815260046020908152604080832094871680845294825291829020859055815185815291517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259281900390910190a3505050565b600b54600a548491849184916001600160a01b039182169116148015610d315750600a546001600160a01b038481169116145b15610eb557600b80546001600160a01b0319166001600160a01b03848116919091179091558616610d935760405162461bcd60e51b81526004018080602001828103825260258152602001806114636025913960400191505060405180910390fd5b6001600160a01b038516610dd85760405162461bcd60e51b81526004018080602001828103825260238152602001806113d06023913960400191505060405180910390fd5b610de38686866113ca565b610e2684604051806060016040528060268152602001611415602691396001600160a01b038916600090815260208190526040902054919063ffffffff6112d216565b6001600160a01b038088166000908152602081905260408082209390935590871681522054610e5b908563ffffffff61136916565b6001600160a01b038087166000818152602081815260409182902094909455805188815290519193928a16927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a36112ca565b600a546001600160a01b0384811691161480610ede5750600b546001600160a01b038481169116145b80610ef65750600a546001600160a01b038381169116145b15610f7957600a546001600160a01b038481169116148015610f295750816001600160a01b0316836001600160a01b0316145b15610f345760038190555b6001600160a01b038616610d935760405162461bcd60e51b81526004018080602001828103825260258152602001806114636025913960400191505060405180910390fd5b6001600160a01b03831660009081526001602081905260409091205460ff1615151415610fe5576001600160a01b038616610d935760405162461bcd60e51b81526004018080602001828103825260258152602001806114636025913960400191505060405180910390fd5b6001600160a01b03831660009081526002602052604090205460ff1615156001141561106f57600b546001600160a01b03848116911614806110345750600c546001600160a01b038381169116145b610f345760405162461bcd60e51b81526004018080602001828103825260268152602001806114156026913960400191505060405180910390fd5b60035481101561110357600b546001600160a01b0383811691161415610f34576001600160a01b0383811660009081526002602090815260408083208054600160ff1991821681179092559252909120805490911690558616610d935760405162461bcd60e51b81526004018080602001828103825260258152602001806114636025913960400191505060405180910390fd5b600b546001600160a01b038481169116148061112c5750600c546001600160a01b038381169116145b6111675760405162461bcd60e51b81526004018080602001828103825260268152602001806114156026913960400191505060405180910390fd5b6001600160a01b0386166111ac5760405162461bcd60e51b81526004018080602001828103825260258152602001806114636025913960400191505060405180910390fd5b6001600160a01b0385166111f15760405162461bcd60e51b81526004018080602001828103825260238152602001806113d06023913960400191505060405180910390fd5b6111fc8686866113ca565b61123f84604051806060016040528060268152602001611415602691396001600160a01b038916600090815260208190526040902054919063ffffffff6112d216565b6001600160a01b038088166000908152602081905260408082209390935590871681522054611274908563ffffffff61136916565b6001600160a01b038087166000818152602081815260409182902094909455805188815290519193928a16927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef92918290030190a35b505050505050565b600081848411156113615760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b8381101561132657818101518382015260200161130e565b50505050905090810190601f1680156113535780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b505050900390565b6000828201838110156113c3576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b9392505050565b50505056fe45524332303a207472616e7366657220746f20746865207a65726f206164647265737345524332303a20617070726f766520746f20746865207a65726f206164647265737345524332303a207472616e7366657220616d6f756e7420657863656564732062616c616e636545524332303a207472616e7366657220616d6f756e74206578636565647320616c6c6f77616e636545524332303a207472616e736665722066726f6d20746865207a65726f206164647265737345524332303a20617070726f76652066726f6d20746865207a65726f2061646472657373a2646970667358221220429310b0a61af322d78e657c431f1c87f50b2d5caf027f14004be851bad8755064736f6c63430006060033000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000003b9aca00000000000000000000000000a158e67a82bb1dd234d44f72c0ba33ddcf59b4a2000000000000000000000000000000000000000000000000000000000000000b5741474d49474f54434849000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b5741474d49474f54434849000000000000000000000000000000000000000000'

test('default', async () => {
  expect(testActions(testClient as any)).toMatchInlineSnapshot(`
    {
      "dropTransaction": [Function],
      "getAutomine": [Function],
      "getTxpoolContent": [Function],
      "getTxpoolStatus": [Function],
      "impersonateAccount": [Function],
      "increaseTime": [Function],
      "inspectTxpool": [Function],
      "mine": [Function],
      "removeBlockTimestampInterval": [Function],
      "reset": [Function],
      "revert": [Function],
      "sendUnsignedTransaction": [Function],
      "setAutomine": [Function],
      "setBalance": [Function],
      "setBlockGasLimit": [Function],
      "setBlockTimestampInterval": [Function],
      "setCode": [Function],
      "setCoinbase": [Function],
      "setIntervalMining": [Function],
      "setLoggingEnabled": [Function],
      "setMinGasPrice": [Function],
      "setNextBlockBaseFeePerGas": [Function],
      "setNextBlockTimestamp": [Function],
      "setNonce": [Function],
      "setRpcUrl": [Function],
      "setStorageAt": [Function],
      "snapshot": [Function],
      "stopImpersonatingAccount": [Function],
    }
  `)
})

describe('smoke test', () => {
  test('dropTransaction', async () => {
    const hash = await walletClient.sendTransaction({
      account: getAccount(accounts[6].address),
      to: accounts[7].address,
      value: parseEther('2'),
    })
    expect(await testClient.dropTransaction({ hash })).toBeDefined()
  })

  // TODO: Anvil sometimes stops interval mining when automining is programatically set.
  test.skip('getAutomine', async () => {
    expect(await testClient.getAutomine()).toBeDefined()
  })

  test('getTxpoolContent', async () => {
    expect(await testClient.getTxpoolContent()).toBeDefined()
  })

  test('getTxpoolStatus', async () => {
    expect(await testClient.getTxpoolStatus()).toBeDefined()
  })

  test.skip('impersonateAccount', async () => {
    await testClient.impersonateAccount({ address: accounts[0].address })
    await testClient.stopImpersonatingAccount({
      address: accounts[0].address,
    })
  })

  test('increaseTime', async () => {
    expect(await testClient.increaseTime({ seconds: 1 })).toBeDefined()
  })

  test('inspectTxpool', async () => {
    expect(await testClient.inspectTxpool()).toBeDefined()
  })

  test('mine', async () => {
    expect(await testClient.mine({ blocks: 1 })).toBeDefined()
  })

  test('removeBlockTimestampInterval', async () => {
    expect(await testClient.removeBlockTimestampInterval()).toBeDefined()
  })

  test('reset', async () => {
    expect(
      await testClient.reset({ blockNumber: initialBlockNumber }),
    ).toBeDefined()
  })

  test('revert', async () => {
    const id = await testClient.snapshot()
    expect(await testClient.revert({ id })).toBeDefined()
  })

  test('sendUnsignedTransaction', async () => {
    expect(
      await testClient.sendUnsignedTransaction({
        from: accounts[6].address,
        to: accounts[7].address,
        value: parseEther('1'),
      }),
    ).toBeDefined()
  })

  // TODO: Anvil sometimes stops interval mining when automining is programatically set.
  test.skip('setAutomine', async () => {
    expect(await testClient.setAutomine(true)).toBeDefined()
  })

  test('setBalance', async () => {
    expect(
      await testClient.setBalance({
        address: accounts[8].address,
        value: parseEther('420'),
      }),
    ).toBeDefined()
  })

  test('setBlockGasLimit', async () => {
    const block1 = await publicClient.getBlock({
      blockTag: 'latest',
    })
    await testClient.setBlockGasLimit({
      gasLimit: block1.gasLimit + parseGwei('10'),
    })
  })

  test('setBlockTimestampInterval', async () => {
    await testClient.setBlockTimestampInterval({
      interval: 1,
    })
  })

  test('setCode', async () => {
    await testClient.setCode({
      address: '0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7',
      bytecode,
    })
  })

  test('setCoinbase', async () => {
    await testClient.setCoinbase({
      address: '0x50821B3b78Da0255Ba2b7B6d62ae1f389EB987A4',
    })
  })

  test('setIntervalMining', async () => {
    await testClient.setIntervalMining({
      interval: 1,
    })
  })

  test('setLoggingEnabled', async () => {
    await testClient.setLoggingEnabled(true)
  })

  test('setMinGasPrice', async () => {
    await expect(() =>
      testClient.setMinGasPrice({ gasPrice: parseGwei('20') }),
    ).rejects.toThrowError()
  })

  test('setNextBlockBaseFeePerGas', async () => {
    const block1 = await publicClient.getBlock({
      blockTag: 'latest',
    })
    await testClient.setNextBlockBaseFeePerGas({
      baseFeePerGas: block1.baseFeePerGas!,
    })
  })

  test('setNextBlockTimestamp', async () => {
    const block1 = await publicClient.getBlock({
      blockTag: 'latest',
    })
    await testClient.setNextBlockTimestamp({
      timestamp: block1.timestamp! + 100n,
    })
  })

  test('setNonce', async () => {
    await testClient.setNonce({
      address: accounts[8].address,
      nonce: 69,
    })
  })

  test('setRpcUrl', async () => {
    await testClient.setRpcUrl(process.env.VITE_ANVIL_FORK_URL!)
  })

  test('setStorageAt', async () => {
    await testClient.setStorageAt({
      address: accounts[8].address,
      index: 0,
      value:
        '0x0000000000000000000000000000000000000000000000000000000000003039',
    })
  })

  test('snapshot', async () => {
    await testClient.snapshot()
  })

  test.skip('stopImpersonatingAccount', async () => {
    await testClient.impersonateAccount({ address: address.vitalik })
    await testClient.stopImpersonatingAccount({ address: address.vitalik })
  })
})
