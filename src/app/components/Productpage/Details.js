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
            <div className="px-10 xl:px-20 2xl:px-40 ">
              <h2 className="text-3xl my-5 ms-3">مشخصات</h2>
              <div className="flex flex-col gap-5 shadow-lg dark:shadow-md dark:shadow-white dark:bg-[#3e5f86] w-fit p-2 rounded-lg">
                <div className="grid grid-cols-[100px_1fr] lg:grid-cols-[150px_minmax(600px,_1020px)]">
                  <h3 className=" text-[#007BFF] dark:text-white p-2">محتویات</h3>
                  <p className="border-b-2 text-[#333333] dark:text-white p-2">
                    {detail.product_d_ing}
                  </p>
                </div>
                <div className="grid grid-cols-[100px_1fr] lg:grid-cols-[150px_minmax(600px,_1020px)]">
                  <h3 className=" text-[#007BFF] dark:text-white p-2">روش مصرف</h3>
                  <p className="border-b-2 p-2  text-[#333333] dark:text-white">
                    {detail.product_d_usage}
                  </p>
                </div>
                <div className="grid grid-cols-[100px_1fr] lg:grid-cols-[150px_minmax(600px,_1020px)]">
                  <h3 className=" text-[#007BFF] dark:text-white p-2">تعداد</h3>
                  <p className="border-b-2  text-[#333333] dark:text-white p-2">
                    {detail.product_d_quantity}
                  </p>
                </div>
                <div className="grid grid-cols-[100px_1fr] lg:grid-cols-[150px_minmax(600px,_1020px)]">
                  {detail.product_d_weight != "NULL" ? (
                    <h3 className=" text-[#007BFF] dark:text-white p-2">وزن</h3>
                  ) : null}
                  {detail?.product_d_weight !== "NULL" && (
                    <p className="border-b-2 p-2 text-[#333333] dark:text-white">
                      {detail.product_d_weight}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-[100px_1fr] lg:grid-cols-[150px_minmax(600px,_1020px)]">
                  <h3 className="text-[#007BFF] dark:text-white p-2">شکل</h3>
                  <p className="text-[#333333] dark:text-white p-2">{detail.product_d_shape}</p>
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
