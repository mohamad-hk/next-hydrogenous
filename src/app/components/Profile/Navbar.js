"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useDashboard } from "@/app/context/dashboard";
const ProfileNavbar = () => {
  const { setActiveTab } = useDashboard();

  return (
    <>
      <div className="h-[100vh] bg-[#0046fe] rounded-r-3xl">
        <div className="bg-white w-[80%] block mx-auto rounded-3xl mt-4">
          <CgProfile className="text-[8rem] block mx-auto text-[#c7c7c7]" />
          <p className="text-center">محمد حسین کریمی</p>
        </div>

        <nav className="mt-5 ">
          <ul className="flex flex-col gap-10">
            <li className="bg-white text-[#0046fe] p-2 rounded-r-3xl">
              <Link
                className="p-3 text-lg"
                href={"/profile"}
                onClick={() => setActiveTab("dashboard")}
              >
                داشبورد
              </Link>
            </li>
            <li className="p-2">
              <Link
                className="p-3 text-white text-lg"
                href={"/profile/orders"}
                onClick={() => setActiveTab("orders")}
              >
                سفارش ها
              </Link>
            </li>
            <li className="p-2">
              <Link
                className="p-3 text-white text-lg"
                href={"/profile/addresses"}
                onClick={() => setActiveTab("addresses")}
              >
                آدرس ها
              </Link>
            </li>
            <li className="p-2">
              <Link
                className="p-3 text-white text-lg"
                href={"/profile/personal-info"}
                onClick={() => setActiveTab("personal-info")}
              >
                ویرایش مشخصات
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default ProfileNavbar;
