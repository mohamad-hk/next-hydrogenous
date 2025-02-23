"use client";

import { usePathname } from "next/navigation";
import FooterDesktop from "./FooterDesktop";
import FooterMobile from "./FooterSm";
import { useEffect, useState } from "react";
const Footer = () => {
  const pathname = usePathname();
  const [LargeScreen, setLargeScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const ShowFooter =
    pathname != "/cart" || pathname != "/shipment" || pathname != "/payment";

  return (
    <>{ShowFooter && (LargeScreen ? <FooterDesktop /> : <FooterMobile />)}</>
  );
};
export default Footer;
