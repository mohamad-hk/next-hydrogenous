import { Input, Textarea } from "@heroui/react";
import Image from "next/image";
import ShowMap from "../components/Contact/ShowMap";
import ContactWays from "../components/Contact/ContactWays";

const ContactUs = () => {
  return (
    <>
      <div className="w-fit mx-auto border border-gray-200 rounded-lg p-3 my-5">
        <h2 className="text-center text-xl my-2 md:my-0">تماس با هیدروژنوس</h2>
        <div className=" flex flex-col md:flex-row justify-center gap-3 items-center ">
          <form>
            <div className="grid grid-cols-2 gap-3">
              <Input label="نام" type="text" variant="bordered" />
              <Input label="نام خانوادگی" type="text" variant="bordered" />
            </div>
            <div className="flex flex-col gap-3 mt-3  ">
              <Input label="ایمیل" type="email" variant="bordered" />
              <Input label="موضوع" type="text" variant="bordered" />
            </div>
            <Textarea
              className="mt-3"
              placeholder="متن خود را بنویسید"
            />
            <input
              className="bg-blue-600 text-white rounded-md px-5 py-2 block mx-auto mt-3 cursor-pointer"
              type="submit"
              name=""
              value={"ارسال"}
              id=""
            />
          </form>
          <Image src={"/images/statics/contact.png"} width={400} height={400} alt="image not found" />
        </div>
        <ContactWays/>
        {/* <ShowMap/> */}
      </div>
    </>
  );
};

export default ContactUs;
