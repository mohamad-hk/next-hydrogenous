"use client";
import { useContext, useEffect, useState } from "react";
import Orderinfo from "../../components/Shipment/OrderInfo";
import ShowAddresses from "../../components/Shipment/ShowAddresses";
import { AuthContext } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading/Loading";
import { redirect } from "next/navigation";
import { Radio, RadioGroup } from "@heroui/react";

const Shipment = () => {
  const [addresses, setAddresses] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  const getAddresses = async (input_params) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Shipments/GetShipment?${input_params}`
      );
      const response = await data.json();
      setAddresses(response);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      getAddresses(input_params);
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 pt-[5.5rem] px-3 pb-32 md:mx-auto md:grid-cols-[_minmax(500px,_1fr)_minmax(100px,_300px)] lg:grid-cols-[_minmax(800px,_1fr)_minmax(100px,_300px)] md:gap-x-10 md:p-10 ">
          <ShowAddresses data={addresses} />
          <Orderinfo href={"/payment"} button="تایید و تکمیل سفارش" />
          <div className="flex flex-col gap-3">
            <h1>انتخاب شیوه ارسال</h1>
            <RadioGroup defaultValue="london">
              <Radio value="london" >ارسال با پست</Radio>
            </RadioGroup>
            <RadioGroup isDisabled>
              <Radio value="buenos-aires">ارسال با پیک به زودی ...</Radio>
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
};
export default Shipment;
