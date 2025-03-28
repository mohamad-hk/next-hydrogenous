import CalcPercent from "@/app/utils/CalcDiscountPercent";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import ProductExisting from "../ProductsPage/ProductExisting";
import ShowDiscount from "./ShowDiscount";
import ShowPrice from "./ShowPrice";
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
        {product.stock == 0 ? null : (
          <ShowDiscount
            discount_percent={discount_percent}
            discount_price={discount_price}
          />
        )}
        <h1 className="text-2xl mt-10">{product_name}</h1>
        <p className="text-justify leading-9 text-[14px]">
          {product_name}، انتخابی ایده‌آل برای افرادی است که به سلامت بدن و ذهن
          خود اهمیت می‌دهند. این محصول با فرمولاسیونی پیشرفته و غنی از هیدروژن،
          علاوه بر افزایش انرژی، به کاهش استرس، تقویت ایمنی بدن و بهبود کیفیت
          زندگی روزانه کمک می‌کند. تجربه‌ای تازه و پرانرژی برای کسانی که به
          دنبال تعادل و نشاط بیشتر در زندگی خود هستند.
        </p>
        {product.stock == 0 ? null : (
          <div className="my-8 hidden md:block">
            <ShowPrice
              price={price}
              discount_percent={discount_percent}
              discount_price={discount_price}
            />
            <ProductExisting product={product} />
          </div>
        )}

        {product.stock == 0 ? null : (
          <>
            <div className=" flex flex-row justify-around gap-2 sm:justify-between w-full items-center bg-slate-50 dark:bg-[#4e76a4]  fixed shadow-md md:hidden bottom-[4.5rem] left-0 z-10 p-3">
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
          </>
        )}
      </div>
    </>
  );
};
export default AddToCartSection;
