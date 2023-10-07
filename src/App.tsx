import { Box } from "@chakra-ui/react"
import Header from "./components/Header"
import Logo from "./components/Logo";
import Gallery from "./components/Gallery";
import Mint from "./components/Mint";


function App() {

  return (
    <Box
      minH="100vh"
      backgroundImage="/images/bg.png"
      backgroundPosition="center"
      backgroundSize="cover"
      position="relative"
    >
      <Box bg="rgba(0, 0, 0, 0.25)" inset="0" position="absolute"></Box>
      <Box position="relative" zIndex="5" maxW="1280px" w="100%" mx="auto">
        <Header />
        <Logo />
        <Gallery />
        <Mint />
      </Box>
    </Box>
  );
}

export default App
