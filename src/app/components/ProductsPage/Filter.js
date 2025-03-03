import { Select, SelectItem, Slider, Switch } from "@heroui/react";

const FilterProducts = () => {
  return (
    <>
      <div className="flex flex-col gap-5 w-[90%] bg-slate-50 shadow-sm max-h-[300px] p-2 ">
        <Slider
          defaultValue={[100, 500]}
          formatOptions={{ style: "currency", currency: "IRR" }}
          maxValue={1000}
          minValue={0}
          step={50}
        />
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
