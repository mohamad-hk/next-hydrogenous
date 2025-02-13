import ProductSlider from "../HomePage/ProductSlider";

const RelatedProducts = async ({ m_category, t_category }) => {
  const params = new URLSearchParams({
    m_category: m_category,
    t_category: t_category,
  });
  const response = await fetch(
    `http://localhost:3000/api/GetRealtedProducts?${params}`
  );
  const products = await response.json();
  return <>{<ProductSlider products={products} />}</>;
};
export default RelatedProducts;
