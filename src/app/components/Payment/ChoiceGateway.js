"use client";
import Image from "next/image";

const ChoiceGateaway = () => {
  return (
    <>
      <div className="border p-3 rounded-md">
        <h1 className="text-lg">انتخاب درگاه پرداخت</h1>
        <div className="flex flex-row gap-10">
          <Image
            src={"/images/statics/logo-meli.png"}
            width={100}
            height={100}
            alt="image not found"
          />
          <Image
            src={"/images/statics/logo-zarinpal.png"}
            width={100}
            height={100}
            alt="image not found"
          />
        </div>
      </div>
    </>
  );
};

export default ChoiceGateaway;
