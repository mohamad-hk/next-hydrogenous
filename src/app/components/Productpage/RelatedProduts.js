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
  return <>{<ProductSlider products={products} />}</>;
};
export default RelatedProducts;
