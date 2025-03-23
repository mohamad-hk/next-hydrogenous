"use client";
import { useEffect } from "react";
import Cart from "../../components/CartStore/ShowCart";
import Orderinfo from "../../components/Shipment/OrderInfo";
import useCouponStore from "@/app/store/discountstore";

const Basket = () => {
  useEffect(()=>{
    useCouponStore.getState().clearCoupon();

  },[])
  return (
    <>
      <div className="grid grid-cols-1 pt-[5.5rem] px-3 md:max-w-[1200px] md:mx-auto md:grid-cols-[_minmax(800px,_1fr)_minmax(300px,_400px)] md:gap-x-10">
        <div className="shadow rounded-xl md:p-3">
          <Cart />
        </div>
        <Orderinfo href={"/shipment"} button="ادامه خرید" />
      </div>
    </>
  );
};
export default Basket;
