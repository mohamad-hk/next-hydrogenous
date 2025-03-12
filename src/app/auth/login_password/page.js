"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MD5 } from "crypto-js";

const LoginWithPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const currentPassword = password;
    

    const hash = MD5(currentPassword).toString();
    consolelog(hash);

    try {

      const loginResponse = await fetch("/api/Auth/LoginWithPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber, password:hash }),
        credentials: "include",
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.error || " شماره موبایل یا رمز عبور اشتباه است."
        );
      }

      setSuccessMessage(" ورود موفقیت‌آمیز بود!");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-10 shadow-xl rounded-md p-5">
      <h2 className="text-xl font-bold">ورود با رمز عبور</h2>
      <form onSubmit={handleLoginSubmit} className="grid grid-cols-2 gap-5">
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
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}
        </div>
        <button
          type="submit"
          className="text-white bg-green-600 px-10 rounded-md py-3"
        >
          ورود
        </button>
      </form>
    </div>
  );
};

export default LoginWithPassword;
