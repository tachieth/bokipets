import { Button, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import useGetBokiPetsDetails from '../hooks/getBokiPetsDetails';
import useMintBokiPets from '../hooks/mintBokiPets';
import useGetProofAndMaxMint from '../hooks/getProofAndMaxMint';

export default function Mint() {
  const [count, setCount] = useState(1);
  const { isConnected } = useAccount();
  const { isLoading, limit, maxSupply, totalSupply, isPaused } = useGetBokiPetsDetails();
  const { getProof } = useGetProofAndMaxMint();
  const { write, isLoading: isMinting } = useMintBokiPets();

  // useEffect(() => {
  //   const root = generateMerkleRoot();
  //   console.log("🚀 ~ file: Mint.tsx:18 ~ useEffect ~ root:", root)
  // }, [])
  

  const handleMint = async () => {
    if (limit && count > limit) {
      return toast.error(`You can only mint ${limit} pets at a time`);
    }

    const { proof, maxMint, error } = getProof();

    if (error) {
      return toast.error('Not a Boki holder');
    }

    if (count && write) {
      toast.info(`Minting ${count} pets...`);
      await write({ args: [proof, maxMint, count], value: BigInt(0) });
    }
  };

  return (
    <VStack mt="15px" px="20px">
      <SimpleGrid spacing="22px" columns={{ base: 3, lg: 5 }}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <NumBox num={num} active={count === num} onClick={() => setCount(num)} />
        ))}
      </SimpleGrid>
      <Text
        textAlign={{ base: 'center', md: 'left' }}
        fontSize="sm"
        fontWeight="semibold"
        color="white"
        mt="22px"
        mb="15px"
      >
        NOTE: ONLY Boki holders are eligible up to 1 companion per Boki.
      </Text>
      <HStack>
        <HStack borderWidth="1px" borderColor="main" w="220px" h="44px" justify="center">
          <Text color="white" fontFamily="el">{`COMPANIONS COUNT: ${count}`}</Text>
        </HStack>
        <Button
          borderRadius="0"
          minW="90px"
          h="44px"
          bg="main"
          color="white"
          _hover={{ bg: 'main' }}
          isLoading={isLoading || isMinting}
          isDisabled={isPaused || totalSupply === maxSupply || !isConnected}
          onClick={handleMint}
        >
          {isPaused ? 'SALE NOT ACTIVE' : totalSupply === maxSupply ? 'SOLD OUT' : 'MINT'}
        </Button>
      </HStack>
    </VStack>
  );
}

function NumBox({ num, active, onClick }: { num: number; onClick: () => void; active: boolean }) {
  return (
    <HStack
      w="65px"
      h="40px"
      justify="center"
      as="button"
      bg={active ? 'white' : 'transparent'}
      onClick={onClick}
      borderWidth="1px"
      borderColor="white"
      color={active ? 'black' : 'white'}
      _hover={{ bg: 'white', color: 'black' }}
    >
      <Text>{num}</Text>
    </HStack>
  );
}
