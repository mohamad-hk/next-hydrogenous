"use client";
import { useContext, useEffect, useState } from "react";
import Orderinfo from "../../components/Shipment/OrderInfo";
import ShowAddresses from "../../components/Shipment/ShowAddresses";
import { AuthContext } from "@/app/context/AuthContext";
import Loading from "@/app/components/Loading/Loading";
import { Radio, RadioGroup } from "@heroui/react";
import useCouponStore from "@/app/store/discountstore";

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
      useCouponStore.getState().clearCoupon();

    }
  }, [user]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 pt-[5.5rem] px-3 pb-32  md:grid-cols-[_minmax(400px,_1fr)_minmax(200px,_300px)] lg:grid-cols-[_minmax(400px,_1fr)_minmax(300px,_300px)] xl:grid-cols-[_minmax(400px,_1fr)_minmax(300px,_300px)] md:gap-x-10 md:p-10 xl:px-56 ">
          <ShowAddresses data={addresses} />
          <Orderinfo href={"/payment"} button="تایید و تکمیل سفارش" />
          <div className="flex flex-col gap-3 mt-5  ">
            <h1>انتخاب شیوه ارسال</h1>
            <RadioGroup defaultValue="london" >
              <Radio value="london" className=" dark:text-white" >ارسال با پست</Radio>
            </RadioGroup>
            <RadioGroup isDisabled>
              <Radio value="buenos-aires" className=" dark:text-white">ارسال با پیک به زودی ...</Radio>
            </RadioGroup>
          </div>
        </div>
      )}
    </>
  );
};
export default Shipment;
