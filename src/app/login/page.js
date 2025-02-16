"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { InputOtp } from "@heroui/react";

const login = () => {
  const [step, Set_step] = useState(1);
  const [code, Set_code] = useState(1);

  const phoneRef = useRef();
  const codeRef = useRef();

  async function handleSubmitPhone(event) {
    event.preventDefault();
    const phoneValue = phoneRef.current.value;
    const response = await fetch("/api/Auth/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneValue }),
    });

    try {
      const data = await response.json();
      if (data.success) {
        Set_step(2);
      } else {
        console.error("خطا:", data.message || data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSubmitCode(event) {
    console.log(codeRef.current.value, data.code)
    if (codeRef.current.value == data.code) {
      return "salam";
    }
    event.preventDefault();
    Set_code(codeRef.current.value);
  }

  return (
    <>
      <div className="bg-[url(/images/statics/login-bg.webp)] bg-center bg-no-repeat bg-cover min-h-screen flex justify-center items-center">
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
              <form onSubmit={handleSubmitPhone} className="w-full" action="">
                <div className="relative w-full mt-4">
                  <input
                    type="tel"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    ref={phoneRef}
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    شماره موبایل
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-[50%] mt-10 text-lg"
                  color="danger"
                >
                  ورود
                </Button>
              </form>
            </>
          ) : (
            <>
              <form className="w-full" onSubmit={handleSubmitCode} action="">
                <div className="flex flex-col items-center gap-2 mt-2">
                  <p className="self-start text-[12px]">
                    کد تایید خود را وارد کنید
                  </p>
                  <div
                    className="w-full flex flex-row justify-center flex-wrap items-center gap-4"
                    dir="ltr"
                  >
                    <InputOtp
                      length={5}
                      variant="bordered"
                      className="flex-row-reverse"
                      dir="ltr"
                      ref={codeRef}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-[50%] mt-10 text-lg"
                  color="danger"
                >
                  تایید
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default login;
