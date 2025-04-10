import Link from "next/link";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";

import { Accordion, AccordionItem } from "@heroui/react";

const FooterMobile = () => {
  return (
    <>
      <footer className=" grid grid-cols-1 gap-y-5 sm:grid-cols-1 sm:py-15 px-5 bg-gradient-to-r from-[#3a6073] to-[#3a7bd5]">
        <Accordion>
          <AccordionItem
            key="1"
            indicator={<IoIosArrowForward />}
            title={<span className="!text-white">خدمات مشتریان</span>}
          >
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
          </AccordionItem>
          <AccordionItem
            key="2"
            indicator={<IoIosArrowForward />}
            title={<span className="!text-white">هیدروژنوس </span>}
          >
            <div className="flex flex-col gap-3 mt-4">
              <Link className="text-gray-200 font-semibold" href={"/about"}>
                درباره هیدروژنوس
              </Link>
              <Link
                className="text-gray-200 font-semibold"
                href={"/contact-us"}
              >
                تماس با هیدروژنوس
              </Link>
            </div>
          </AccordionItem>
        </Accordion>
        <nav className=" flex flex-col sm:items-start">
          <div className="flex flex-row gap-3">
            <PhoneIcon className="text-white" />
            <p className="text-white">تلفن:</p>
            <p className="text-white font-bold">086-32802503-4</p>
          </div>
          <div className="flex flex-row gap-3">
            <EmailIcon className="text-white" />
            <p className="text-white">ایمیل:</p>
            <p className="text-white font-bold">info@hydrogenous.ir</p>
          </div>
        </nav>
        <nav className="flex flex-row justify-center items-center gap-10">
          <Image
            src="/images/statics/enamad.png"
            width={130}
            height={130}
            alt="image not found"
          />
          <div>
            <Image
              src="/images/statics/book.webp"
              width={110}
              height={110}
              alt="image not found"
              className="rounded-lg"
            />
            <p className="w-[110px] text-white  text-[12px]">
              برای کسب اطلاعات بیشتر QR کد را اسکن کنید
            </p>
          </div>
        </nav>
        <nav>
          <div className="flex flex-row justify-center gap-10 md:gap-20">
            <TelegramIcon className="text-gray-100" />
            <InstagramIcon className="text-gray-100" />
            <WhatsAppIcon className="text-gray-100" />
            <LinkedInIcon className="text-gray-100" />
          </div>
        </nav>
        <p className="text-center text-white text-[12px] mb-24">
        تمامی حقوق مادی و معنوی این سایت متعلق به شرکت اکسیر سازان نو اندیش
        پیشروفن می‌باشد.        </p>
      </footer>
      
    </>
  );
};
export default FooterMobile;
