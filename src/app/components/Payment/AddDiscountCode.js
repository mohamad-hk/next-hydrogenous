import { Button, Input } from "@heroui/react";

const AddDiscountCode = () => {
  return (
    <div className="border p-3 rounded-md">
      <h1 className="text-lg">کد تخفیف</h1>
      <div className="flex flex-row items-center w-[300px] gap-3 mt-3">
        <Input className=" !h-10" label=" کد تخفیف" type="text" />
        <Button variant="flat">ثبت کد</Button>
      </div>
    </div>
  );
};

export default AddDiscountCode;
