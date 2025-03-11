"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginUser = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [serverCode, setServerCode] = useState(null);
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

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
      setErrorMessage(error.message);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (verifyCode !== serverCode) {
        throw new Error(" کد وارد شده نادرست است.");
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
        throw new Error(" خطا در تولید و ذخیره توکن JWT.");
      }

      setSuccessMessage(" ثبت‌نام با موفقیت انجام شد!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error(" خطا:", error.message);
      setErrorMessage(error.message);
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

      setSuccessMessage(" کد تأیید مجدداً ارسال شد.");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-10 shadow-xl rounded-md p-5">
      {step === 1 && (
        <div className="grid grid-cols-2 gap-5">
          <p>اگر در هیدروژنوس حساب کاربری ندارید، ثبت نام کنید</p>
          <a
            href="/auth/register"
            className="text-white bg-blue-600 px-10 rounded-md py-3"
          >
            ایجاد حساب کاربری
          </a>
        </div>
      )}

      {step === 1 && (
        <form
          onSubmit={handlePhoneSubmit}
          className="grid grid-cols-2 items-center gap-5"
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

            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          </div>
          <button
            type="submit"
            className="text-white bg-red-600 px-10 rounded-md py-3"
          >
            دریافت کد تأیید
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={handleVerifyCode}
          className="grid grid-cols-2 items-center gap-5"
        >
          <div className="flex flex-col gap-4">
            <p>کد ارسال‌شده را وارد کنید</p>
            <input
              type="text"
              placeholder="کد تأیید"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              required
              className="border p-2 rounded"
            />
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {successMessage && (
              <p className="text-green-600">{successMessage}</p>
            )}
          </div>
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
          ورود موفقیت‌آمیز بود.
        </div>
      )}
    </div>
  );
};

export default LoginUser;
