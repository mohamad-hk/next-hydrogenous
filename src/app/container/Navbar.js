"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@heroui/badge";

import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
const Navigation = () => {
  return (
    <>
      <nav className="flex flex-row items-center justify-between px-4 py-4 bg-slate-100 shadow-lg">
        <Image
          src="/images/logo.png"
          alt="image not found"
          height={100}
          width={250}
        />

        <div className="flex flex-row justify-center gap-10 ">
          <Link href={"#"}>صفحه اصلی</Link>
          <Link href={"#"}>محصولات</Link>
          <Link href={"#"}>درباره ما</Link>
          <Link href={"#"}>تماس با ما</Link>
        </div>
        <div className="flex flex-row items-center gap-3">
          <button className="border-1 border-blue-400 px-3 py-1 rounded-md">
            <Link href={"#"}>
              <div className="flex flex-row gap-3">
                <span className="border-1 border-y-0 border-s-0 pe-2">
                  ثبت نام
                </span>
                <span>ورود</span>
              </div>
            </Link>
          </button>
          <button className="">
            <Badge color="danger" content="5">
              <ShoppingBasketIcon className="text-5xl" />
            </Badge>
          </button>
        </div>
      </nav>
    </>
  );
};
export default Navigation;
