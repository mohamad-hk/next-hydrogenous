"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { useDashboard } from "@/app/context/dashboard";
import { useState } from "react";
import { useRouter } from "next/navigation";
const ProfileNavbar = () => {
  const { setActiveTab } = useDashboard();
  const [clicked, setClicked] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const Logout = async () => {
    setLoading(true);

    try {
      await fetch("/api/Auth/Logout", { method: "GET" });
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };
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
                    ? "rounded-3xl md:rounded-r-3xl bg-white text-[#0046fe] text-lg p-3 w-full block"
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
                    ? "rounded-3xl md:rounded-r-3xl bg-white text-[#0046fe] text-lg p-3 block"
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
                    ? "rounded-3xl md:rounded-r-3xl bg-white text-[#0046fe] text-lg p-3  block"
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
                    ? "rounded-3xl md:rounded-r-3xl bg-white text-[#0046fe] text-lg p-3  block"
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

            <li>
              <Link
                className={
                  clicked === "wish-list"
                    ? "rounded-3xl md:rounded-r-3xl bg-white text-[#0046fe] text-lg p-3  block"
                    : "p-3 text-white text-lg"
                }
                href={"/profile/wish-list"}
                onClick={() => {
                  setActiveTab("wish-list");
                  setClicked("wish-list");
                }}
              >
                لیست محبوب من
              </Link>
            </li>

            <li>
              <Link
                className={
                  clicked === "comments"
                    ? "rounded-3xl md:rounded-r-3xl bg-white text-[#0046fe] text-lg p-3  block"
                    : "p-3 text-white text-lg"
                }
                href={"/profile/comments"}
                onClick={() => {
                  setActiveTab("comments");
                  setClicked("comments");
                }}
              >
                نظرات من
              </Link>
            </li>

            <li className="px-1 mb-5 md:mb-0">
              <button
                className="rounded-3xl bg-danger text-white text-center text-lg p-3 w-full block"
                onClick={Logout}
              >
                خروج
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default ProfileNavbar;
