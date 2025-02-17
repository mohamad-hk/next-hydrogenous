"use client";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

const HomeSlider = () => {
  return (
    <Swiper
      modules={[Pagination, EffectFade, Autoplay]}
      slidesPerView={1}
      centeredSlides={true}
      effect="fade"
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] 2xl:h-[450px]"
    >
      <SwiperSlide>
        <Image src="/images/sliders/slider1.jpg" fill alt="image not found" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/images/sliders/slider2.jpg" fill alt="image not found" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src="/images/sliders/slider3.jpg" fill alt="image not found" />
      </SwiperSlide>
    </Swiper>
  );
};
export default HomeSlider;
