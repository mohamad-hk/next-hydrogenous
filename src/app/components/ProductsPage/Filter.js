"use client";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Select, SelectItem, Switch } from "@heroui/react";
import { useState } from "react";

const FilterProducts = () => {
  const [price, setPrice] = useState(0);
  const handleChange = (e) => {
    setPrice(Number(e.target.value));
  };
  return (
    <>
      <div className="flex flex-col gap-5 w-[90%] bg-slate-50 shadow-sm max-h-[300px] p-2 ">
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg w-80">
          <h2 className="text-lg font-semibold text-gray-800">محدوده قیمت</h2>
          <div className="relative w-full mt-4">
            <input
              type="range"
              min="0"
              max="10000000"
              step="100000"
              value={price}
              onChange={handleChange}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 bg-blue-500 h-2 rounded-lg"
              style={{
                width: `${(price / 10000000) * 100}%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between w-full text-gray-600 text-sm mt-2">
            <span>۰ تومان</span>
            <span>۱۰ میلیون تومان</span>
          </div>
          <p className="mt-3 text-gray-700 text-lg font-bold">
            {PersianNumbers(price)} تومان
          </p>
        </div>

        <Select className="max-w-xs" color={"primary"} placeholder=" طعم ها ">
          {/* {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))} */}
        </Select>
        <Select
          className="max-w-xs"
          color={"primary"}
          placeholder=" دسته بندی "
        >
          {/* {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))} */}
        </Select>
        <Switch size="sm">دارای تخفیف</Switch>
      </div>
    </>
  );
};

export default FilterProducts;
