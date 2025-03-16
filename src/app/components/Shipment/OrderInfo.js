"use client";
import { useContext, useEffect, useState } from "react";
import OrderInfoDesktop from "./OrderInfoDesktop";
import OrderInfoSm from "./OrderInfoSm";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import { ShipmentContext } from "@/app/context/ShipmentContext";
import useCartStore from "@/app/store/cartstore";

const Orderinfo = ({ button }) => {
  const [LargeScreen, setLargeScreen] = useState(false);

  const pathname = usePathname();
  let refrence = "";
  if (pathname == "/cart") {
    refrence = "/shipment";
  } else if (pathname == "/shipment") {
    refrence = "/payment";
  } else {
    refrence = "/confirm";
  }

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const { shipmentId } = useContext(ShipmentContext);
  const { cart, totalBasket } = useCartStore();

  const SetOrder = async () => {
    setIsLoading(true);
    let price_deliver = totalBasket > 400000 ? 0 : 45000;

    const cartItems = cart.map((item) => ({
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
        useCartStore.getState().clearCart();
        router.push("/profile/orders");
      } else {
        console.error("Error placing order:", data);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <>
      {LargeScreen ? (
        <OrderInfoDesktop
          href={refrence}
          button={button}
          set_function={SetOrder}
        />
      ) : (
        <OrderInfoSm href={refrence} button={button} set_function={SetOrder} loading={isLoading} />
      )}
    </>
  );
};

export default Orderinfo;
