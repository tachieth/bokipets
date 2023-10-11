import { useBokiPetsMint } from '../generated'
import { useWaitForTransaction } from 'wagmi';
import { toast } from 'react-toastify'

type CustomError = Error & {
  shortMessage?: string;
  cause?: string;
  metaMessage?: string;
  details?: string;
};

export default function useMintBokiPets() {
  const { data, write, isLoading } = useBokiPetsMint({
    onError(error: CustomError) {
      console.log('🚀 ~ file: mintBokiPets.tsx:13 ~ onError ~ error:', error);
      toast.error(error.shortMessage);
    },
  });
  const { isLoading: waiting } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess() {
      toast.success("NFT minted successfully")
    },
  });
  return {
    write,
    isLoading: isLoading || waiting
  }
}
