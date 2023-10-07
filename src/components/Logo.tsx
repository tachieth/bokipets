import { HStack, Image } from '@chakra-ui/react'

export default function Logo() {
  return (
    <HStack w="100%" justify="center">
      <Image src="/images/logo.png" alt="logo" maxW="217px" w={{base: "150px", md: "100%"}} mt="20px" />
    </HStack>
  )
}
