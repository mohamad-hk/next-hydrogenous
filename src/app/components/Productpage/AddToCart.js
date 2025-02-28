import CalcPercent from "@/app/utils/CalcDiscountPercent";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import ProductExisting from "../ProductsPage/ProductExisting";
const AddToCartSection = ({
  product_name,
  price,
  discount_price,
  discount_percent,
  product,
}) => {
  return (
    <>
      <div className=" flex flex-col items-start gap-5 md:relative max-w-[600px]">
        {discount_percent != null ? (
          <div className="hidden md:block rounded-full bg-danger absolute text-white p-3 left-0 top-5">
            {PersianNumbers(discount_percent)}%
          </div>
        ) : null}
        {discount_price != null ? (
          <div className="hidden md:block rounded-full bg-danger absolute text-white p-3 left-0 top-5">
            {PersianNumbers((discount_price / price) * 100)}%
          </div>
        ) : null}
        <h1 className="text-2xl mt-10">{product_name}</h1>
        <p className="text-justify leading-9 text-[14px]">
          پودر نوشیدنی هیدروژنوس با طعم موهیتو، انتخابی ایده‌آل برای افرادی است
          که به سلامت بدن و ذهن خود اهمیت می‌دهند. این محصول با فرمولاسیونی
          پیشرفته و غنی از هیدروژن، علاوه بر افزایش انرژی، به کاهش استرس، تقویت
          ایمنی بدن و بهبود کیفیت زندگی روزانه کمک می‌کند. تجربه‌ای تازه و
          پرانرژی برای کسانی که به دنبال تعادل و نشاط بیشتر در زندگی خود هستند.
        </p>
        <div className="my-8 hidden md:block">
          <p
            className={
              discount_percent != null || discount_price != null
                ? `mb-3 line-through`
                : `mb-3`
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
        </div>

        <div className=" flex flex-row justify-around gap-28  w-full items-center fixed md:hidden bottom-0 left-0 bg-white z-10  p-2">
          {discount_percent != null ? (
            <div className="rounded-full bg-danger absolute text-white p-1 text-sm left-0 top-0">
              {PersianNumbers(discount_percent)}%
            </div>
          ) : null}
          {discount_price != null ? (
            <div className="rounded-full bg-danger absolute text-white p-1 text-sm left-0 top-0">
              {PersianNumbers((discount_price / price) * 100)}%
            </div>
          ) : null}
          <ProductExisting product={product} />
          <div className=" md:hidden">
            <p
              className={
                discount_percent != null || discount_price != null
                  ? ` line-through`
                  : ``
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
          </div>
        </div>
      </div>
    </>
  );
};
export default AddToCartSection;
