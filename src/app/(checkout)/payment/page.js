"use client";
import Orderinfo from "../../components/Shipment/OrderInfo";
import OrderSurvey from "../../components/Payment/OrderSurvey";
import ReceiverInfo from "../../components/Payment/RecieverInfo";
import AddDiscountCode from "../../components/Payment/AddDiscountCode";
import ShipmentSurvey from "../../components/Payment/ShipmentSurvey";
import ChoiceGateaway from "../../components/Payment/ChoiceGateway";
import { useContext, useState } from "react";
import { ShipmentContext } from "@/app/context/ShipmentContext";
import { AuthContext } from "@/app/context/AuthContext";
import useCartStore from "@/app/store/cartstore";
import { Button } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const { user } = useContext(AuthContext);
  const { shipmentId } = useContext(ShipmentContext);
  const { cart, totalBasket } = useCartStore();
   if (!user) {
      redirect("/auth/login")
    }

  const SetOrder = async () => {
    setIsLoading(true);
    let price_deliver = totalBasket > 400000 ? 0 : 45000;

    const cartItems = cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderData = {
      method_sending: "ارسال با پست",
      status_order: "ثبت سفارش",
      l_products: cartItems,
      total_price: totalBasket,
      price_deliver: price_deliver,
      cust_id: user?.customer_id, 
      ship_id: shipmentId,
    };

    try {
      const res = await fetch("/api/SetOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/profile/orders");
      }
       else {
        console.error("Error placing order:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:mx-auto lg:grid-cols-[_minmax(600px,_1fr)_minmax(100px,_300px)] xl:grid-cols-[_minmax(800px,_1fr)_minmax(100px,_300px)] md:gap-x-10 md:p-10 py-[5.5rem] px-3 ">
      <div className="flex flex-col gap-3">
        <ChoiceGateaway />
        <AddDiscountCode />
        <div className="flex flex-col border rounded-md p-3">
          <h1 className="text-lg">خلاصه سفارش</h1>
          <ShipmentSurvey />
          <div className="p-3">
            <h1 className="text-lg">تحویل گیرنده</h1>
            <ReceiverInfo />
          </div>
          <div className="p-3">
            <h1 className="text-lg">سبد خرید شما</h1>
            <OrderSurvey />
          </div>
        </div>
      </div>
      <Button onPress={SetOrder} disabled={isLoading}>
        {isLoading ? "در حال پردازش..." : "پرداخت"}
      </Button>
      {/* <Orderinfo href={"/payment"} button="پرداخت" /> */}
    </div>
  );
};

export default Payment;
