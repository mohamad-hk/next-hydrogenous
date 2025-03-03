"use client";
import useCartStore from "@/app/store/cartstore";
import { Button } from "@heroui/react";
import CalculatePrice from "../../utils/CalculatePrice";

const AddToCart = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const calculatedPrice = CalculatePrice(
    product.product_price,
    product.discount_price,
    product.discount_percent
  );
  const product_discount = product.product_price - calculatedPrice;
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
            price: calculatedPrice,
            discount: product_discount,
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
