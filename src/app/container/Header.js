"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navbar";
import NavbarMobile from "./NavbarSm";

const Header = () => {
  const pathname = usePathname();

  return (
    <>
      <Navigation />
      {pathname === "/cart" ||
      pathname === "/shipment" ||
      pathname === "/payment" ? null : (
        <NavbarMobile />
      )}
    </>
  );
};
export default Header;
