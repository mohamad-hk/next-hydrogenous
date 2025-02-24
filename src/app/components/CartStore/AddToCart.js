"use client";
import useCartStore from "@/app/store/cartstore";
import { Button } from "@heroui/react";

const AddToCart = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <>
      <Button
        color="primary"
        variant="ghost"
        className="px-14 bg-blue-600 border-0 text-white"
        onPress={() => {
          addToCart({
            id: product.product_id,
            name: product.product_name,
            price: product.product_price,
            image: `/images/products/${product.product_photo}`,
          });
        }}
      >
        افزودن به سبد
      </Button>
    </>
  );
};
export default AddToCart;
