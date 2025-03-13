import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ShowBasket from "../components/CartStore/ShowBasket";
import CheckLlogin from "../components/CheckLogin/CheckLogin";
import ProductsMenu from "../components/ProductsMenu/ProductsMenu";
const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center lg:justify-between px-4 py-2 bg-slate-100 shadow-xl mb-5">
      <Link href="/" className="flex-shrink-0">
        <Image src="/images/statics/logo.png" alt="image not found" height={100} width={500} className="h-14 w-auto" />
      </Link>

      <div className="hidden lg:flex lg:flex-row lg:justify-center lg:gap-10 lg:pe-16">
        <Link className="group relative w-max" href="/">صفحه اصلی</Link>
        
        <ProductsMenu/>
        <Link className="group relative w-max" href="/blog">بلاگ</Link>
        <Link className="group relative w-max" href="/about">درباره ما</Link>
        <Link className="group relative w-max" href="/contact-us">تماس با ما</Link>
      </div>

      <div className="hidden lg:flex lg:flex-row justify-end items-center gap-5">
        <CheckLlogin />
        {pathname !== "/cart" && pathname !== "/shipment" && pathname !== "/payment" && <ShowBasket />}
      </div>
    </nav>
  );
};

export default Navigation;