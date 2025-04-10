"use client";

import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/context/AuthContext";
import { Badge } from "@heroui/react";
import { IoIosCheckmark } from "react-icons/io";

const CheckLloginSm = () => {
  const [state, setState] = useState(1);
  const [data, setData] = useState([]);

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
        <Link href={"/auth/login"} className="py-3">
          <div className="flex flex-col items-center justify-center gap-1">
            <CgProfile className="text-2xl" />
            <p>حساب کاربری</p>
          </div>
        </Link>
      ) : (
        <Link className="py-3" href={"/profile"}>
          <div className=" flex flex-row items-center justify-center">
            <Badge
              className="bg-transparent dark:border-none"
              color="success"
              content={
                <IoIosCheckmark className="text-xl bg-green-600 text-white rounded-full px-0" />
              }
            >
              <div className="flex flex-col items-center gap-1">
                <CgProfile className="text-2xl" />
                پروفایل من
              </div>
            </Badge>
          </div>
        </Link>
      )}
    </>
  );
};

export default CheckLloginSm;
