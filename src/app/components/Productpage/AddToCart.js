import CalcPercent from "@/app/utils/CalcDiscountPercent";
import { Button } from "@heroui/react";
import Quantity from "./Qauantity";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import AddToCart from "../CartStore/AddToCart";
const AddToCartSection = ({
  product_name,
  price,
  discount_price,
  discount_percent,
  product,
}) => {
  return (
    <>
      <div className="flex flex-col items-start gap-10">
        <h1 className="text-2xl">{product_name}</h1>
        <div className="my-10">
          <p className="mb-3">{PersianNumbers(price)}</p>
          {discount_price != null ? (
            <p>{PersianNumbers(discount_price)}</p>
          ) : null}
          {discount_percent != null ? (
            <p className="">
              <CalcPercent price={price} d_percent={discount_percent} />
            </p>
          ) : null}
        </div>
        <Quantity />
          <AddToCart product={product}/>
      </div>
    </>
  );
};
export default AddToCartSection;
