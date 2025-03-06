"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { CgProfile } from "react-icons/cg";

const Login = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const phoneRef = useRef(null);
  const codeRef = useRef(null);
  const [LargeScreen, setLargeScreen] = useState(false);

  const sendPhone = useCallback(async (event) => {
    event.preventDefault();
    const phoneValue = phoneRef.current?.value.trim();
    if (!phoneValue) return console.error("شماره موبایل وارد نشده است");

    try {
      const response = await fetch("/api/Auth/sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneValue }),
      });
      if (!response.ok) throw new Error(`خطا: ${response.status}`);
      const data = await response.json();
      setPhoneNumber(phoneValue);
      setVerifyCode(data.code);
      setStep(2);
    } catch (error) {
      console.error("خطا در ارسال کد تایید :", error);
    }
  }, []);

  const verifyCodeHandler = async (event) => {
    event.preventDefault();
    const userCode = codeRef.current?.value.trim();
    if (!userCode) return console.error("کد تایید وارد نشده است");
    if (userCode !== verifyCode) return console.error("کد تایید اشتباه است");

    try {
      const userResponse = await fetch("/api/Auth/GetUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneNumber }),
      });
      const userData = await userResponse.json();

      const authResponse = await fetch("/api/Auth/Jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: userData }),
      });
      onOpenChange(false);
    } catch (error) {
      console.error("خطا در تأیید کد:", error);
    }
  };
  useEffect(() => {
    const checkScreenSize = () => {
      setLargeScreen(window.innerWidth > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <Button className="bg-transparent h-16 md:h-10" onPress={onOpen}>
        {LargeScreen ? (
          "عضویت"
        ) : (
          <div className="flex flex-col items-center gap-1" onPress={onOpen}>
            <CgProfile className="text-2xl" />
            پروفایل
          </div>
        )}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            تایید شماره موبایل
          </ModalHeader>
          <ModalBody>
            <form onSubmit={step === 1 ? sendPhone : verifyCodeHandler}>
              <Input
                label={step === 1 ? "شماره موبایل" : "کد تایید"}
                type={step === 1 ? "text" : "tel"}
                variant={step === 1 ? "bordered" : "underlined"}
                ref={step === 1 ? phoneRef : codeRef}
                className={step === 2 ? "text-center" : ""}
              />
              <button
                type="submit"
                className="w-[70%] block mx-auto py-3 bg-blue-600 text-white rounded-lg my-4"
              >
                ارسال
              </button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Login;
