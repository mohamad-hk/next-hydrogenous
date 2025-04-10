"use client";
import { MD5 } from "crypto-js";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const RegisterUser = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [temppassword, setTempPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [errors, setErrors] = useState({});

  const serverCode = useRef(null);

  const [step, setStep] = useState(1);
  const [resendTimer, setResendTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();
  const phoneValidation = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("شماره موبایل الزامی است")
      .matches(/^09\d{9}$/, "شماره موبایل را به درستی وارد کنید"),
  });

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("شماره موبایل الزامی است")
      .matches(/^09\d{9}$/, "شماره موبایل وارد شده اشتباه است"),

    firstName: Yup.string()
      .required("نام الزامی است")
      .matches(
        /^[\u0600-\u06FF\s]+$/,
        "از حروف انگلیسی و نماد ها استفاده نکنید"
      ),

    lastName: Yup.string()
      .required("نام خانوادگی الزامی است")
      .matches(
        /^[\u0600-\u06FF\s]+$/,
        "از حروف انگلیسی و نماد ها استفاده نکنید"
      ),

      temppassword: Yup.string()
      .required("رمز عبور الزامی است")
      .min(5, "رمز عبور باید حداقل ۵ کاراکتر باشد")
      .matches(/^[a-zA-Z0-9@_\-]+$/, "رمز عبور فقط می‌تواند شامل حروف انگلیسی، عدد، @، _ و - باشد"),
    

    verifyCode: Yup.string()
      .required("کد تایید الزامی است")
      .matches(/^\d{4}$/, "کد تایید اشتباه است"),
  });
  const formData = {
    phoneNumber,
    firstName,
    lastName,
    temppassword,
    verifyCode,
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();

    try {
      await phoneValidation.validate({ phoneNumber }, { abortEarly: false });
      setErrors({});

      const userResponse = await fetch("https://hydrogenous.vercel.app/api/Auth/CheckUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });

      const data = await userResponse.json();
      if (data.exists) {
        toast.error(" شماره موبایل قبلا ثبت شده است ");
        throw new Error();

      }

      if (!serverCode.current) {
        const smsResponse = await fetch("https://hydrogenous.vercel.app/api/Auth/sms", {
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
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      }      
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      phoneNumber,
      firstName,
      lastName,
      temppassword,
      verifyCode,
    };
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const password = MD5(temppassword).toString();

      const registerResponse = await fetch("https://hydrogenous.vercel.app/api/Auth/RegisterUser", {
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
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("مشکلی پیش اومده");
      }
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
        <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5 p-5">
          <div className="flex flex-col">
            <p>شماره موبایل خود را وارد کنید</p>
            <input
              type="text"
              placeholder="شماره موبایل"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`border p-2 rounded ${
                errors.phoneNumber ? "border-red-500" : ""
              }`}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-xs mt-1">
                {errors.phoneNumber}
              </span>
            )}
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

          <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="نام"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`border p-2 rounded ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="نام خانوادگی"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`border p-2 rounded ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.lastName}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="password"
                placeholder="رمز عبور"
                value={temppassword}
                onChange={(e) => setTempPassword(e.target.value)}
                className={`border p-2 rounded ${
                  errors.temppassword ? "border-red-500" : ""
                }`}
              />
              {errors.temppassword && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.temppassword}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                placeholder="کد تأیید پیامک شده"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className={`border p-2 rounded ${
                  errors.verifyCode ? "border-red-500" : ""
                }`}
              />
              {errors.verifyCode && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.verifyCode}
                </span>
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
                <span className="text-gray-600 text-sm">
                  ارسال مجدد در {resendTimer} ثانیه
                </span>
              )}
            </div>

            <button
              type="submit"
              className="text-white bg-green-600 px-10 rounded-md py-3 w-full"
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
