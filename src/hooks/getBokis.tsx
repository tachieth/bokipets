import { useAccount } from 'wagmi';
import {alchemy} from '../helpers/alchemy';

export default function useGetBokiIds() {
  const {address} = useAccount();
  const getBokiTokenIds = async () => {
    if (!address) return [];
    const { ownedNfts } = await alchemy.nft.getNftsForOwner(address, {
      contractAddresses: [import.meta.env.VITE_APP_BOKI_CONTRACT_ADDRESS as `0x${string}`],
    });
    return ownedNfts.map((nft) => nft.tokenId)
  }
  return {
    getBokiTokenIds,
  };
}
