"use client";
import useCouponStore from "@/app/store/discountstore";
import { Button, Input } from "@heroui/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AddDiscountCode = () => {
  const { applyCoupon } = useCouponStore();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    useCouponStore.getState().clearCoupon();
  }, []);

  const CheckDiscountCode = async () => {
    try {
      setLoading(true);
      const input_params = new URLSearchParams({
        coupon: code,
      });
      const response = await fetch(
        `http://localhost:3000/api/CheckDiscountCode?${input_params}`
      );

      const responseData = await response.json();
      if (response.ok && responseData[0].discount_value > 0) {
        toast.success("کد تخفیف با موفقیت اعمال شد");
        applyCoupon(responseData[0].discount_value);
      }
    } catch (error) {
      applyCoupon(0);
      toast.error("کد تخفیف اشتباه است");
    }
  };

  return (
    <div className="border p-3 rounded-md">
      <h1 className="text-lg">کد تخفیف</h1>
      <div className="flex flex-row items-center w-[300px] gap-3 mt-3">
        <Input
          className="!h-10"
          placeholder=" کد تخفیف"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button variant="flat" onPress={CheckDiscountCode}>
          ثبت کد
        </Button>
      </div>
    </div>
  );
};

export default AddDiscountCode;
