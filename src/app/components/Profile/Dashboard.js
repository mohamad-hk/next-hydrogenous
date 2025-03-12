"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { Card, CardBody } from "@heroui/react";
import { useContext, useEffect, useState } from "react";

const Dashboard = () => {
  const [orders, setOrders] = useState();
  const { user } = useContext(AuthContext);

  const getOrders = async (input_params) => {
    try {
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Shipment/GetShipment?${input_params}`
      );
      const response = await data.json();
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
  return (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 shadow-xl bg-white p-10 rounded-l-3xl">
      <Card className="h-[150px]">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">10</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>در انتظار پرداخت</p>
          </div>
        </CardBody>
      </Card>
      <Card className="h-[150px]">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">10</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>در حال پردازش</p>
          </div>
        </CardBody>
      </Card>
      <Card className="h-[150px]">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">10</p>
              <p className="text-xl">سفارش</p>
            </div>
            <p>ارسال شده</p>
          </div>
        </CardBody>
      </Card>
      <Card className="h-[150px]">
        <CardBody>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row">
              <p className="text-xl">10</p>
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
