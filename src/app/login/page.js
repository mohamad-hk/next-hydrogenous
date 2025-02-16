"use client";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { InputOtp } from "@heroui/react";
import { Input } from "@heroui/react";
import { useRouter } from "next/navigation";

const login = () => {
  const [step, Set_step] = useState(1);
  const [phone, Set_phone] = useState("");
  const [serverode, set_serverode] = useState("");

  const phoneRef = useRef();
  const codeRef = useRef();

  async function handleSubmitPhone(event) {
    event.preventDefault();
    const phoneValue = phoneRef.current.value;
    Set_phone(phoneValue);

    const response = await fetch("/api/Auth/sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneValue }),
    });

    try {
      const data = await response.json();
      if (data.success) {
        set_serverode(data.code);
        Set_step(2);
      } else {
        console.error("خطا:", data.message || data.error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmitCode(event) {
    event.preventDefault();
    if (codeRef.current.value === serverode) {
      const input_params = new URLSearchParams({
        phone: phone,
      });

      const response = await fetch(
        `http://localhost:3000/api/Auth/GetUser?${input_params}`
      );

      const user = await response.json();
      // console.log(user);
      // router.push("/dashboard");
    }
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
              <form onSubmit={handleSubmitPhone} className="w-full">
                <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
                  <Input
                    key="outside"
                    label="شماره موبایل"
                    labelPlacement="outside"
                    type="tel"
                    ref={phoneRef}
                  />
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
              <form className="w-full" onSubmit={handleSubmitCode}>
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
