"use client";

import ShowDiscount from "@/app/components/Productpage/ShowDiscount";
import ShowPrice from "@/app/components/Productpage/ShowPrice";
import { AuthContext } from "@/app/context/AuthContext";
import Loading from "@/app/loading";
import fixurl from "@/app/utils/Fixurl";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const WishList = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const getWish = async (input_params) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Product/Wish/GetWish?${input_params}`
      );
      const response = await data.json();
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        customer_id: user.customer_id,
      });
      getWish(input_params);
    }
  }, [user]);
  return (
    <>
    {loading ? <Loading /> : (
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-5 lg:ms-5">
        {products.map((product, index) => {
          return (
            <div
              className=" bg-white shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] rounded-2xl lg:h-[400px] flex flex-col items-center gap-5 pb-3 relative"
              key={index}
            >
              <ShowDiscount
                discount_percent={product.tbl_products.discount_percent}
                discount_price={product.tbl_products.discount_price}
              />
              <Link
                href={`/product/${fixurl(product.tbl_products.product_name)}`}
                className="z-10"
              >
                <Image
                  width={350}
                  height={350}
                  alt="image not found"
                  src={`/images/products/${product.tbl_products.product_photo}`}
                />
              </Link>
              <h3 className="z-10">{product.tbl_products.product_name}</h3>
              <div className="flex flex-col text-lg">
                <ShowPrice
                  price={product.tbl_products.product_price}
                  discount_percent={product.tbl_products.discount_percent}
                  discount_price={product.tbl_products.discount_price}
                />
              </div>
            </div>
          );
        })}
      </div>
    )}
    </>
  );
};

export default WishList;
