const Details = async ({ id }) => {
  const input_params = new URLSearchParams({
    p_id: id,
  });
  const data = await fetch(
    `https://hydrogenous.vercel.app/api/GetProductDetails?${input_params}`
  );
  const details = await data.json();
  return (
    <>
      {details?.map((detail) => {
        return (
          <>
            <h2 className="text-3xl my-5 px-10">مشخصات</h2>
            <div className="grid grid-cols-[200px_minmax(700px,_1fr)_400px] bg-slate-200 shadow-lg p-2 ">
              <div className="flex flex-col gap-10 ">
                <h3 className="pb-2">محتویات</h3>
                <h3 className="pb-2">روش مصرف</h3>
                <h3 className="pb-2">تعداد</h3>
                {detail.product_d_weight != "NULL" ? <h3>وزن</h3> : null}

                <h3 className="pb-2">شکل</h3>
              </div>
              <div className="flex flex-col gap-10">
                <p className="border border-x-0 border-t-0 pb-2">
                  {detail.product_d_ing}
                </p>
                <p className="border border-x-0 border-t-0 pb-2">
                  {detail.product_d_usage}
                </p>
                <p className="border border-x-0 border-t-0 pb-2">
                  {detail.product_d_quantity}
                </p>
                {detail?.product_d_weight !== "NULL" && (
                  <p className="border border-x-0 border-t-0 pb-2">
                    {detail.product_d_weight}
                  </p>
                )}

                <p className="border border-x-0 border-t-0 pb-2">
                  {detail.product_d_shape}
                </p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default Details;
