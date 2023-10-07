/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import { useRef } from 'react';

export default function Gallery() {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <HStack maxW="980px" w="100%" mx="auto" py="50px" position="relative">
      <Box
        sx={{ width: '40px', height: '40px', left: '-20px', cursor: 'pointer' }}
        position="absolute"
        zIndex="9"
        ref={prevRef}
      >
        <Image src="/images/left.png" alt="left arrow" objectFit="cover" />
      </Box>
      <Swiper
        navigation={{
          prevEl: prevRef.current!, // Assert non-null
          nextEl: nextRef.current!, // Assert non-null
        }}
        onInit={(swiper) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.prevEl = prevRef.current;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        spaceBetween={10}
        slidesPerView={4}
        modules={[Navigation]}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SwiperSlide key={item}>
            <Image maxW="235px" src={`/images/${item}.png`} alt="nft image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{ width: '40px', height: '40px', right: '-20px', cursor: 'pointer' }}
        position="absolute"
        zIndex="9"
        ref={nextRef}
      >
        <Image w="40px" h="40px" src="/images/right.png" alt="right arrow" />
      </Box>
    </HStack>
  );
}
