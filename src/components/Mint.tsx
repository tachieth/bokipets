import { Button, HStack, Input, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import useGetBokiPetsDetails from '../hooks/getBokiPetsDetails';
import useMintBokiPets from '../hooks/mintBokiPets';
import useGetBokiIds from '../hooks/getBokis';
import useGetBokiPetsMintedIds from '../hooks/getBokiPetsMintedIds';

export default function Mint() {
  const [count, setCount] = useState(1);
  const [tokenId, setTokenId] = useState<number>();
  console.log("🚀 ~ file: Mint.tsx:13 ~ Mint ~ tokenId:", tokenId)
  const { isConnected } = useAccount();
  const { isLoading, limit, maxSupply, totalSupply, isPaused } = useGetBokiPetsDetails();
  const { write, isLoading: isMinting } = useMintBokiPets();
  const { getBokiTokenIds } = useGetBokiIds();
  const { checkIfTokensAlreadyMinted } = useGetBokiPetsMintedIds();
  const [loading, setLoading] = useState(false);

  const checkIfMinted = async () => {
    if (tokenId) {
      const alreadyMinted = await checkIfTokensAlreadyMinted([tokenId.toString()]);
      if(alreadyMinted.length > 0) {
        toast.error('Token has already been minted');
      } else {
        toast.success('Token can be minted');
      }
    } else {
      toast.error('Please enter a token id');
    }
  }

  const handleMint = async () => {
    if (limit && count > limit) {
      return toast.error(`You can only mint ${limit} pets at a time`);
    }

    setLoading(true);

    const ids = await getBokiTokenIds();

    if (ids.length === 0) {
      setLoading(false);
      return toast.error('Not a Boki holder');
    }

    const alreadyMinted = await checkIfTokensAlreadyMinted([...ids]);

    const filteredIds = ids.filter((id) => !alreadyMinted.includes(id)) || ids;

    const finalIds = filteredIds.map((id) => Number(id));

    if (finalIds.length === 0 && ids.length > 0) {
      setLoading(false);
      return toast.error('Tokens have already been minted');
    }

    setLoading(false);
    if (count && write) {
      toast.info(`Minting ${count} pets...`);
      await write({ args: [count, finalIds, ids.length], value: BigInt(0) });
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log("🚀 ~ file: Mint.tsx:68 ~ handleInput ~ Number(inputValue) <= 7777:", Number(inputValue) <= 7777)
    if (Number(inputValue) <= 7777 && Number(inputValue) >= 0) {
      setTokenId(Number(inputValue));
    }
  };

  return (
    <VStack mt="15px" px="20px">
      <HStack mb="20px">
        <Input
          type="text"
          value={tokenId}
          onChange={handleInput}
          borderRadius="0px"
          placeholder="Check if token id is already minted"
          color="white"
          w="280px"
        />
        <Button
          borderRadius="0"
          minW="90px"
          h="44px"
          bg="main"
          color="white"
          _hover={{ bg: 'main' }}
          onClick={checkIfMinted}
        >Check</Button>
      </HStack>
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
          isLoading={isLoading || isMinting || loading}
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
