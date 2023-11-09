import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  Address,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

import {
  getContract,
  GetContractArgs,
  readContract,
  ReadContractConfig,
  writeContract,
  WriteContractArgs,
  WriteContractPreparedArgs,
  WriteContractUnpreparedArgs,
  prepareWriteContract,
  PrepareWriteContractConfig,
  watchContractEvent,
  WatchContractEventConfig,
  WatchContractEventCallback,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BokiPets
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export const bokiPetsABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_unRevealedUri', internalType: 'string', type: 'string' },
      { name: '_RevealedBaseUri', internalType: 'string', type: 'string' },
      { name: '_withdrawalAddress', internalType: 'address', type: 'address' },
      { name: '_royaltyAddress', internalType: 'address', type: 'address' },
      { name: '_royaltyBips', internalType: 'uint96', type: 'uint96' },
    ],
  },
  { type: 'error', inputs: [], name: 'ApprovalCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'ApprovalQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'BalanceQueryForZeroAddress' },
  { type: 'error', inputs: [], name: 'MintERC2309QuantityExceedsLimit' },
  { type: 'error', inputs: [], name: 'MintToZeroAddress' },
  { type: 'error', inputs: [], name: 'MintZeroQuantity' },
  { type: 'error', inputs: [], name: 'OwnerQueryForNonexistentToken' },
  { type: 'error', inputs: [], name: 'OwnershipNotInitializedForExtraData' },
  { type: 'error', inputs: [], name: 'TransferCallerNotOwnerNorApproved' },
  { type: 'error', inputs: [], name: 'TransferFromIncorrectOwner' },
  { type: 'error', inputs: [], name: 'TransferToNonERC721ReceiverImplementer' },
  { type: 'error', inputs: [], name: 'TransferToZeroAddress' },
  { type: 'error', inputs: [], name: 'URIQueryForNonexistentToken' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ConsecutiveTransfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'LIMIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MARKETING_RESERVE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'SUPPLY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint16', type: 'uint16' }],
    name: 'adminMint',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseExtension',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint16', type: 'uint16' }],
    name: 'checkIfMinted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getOwnershipData',
    outputs: [
      {
        name: '',
        internalType: 'struct IERC721A.TokenOwnership',
        type: 'tuple',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'startTimestamp', internalType: 'uint64', type: 'uint64' },
          { name: 'burned', internalType: 'bool', type: 'bool' },
          { name: 'extraData', internalType: 'uint24', type: 'uint24' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint16', type: 'uint16' },
      { name: 'bokiTokenIds', internalType: 'uint16[]', type: 'uint16[]' },
      { name: 'maxMintLimit', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'reveal',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'revealed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'salePrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'royaltyInfo',
    outputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'saleConfig',
    outputs: [
      {
        name: '',
        internalType: 'enum BokiCompanions.SaleConfig',
        type: 'uint8',
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_newBaseURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_receiver', internalType: 'address', type: 'address' },
      { name: '_royaltyFeeInBips', internalType: 'uint96', type: 'uint96' },
    ],
    name: 'setRoyalty',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: '_status',
        internalType: 'enum BokiCompanions.SaleConfig',
        type: 'uint8',
      },
    ],
    name: 'setSaleConfig',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_unRevealedUri', internalType: 'string', type: 'string' },
    ],
    name: 'setUnRevealedUri',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'unRevealedURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
  },
] as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export const bokiPetsAddress = {
  5: '0x438919CA69F6AF36Bc9fd76290C2146D750913CD',
} as const

/**
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export const bokiPetsConfig = {
  address: bokiPetsAddress,
  abi: bokiPetsABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"LIMIT"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsLimit<
  TFunctionName extends 'LIMIT',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'LIMIT',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"MARKETING_RESERVE"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsMarketingReserve<
  TFunctionName extends 'MARKETING_RESERVE',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'MARKETING_RESERVE',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"SUPPLY"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSupply<
  TFunctionName extends 'SUPPLY',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'SUPPLY',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"balanceOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"baseExtension"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsBaseExtension<
  TFunctionName extends 'baseExtension',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'baseExtension',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"baseURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsBaseUri<
  TFunctionName extends 'baseURI',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'baseURI',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"checkIfMinted"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsCheckIfMinted<
  TFunctionName extends 'checkIfMinted',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'checkIfMinted',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"getApproved"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"getOwnershipData"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsGetOwnershipData<
  TFunctionName extends 'getOwnershipData',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'getOwnershipData',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"isApprovedForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"name"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"owner"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"ownerOf"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"revealed"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsRevealed<
  TFunctionName extends 'revealed',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'revealed',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"royaltyInfo"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsRoyaltyInfo<
  TFunctionName extends 'royaltyInfo',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'royaltyInfo',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"saleConfig"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSaleConfig<
  TFunctionName extends 'saleConfig',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'saleConfig',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"supportsInterface"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"symbol"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"tokenURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"totalSupply"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsTotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"unRevealedURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsUnRevealedUri<
  TFunctionName extends 'unRevealedURI',
  TSelectData = ReadContractResult<typeof bokiPetsABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractRead({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'unRevealedURI',
    ...config,
  } as UseContractReadConfig<typeof bokiPetsABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof bokiPetsABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, TFunctionName, TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"adminMint"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsAdminMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'adminMint'
        >['request']['abi'],
        'adminMint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'adminMint' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'adminMint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'adminMint'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'adminMint', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'adminMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsApprove<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'approve', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsMint<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'mint' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'mint', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'mint', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsRenounceOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'renounceOwnership'
        >['request']['abi'],
        'renounceOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'renounceOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'renounceOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'renounceOwnership', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'renounceOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"reveal"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsReveal<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'reveal'
        >['request']['abi'],
        'reveal',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'reveal' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'reveal', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'reveal'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'reveal', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'reveal',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'safeTransferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'safeTransferFrom', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'setApprovalForAll', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'setApprovalForAll', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setBaseURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSetBaseUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'setBaseURI'
        >['request']['abi'],
        'setBaseURI',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setBaseURI' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'setBaseURI', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setBaseURI'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'setBaseURI', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setBaseURI',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setRoyalty"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSetRoyalty<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'setRoyalty'
        >['request']['abi'],
        'setRoyalty',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'setRoyalty' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'setRoyalty', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setRoyalty'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'setRoyalty', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setRoyalty',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setSaleConfig"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSetSaleConfig<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'setSaleConfig'
        >['request']['abi'],
        'setSaleConfig',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setSaleConfig'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'setSaleConfig', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setSaleConfig'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'setSaleConfig', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setSaleConfig',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setUnRevealedUri"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsSetUnRevealedUri<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'setUnRevealedUri'
        >['request']['abi'],
        'setUnRevealedUri',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setUnRevealedUri'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'setUnRevealedUri', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setUnRevealedUri'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'setUnRevealedUri', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setUnRevealedUri',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'transferFrom', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'transferFrom', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsTransferOwnership<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'transferOwnership'
        >['request']['abi'],
        'transferOwnership',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferOwnership'
      }
    : UseContractWriteConfig<typeof bokiPetsABI, 'transferOwnership', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferOwnership'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'transferOwnership', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsWithdraw<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof bokiPetsABI,
          'withdraw'
        >['request']['abi'],
        'withdraw',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'withdraw' }
    : UseContractWriteConfig<typeof bokiPetsABI, 'withdraw', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'withdraw'
      } = {} as any,
) {
  return useContractWrite<typeof bokiPetsABI, 'withdraw', TMode>({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'withdraw',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"adminMint"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsAdminMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'adminMint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'adminMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'adminMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"approve"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"mint"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'mint'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"renounceOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsRenounceOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'renounceOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'renounceOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'renounceOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"reveal"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsReveal(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'reveal'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'reveal',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'reveal'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"safeTransferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'safeTransferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setApprovalForAll'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setBaseURI"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsSetBaseUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setBaseURI'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setBaseURI',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setBaseURI'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setRoyalty"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsSetRoyalty(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setRoyalty'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setRoyalty',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setRoyalty'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setSaleConfig"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsSetSaleConfig(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setSaleConfig'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setSaleConfig',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setSaleConfig'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"setUnRevealedUri"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsSetUnRevealedUri(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setUnRevealedUri'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'setUnRevealedUri',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'setUnRevealedUri'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"transferFrom"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'transferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"transferOwnership"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsTransferOwnership(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'transferOwnership'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'transferOwnership',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'transferOwnership'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link bokiPetsABI}__ and `functionName` set to `"withdraw"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function usePrepareBokiPetsWithdraw(
  config: Omit<
    UsePrepareContractWriteConfig<typeof bokiPetsABI, 'withdraw'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    functionName: 'withdraw',
    ...config,
  } as UsePrepareContractWriteConfig<typeof bokiPetsABI, 'withdraw'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof bokiPetsABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractEvent({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as UseContractEventConfig<typeof bokiPetsABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bokiPetsABI}__ and `eventName` set to `"Approval"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof bokiPetsABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractEvent({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof bokiPetsABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bokiPetsABI}__ and `eventName` set to `"ApprovalForAll"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof bokiPetsABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractEvent({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof bokiPetsABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bokiPetsABI}__ and `eventName` set to `"ConsecutiveTransfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsConsecutiveTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof bokiPetsABI, 'ConsecutiveTransfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractEvent({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    eventName: 'ConsecutiveTransfer',
    ...config,
  } as UseContractEventConfig<typeof bokiPetsABI, 'ConsecutiveTransfer'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bokiPetsABI}__ and `eventName` set to `"OwnershipTransferred"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsOwnershipTransferredEvent(
  config: Omit<
    UseContractEventConfig<typeof bokiPetsABI, 'OwnershipTransferred'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractEvent({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    eventName: 'OwnershipTransferred',
    ...config,
  } as UseContractEventConfig<typeof bokiPetsABI, 'OwnershipTransferred'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link bokiPetsABI}__ and `eventName` set to `"Transfer"`.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function useBokiPetsTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof bokiPetsABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof bokiPetsAddress } = {} as any,
) {
  return useContractEvent({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof bokiPetsABI, 'Transfer'>)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Core
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link getContract}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function getBokiPets(
  config: Omit<GetContractArgs, 'abi' | 'address'> & {
    chainId?: keyof typeof bokiPetsAddress
  },
) {
  return getContract({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  })
}

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function readBokiPets<
  TAbi extends readonly unknown[] = typeof bokiPetsABI,
  TFunctionName extends string = string,
>(
  config: Omit<ReadContractConfig<TAbi, TFunctionName>, 'abi' | 'address'> & {
    chainId?: keyof typeof bokiPetsAddress
  },
) {
  return readContract({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as unknown as ReadContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function writeBokiPets<
  TFunctionName extends string,
  TMode extends WriteContractMode,
  TChainId extends number = keyof typeof bokiPetsAddress,
>(
  config:
    | (Omit<
        WriteContractPreparedArgs<typeof bokiPetsABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared'
          ? TChainId
          : keyof typeof bokiPetsAddress
      })
    | (Omit<
        WriteContractUnpreparedArgs<typeof bokiPetsABI, TFunctionName>,
        'abi' | 'address'
      > & {
        mode: TMode
        chainId?: TMode extends 'prepared'
          ? TChainId
          : keyof typeof bokiPetsAddress
      }),
) {
  return writeContract({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as unknown as WriteContractArgs<typeof bokiPetsABI, TFunctionName>)
}

/**
 * Wraps __{@link prepareWriteContract}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function prepareWriteBokiPets<
  TAbi extends readonly unknown[] = typeof bokiPetsABI,
  TFunctionName extends string = string,
>(
  config: Omit<
    PrepareWriteContractConfig<TAbi, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof bokiPetsAddress },
) {
  return prepareWriteContract({
    abi: bokiPetsABI,
    address: bokiPetsAddress[5],
    ...config,
  } as unknown as PrepareWriteContractConfig<TAbi, TFunctionName>)
}

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link bokiPetsABI}__.
 *
 * [__View Contract on Goerli Etherscan__](https://goerli.etherscan.io/address/0x438919CA69F6AF36Bc9fd76290C2146D750913CD)
 */
export function watchBokiPetsEvent<
  TAbi extends readonly unknown[] = typeof bokiPetsABI,
  TEventName extends string = string,
>(
  config: Omit<
    WatchContractEventConfig<TAbi, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof bokiPetsAddress },
  callback: WatchContractEventCallback<TAbi, TEventName>,
) {
  return watchContractEvent(
    {
      abi: bokiPetsABI,
      address: bokiPetsAddress[5],
      ...config,
    } as WatchContractEventConfig<TAbi, TEventName>,
    callback,
  )
}
