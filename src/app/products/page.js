"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import fixurl from "../utils/Fixurl";
import ProductExisting from "../components/ProductsPage/ProductExisting";
import FilterProducts from "../components/ProductsPage/Filter";
import ShowDiscount from "../components/ProductsPage/ShowDiscount";
import ShowPrice from "../components/Productpage/ShowPrice";
import Loading from "../components/Loading/Loading";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  useDisclosure,
} from "@heroui/react";
const ShowProducts = () => {
  return (
    <Suspense fallback={<p>در حال بارگذاری...</p>}>
      <ShowProductsContent />
    </Suspense>
  );
};

const ShowProductsContent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [placement, setPlacement] = useState("bottom");
  const handleOpen = (placement) => {
    setPlacement(placement);
    onOpen();
  };
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category");
  const price = searchParams.get("price");
  const discount = searchParams.get("discount");
  const exist = searchParams.get("exist");
  const flavour = searchParams.get("flavour");

  const getFilteredProducts = async () => {
    setLoading(true);
    let url = "https://hydrogenous.vercel.app/api/GetProducts";
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (price) params.set("price", price);
    if (flavour) params.set("flavour", flavour);
    if (exist) params.set("exist", exist);
    if (discount === "true") params.set("discount", "true");

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    try {
      const response = await fetch(url, { cache: "no-store" });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredProducts();
  }, [searchParams]);
  return (
    <div className="px-5 grid grid-cols-1 lg:grid-cols-[1fr_minmax(700px,_1fr)] xl:grid-cols-[350px_minmax(800px,_1fr)_20px]">
      <Button
        className="lg:hidden w-fit !bg-none"
        onPress={() => handleOpen(placement)}
      >
        فیلتر ها
      </Button>
      <Drawer isOpen={isOpen} placement={placement} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                فیلتر ها
              </DrawerHeader>
              <DrawerBody className="p-3">
                <FilterProducts />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <div className="w-full md:mt-10 hidden lg:flex">
        <FilterProducts />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-y-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-5 gap-x-5 my-3 lg:my-10">
        {loading ? (
          <Loading />
        ) : products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                className={`shadow-[0px_0px_5px_5px_rgba(7,_65,_210,_0.1)] rounded-2xl lg:h-[450px] flex flex-col items-center gap-5 pb-3 relative dark:bg-[#4e76a4] ${
                  product.stock == 0 ? "opacity-50 " : ""
                }`}
                key={index}
              >
                {product.stock == 0 && (
                  <div className="relative inset-0 bg-gray-200 dark:bg-gray-50 dark:bg-opacity-80 bg-opacity-50 text-xl font-bold text-red-600">
                    <p className="absolute top-52 -left-6 z-20">ناموجود</p>
                  </div>
                )}
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
                    className="hover:scale-110 transition-all duration-500 ease-in-out"
                  />
                </Link>
                <h3 className="z-10 text-[#007BFF] dark:text-white">
                  {product.product_name}
                </h3>
                {product.stock == 0 ? null : (
                  <div className="flex flex-col text-lg">
                    <ShowPrice
                      price={product.product_price}
                      discount_percent={product.discount_percent}
                      discount_price={product.discount_price}
                    />
                  </div>
                )}

                {product.stock == 0 ? null : (
                  <ProductExisting product={product} />
                )}
              </div>
            );
          })
        ) : (
          <p>محصولی یافت نشد.</p>
        )}
      </div>
    </div>
  );
};

export default ShowProducts;
