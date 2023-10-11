/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, HStack, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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
        ref={prevRef}
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
        navigation={{
          prevEl: prevRef.current!, // Assert non-null
          nextEl: nextRef.current!, // Assert non-null
        }}
        onInit={(swiper) => {
          console.log('🚀 ~ file: Gallery.tsx:60 ~ Gallery ~ swiper:', swiper);
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
        sx={{ width: '40px', height: '40px', cursor: 'pointer' }}
        position="absolute"
        zIndex="9"
        right={{ base: '20px', xl: '-20px' }}
        ref={nextRef}
      >
        <Image w="40px" h="40px" src="/images/right.png" alt="right arrow" />
      </Box>
    </HStack>
  );
}
