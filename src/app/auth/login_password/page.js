"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MD5 } from "crypto-js";
import Link from "next/link";
import { toast } from "react-toastify";

const LoginWithPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const currentPassword = password;

    const hash = MD5(currentPassword).toString();

    try {
      const loginResponse = await fetch("/api/Auth/LoginWithPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, password: hash }),
        credentials: "include",
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.error || " شماره موبایل یا رمز عبور اشتباه است."
        );
      }

      toast.success("ورود با موفقیت انجام شد!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("خطا در ورود!");
    }
  };

  return (
    <div className="flex flex-col gap-10 shadow-xl rounded-md p-5 w-[80%] sm:w-[50%] md:w[-40%] xl:w-[25%] mx-auto">
      <h2 className="text-xl font-bold text-center">ورود با رمز عبور</h2>
      <form onSubmit={handleLoginSubmit} className="grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="شماره موبایل"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="رمز عبور"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-green-600 px-10 rounded-md py-3"
        >
          ورود
        </button>
      </form>
      <Link className="text-blue-600" href={"/auth/forget_password"}>
        فراموشی رمز عبور
      </Link>
    </div>
  );
};

export default LoginWithPassword;
