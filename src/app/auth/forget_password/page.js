"use client";
import { MD5 } from "crypto-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginUser = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [serverCode, setServerCode] = useState(null);
  const [userData, setUserData] = useState(null);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await fetch("/api/Auth/GetUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data_user = await userResponse.json();

      if (!Array.isArray(data_user) || data_user.length === 0) {
        throw new Error(" کاربری با این شماره یافت نشد.");
      }

      setUserData(data_user[0]);

      const smsResponse = await fetch("/api/Auth/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (!smsResponse.ok)
        throw new Error(`خطا در ارسال پیامک: ${smsResponse.status}`);

      const data = await smsResponse.json();
      setServerCode(data.code);

      setResendTimer(30);
      setIsResendDisabled(true);

      setStep(2);
    } catch (error) {
      console.error(" خطا:", error.message);
      toast.error("مشکلی پیش اومده");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      if (verifyCode !== serverCode) {
        throw new Error(" کد وارد شده نادرست است.");
      }
      setStep(3);
    } catch (error) {
      console.error(" خطا:", error.message);
      toast.error("مشکلی پیش اومده");
    }
  };

  const handleResendCode = async () => {
    if (isResendDisabled) return;
    setIsResendDisabled(true);
    setResendTimer(30);

    try {
      const smsResponse = await fetch("/api/Auth/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      if (!smsResponse.ok)
        throw new Error(`خطا در ارسال پیامک: ${smsResponse.status}`);

      toast.success("کد تایید مجدد ارسال شد");
    } catch (error) {
      toast.error("مشکلی پیش اومده");
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    const temp_password = password;
    const temp_repassword = repassword;
    if (temp_password == temp_repassword) {
      const new_password = MD5(temp_password).toString();
      try {
        const response = await fetch(
          "https://hydrogenous.vercel.app/api/Auth/ResetPassword",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phone: phoneNumber,
              password: new_password,
            }),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log("updated successfully", data);
        } else {
          console.error("Error updating", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      toast.error(" کلمه عبور و تکرار آن مطابقت ندارد ");
    }
    setTimeout(() => {
      router.push("/auth/login_password");
    }, 2000);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [resendTimer]);

  useEffect(() => {
    setResendTimer(30);
  }, [isResendDisabled]);

  return (
    <div className="flex flex-col gap-10 shadow-xl rounded-md p-5 w-[80%] sm:w-[60%] md:w-[40%] lg:w-[35%] xl:w-[30%] mx-auto">
      <h2 className="text-xl font-bold text-center"> بازیابی رمز عبور </h2>

      {step === 1 && (
        <form
          onSubmit={handlePhoneSubmit}
          className="grid grid-cols-1 items-center gap-5"
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="شماره موبایل"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="text-white bg-red-600 px-10 rounded-md py-3"
            >
              دریافت کد تأیید
            </button>
            <Link className="text-blue-600" href={"/auth/login_password"}>
              ورود با پیامک
            </Link>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleVerifyCode}
          className="grid grid-cols-1 items-center gap-5"
        >
          <div className="flex flex-col gap-4">
            <p>کد ارسال‌شده را وارد کنید</p>
            <div className="flex flex-row justify-center items-center gap-2">

            <input
              type="text"
              placeholder="کد تأیید"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              required
              className="border pe-16 sm:pe-2 lg:pe-4 ps-4 py-2 rounded"
            />
            <div className="flex items-center gap-4">
              <button
                onClick={handleResendCode}
                disabled={isResendDisabled}
                className={`px-4 py-2 rounded-md ${
                  isResendDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white"
                }`}
              >
                ارسال مجدد
              </button>
              {isResendDisabled && (
                <span className="text-gray-600">
                  ارسال مجدد در {resendTimer} ثانیه
                </span>
              )}
            </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-green-600 px-10 rounded-md py-3"
          >
            تأیید کد
          </button>
        </form>
      )}

      {step === 3 && (
        <div className="text-center text-green-600 text-lg font-bold">
          <form
            onSubmit={updatePassword}
            className="grid grid-cols-2 items-center gap-5"
          >
            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="کلمه عبور "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border p-2 rounded"
              />
              <input
                type="password"
                placeholder=" تکرار کلمه عبور "
                value={repassword}
                onChange={(e) => setRePassword(e.target.value)}
                required
                className="border p-2 rounded"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-green-600 px-10 rounded-md py-3"
            >
              بازیابی
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginUser;
