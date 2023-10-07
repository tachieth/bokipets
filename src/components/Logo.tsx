import { HStack, Image } from '@chakra-ui/react'

export default function Logo() {
  return (
    <HStack w="100%" justify="center">
      <Image src="/images/logo.png" alt="logo" maxW="217px" mt="20px" />
    </HStack>
  )
}
