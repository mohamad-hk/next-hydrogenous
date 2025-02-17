"use client";
import { useEffect, useState } from "react";
import useCartStore from "@/app/store/cartstore";
import PersianNumbers from "./ToPersianNumber";

const CounterBasket = () => {
  const [counter, SetCounter] = useState(0);
  const { cart } = useCartStore();
  useEffect(() => {
    SetCounter(cart.length);
  }, [cart]);
  return <> {PersianNumbers(counter)}</>;
};

export default CounterBasket;
