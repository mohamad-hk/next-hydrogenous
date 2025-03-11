const Details = async ({ id }) => {
  const input_params = new URLSearchParams({
    p_id: id,
  });
  const data = await fetch(
    `https://hydrogenous.vercel.app/api/Product/GetProductDetails?${input_params}`
  );
  const details = await data.json();
  return (
    <>
      {details?.map((detail) => {
        return (
          <>
            <div className="px-10 xl:px-20 2xl:px-40">
              <h2 className="text-3xl my-5 ms-3">مشخصات</h2>
              <div className="grid grid-cols-[150px_minmax(700px,_1fr)_0px] text-[14px] overflow-x-scroll md:overflow-auto md:grid-cols-[150px_minmax(700px,_1fr)_200px] lg:grid-cols-[100px_minmax(900px,_1fr)_300px] lg:text-[14px]  xl:grid-cols-[150px_minmax(700px,_1fr)_350px] shadow-lg p-3 2xl:grid-cols-[150px_minmax(700px,_1fr)_350px] ">
                <div className="flex flex-col gap-11 md:gap-8 p-2 ">
                  <h3 className="pb-2">محتویات</h3>
                  <h3 className="pb-2">روش مصرف</h3>
                  <h3 className="pb-2">تعداد</h3>
                  {detail.product_d_weight != "NULL" ? <h3>وزن</h3> : null}

                  <h3 className="mt-2">شکل</h3>
                </div>
                <div className="flex flex-col gap-8">
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

                  <p>{detail.product_d_shape}</p>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default Details;
