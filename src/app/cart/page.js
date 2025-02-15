"use client";
import { Card, CardBody } from "@heroui/react";
import useCartStore from "../store/cartstore";

const Cart = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <>
      <div className="grid grid-cols-[minmax(600px,_1fr)_minmax(300px,_400px)] gap-x-10 justify-items-center p-10 h-screen">
        <main className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6"> سبد خرید</h1>
          {cart.length === 0 ? (
            <p className="text-gray-600">سبد خرید شما خالی است.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="p-4 border rounded-lg shadow-md flex justify-between"
                >
                  <span>
                    {item.name} - {item.quantity} 
                  </span>
                  <span className="text-gray-600">{item.price} تومان</span>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
};
export default Cart;
