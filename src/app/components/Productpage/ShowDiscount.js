import PersianNumbers from "@/app/utils/ToPersianNumber";

const ShowDiscount = ({ discount_percent, discount_price }) => {
  return (
    <>
      {discount_percent != null ? (
        <div className="hidden md:block rounded-full bg-danger absolute text-white p-3  left-0 top-5">
          {PersianNumbers(discount_percent)}%
        </div>
      ) : null}
      {discount_price != null ? (
        <div className="hidden md:block rounded-full bg-danger absolute text-white p-3 left-0 top-5">
          {PersianNumbers((discount_price / price) * 100)}%
        </div>
      ) : null}
    </>
  );
};

export default ShowDiscount;
