import { Button, HStack, Image, Link } from '@chakra-ui/react'

export default function Header() {
  return (
    <HStack w="100%" justify="space-between" py="10px" px="20px">
      <Link href="/">
        <Image src="/images/Boki.png" alt="logo" />
      </Link>
      <Button bg="transparent" borderWidth="1px" borderColor="white" color="white" borderRadius="0" _hover={{ bg: "white", color: "black"}}>WALLET CONNECT</Button>
    </HStack>
  )
}
