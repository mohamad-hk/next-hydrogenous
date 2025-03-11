"use client";

import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Select, SelectItem, Switch } from "@heroui/react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const FilterProducts = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [price, setPrice] = useState(searchParams.get("price") || 0);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [flavour, setFlavour] = useState(searchParams.get("flavour") || "");
  const [discount, setDiscount] = useState(
    searchParams.get("discount") === "false"
  );
  const [exist, setExist] = useState(searchParams.get("exist") === "true");

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "همه") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
    updateFilters("price", newPrice);
  };
  const handleCategoryChange = (selected) => {
    const value = selected?.target?.value || selected; 

    if (value === "همه") {
      setCategory("");
      updateFilters("category", "");
    } else {
      setCategory(value);
      updateFilters("category", value); 
    }
  };
  const handleFlavour = (selected) => {
    const value = selected?.target?.value || selected;
    console.log("Selected Flavour:", value); 

    if (value === "همه") {
      setFlavour("");
      updateFilters("flavour", "");
    } else {
      setFlavour(value);
      updateFilters("flavour", value);
    }
  };


  const handleDiscountChange = () => {
    const newDiscount = !discount;
    setDiscount(newDiscount);
    updateFilters("discount", newDiscount ? "true" : "false");
  };
  const handleExist = () => {
    const newExist = !exist;
    setExist(newExist);
    updateFilters("exist", newExist ? "false" : "true");
  };
  

  return (
    <div className="flex flex-col gap-5 w-[90%] bg-slate-50 shadow-sm max-h-[300px] p-2">

      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg w-80">
        <h2 className=" text-lg font-semibold text-gray-800">محدوده قیمت</h2>
        <div className="relative w-full mt-4">
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={price}
            onChange={handlePriceChange}
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

      <Select
        className="max-w-xs"
        color="primary"
        placeholder="دسته‌بندی"
        onChange={handleCategoryChange}
        selectedKeys={[category ? String(category) : "همه"]}
      >
        <SelectItem key="همه" value="همه">
          همه
        </SelectItem>
        <SelectItem key="ساشه" value="ساشه">
          ساشه
        </SelectItem>
        <SelectItem key="پودر" value="پودر">
          پودر
        </SelectItem>
      </Select>

      <Select
        className="max-w-xs"
        color="primary"
        placeholder="طعم ها"
        onChange={handleFlavour}
        selectedKeys={[flavour ? String(flavour) : "همه"]} 
      >
        <SelectItem key="همه" value="همه">
          همه
        </SelectItem>
        <SelectItem key="پرتغالی" value="پرتغالی">
          پرتغالی
        </SelectItem>
        <SelectItem key="استوایی" value="استوایی">
          استوایی
        </SelectItem>
        <SelectItem key="کلاسیک" value="کلاسیک">
          کلاسیک
        </SelectItem>
        <SelectItem key="لیمو نعناع" value="لیمو نعناع">
          لیمو نعناع
        </SelectItem>
        <SelectItem key="ویژه" value="ویژه">
          ویژه
        </SelectItem>
        <SelectItem key="توت فرنگی" value="توت فرنگی">
          توت فرنگی
        </SelectItem>
        <SelectItem key="تمشک" value="تمشک">
          تمشک
        </SelectItem>
      </Select>

      <Switch size="sm" checked={discount} onChange={handleDiscountChange}>
        دارای تخفیف
      </Switch>
      <Switch size="sm" checked={exist} onChange={handleExist}>
        موجود بودن
      </Switch>
    </div>
  );
};

export default FilterProducts;
