import Image from "next/image";
import Orderinfo from "../components/Shipment/OrderInfo";
import { TbTruckDelivery } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { LuClock } from "react-icons/lu";
import { Button, Input } from "@heroui/react";
import PersianNumbers from "../utils/ToPersianNumber";
import OrderSurvey from "../components/Payment/OrderSurvey";

const Payment = () => {
  return (
    <div className="grid mx-auto grid-cols-[_minmax(800px,_1fr)_minmax(100px,_300px)] gap-x-10 p-10 ">
      <div className="flex flex-col gap-3">
        <div className="border p-3 rounded-md">
          <h1 className="text-lg">انتخاب درگاه پرداخت</h1>
          <div className="flex flex-row gap-10">
            <Image
              src={"/images/statics/logo-meli.png"}
              width={100}
              height={100}
              alt="image not found"
            />
            <Image
              src={"/images/statics/logo-zarinpal.png"}
              width={100}
              height={100}
              alt="image not found"
            />
          </div>
        </div>
        <div className="border p-3 rounded-md">
          <h1 className="text-lg">کد تخفیف</h1>
          <div className="flex flex-row items-center w-[300px] gap-3 mt-3">
            <Input label=" کد تخفیف" type="text" />
            <Button variant="flat">ثبت کد</Button>
          </div>
        </div>

        <div className="flex flex-col border rounded-md">
          <h1 className="text-lg">خلاصه سفارش</h1>
          <div className="flex flex-col  md:flex-row justify-center items-center gap-5">
            <div className="flex flex-row pe-40 ps-2 items-center py-3 border gap-3 rounded-md ">
              <LuClock className="text-blue-500 text-2xl" />
              <div>
                <p className="text-medium">زمان ارسال</p>
                <p className="text-xs">1403/5/4</p>
              </div>
            </div>
            <div className="flex flex-row items-center pe-40 ps-2 py-3 border gap-3 rounded-md">
              <CiMoneyBill className="text-blue-500  text-3xl" />
              <div>
                <p className="text-medium">هزینه ارسال</p>
                <p className="text-xs">{PersianNumbers(50000) + " تومان "}</p>
              </div>
            </div>
            <div className="flex flex-row items-center pe-40 ps-2 py-3 border gap-3 rounded-md">
              <TbTruckDelivery className="text-blue-500  text-2xl" />
              <div className="">
                <p className="text-medium">نحوه ارسال</p>
                <p className="text-xs">پست سفارشی</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-lg">تحویل گیرنده</h1>
            <p>lorem</p>
          </div>
          <div>
            <h1 className="text-lg">سبد خرید شما</h1>
            <OrderSurvey/>
          </div>
        </div>
      </div>

      <Orderinfo href={"/payment"} button=" پرداخت" />
    </div>
  );
};

export default Payment;
