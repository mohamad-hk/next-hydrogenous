"use client";

import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LuPackage } from "react-icons/lu";
import { IoExitOutline } from "react-icons/io5";
import { BiBuildingHouse } from "react-icons/bi";
import { AuthContext } from "@/app/context/AuthContext";

const CheckLlogin = () => {
  const [state, setState] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 300);
  };
  const timeoutRef = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setState(2);
      setData(user);
    }
  }, [user]);

  return (
    <>
      {state == 1 && !user ? (
        <Link href={"/auth/login"}>ورود یا ثبت نام</Link>
      ) : (
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href={"/profile"}
            className="cursor-pointer flex items-center gap-2"
          >
            <CgProfile className="text-2xl" />
          </Link>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col gap-2 absolute top-10 left-0 bg-white shadow-lg rounded-lg py-3 w-72 z-10"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-row items-center gap-2">
                  <p>حساب کاربری من</p>
                  <p className="text-gray-500">
                    {data.first_name + " " + data.last_name}
                  </p>
                </div>
              </Link>
              <Link
                href="/profile/orders"
                className="block px-4 py-2 hover:bg-gray-100 transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-row items-center gap-2">
                  <LuPackage className="text-2xl" />
                  <p>سفارش های من</p>
                </div>
              </Link>
              <Link
                href="/profile/addresses"
                className="block px-4 py-2 hover:bg-gray-100 transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-row items-center gap-2">
                  <BiBuildingHouse className="text-2xl" />
                  <p>آدرس ها</p>
                </div>
              </Link>
              <Link
                href="/api/Auth/Logout"
                className="block px-4 py-2 hover:bg-danger hover:text-white transition-all duration-500 ease-in-out"
              >
                <div className="flex flex-row items-center gap-2">
                  <IoExitOutline className="text-2xl" />
                  <p>خروج از حساب کاربری</p>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckLlogin;
