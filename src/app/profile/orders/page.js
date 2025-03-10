"use client";

import PersianNumbers from "@/app/utils/ToPersianNumber";
import Link from "next/link";
import { Divider } from "@heroui/divider";
import { useContext, useEffect, useState } from "react";
import ShowPersianNumbers from "@/app/utils/ShowPersinaNumbers";
import { AuthContext } from "@/app/context/AuthContext";
import { Button } from "@heroui/react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState("همه");
  const { user } = useContext(AuthContext);

  const fetchOrders = async (inputParams) => {
    try {
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Orders/GetOrders?${inputParams}`
      );
      const response = await data.json();
      setOrders(response);
      setFilteredOrders(response);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  const abortOrder = async (order_id) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/Profile/Orders/UpdateOrderStatus",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id }),
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id
              ? { ...order, status_order: "لغو شده" } 
              : order
          )
        );
      } else {
        console.error("Failed to update order status:", data);
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };
  

  useEffect(() => {
    if (user) {
      const inputParams = new URLSearchParams({
        cust_id: user.customer_id,
      });
      fetchOrders(inputParams);
    }
  }, [user]);

  useEffect(() => {
    if (activeStatus === "همه") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.status_order === activeStatus
      );
      setFilteredOrders(filtered);
    }
  }, [activeStatus, orders]);

  return (
    <>
      <div className="shadow-xl bg-white p-10 rounded-l-3xl">
        <nav className="flex flex-row justify-center items-center gap-10 mb-5">
          {[
            "همه",
            "در انتظار پرداخت",
            "در حال پردازش",
            "ارسال سفارش",
            "لغو سفارش",
          ].map((status) => (
            <button
              key={status}
              className={`border-2 rounded-lg p-2 w-[150px] text-center transition-all ${
                activeStatus === status
                  ? "border-blue-700 bg-blue-100"
                  : "border-blue-500"
              }`}
              onClick={() => {
                setActiveStatus(status);
              }}
            >
              {status}
            </button>
          ))}
        </nav>
        <div className="flex flex-col mt-5">
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div className="p-5 rounded-md" key={index}>
                <div className="flex flex-row justify-between ">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <p>شماره سفارش:</p>
                    <p>{ShowPersianNumbers(order.order_code)}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <p>وضعیت سفارش:</p>
                    <p
                      className={`text-center bg-slate-200 rounded-2xl py-2 px-5 w-[150px] ${
                        order.status_order === "در انتظار پرداخت"
                          ? "text-warning-600"
                          : order.status_order === "ارسال سفارش"
                          ? "text-green-600"
                          : order.status_order === "لغو سفارش"
                          ? "text-danger"
                          : order.status_order === "در حال پردازش"
                          ? "text-blue-700"
                          : ""
                      }`}
                    >
                      {order.status_order}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 my-5">
                  <p>مجموع پرداختی</p>
                  <span>{PersianNumbers(order.total_price)} تومان </span>
                </div>
                <div className="flex flex-row items-center justify-end mb-2 gap-3">
                  {order.status_order == "در انتظار پرداخت" ? (
                    <Button
                      color="success"
                      className="px-[1.1rem] py-[1.45rem] text-white"
                    >
                      پرداخت مجدد
                    </Button>
                  ) : null}
                  {order.status_order == "در حال پردازش" ? (
                    <Button
                      color="danger"
                      className="px-[1.7rem] py-[1.45rem]"
                      onPress={()=>abortOrder(order.order_id)}
                    >
                      لغو سفارش
                    </Button>
                  ) : null}
                  <Link
                    className=" bg-blue-600 p-3 rounded-xl shadow-sm text-white"
                    href={`/profile/orders/${order.order_code}`}
                  >
                    مشاهده سفارش
                  </Link>
                </div>

                <Divider />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              هیچ سفارشی با این وضعیت یافت نشد.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default Orders;
