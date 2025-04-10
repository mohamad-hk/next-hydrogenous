"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginUser = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
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

      if (!smsResponse.ok) toast.error("خطا در ارسال پیامک");
      const data = await smsResponse.json();
      setServerCode(data.code);

      setResendTimer(30);
      setIsResendDisabled(true);

      setStep(2);
    } catch (error) {
      console.error(" خطا:", error.message);
      toast.success("مشکلی پیش اومده");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      if (verifyCode !== serverCode) {
        toast.error("کد وارد شده اشتباه است");
      }

      if (!userData) {
        throw new Error(" اطلاعات کاربر یافت نشد. لطفاً دوباره وارد شوید.");
      }

      const jwtResponse = await fetch("/api/Auth/Jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      const jwtData = await jwtResponse.json();

      if (!jwtResponse.ok) {
        throw new Error("");
      }

      toast.success("خوش اومدی");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(" خطا:", error.message);
      toast.success("خطا در ثبت نام");
    }
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
  const handleResendCode = async () => {
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

  return (
    <div className="flex flex-col gap-10 shadow-xl rounded-md p-5">
      {step === 1 && (
        <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
          <p>اگر در هیدروژنوس حساب کاربری ندارید، ثبت نام کنید</p>
          <Link
            href="/auth/register"
            className="text-white bg-blue-600 mx-auto px-20 rounded-md py-3"
          >
            ایجاد حساب کاربری
          </Link>
        </div>
      )}

      {step === 1 && (
        <form
          onSubmit={handlePhoneSubmit}
          className="grid grid-cols-1 md:grid-cols-2 items-center gap-5"
        >
          <div className="flex flex-col gap-4">
            <p>اگر در هیدروژنوس حساب کاربری دارید، وارد شوید</p>
            <input
              type="text"
              placeholder="شماره موبایل"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <Link className="text-blue-600" href={"/auth/login_password"}>
              ورود با گذرواژه
            </Link>
          </div>
          <button
            type="submit"
            className="text-white bg-red-600 mx-auto px-[7.7rem] rounded-md py-3"
          >
            ورود
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleVerifyCode}
          className="grid grid-cols-1 items-center gap-5"
        >
          <div className="flex flex-col gap-4">
            <p>کد ارسال‌شده را وارد کنید</p>

            <div className="flex flex-row gap-4">
              <input
                type="text"
                placeholder="کد تأیید"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                required
                className="border p-2 rounded"
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
    </div>
  );
};

export default LoginUser;
