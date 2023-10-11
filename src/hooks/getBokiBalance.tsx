import { useBokiBalanceOf } from '../generated'
import { useAccount } from 'wagmi'

export default function useGetBokiBalance() {
  const { address } = useAccount();
  const {data: balance} = useBokiBalanceOf({
    args: [address as `0x${string}`],
    enabled: !!address,
    watch: !!address,
    select: (data) => Number(data || 0),
  })
  return {
    balance,
  };
}
