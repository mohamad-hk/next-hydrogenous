import Image from "next/image";
import PersianNumbers from "../utils/ToPersianNumber";
import Link from "next/link";
import fixurl from "../utils/Fixurl";
import ProductExisting from "../components/ProductsPage/ProductExisting";
const ShowProducts = async () => {
  const response = await fetch(
    `https://hydrogenous.vercel.app/api/GetProducts`,
    { cache: "no-store" }
  );

  const products = await response.json();
  return (
    <>
      <div className="px-5 grid grid-cols-1 lg:grid-cols-[200px_minmax(700px,_1fr)_20px] xl:grid-cols-[300px_minmax(800px,_1fr)_20px]">
        <div className="w-[20%] md:mt-10 hidden lg:flex ">filter</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-5 my-10">
          {products.map((product, index) => {
            return (
              <div
                className="group relative bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl lg:h-[400px] flex flex-col items-center gap-5 pb-3 overflow-hidden"
                key={index}
              >
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100">
                  <div className="absolute w-20 h-[3px] bg-blue-500 animate-moving-line" />
                </div>

                <Link
                  href={`/product/${fixurl(product.product_name)}`}
                  className="z-10"
                >
                  <Image
                    width={350}
                    height={350}
                    alt="image not found"
                    src={`/images/products/${product.product_photo}`}
                  />
                </Link>
                <h3 className="z-10">{product.product_name}</h3>
                <div className="flex flex-row gap-2 text-xl z-10">
                  <p>{PersianNumbers(product.product_price)}</p>
                  <p>تومان</p>
                </div>
                <ProductExisting product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ShowProducts;
