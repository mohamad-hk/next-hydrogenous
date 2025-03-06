"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { Input } from "@heroui/react";
import { useContext, useEffect, useState } from "react";

const PersonalInfo = () => {
  const [info, setInfo] = useState();
  const { user } = useContext(AuthContext);
  const getInfo = async (input_params) => {
    try {
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/GetInfo?${input_params}`
      );
      const response = await data.json();
      setInfo(response);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      getInfo(input_params);
    }
  }, [user]);
  return (
    <>
      <div className=" shadow-lg p-5 rounded-3xl">
        <h2 className="text-center text-3xl mt-5 md:mt-0 mb-5">
          ویرایش مشخصات
        </h2>
        <form
          className="sm:w-[95%] lg:w-[90%] xl:w-[80%] 2xl:w-[70%] block mx-auto  "
          action=""
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10 ">
            <Input label="نام" type="text" />
            <Input label="نام خانوادگی" type="text" />
            <Input label="ایمیل" type="email" />
            <Input label="شماره موبایل" type="tel" />
            <Input label="کلمه عبور" type="password" />
            <Input label="تکرار کلمه عبور" type="password" />
          </div>
          <input
            className="bg-green-600 text-white px-10 py-3 rounded-2xl mt-5 block mx-auto"
            type="submit"
            value="ویرایش"
          />
        </form>
      </div>
    </>
  );
};
export default PersonalInfo;
