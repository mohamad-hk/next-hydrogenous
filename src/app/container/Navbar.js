import Image from "next/image";
import Link from "next/link";
import ShowBasket from "../components/CartStore/ShowBasket";
import { usePathname } from "next/navigation";
const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-row justify-center items-center  lg:grid lg:grid-cols-3  lg:justify-between px-4 py-2 bg-slate-100 shadow-xl mb-5 ">
        <Link href={"/"}>
          <Image
            src="/images/statics/logo.png"
            alt="image not found"
            height={100}
            width={300}
          />
        </Link>

        <div className="hidden lg:flex lg:flex-row lg:justify-center lg:gap-10 ">
          <Link class="group relative w-max" href={"/"}>
            صفحه اصلی
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
          </Link>
          <Link class="group relative w-max" href={"../products/"}>
            محصولات
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
          </Link>
          <Link class="group relative w-max" href={"/about"}>
            درباره ما
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
          </Link>
          <Link class="group relative w-max" href={"/contact-us"}>
            تماس با ما
            <span class="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
            <span class="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-indigo-600 group-hover:w-3/6"></span>
          </Link>
        </div>
        <div className="hidden  lg:flex lg:flex-row justify-end gap-3">
          <button className="border-1 border-blue-400 px-3 py-1 rounded-md">
            <Link href={"/login"}>
              <div className="flex flex-row gap-3">
                <span className="border-1 border-y-0 border-s-0 pe-2">
                  ثبت نام
                </span>
                <span>ورود</span>
              </div>
            </Link>
          </button>
          {pathname == "/cart" ? null : <ShowBasket />}
        </div>
      </nav>
    </>
  );
};
export default Navigation;
