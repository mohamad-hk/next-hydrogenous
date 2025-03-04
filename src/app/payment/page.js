import Image from "next/image";
import Orderinfo from "../components/Shipment/OrderInfo";
import { TbTruckDelivery } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";
import { LuClock } from "react-icons/lu";
import PersianNumbers from "../utils/ToPersianNumber";
import OrderSurvey from "../components/Payment/OrderSurvey";
import ReceiverInfo from "../components/Payment/RecieverInfo";
import AddDiscountCode from "../components/Payment/AddDiscountCode";

const Payment = () => {
  return (
    <div className="grid grid-cols-1 lg:mx-auto lg:grid-cols-[_minmax(600px,_1fr)_minmax(100px,_300px)]  xl:grid-cols-[_minmax(800px,_1fr)_minmax(100px,_300px)] md:gap-x-10 md:p-10 ">
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
        <AddDiscountCode />
        <div className="flex flex-col border rounded-md p-3">
          <h1 className="text-lg">خلاصه سفارش</h1>
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
          <div className="p-3">
            <h1 className="text-lg">تحویل گیرنده</h1>
            <ReceiverInfo />
          </div>
          <div className="p-3">
            <h1 className="text-lg">سبد خرید شما</h1>
            <OrderSurvey />
          </div>
        </div>
      </div>

      <Orderinfo href={"/payment"} button=" پرداخت" />
    </div>
  );
};

export default Payment;
