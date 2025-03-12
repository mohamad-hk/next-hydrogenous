"use client";
import { AuthContext } from "@/app/context/AuthContext";
import Loading from "@/app/loading";
import { Input } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import { mutate } from "swr";

const PersonalInfo = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const getInfo = async (input_params) => {
    try {
      setLoading(true);
      const data = await fetch(`/api/GetInfo?${input_params}`);
      const response = await data.json();
      if (response) {
        setFirstName(response[0]?.last_name);
        setLastName(response[0]?.first_name);
        setPhone(response[0]?.phone_number);
        setEmail(response[0]?.Email);
        setPassword(response[0]?.password);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (event) => {
    event.preventDefault();
    let cu_id = user.customer_id;
    try {
      setLoading(true);
      const response = await fetch(
        "https://hydrogenous.vercel.app/api/UpdateInfo",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cu_id,
            firstname,
            lastname,
            phone,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("updated successfully", data);
        mutate(`/api/GetInfo?cust_id=${user.customer_id}`);
      } else {
        console.error("Error updating", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      getInfo(input_params);
    }
  }, [user]);

  return (
    <div className="shadow-lg p-5 rounded-3xl">
      <h2 className="text-center text-3xl mt-5 md:mt-0 mb-5">ویرایش مشخصات</h2>
      {loading ? <Loading /> : (
      <form
        className="sm:w-[95%] lg:w-[90%] xl:w-[80%] 2xl:w-[70%] block mx-auto"
        onSubmit={updateData}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-10">
          <Input
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            label="نام"
            type="text"
          />
          <Input
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            label="نام خانوادگی"
            type="text"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="ایمیل"
            type="email"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="شماره موبایل"
            type="tel"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="کلمه عبور"
            type="password"
          />
          <Input
            onChange={(e) => setRePassword(e.target.value)}
            label="تکرار کلمه عبور"
            type="password"
          />
        </div>
        <input
          className="bg-green-600 text-white px-10 py-3 rounded-2xl mt-5 block mx-auto cursor-pointer"
          type="submit"
          value="ویرایش"
        />
      </form>
      )}
    </div>
  );
};

export default PersonalInfo;
