import ProductSlider from "./ProductSlider";

const GetProducts = async ({ category }) => {
  const params = new URLSearchParams({
    category: category,
  });
  const response = await fetch(
    `http://localhost:3000/api/GetProducts?${params}`
  );
  const products = await response.json();
  return (
    <>
      <ProductSlider products={products} />
    </>
  );
};
export default GetProducts;
