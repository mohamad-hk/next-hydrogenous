import Image from "next/image";
import PersianNumbers from "../utils/ToPersianNumber";
import { Button } from "@heroui/react";

const ShowProducts = async () => {
  const response = await fetch(
    `https://hydrogenous.vercel.app/api/GetProducts`,
    { cache: "no-store" }
  );

  const products = await response.json();
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(900px,_1fr)_20px] xl:grid-cols-[300px_minmax(900px,_1fr)_20px]">
        <div className="w-[20%] md:mt-10 hidden lg:flex ">filter</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-5 sm:my-10">
          {products.map((product, index) => {
            return (
              <div
                className="bg-[#f5f7fb] rounded-2xl lg:h-[400px] flex flex-col items-center gap-5 pb-3"
                key={index}
              >
                <Image
                  width={350}
                  height={350}
                  alt="image not found"
                  src={`/images/products/${product.product_photo}`}
                />
                <h3 className="">{product.product_name}</h3>
                <div className="flex flex-row gap-2 text-xl">
                  <p>{PersianNumbers(product.product_price)}</p>
                  <p>تومان</p>
                </div>

                <Button className="w-[50%]" color="primary" variant="ghost">
                  افزودن به سبد
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ShowProducts;
