"use client";
import { TbTruckDelivery } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { LuClock } from "react-icons/lu";
import PersianNumbers from "@/app/utils/ToPersianNumber";

const ShipmentSurvey = () => {
  return (
    <>
      <div className="flex flex-col  sm:flex-row sm:justify-center items-center gap-5">
        <div className="flex flex-row pe-48 ps-2 sm:pe-16 lg:pe-16 xl:pe-40  md:pe-24 items-center py-3 border gap-3 rounded-md ">
          <LuClock className="text-blue-500 text-2xl" />
          <div>
            <p className="text-medium">زمان ارسال</p>
            <p className="text-xs">1403/5/4</p>
          </div>
        </div>
        <div className="flex flex-row pe-48 ps-2 sm:pe-16 lg:pe-16 xl:pe-40 md:pe-24 items-center py-3 border gap-3 rounded-md">
          <CiMoneyBill className="text-blue-500 text-3xl" />
          <div>
            <p className="text-medium">هزینه ارسال</p>
            <p className="text-xs">{PersianNumbers(50000) + " تومان "}</p>
          </div>
        </div>
        <div className="flex flex-row pe-48 ps-2 sm:pe-16 lg:pe-16 xl:pe-40 md:pe-24 items-center py-3 border gap-3 rounded-md">
          <TbTruckDelivery className="text-blue-500 text-2xl" />
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
