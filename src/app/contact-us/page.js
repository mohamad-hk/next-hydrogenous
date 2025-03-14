"use client";
import { useState } from "react";
import { Input, Textarea } from "@heroui/react";
import Image from "next/image";
import ContactWays from "../components/Contact/ContactWays";
const ContactUs = () => {
  
  const [formData, setFormData] = useState({
    fn: "",
    ln: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/Contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("پیام شما ارسال شد");
      setFormData({ fn: "", ln: "", email: "", subject: "", message: "" });
    } else {
      toast.error("مشکلی پیش اومده");
    }
  };

  return (
    <div className="w-fit mx-auto border border-gray-200 rounded-lg p-3 my-5">
      <h2 className="text-center text-xl my-2 md:my-0">تماس با ما</h2>
      <div className="flex flex-col md:flex-row justify-center gap-3 items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="نام"
              name="fn"
              value={formData.fn}
              onChange={handleChange}
              variant="bordered"
            />
            <Input
              label="نام خانوادگی"
              name="ln"
              value={formData.ln}
              onChange={handleChange}
              variant="bordered"
            />
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <Input
              label="ایمیل"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="bordered"
            />
            <Input
              label="موضوع"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              variant="bordered"
            />
          </div>
          <Textarea
            className="mt-3"
            placeholder="متن خود را بنویسید"
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-5 py-2 block mx-auto mt-3"
          >ارسال</button>
        </form>
        <Image
          src="/images/statics/contact.png"
          width={400}
          height={400}
          alt="image not found"
        />
      </div>
      <ContactWays />
    </div>
  );
};

export default ContactUs;
