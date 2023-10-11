import { HStack, Image, Link } from '@chakra-ui/react'
import ConnectBTN from './ConnectButton';

export default function Header() {
  return (
    <HStack w="100%" justify="space-between" py="10px" px="20px">
      <Link href="https://www.boki.art/home" isExternal>
        <Image src="/images/Boki.png" alt="logo" w={{ base: '120px', md: '160px' }} />
      </Link>
      <ConnectBTN />
    </HStack>
  );
}
