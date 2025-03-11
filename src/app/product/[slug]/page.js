import AddComment from "../../components/Productpage/AddComment";
import AddToCartSection from "../../components/Productpage/AddToCart";
import Details from "../../components/Productpage/Details";
import ProductImage from "../../components/Productpage/ProductImage";
import RelatedProducts from "../../components/Productpage/RelatedProduts";
import ShowComments from "../../components/Productpage/ShowComments";

const ShowProduct = async ({ params }) => {
  const { slug } = await params;

  const decoded_url = decodeURIComponent(slug.replaceAll("-", " "));
  const input_params = new URLSearchParams({ product_name: decoded_url });

  const product_data = await fetch(
    `https://hydrogenous.vercel.app/api/Product/GetProduct?${input_params}`,
    { cache: "no-store" }
  );

  if (!product_data.ok) throw new Error("Failed to fetch product data");

  const product_res = await product_data.json();

  return (
    <>
      {product_res?.map((product) => {
        return (
          <>
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 md:gap-x-10 xl:gap-x-0 my-10 px-10 ">
              <ProductImage image={product.product_photo} product_id={product.product_id} />
                
              <AddToCartSection
                product_name={product.product_name}
                price={product.product_price}
                discount_price={product.discount_price}
                discount_percent={product.discount_percent}
                product={product}
              />
            </div>
            <Details id={product.product_id} />
            <div className="flex flex-col md:flex-row gap-10 mt-10 px-10 xl:px-20 2xl:px-40">
              <ShowComments id={product.product_id} />
              <AddComment id={product.product_id} />
            </div>

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
