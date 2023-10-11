import { useBokiPetsLimit, useBokiPetsSupply, useBokiPetsSaleConfig, useBokiPetsTotalSupply } from '../generated'

export default function useGetBokiPetsDetails() {
  const { data: limit, isLoading: isLimitLoading } = useBokiPetsLimit({
    watch: true,
    select: (data) => {
      return Number(data) || 0;
    }
  });
  const { data: maxSupply, isLoading: isSupplyLoading } = useBokiPetsSupply({
    watch: true,
  });
  const { data: totalSupply, isLoading: isTotalSupplyLoading } = useBokiPetsTotalSupply({
    watch: true,
  });
  const { data: isPaused, isLoading: isPausedLoading } = useBokiPetsSaleConfig({
    watch: true,
    select:(data) => {
      return data === 0;
    }
  });
  return {
    isLoading: isLimitLoading || isSupplyLoading || isTotalSupplyLoading || isPausedLoading,
    limit,
    maxSupply,
    totalSupply,
    isPaused
  };
}
