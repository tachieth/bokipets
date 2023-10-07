import { Button, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const nums = Array.from({ length: 10 }, (_, i) => i + 1);

export default function Mint() {
  const [count, setCount] = useState(1)
  return (
    <VStack mt="15px">
      <SimpleGrid spacing="22px" columns={5}>
        {nums.map((num) => (
          <NumBox num={num} active={count === num} onClick={() => setCount(num)} />
        ))}
      </SimpleGrid>
      <Text fontSize="sm" fontWeight="semibold" color="white" mt="22px" mb="15px">
        NOTE: ONLY Boki holders are eligible up to 10 pets mints per wallet.
      </Text>
      <HStack>
        <HStack borderWidth="1px" borderColor="main" w="160px" h="44px" justify="center">
          <Text color="white">{`PETS COUNT: ${count}`}</Text>
        </HStack>
        <Button borderRadius="0" w="90px" h="44px" bg="main" color="white" _hover={{ bg: "main"}}>MINT</Button>
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
