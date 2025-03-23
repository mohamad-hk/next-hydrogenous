"use client";
import { TbTruckDelivery } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { LuClock } from "react-icons/lu";
import PersianNumbers from "@/app/utils/ToPersianNumber";

const ShipmentSurvey = () => {
  return (
    <>
      <div className="flex flex-col  sm:flex-row sm:justify-center items-center gap-5">
        <div className="flex flex-row pe-48 ps-2 sm:pe-16 lg:pe-16 xl:pe-40  md:pe-24 items-center py-3 border gap-3 rounded-md  dark:bg-[#4e76a4] ">
          <LuClock className="text-blue-500 text-2xl dark:text-white" />
          <div>
            <p className="text-medium">زمان ارسال</p>
            <p className="text-xs">1403/5/4</p>
          </div>
        </div>
        <div className="flex flex-row pe-48 ps-2 sm:pe-16 lg:pe-16 xl:pe-40 md:pe-24 items-center py-3 border gap-3 rounded-md  dark:bg-[#4e76a4]">
          <CiMoneyBill className="text-blue-500 text-3xl dark:text-white" />
          <div>
            <p className="text-medium">هزینه ارسال</p>
            <p className="text-xs">{PersianNumbers(50000) + " تومان "}</p>
          </div>
        </div>
        <div className="flex flex-row pe-48 ps-2 sm:pe-16 lg:pe-16 xl:pe-40 md:pe-24 items-center py-3 border gap-3 rounded-md  dark:bg-[#4e76a4]">
          <TbTruckDelivery className="text-blue-500 text-2xl  dark:text-white" />
          <div className="">
            <p className="text-medium">نحوه ارسال</p>
            <p className="text-xs">پست سفارشی</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShipmentSurvey;
