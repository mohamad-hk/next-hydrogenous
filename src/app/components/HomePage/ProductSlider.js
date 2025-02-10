"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
const ProductSlider = ({ products }) => {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={6}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="h-[500px]"
      >
        {products.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <div>
                <Image
                  width={350}
                  height={350}
                  src={`/images/products/${product.product_photo}`}
                />
                <h3>{product.product_name}</h3>
                <p>{product.product_price}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default ProductSlider;
