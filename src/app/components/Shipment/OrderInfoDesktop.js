"use client";

import { useShipment } from "@/app/context/ShipmentContext";
import useCartStore from "@/app/store/cartstore";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Button, Card, CardBody } from "@heroui/react";
import { Progress } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OrderInfoDesktop = ({ href, button, set_function,loading }) => {
  
  const { totalBasket, totalDiscount } = useCartStore();
  const flour = 500000;
  const { shipmentId } = useShipment();
  const pathname = usePathname();

  return (
    <>
      <div>
        <Card  className="dark:bg-[#4e76a4]  dark:text-white">
          <CardBody>
            <div className="flex flex-col gap-5">
              <div className="flex flex-row justify-between max-h-[400px]">
                <div className="flex flex-col items-start gap-3">
                  <p>هزینه ارسال</p>
                  <p> سود شما از سفارش</p>
                  <p>مبلغ قابل پرداخت</p>
                </div>
                <div className="flex flex-col gap-3">
                  <p>
                    {totalBasket > 500000
                      ? "رایگان"
                      : PersianNumbers(45000) + " تومان "}
                  </p>
                  <p>{PersianNumbers(totalDiscount) + " تومان "}</p>
                  <p>{PersianNumbers(totalBasket) + " تومان "}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {totalBasket > flour ? null : (
                  <div>
                    <Progress size="md" value={(totalBasket / flour) * 100} />
                    <p className="text-center mt-3">
                      {PersianNumbers(flour - totalBasket)} تا ارسال رایگان
                    </p>
                  </div>
                )}
              </div>
              {pathname == "/payment" ? (
                <Button color="primary" onPress={set_function} disabled={loading}>
                  {loading ? "در حال پردازش..." : "پرداخت"}
                </Button>
              ) : (
                <Button
                  isDisabled={pathname != "/cart" ? !shipmentId : undefined}
                  color="primary"
                >
                  <Link href={href}>{button}</Link>
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default OrderInfoDesktop;
