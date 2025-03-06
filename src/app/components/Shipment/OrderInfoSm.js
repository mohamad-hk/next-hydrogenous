"use client";

import { useShipment } from "@/app/context/ShipmentContext";
import useCartStore from "@/app/store/cartstore";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Button, Card, CardBody } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const OrderInfoSm = ({ href, button }) => {
  const [LargeScreen, setLargeScreen] = useState(false);
  const { totalBasket, totalDiscount } = useCartStore();
  const { shipmentId } = useShipment();

  useEffect(() => {
    const checkScreenSize = () => {
      setLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <>
      <Card className="fixed bottom-0 w-full right-0 rounded-none">
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
            <Button isDisabled={!shipmentId} color="danger">
              <Link href={href}>{button}</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default OrderInfoSm;
