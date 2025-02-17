import Link from "next/link";
import { GoHome } from "react-icons/go";
import { BsBox } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import ShowBasket from "../components/CartStore/ShowBasket";

const NavbarMobile = () => {
  return (
    <>
      <div className="grid grid-cols-4 w-full bg-slate-50 fixed bottom-0 z-10   lg:hidden">
        <Link className="py-3" href={"/"}>
          <div className="flex flex-col items-center gap-1">
            <GoHome className="text-2xl" />
            صفحه اصلی
          </div>
        </Link>
        <Link className="py-3" href={"../products"}>
          <div className="flex flex-col items-center gap-1">
            <BsBox className="text-2xl" />
            محصولات
          </div>
        </Link>

        <div className="flex flex-col items-center gap-1 py-3">
          <ShowBasket />
          سبد خرید
        </div>

        <Link className="py-3" href={"#"}>
          <div className="flex flex-col items-center gap-1">
            <CgProfile className="text-2xl" />
            پروفایل من
          </div>
        </Link>
      </div>
    </>
  );
};
export default NavbarMobile;
