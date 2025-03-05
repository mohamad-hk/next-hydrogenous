"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navbar";
import NavbarMobile from "./NavbarSm";

const Header = () => {
  const pathname = usePathname();
  if (
    pathname === "/cart" ||
    pathname === "/shipment" ||
    pathname === "/payment"
  ) {
    return null;
  }

  return (
    <>
      <Navigation />
      <NavbarMobile />
    </>
  );
};

export default Header;
