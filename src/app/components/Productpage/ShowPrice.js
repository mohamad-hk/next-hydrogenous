import CalcPercent from "@/app/utils/CalcDiscountPercent";
import PersianNumbers from "@/app/utils/ToPersianNumber";

const ShowPrice = ({ price, discount_percent, discount_price }) => {
  return (
    <>
      <p
        className={
          discount_percent != null || discount_price != null
            ? `mb-1 line-through`
            : `mb-1`
        }
      >
        {PersianNumbers(price)} تومان
      </p>
      {discount_price != null ? (
        <p>{PersianNumbers(discount_price)} تومان</p>
      ) : null}
      {discount_percent != null ? (
        <p className="">
          <CalcPercent price={price} d_percent={discount_percent} />
        </p>
      ) : null}
    </>
  );
};

export default ShowPrice;
