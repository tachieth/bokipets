/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { Autoplay, Navigation } from 'swiper/modules';
import { useRef } from 'react';

const breakpoints = {
  0: {
    slidesPerView: 1,
    spaceBetween: 0,
  },
  600: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1080: {
    slidesPerView: 3,
    spaceBetween: 10,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
};

export default function Gallery() {
 const swiperRef = useRef<SwiperType>();

  return (
    <HStack
      maxW="980px"
      w="100%"
      mx="auto"
      py="50px"
      position="relative"
      px={{ base: '20px', lg: 0 }}
    >
      <Box
        sx={{ width: '40px', height: '40px' }}
        position="absolute"
        zIndex="9"
        onClick={() => swiperRef.current?.slidePrev()}
        cursor="pointer"
        left={{ base: '20px', xl: '-20px' }}
      >
        <Image src="/images/left.png" alt="left arrow" objectFit="cover" />
      </Box>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Autoplay]}
        breakpoints={breakpoints}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SwiperSlide key={item}>
            <Image maxW="235px" src={`/images/${item}.png`} alt="nft image" />
          </SwiperSlide>
        ))}
      </Swiper>
      <Box
        sx={{ width: '40px', height: '40px' }}
        position="absolute"
        zIndex="9"
        right={{ base: '20px', xl: '-20px' }}
        onClick={() => swiperRef.current?.slideNext()}
        cursor="pointer"
      >
        <Image w="40px" h="40px" src="/images/right.png" alt="right arrow" />
      </Box>
    </HStack>
  );
}
