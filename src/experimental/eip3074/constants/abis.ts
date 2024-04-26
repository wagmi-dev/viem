export const invokerAbi = [
  {
    type: 'function',
    name: 'execute',
    inputs: [
      {
        name: 'execData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'authority',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'signature',
        type: 'tuple',
        internalType: 'struct Auth.Signature',
        components: [
          {
            name: 'yParity',
            type: 'uint8',
            internalType: 'uint8',
          },
          {
            name: 'r',
            type: 'bytes32',
            internalType: 'bytes32',
          },
          {
            name: 's',
            type: 'bytes32',
            internalType: 'bytes32',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getDigest',
    inputs: [
      {
        name: 'execData',
        type: 'bytes',
        internalType: 'bytes',
      },
      {
        name: 'nonce',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'digest',
        type: 'bytes32',
        internalType: 'bytes32',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'nonce',
    inputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'error',
    name: 'BadAuth',
    inputs: [],
  },
  {
    type: 'error',
    name: 'InvalidNonce',
    inputs: [
      {
        name: 'authority',
        type: 'address',
        internalType: 'address',
      },
      {
        name: 'attempted',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
  },
] as const
