"use client";
import { useEffect, useState } from "react";
import useCartStore from "@/app/store/cartstore";

const CounterBasket = () => {
  const [counter, SetCounter] = useState(0);
  const { cart } = useCartStore();
  useEffect(() => {
    SetCounter(cart.length);
  }, [cart]);
  return <> {counter}</>;
};

export default CounterBasket;
