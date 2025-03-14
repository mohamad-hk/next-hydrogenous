"use client";
import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderTracking = () => {
  const [OrderCode, setOrderCode] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    if (orderStatus != "") {
      toast(" وضعیت سفارش شما: " + orderStatus);
    }
  }, [orderStatus]);

  const fetchOrder = async (event) => {
    event.preventDefault();

    try {
      const input_param = new URLSearchParams({ order_code: OrderCode });

      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Orders/GetStatusOrder?${input_param}`
      );
      if (!data.ok) {
        throw new Error("Failed to fetch order status");
      }
      const response = await data.json();
      response[0]
        ? setOrderStatus(response[0].status_order)
        : setOrderStatus("کد وارد شده اشتباه است");
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  return (
    <>
      <div className="xl:pb-[25.5rem]">
        <h2 className="text-2xl ms-5">پیگیری سفارش</h2>
        <form onSubmit={fetchOrder} className="my-5">
          <div className="flex flex-col items-center gap-5 w-[80%] mx-auto sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[30%]">
            <Input
              label="شماره سفارش "
              type="text"
              variant={"bordered"}
              value={OrderCode}
              onChange={(e) => setOrderCode(e.target.value)}
            />
            <Button type="submit" className=" text-white" color="success">
              رهگیری سفارش
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default OrderTracking;
