"use client";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import Link from "next/link";
import fixurl from "@/app/utils/Fixurl";
const ProductSlider = ({ products, category }) => {
  return (
    <>
      <div className="px-10">
        <h2 className="text-3xl mb-5">{category}</h2>
        <Swiper
          modules={[Autoplay]}
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
              spaceBetween: 30,
            },
          }}
          className="h-[450px]"
        >
          {products.map((product, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="bg-[#f5f7fb] rounded-2xl lg:h-[400px]">
                  <Link href={`/product/${fixurl(product.product_name)}`}>
                    <Image
                      width={350}
                      height={350}
                      src={`/images/products/${product.product_photo}`}
                    />
                  </Link>

                  <div className="flex flex-col items-center gap-5">
                    <h3 className="">{product.product_name}</h3>
                    <div className="flex flex-row gap-2 text-xl">
                      <p>{PersianNumbers(product.product_price)}</p>
                      <p>تومان</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};
export default ProductSlider;
