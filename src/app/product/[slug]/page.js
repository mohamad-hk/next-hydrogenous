import AddToCart from "@/app/components/Productpage/AddToCart";
import Details from "@/app/components/Productpage/Details";
import ProductImage from "@/app/components/Productpage/ProductImage";
import RelatedProducts from "@/app/components/Productpage/RelatedProduts";

const ShowProduct = async ({ params }) => {
  const { slug } = await params;

  const decoded_url = decodeURIComponent(slug.replaceAll("-", " "));
  const input_params = new URLSearchParams({ product_name: decoded_url });

  const product_data = await fetch(
    `https://hydrogenous.vercel.app/api/GetProduct?${input_params}`,
    { cache: "no-store" }
  );

  if (!product_data.ok) throw new Error("Failed to fetch product data");

  const product_res = await product_data.json();

  return (
    <>
      {product_res?.map((product) => {
        return (
          <>
            <div className="flex flex-row justify-center my-10 gap-x-80">
              <AddToCart
                product_name={product.product_name}
                price={product.product_price}
                discount_price={product.discount_price}
                discount_percent={product.discount_percent}
              />
              <ProductImage image={product.product_photo} />
            </div>
            <Details id={product.product_id} />
            <RelatedProducts
              t_category={product.t_category_id}
              m_category={product.m_category_id}
            />
          </>
        );
      })}
    </>
  );
};

export default ShowProduct;
