"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { CgProfile } from "react-icons/cg";
import CheckLlogin from "../CheckLogin/CheckLogin";

const Login = () => {


  // useEffect(() => {
  //   const checkScreenSize = () => setLargeScreen(window.innerWidth > 768);
  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);
  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, []);


  return (
    <>
  <CheckLlogin/>
      
    </>
  );
};

export default Login;
