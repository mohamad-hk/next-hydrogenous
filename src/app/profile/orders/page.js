"use client";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import ShowPersianNumbers from "@/app/utils/ShowPersinaNumbers";
import { AuthContext } from "@/app/context/AuthContext";
import { Button } from "@heroui/react";
import Link from "next/link";
import { Divider } from "@heroui/divider";
import Loading from "@/app/components/Loading/Loading";
import { redirect } from "next/navigation";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState("همه");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const fetchOrders = async (inputParams) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Orders/GetOrders?${inputParams}`
      );
      const response = await data.json();
      setOrders(response);
      setFilteredOrders(response);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات!");
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
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
    setLoading(true);

    if (activeStatus === "همه") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.status_order === activeStatus
      );
      setFilteredOrders(filtered);
    }

    setTimeout(() => setLoading(false), 500);
  }, [activeStatus, orders]);

  return (
    <>
      <div className="shadow-xl bg-white p-2 lg:p-10 rounded-l-3xl  dark:bg-[#4e76a4] ">
        <nav className="flex flex-row justify-center items-center gap-2 lg:gap-10 mb-5 overflow-x-scroll  md:overflow-auto">
          {[
            "همه",
            "در انتظار پرداخت",
            "در حال پردازش",
            "ثبت سفارش",
            "لغو سفارش",
          ].map((status) => (
            <button
              key={status}
              className={`border-2 rounded-lg p-2 w-[150px] text-center transition-all ${
                activeStatus === status
                  ? "border-blue-700 bg-blue-100  dark:bg-[#4e76a4]"
                  : "border-blue-500 dark:border-blue-100"
              }`}
              onClick={() => setActiveStatus(status)}
            >
              {status}
            </button>
          ))}
        </nav>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col mt-5">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <div className="p-5 rounded-md" key={index}>
                  <div className="flex flex-row justify-between ">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <p>شماره سفارش:</p>
                      <p>{ShowPersianNumbers(order.order_code)}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-2">
                      <p>وضعیت سفارش:</p>
                      <p
                        className={`text-center bg-slate-200 rounded-2xl py-2 px-5 w-[150px] ${
                          order.status_order === "در انتظار پرداخت"
                            ? "text-warning-600"
                            : order.status_order === "ثبت سفارش"
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
                    {order.status_order === "در انتظار پرداخت" && (
                      <Button
                        color="success"
                        className="px-[1.1rem] py-[1.45rem] text-white"
                      >
                        پرداخت مجدد
                      </Button>
                    )}
                    {order.status_order === "در حال پردازش" && (
                      <Button
                        color="danger"
                        className="px-[1.7rem] py-[1.45rem]"
                        onPress={() => abortOrder(order.order_id)}
                      >
                        لغو سفارش
                      </Button>
                    )}
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
        )}
      </div>
    </>
  );
};

export default Orders;
