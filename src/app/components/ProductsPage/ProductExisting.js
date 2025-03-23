"use client";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import useCartStore from "@/app/store/cartstore";
import AddToCart from "../CartStore/AddToCart";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { useEffect, useState } from "react";

const ProductExisting = ({ product }) => {
  const { cart, inc_quantity, dec_quantity, remove } = useCartStore();
  const [Available, setAvailable] = useState(false);
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const foundItem = cart.find((item) => item.id === product.product_id);
    if (foundItem) {
      setAvailable(true);
      setCartItem(foundItem);
    } else {
      setAvailable(false);
    }
  }, [cart, product.product_id]);

  return (
    <>
      {Available ? (
        <div className="flex flex-row gap-2">
          <button
            onClick={() => inc_quantity(cartItem.id)}
            className=" text-blue-400 border border-blue-500 dark:text-white dark:border-white px-1 rounded-lg"
          >
            <FaPlus />
          </button>
          <span>{PersianNumbers(cartItem.quantity)}</span>

          {cartItem.quantity === 1 ? (
            <button
              onClick={() => {
                remove(cartItem.id);
                setAvailable(false);
              }}
            >
              <FaRegTrashCan className="text-danger text-xl" />
            </button>
          ) : (
            <FaMinus
              className=" text-blue-400 border border-blue-500  dark:text-white dark:border-white p-1 rounded-lg text-2xl cursor-pointer"
              onClick={() => dec_quantity(cartItem.id)}
            />
          )}
        </div>
      ) : (
        <AddToCart product={product} onAdd={() => setAvailable(true)} />
      )}
    </>
  );
};

export default ProductExisting;
