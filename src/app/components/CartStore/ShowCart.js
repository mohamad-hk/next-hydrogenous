"use client";
import useCartStore from "@/app/store/cartstore";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import Link from "next/link";
import { Divider } from "@heroui/divider";
import { usePathname } from "next/navigation";

const Cart = ({ close }) => {
  const { cart, inc_quantity, dec_quantity, remove } = useCartStore();
  const [total, SetTotal] = useState(0);

  const pathname = usePathname();

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    SetTotal(newTotal);
  }, [cart]);
  return (
    <div>
      {cart.length === 0 ? (
        <p className="text-gray-600">سبد خرید خالی است.</p>
      ) : (
        cart.map((item, index) => (
          <div key={item.id} className="">
            <div className="rounded-lg dark:bg-[#4e76a4] flex flex-row justify-between items-center  px-2 pb-2">
              <div className="flex flex-row items-center">
                <div
                  className={`flex ${
                    pathname === "/cart" ? "flex-row items-center" : "flex-col"
                  }`}
                >
                  <Image
                    src={item.image}
                    width={150}
                    height={150}
                    alt="image not found"
                  />
                  <div
                    className={
                      pathname === "/cart" ? "flex flex-col gap-3" : ""
                    }
                  >
                    <p className="text-[14px]">{item.name}</p>
                    {pathname === "/cart" && (
                      <p>{PersianNumbers(item.price)} تومان</p>
                    )}
                  </div>
                </div>
                {pathname !== "/cart" && (
                  <p>{PersianNumbers(item.price)} تومان</p>
                )}
              </div>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => inc_quantity(item.id)}
                  className="text-blue-400 border border-blue-500 px-1 rounded-lg"
                >
                  <FaPlus />
                </button>
                <span>{PersianNumbers(item.quantity)}</span>

                {item.quantity === 1 ? (
                  <button onClick={() => remove(item.id)}>
                    <FaRegTrashCan className="text-danger text-xl" />
                  </button>
                ) : (
                  <FaMinus
                    className="text-blue-400 border border-blue-500 p-1 rounded-lg text-2xl cursor-pointer"
                    onClick={() => dec_quantity(item.id)}
                  />
                )}
              </div>
            </div>
            {cart.length - 1 !== index && <Divider className="dark:bg-gray-100 dark:my-2" />}
          </div>
        ))
      )}
      {pathname !== "/cart" && (
        <>
        <div className="flex flex-row items-center gap-2 mt-5">
          <p>مجموع سبد:</p>
          <p>{PersianNumbers(total)} تومان</p>
        </div>
          <Link
            href="/cart"
            className="w-[80%] block mx-auto mt-5 bg-danger rounded-xl text-white text-center p-2"
            onClick={close}
          >
            ادامه خرید
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
