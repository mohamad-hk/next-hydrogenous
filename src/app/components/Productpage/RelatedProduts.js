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
  return <>
  <h2 className="text-3xl my-5 px-10">محصولات مرتبط</h2>
  {<ProductSlider products={products} />}
  </>;
};
export default RelatedProducts;
