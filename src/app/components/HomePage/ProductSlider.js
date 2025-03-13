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
import { IoIosArrowBack } from "react-icons/io";
import { usePathname } from "next/navigation";
import ShowPrice from "../Productpage/ShowPrice";

const ProductSlider = ({ products, category }) => {
  const pathname = usePathname();

  return (
    <>
      <div className="px-10 xl:px-20 2xl:px-40">
        {pathname.startsWith("/product") ? null : (
          <div className="flex flex-row justify-between items-center rounded-md p-2 bg-blue-700">
            <h2 className="text-3xl text-white">{category}</h2>
            <div className="flex flex-row items-center bg-white p-3 rounded-md hover:scale-90 transition-all duration-500 ease-in-out">
              <Link href={`/products?category=${category}`}>مشاهده همه</Link>
              <IoIosArrowBack />
            </div>
          </div>
        )}

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
              spaceBetween: 10,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          className=" min-h-[300px]"
        >
          {products.map((product, index) => {
            return (
              <SwiperSlide key={index} className="my-5 p-3">
                <div className="bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl min-h-[270px] sm:min-h-[300px] lg:min-h-[300px] xl:min-h-[350px] p-2">
                  <Link href={`/product/${fixurl(product.product_name)}`}>
                    <Image
                      width={350}
                      height={350}
                      src={`/images/products/${product.product_photo}`}
                      alt="image not found"
                      className="hover:scale-110 transition-all duration-500 ease-in-out"
                    />
                  </Link>

                  <div className="flex flex-col items-center gap-5">
                    <h3 className="">{product.product_name}</h3>
                    <div className="flex flex-col gap-2 text-xl">
                    <ShowPrice
                    price={product.product_price}
                    discount_percent={product.discount_percent}
                    discount_price={product.discount_price}
                  />
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
