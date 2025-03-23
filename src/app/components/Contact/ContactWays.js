import { HiOutlineMail } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";

const ContactWays = () => {
  return (
    <>
      <div className="grid grid-rows-2 gap-y-5 md:gap-y-0 md:grid-rows-none md:grid-cols-2 md:gap-x-5">
        <div className="flex flex-col items-center gap-2 bg-slate-200 rounded-md px-40 py-1 dark:bg-[#4e76a4]">
          <BiSupport className="text-xl" />
          <p>تلفن تماس</p>
          <p className="font-bold">086-32802503-4</p>
        </div>
        <div className="flex flex-col items-center gap-2 bg-slate-200 rounded-md px-40 py-1 dark:bg-[#4e76a4]">
          <HiOutlineMail className="text-xl" />
          <p>ایمیل</p>
          <p className="font-bold">info@hydrogenous.ir</p>
        </div>
      </div>
    </>
  );
};

export default ContactWays;
