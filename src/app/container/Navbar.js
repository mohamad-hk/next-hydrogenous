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
          <Link href={"/"}>صفحه اصلی</Link>
          <Link href={"../products/"}>محصولات</Link>
          <Link href={"#"}>درباره ما</Link>
          <Link href={"#"}>تماس با ما</Link>
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
