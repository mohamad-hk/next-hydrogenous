"use client";
import { useEffect, useState } from "react";
import OrderInfoDesktop from "./OrderInfoDesktop";
import OrderInfoSm from "./OrderInfoSm";
import { usePathname } from "next/navigation";

const Orderinfo = ({ button }) => {
  const [LargeScreen, setLargeScreen] = useState(false);
  const pathname = usePathname();
  let refrence = "";
  if (pathname == "/cart") {
    refrence = "/shipment";
  } else if (pathname == "/shipment") {
    refrence = "/payment";
  } else {
    refrence = "/confirm";
  }
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
      {LargeScreen ? (
        <OrderInfoDesktop href={refrence} button={button} />
      ) : (
        <OrderInfoSm href={refrence} button={button} />
      )}
    </>
  );
};

export default Orderinfo;
