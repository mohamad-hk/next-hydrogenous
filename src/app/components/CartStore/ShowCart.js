"use client";
import useCartStore from "@/app/store/cartstore";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Divider } from "@heroui/divider";
import { usePathname } from "next/navigation";

const Cart = () => {
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
        cart.map((item) => (
          <>
            <div
              key={item.id}
              className="rounded-lg flex flex-row justify-between items-center"
            >
              <div className="flex flex-row items-center ">
                <div
                  className={`flex ${
                    pathname == "/cart" ? " flex-row items-center " : "flex-col"
                  }`}
                >
                  <Image
                    src={item.image}
                    width={150}
                    height={150}
                    alt="image not found"
                  />
                  <div className={pathname == "/cart" ? "flex flex-col gap-3" : null}>
                    <p className="text-[14px]">{item.name}</p>
                    {pathname == "/cart" ? (
                      <p>{PersianNumbers(item.price)} تومان </p>
                    ) : null}
                  </div>
                </div>
                {pathname != "/cart" ? (
                  <p>{PersianNumbers(item.price)} تومان </p>
                ) : null}
              </div>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => inc_quantity(item.id)}
                  className=" text-blue-400 border border-blue-500 px-1 rounded-lg"
                >
                  <FaPlus />
                </button>
                <span>{PersianNumbers(item.quantity)}</span>
                <button
                  onClick={() => dec_quantity(item.id)}
                  className="text-blue-400 border border-blue-500 px-1 rounded-lg"
                >
                  <FaMinus />
                </button>
                <button onClick={() => remove(item.id)}>
                  <FaRegTrashCan className="text-danger" />
                </button>
              </div>
            </div>
            <Divider />
          </>
        ))
      )}
      {pathname == "/cart" ? null : (
        <>
          <p className="mt-5">{PersianNumbers(total)} تومان</p>
          <Button className="w-[80%] block mx-auto mt-5" color="danger">
            <Link href={"/cart"}>ادامه خرید</Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
