import { useAccount } from 'wagmi';
import {alchemy} from '../helpers/alchemy';

export default function useGetBokiIds() {
  const {address} = useAccount();
  const getBokiTokenIds = async () => {
    if (!address) return [];
    const { ownedNfts, totalCount, pageKey } = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: [import.meta.env.VITE_APP_BOKI_CONTRACT_ADDRESS as `0x${string}`],
    });
    if (ownedNfts.length < totalCount) {
      const nfts = ownedNfts.map((nft) => nft.tokenId);
      const { ownedNfts: nextOwnedNfts } = await alchemy.nft.getNftsForOwner(address, {
        contractAddresses: [import.meta.env.VITE_APP_BOKI_CONTRACT_ADDRESS as `0x${string}`],
        pageKey,
      });
      return [...nfts, ...nextOwnedNfts.map((nft) => nft.tokenId)];
    }
    return ownedNfts.map((nft) => nft.tokenId)
  }
  return {
    getBokiTokenIds,
  };
}
