import Link from "next/link";
import { GoHome } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { PiBasket } from "react-icons/pi";
import ShowBasket from "../components/CartStore/ShowBasket";

const NavbarMobile = () => {
  return (
    <>
      <div className="grid grid-cols-4 w-full bg-slate-50 fixed bottom-0 z-10 py-2 lg:hidden">
        <Link href={"/"}>
          <div className="flex flex-col items-center gap-1">
            صفحه اصلی
            <GoHome className="text-2xl" />
          </div>
        </Link>
        <Link href={"../products"}>
          <div className="flex flex-col items-center gap-1">
            محصولات
            <BsBox className="text-2xl" />
          </div>
        </Link>

        <div className="flex flex-col items-center gap-1">
          سبد خرید
          <ShowBasket />
        </div>

        <Link href={"#"}>
          <div className="flex flex-col items-center gap-1">
            پروفایل من
            <CgProfile className="text-2xl" />
          </div>
        </Link>
      </div>
    </>
  );
};
export default NavbarMobile;
