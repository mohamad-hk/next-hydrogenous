"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useDashboard } from "@/app/context/dashboard";
import { useState } from "react";
const ProfileNavbar = () => {
  const { setActiveTab } = useDashboard();
  const [clicked, setClicked] = useState("dashboard");

  return (
    <>
      <div className="w-[95%] block mx-auto rounded-lg md:w-full md:h-[100vh] bg-[#0046fe] md:rounded-r-3xl">
        <div className="bg-white w-[80%] block mx-auto rounded-3xl mt-4">
          <CgProfile className="text-[8rem] block mx-auto text-[#c7c7c7]" />
          <p className="text-center">محمد حسین کریمی</p>
        </div>

        <nav className="mt-5 ">
          <ul className="flex flex-col gap-10">
            <li>
              <Link
                className={
                  clicked === "dashboard"
                    ? "rounded-r-3xl bg-white text-[#0046fe] text-lg p-3 w-full block"
                    : "p-3 text-white text-lg"
                }
                href={"/profile"}
                onClick={() => {
                  setActiveTab("dashboard");
                  setClicked("dashboard");
                }}
              >
                داشبورد
              </Link>
            </li>
            <li>
              <Link
                className={
                  clicked === "orders"
                    ? "rounded-r-3xl bg-white text-[#0046fe] text-lg p-3 block"
                    : "p-3 text-white text-lg"
                }
                href={"/profile/orders"}
                onClick={() => {
                  setActiveTab("orders");
                  setClicked("orders");
                }}
              >
                سفارش ها
              </Link>
            </li>
            <li>
              <Link
                className={
                  clicked === "addresses"
                    ? "rounded-r-3xl bg-white text-[#0046fe] text-lg p-3  block"
                    : "p-3 text-white text-lg"
                }
                href={"/profile/addresses"}
                onClick={() => {
                  setActiveTab("addresses");
                  setClicked("addresses");
                }}
              >
                آدرس ها
              </Link>
            </li>
            <li>
              <Link
                className={
                  clicked === "personal-info"
                    ? "rounded-r-3xl bg-white text-[#0046fe] text-lg p-3  block"
                    : "p-3 text-white text-lg"
                }
                href={"/profile/personal-info"}
                onClick={() => {
                  setActiveTab("personal-info");
                  setClicked("personal-info");
                }}
              >
                ویرایش مشخصات
              </Link>
            </li>
            <li className="px-1">
              <Link
                className="rounded-3xl bg-danger text-white text-center text-lg p-3  block"
                href={"/profile/personal-info"}
                onClick={() => {
                  setActiveTab("personal-info");
                  setClicked("personal-info");
                }}
              >
                خروج
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default ProfileNavbar;
