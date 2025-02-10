import ProductSlider from "./ProductSlider";

const GetProducts = async ({ category }) => {
  const params = new URLSearchParams({
    category: category,
  });
  const response = await fetch(
    `https://hydrogenous.vercel.app/api/GetProducts?${params}`
  );
  const products = await response.json();
  return (
    <>
      <ProductSlider products={products} />
    </>
  );
};
export default GetProducts;
