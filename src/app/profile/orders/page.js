"use client";

import PersianNumbers from "@/app/utils/ToPersianNumber";
import Link from "next/link";
import { Divider } from "@heroui/divider";
import { useContext, useEffect, useState } from "react";
import ShowPersianNumbers from "@/app/utils/ShowPersinaNumbers";
import { AuthContext } from "@/app/context/AuthContext";

const Orders = () => {
  const [orders, Set_orders] = useState([]);
  const { user } = useContext(AuthContext);

  const fetch_orders = async (input_params) => {
    try {
      const data = await fetch(
        `/api/GetOrders?${input_params}`
      );
      const response = await data.json();
      Set_orders(response);
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      fetch_orders(input_params);
    }
  }, [user]);

  return (
    <>
      <div className="shadow-xl bg-white p-10 rounded-l-3xl">
        <nav className="flex flex-row justify-center items-center gap-10">
          <Link
            className="border-2 rounded-lg p-2 border-blue-500 w-[150px] text-center"
            href={"#"}
          >
            همه
          </Link>
          <Link
            className="border-2 rounded-lg p-2 border-blue-500 w-[150px] text-center"
            href={"#"}
          >
            در انتظار پرداخت
          </Link>
          <Link
            className="border-2 rounded-lg p-2 border-blue-500 w-[150px] text-center"
            href={"#"}
          >
            در حال پردازش
          </Link>
          <Link
            className="border-2 rounded-lg p-2 border-blue-500 w-[150px] text-center"
            href={"#"}
          >
            ارسال شده
          </Link>
          <Link
            className="border-2 rounded-lg p-2 border-blue-500 w-[150px] text-center"
            href={"#"}
          >
            لفو شده
          </Link>
        </nav>
        <div className="flex flex-col mt-5">
          {orders?.map((order, index) => {
            return (
              <div className=" p-5 rounded-md" key={index}>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row items-center justify-center gap-2">
                    <p>شماره سفارش:</p>
                    <p> {ShowPersianNumbers(order.order_code)}</p>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <p>وضعیت سفارش:</p>

                    {(() => {
                      switch (order.status_order) {
                        case "در انتظار پرداخت":
                          return (
                            <p className="text-center text-warning-600 bg-slate-200 rounded-2xl py-2 px-5 w-[150px]">
                              در انتظار پرداخت
                            </p>
                          );
                        case "ارسال سفارش":
                          return (
                            <p className="text-center text-green-600 bg-slate-200 rounded-2xl py-2 px-5  w-[150px]">
                              دریافت شده
                            </p>
                          );
                        case "لغو سفارش":
                          return (
                            <p className="text-center text-danger bg-slate-200 rounded-2xl py-2 px-5  w-[150px]">
                              لغو شده
                            </p>
                          );
                        case "در حال پردازش":
                          return (
                            <p className="text-center text-blue-700 bg-slate-200 rounded-2xl py-2 px-5  w-[150px]">
                              در حال پردازش
                            </p>
                          );
                        default:
                          return " ";
                      }
                    })()}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 my-5">
                  <p>مجموع پرداختی</p>
                  <span>{PersianNumbers(order.total_price)} تومان </span>
                </div>
                <Link
                  className="float-left bg-blue-600 p-2 rounded-lg shadow-sm text-white mb-5"
                  href={"#"}
                >
                  مشاهده سفارش
                </Link>
                <Divider />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Orders;
