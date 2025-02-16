"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { InputOtp } from "@heroui/react";

const login = () => {
  const [step, Set_step] = useState(1);
  const [phone, Set_phone] = useState(1);
  const [code, Set_code] = useState(1);

  function handleSubmitPhone(event) {
    event.preventDefault();
  }
  function handleSubmitCode(event) {
    event.preventDefault();
  }
  useEffect(() => {
    console.log(step, phone, code);
  }, [step]);
  return (
    <>
      <div className="bg-[url(/images/statics/login-bg.webp)] bg-center bg-no-repeat bg-cover min-h-screen flex justify-center items-center">
        <form onSubmit={handleSubmitPhone} action="">
          <div className="flex flex-col items-center bg-white max-w-[500px] rounded-2xl p-6 shadow-lg">
            <Link href={"/"}>
              <Image
                src={"/images/statics/logo.png"}
                width={400}
                height={300}
                alt="image not found"
              />
            </Link>

            <h1 className="text-2xl">ورود | ثبت نام</h1>
            {step == 1 ? (
              <>
                <div className="relative w-full mt-4">
                  <input
                    type="tel"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={(event) => Set_phone(event.target.value)}
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    شماره موبایل
                  </label>
                </div>
                <Button
                  type="submit"
                  className="w-[50%] mt-10 text-lg"
                  color="danger"
                  onPress={() => Set_step(2)}
                >
                  ورود
                </Button>
              </>
            ) : (
              <>
                <form className="w-full" onSubmit={handleSubmitCode} action="">
                  <div className="flex flex-col items-center gap-2 mt-2">
                    <p className=" self-start text-[12px]">
                      کد تایید خود را وارد کنید
                    </p>
                    <div
                      className="w-full flex flex-row justify-center flex-wrap items-center gap-4"
                      dir="ltr"
                    >
                      <InputOtp
                        length={4}
                        variant="bordered"
                        className="flex-row-reverse"
                        dir="ltr"
                        onChange={Set_code}
                      />
                    </div>
                  </div>
                </form>
                <Button
                  type="submit"
                  className="w-[50%] mt-10 text-lg"
                  color="danger"
                >
                  تایید
                </Button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default login;
