"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { Card, CardBody } from "@heroui/react";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const [abort, setAbort] = useState(0);
  const [waiting, setWaiting] = useState(0);
  const [processing, setProcessing] = useState(0);
  const [delivered, setDelivered] = useState(0);

  const getOrders = async (input_params) => {
    try {
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Orders/GetOrders?${input_params}`
      );
      const response = await data.json();
      console.log(response);
      setOrders(response);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      getOrders(input_params);
    }
  }, [user]);

  useEffect(() => {
    let abortCount = 0;
    let waitingCount = 0;
    let processingCount = 0;
    let deliveredCount = 0;

    orders.forEach((order) => {
      switch (order.status_order) {
        case "لغو سفارش":
          abortCount++;
          break;
        case "در انتظار پرداخت":
          waitingCount++;
          break;
        case "ارسال سفارش":
          deliveredCount++;
          break;
        case "ثبت سفارش":
          processingCount++;
          break;
        default:
          break;
      }
    });

    setAbort(abortCount);
    setWaiting(waitingCount);
    setProcessing(processingCount);
    setDelivered(deliveredCount);
  }, [orders]);
  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 shadow-xl bg-white  dark:bg-[#4e76a4]  p-10 rounded-l-3xl">
      <Card className="h-[150px]  dark:bg-[#4e76a4] dark:text-white">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">{waiting}</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>در انتظار پرداخت</p>
          </div>
        </CardBody>
      </Card>
      <Card className="h-[150px] dark:bg-[#4e76a4] dark:text-white">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">{processing}</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>در حال پردازش</p>
          </div>
        </CardBody>
      </Card>
      <Card className="h-[150px] dark:bg-[#4e76a4] dark:text-white">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">{delivered}</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>ارسال شده</p>
          </div>
        </CardBody>
      </Card>
      <Card className="h-[150px] dark:bg-[#4e76a4] dark:text-white">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">{abort}</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>لغو شده</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Dashboard;
