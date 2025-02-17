"use client";
import Link from "next/link";
import Cart from "../components/CartStore/ShowCart";
import { Button, Card, CardBody } from "@heroui/react";
import { Progress } from "@heroui/react";
import PersianNumbers from "../utils/ToPersianNumber";

const Basket = () => {
  return (
    <>
      <div className="grid max-w-[1200px] mx-auto grid-cols-[_minmax(800px,_1fr)_minmax(300px,_400px)] gap-x-10  p-10 min-h-[600px] ">
        <div className="shadow-lg rounded-xl p-3">
          <Cart />
        </div>
        <div>
          <Card>
            <CardBody>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between max-h-[400px]">
                  <div className="flex flex-col items-start gap-2">
                    <p>هزینه ارسال</p>
                    <p>مجموع نخفیف</p>
                    <p>مبلغ قابل پرداخت</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>15000</p>
                    <p>15000</p>
                    <p>15000</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Progress size="md" value={40} />
                  <p className="text-center">
                    {PersianNumbers(15000)} تا ارسال رایگان
                  </p>
                </div>

                <Button color="primary">
                  <Link href={"/shipment"}>ادامه خرید</Link>
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Basket;
