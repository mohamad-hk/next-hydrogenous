export const metadata = {
  title: "قوانین ارسال",
};

const ShippingPolicy = () => {
  return (
    <>
      <div className="p-6 w-[90%] lg:w-[80%] mx-auto lg:mb-[5.9rem]">
        <p className="text-lg mb-4">
          مشتریان گرامی، با تشکر از حسن انتخاب شما عزیزان، به اطلاع می‌رساند که
          ارسال کالا در هیدروژنوس به شرح زیر می‌باشد:
        </p>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">روش‌های ارسال کالا</h2>

          <article className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-blue-600 mb-3">
              ارسال توسط پست
            </h3>
            <ul className="list-disc list-inside space-y-2">
              <li>تمامی سفارشات از طریق اداره پست ارسال می‌شوند.</li>
              <li>
                هیدروژنوس برای ارسال سفارشاتی که کمتر از 450000 تومان باشند،
                مبلغ 35000 تومان هزینه دریافت می‌کند.
              </li>
              <li>
                سفارشاتی با مبلغ بالاتر از 450000 تومان، به صورت رایگان ارسال
                می‌شوند.
              </li>
              <li>
                زمان تقریبی تحویل سفارشات، با توجه به مقصد و پس از پردازش و
                تحویل به اداره پست، بین 1 تا 4 روز کاری است.
              </li>
              <li>
                سفارشاتی که تا ساعت 11 روزهای کاری شنبه تا چهارشنبه ثبت شوند، 2
                تا 3 روز کاری زمان تحویل خواهند داشت. سفارشاتی که بعد از ساعت 11
                یا در روزهای تعطیل ثبت شوند، در اولین روز کاری پردازش و ارسال
                می‌شوند.
              </li>
              <li>
                کد رهگیری مرسوله به شماره همراه ثبت شده در سایت ارسال خواهد شد
                تا شما بتوانید وضعیت ارسال خود را پیگیری کنید.
              </li>
            </ul>
          </article>

          <article className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-blue-600 mb-3">
              ارسال توسط پیک (به زودی)
            </h3>
            <p>
              سرویس ارسال پیک به زودی در دسترس خواهد بود. جزئیات بیشتر در آینده
              اعلام می‌شود.
            </p>
          </article>
        </section>
      </div>
    </>
  );
};

export default ShippingPolicy;
