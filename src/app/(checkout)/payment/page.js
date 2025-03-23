"use client";
import Orderinfo from "../../components/Shipment/OrderInfo";
import OrderSurvey from "../../components/Payment/OrderSurvey";
import ReceiverInfo from "../../components/Payment/RecieverInfo";
import AddDiscountCode from "../../components/Payment/AddDiscountCode";
import ShipmentSurvey from "../../components/Payment/ShipmentSurvey";
import ChoiceGateaway from "../../components/Payment/ChoiceGateway";
const Payment = () => {


  return (
    <div className="grid grid-cols-1 mx-auto justify-center lg:grid-cols-[_minmax(600px,_1fr)_minmax(100px,_300px)] xl:grid-cols-[_minmax(700px,_1000px)_minmax(100px,_300px)] md:gap-x-10 md:p-10 py-[5.5rem] mb-20 lg:mb-0 ">
      <div className="flex flex-col gap-3">
        <ChoiceGateaway />
        <AddDiscountCode />
        <div className="flex flex-col border rounded-md p-3">
          <h1 className="text-lg">خلاصه سفارش</h1>
          <ShipmentSurvey />
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
      <Orderinfo href={"/payment"} button="پرداخت" />
    </div>
  );
};

export default Payment;
