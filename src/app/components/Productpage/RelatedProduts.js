import ProductSlider from "../HomePage/ProductSlider";

const RelatedProducts = async ({ m_category, t_category }) => {
  const params = new URLSearchParams({
    m_category: m_category,
    t_category: t_category,
  });
  const response = await fetch(
    `https://hydrogenous.vercel.app/api/GetRealtedProducts?${params}`
  );
  const products = await response.json();
  return (
    <>  
    <div className="mb-5">
      <h2 className="text-3xl my-5 px-10 xl:px-20 2xl:px-40">محصولات مرتبط</h2>
      {<ProductSlider products={products} />}
    </div>
    </>
  );
};
export default RelatedProducts;
