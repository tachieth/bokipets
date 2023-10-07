import { Box } from '@chakra-ui/react';
import Header from './components/Header';
import Logo from './components/Logo';
import Gallery from './components/Gallery';
import Mint from './components/Mint';

function App() {
  return (
    <Box minH="100vh" position="relative" pb="30px">
      <Box className="video-container" display={{base: "none", lg: "block"}}>
        <video className='video' autoPlay muted loop poster="/images/bg.png">
          <source src="/images/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <Box className="video-container" display={{base: "block", lg: "none"}}>
        <video className='video' autoPlay muted loop poster="/images/bg.png">
          <source src="/images/mobile-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
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

export default App;
