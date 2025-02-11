"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Button } from "@heroui/react";
const ProductSlider = ({ products }) => {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
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
            spaceBetween: 30,
          },
        }}
        className="h-[500px]"
      >
        {products.map((product, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="bg-[#f5f7fb] rounded-2xl lg:h-[400px]">
                <Image
                  width={350}
                  height={350}
                  src={`/images/products/${product.product_photo}`}
                />
                <div className="flex flex-col items-center gap-5">
                  <h3 className="">{product.product_name}</h3>
                  <div className="flex flex-row gap-2 text-xl">
                    <p>{PersianNumbers(product.product_price)}</p>
                    <p>تومان</p>
                  </div>

                  <Button className="w-[50%]" color="primary" variant="ghost">
                    افزودن به سبد
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
export default ProductSlider;
