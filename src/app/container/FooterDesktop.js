import Link from "next/link";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
const FooterDesktop = () => {
  return (
    <>
      <footer className=" grid grid-cols-1 gap-y-5 sm:grid-cols-3 lg:gap-x-4  lg:grid-cols-3 xl:grid-cols-5  py-5 px-5 bg-gradient-to-r from-[#3a6073] to-[#3a7bd5]">
        <nav className=" flex flex-col items-center sm:items-start">
          <div className="flex flex-row gap-3">
            <PhoneIcon />
            <p className="text-white">تلفن:</p>
            <p className="text-white font-bold">086-32802503-4</p>
          </div>
          <div className="flex flex-row gap-3">
            <EmailIcon />
            <p className="text-white">ایمیل:</p>
            <p className="text-white font-bold">info@hydrogenous.ir</p>
          </div>
          <p className="text-white">ما را دنبال کنید</p>
          <div className="flex flex-row gap-4">
            <TelegramIcon className="text-gray-100" />
            <InstagramIcon className="text-gray-100" />
            <WhatsAppIcon className="text-gray-100" />
            <LinkedInIcon className="text-gray-100" />
          </div>
        </nav>
        <nav className=" flex flex-col items-center">
          <strong className=" text-white text-lg ">خدمات مشتریان</strong>
          <div className="flex flex-col gap-3 mt-4">
            <Link
              className="text-gray-200 font-semibold"
              href={"/policies/shipping-policy"}
            >
              قوانین ارسال
            </Link>
            <Link
              className="text-gray-200 font-semibold"
              href={"/policies/return-policy"}
            >
              رویه بازگشت کالا
            </Link>
            <Link
              className="text-gray-200 font-semibold"
              href={"/policies/privacy-policy"}
            >
              حریم خصوصی
            </Link>
            <Link
              className="text-gray-200 font-semibold"
              href={"/order-tracking"}
            >
              پیگیری سفارش
            </Link>
          </div>
        </nav>
        <nav className=" flex flex-col items-center">
          <strong className="text-white text-lg">هیدروژنوس </strong>
          <div className="flex flex-col gap-3 mt-4">
            <Link className="text-gray-200 font-semibold" href={"/about"}>
              درباره هیدروژنوس
            </Link>
            <Link className="text-gray-200 font-semibold" href={"/contact-us"}>
              تماس با هیدروژنوس
            </Link>
          </div>
        </nav>
        <nav className=" flex flex-col items-center">
          <Image
            src="/images/statics/enamad.png"
            width={150}
            height={150}
            alt="image not found"
          />
        </nav>
        <nav className=" flex flex-col items-center">
          <Image
            src="/images/statics/book.webp"
            width={160}
            height={160}
            alt="image not found"
            className="rounded-lg"
          />
          <p className="w-[150px] text-justify text-white">
            برای کسب اطلاعات بیشتر QR کد را اسکن کنید
          </p>
        </nav>
      </footer>
    </>
  );
};
export default FooterDesktop;
