"use client";

import { useShipment } from "@/app/context/ShipmentContext";
import useCartStore from "@/app/store/cartstore";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OrderInfoSm = ({ href, button, set_function,loading }) => {
  const { totalBasket, totalDiscount } = useCartStore();
  const { shipmentId } = useShipment();
  const pathname = usePathname();


  return (
    <>
      <Card className="fixed bottom-0 w-full right-0 rounded-none z-10  dark:text-white dark:bg-[#4e76a4]">
        <CardBody>
          <div className="flex flex-col gap-5">
            <div className="flex flex-row justify-between max-h-[400px]">
              <div className="flex flex-col items-start gap-3">
                <p>مبلغ قابل پرداخت</p>
              </div>
              <div className="flex flex-col gap-3">
                <p>{PersianNumbers(totalBasket) + " تومان "}</p>
              </div>
            </div>

            {pathname == "/payment" ? (
              <Button onPress={set_function} disabled={loading}>
                {loading ? "در حال پردازش..." : "پرداخت"}
              </Button>
            ) : (
              <Link href={href} className="w-full">
                <button
                  className="w-full bg-blue-600 rounded-md text-white py-2 text-center text-lg disabled:opacity-50"
                  disabled={pathname !== "/cart" ? !shipmentId : false}
                >
                  {button}
                </button>
              </Link>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default OrderInfoSm;
