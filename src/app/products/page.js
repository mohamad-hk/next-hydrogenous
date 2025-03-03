import Image from "next/image";
import Link from "next/link";
import fixurl from "../utils/Fixurl";
import ProductExisting from "../components/ProductsPage/ProductExisting";
import FilterProducts from "../components/ProductsPage/Filter";
import ShowDiscount from "../components/ProductsPage/ShowDiscount";
import ShowPrice from "../components/Productpage/ShowPrice";
const ShowProducts = async () => {
  const response = await fetch(
    `https://hydrogenous.vercel.app/api/GetProducts`,
    { cache: "no-store" }
  );

  const products = await response.json();
  return (
    <>
      <div className="px-5 grid grid-cols-1 lg:grid-cols-[200px_minmax(700px,_1fr)_20px] xl:grid-cols-[350px_minmax(800px,_1fr)_20px]">
        <div className="w-full md:mt-10 hidden lg:flex">
          <FilterProducts />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-5 my-10">
          {products.map((product, index) => {
            return (
              <div
                className=" bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl lg:h-[400px] flex flex-col items-center gap-5 pb-3 relative"
                key={index}
              >
                <ShowDiscount
                  discount_percent={product.discount_percent}
                  discount_price={product.discount_price}
                />
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
                <div className="flex flex-col text-lg">
                  <ShowPrice
                    price={product.product_price}
                    discount_percent={product.discount_percent}
                    discount_price={product.discount_price}
                  />
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
