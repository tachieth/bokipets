import { Button, HStack, Image, Link } from '@chakra-ui/react'

export default function Header() {
  return (
    <HStack w="100%" justify="space-between" py="10px" px="20px">
      <Link href="https://www.boki.art/home" isExternal>
        <Image src="/images/Boki.png" alt="logo" w={{ base: '120px', md: '160px' }} />
      </Link>
      <Button
        bg="transparent"
        borderWidth="1px"
        borderColor="white"
        color="white"
        borderRadius="0"
        _hover={{ bg: 'white', color: 'black' }}
      >
        WALLET CONNECT
      </Button>
    </HStack>
  );
}
