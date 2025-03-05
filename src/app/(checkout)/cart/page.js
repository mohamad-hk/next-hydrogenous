"use client";
import Cart from "../../components/CartStore/ShowCart";
import Orderinfo from "../../components/Shipment/OrderInfo";

const Basket = () => {
  return (
    <>
      <div className="grid grid-cols-1 p-5 md:max-w-[1200px] md:mx-auto md:grid-cols-[_minmax(800px,_1fr)_minmax(300px,_400px)] md:gap-x-10  md:p-10 md:min-h-[600px] ">
        <div className="shadow-lg rounded-xl  md:p-3">
          <Cart />
        </div>
        <Orderinfo href={"/shipment"} button="ادامه خرید" />
      </div>
    </>
  );
};
export default Basket;
