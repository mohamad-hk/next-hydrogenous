"use client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const RegisterUser = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const serverCode = useRef(null);

  const [step, setStep] = useState(1);
  const [resendTimer, setResendTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    try {
      const userResponse = await fetch("/api/Auth/CheckUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(" مشکلی در بررسی شماره موبایل وجود دارد.");
      }

      if (data.exists) {
        throw new Error(" شماره شما در سیستم ثبت شده است. لطفاً وارد شوید.");
      }

      if (!serverCode.current) {
        const smsResponse = await fetch("/api/Auth/sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: phoneNumber }),
        });

        if (!smsResponse.ok)
          throw new Error(`خطا در ارسال پیامک: ${smsResponse.status}`);

        const smsData = await smsResponse.json();
        serverCode.current = smsData.code;
      }

      setIsNewUser(true);
      setStep(2);
    } catch (error) {
      toast.error("مشکلی پیش اومده");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerResponse = await fetch("/api/Auth/RegisterUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          firstName,
          lastName,
          password,
        }),
      });

      const registerData = await registerResponse.json();

      if (!registerResponse.ok) {
        throw new Error(registerData.error || " خطایی در ثبت نام رخ داد.");
      }

      toast.success("ثبت نام با موفقیت انجام شد");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("مشکلی پیش اومده");
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
    <div className="flex flex-col gap-10 shadow-xl rounded-md p-10 w-[80%] sm:w-[50%] md:w[-40%] xl:w-[25%] mx-auto">
      <h2 className="text-xl font-bold text-center">ثبت‌ نام در هیدروژنوس</h2>

      {step === 1 && (
        <form
          onSubmit={handlePhoneSubmit}
          className="grid grid-cols-1 items-center gap-2 p-5"
        >
          <div className="flex flex-col gap-4">
            <p>شماره موبایل خود را وارد کنید</p>
            <input
              type="text"
              placeholder="شماره موبایل"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-600 mx-auto px-20 mt-3 rounded-md py-3"
          >
            ادامه
          </button>
        </form>
      )}

      {step === 2 && (
        <div>
          <h3 className="text-lg font-semibold">اطلاعات خود را وارد کنید</h3>
          <form
            onSubmit={handleRegisterSubmit}
            className="grid grid-cols-2 gap-5"
          >
            <input
              type="text"
              placeholder="نام"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="نام خانوادگی"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <input
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="کد تأیید پیامک شده"
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

            <button
              type="submit"
              className="text-white bg-green-600 px-10 rounded-md py-3"
            >
              ثبت اطلاعات
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
