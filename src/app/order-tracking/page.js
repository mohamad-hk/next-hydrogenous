"use client";
import { Button, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const OrderTracking = () => {
  const [OrderCode, setOrderCode] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    if (orderStatus != "") {
      toast(orderStatus);
    }
  }, [orderStatus]);
  async function handleSubmit(event) {
    event.preventDefault();
    fetchOrder();
  }

  const fetchOrder = async () => {
    try {
      const input_param = new URLSearchParams({ order_code: OrderCode });

      const data = await fetch(
        `https://hydrogenous.vercel.app/api/GetStatusOrder?${input_param}`
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
      <h2 className="text-2xl ms-5">پیگیری سفارش</h2>
      <ToastContainer />

      <form onSubmit={handleSubmit} className="my-5">
        <div className="flex flex-col items-center gap-5 w-[80%] mx-auto sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[30%]">
          <Input
            label="کد رهگیری"
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
    </>
  );
};

export default OrderTracking;
