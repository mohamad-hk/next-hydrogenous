"use client";
import { useEffect, useState } from "react";
import Navigation from "./Navbar";
import NavbarMobile from "./NavbarSm";
const Header = () => {
  // const [isSmallScreen, setIsSmallScreen] = useState(false);

  // useEffect(() => {
  //   const checkScreenSize = () => {
  //     setIsSmallScreen(window.innerWidth < 700);
  //   };
  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);
  //   return () => {
  //     window.removeEventListener("resize", checkScreenSize);
  //   };
  // }, []);

  return (
    <>
      <NavbarMobile /> <Navigation />
    </>
  );
};
export default Header;
