"use client";

import useCartStore from "@/app/store/cartstore";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import Image from "next/image";

const OrderSurvey = () => {
  const { cart } = useCartStore();

  return (
    <>
      <div
        className={`flex flex-row gap-3 my-5 ${
          cart.length > 4 ? "overflow-x-scroll" : ""
        }`}
      >
        {cart.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <Image
              src={item.image}
              width={300}
              height={300}
              alt="image not found"
            />
            <div className="flex flex-col items-center lg:flex-row md:items-center md:gap-3">
              <div className="shadow-md px-3 border border-blue-200 py-1 rounded-md">
                {PersianNumbers(item.quantity)} عدد
              </div>
              <p className="text-[14px]">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderSurvey;
