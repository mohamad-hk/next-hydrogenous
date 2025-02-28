import AddComment from "@/app/components/ProductPage/AddComment";
import AddToCartSection from "@/app/components/ProductPage/AddToCart";
import Details from "@/app/components/ProductPage/Details";
import ProductImage from "@/app/components/ProductPage/ProductImage";
import RelatedProducts from "@/app/components/ProductPage/RelatedProduts";
import ShowComments from "@/app/components/ProductPage/ShowComments";

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
            <div className="grid grid-cols-1 place-items-center md:grid-cols-2 md:gap-x-10 xl:gap-x-0 my-10 px-10 ">
              <ProductImage image={product.product_photo} />
              <AddToCartSection
                product_name={product.product_name}
                price={product.product_price}
                discount_price={product.discount_price}
                discount_percent={product.discount_percent}
                product={product}
              />
            </div>
            <Details id={product.product_id} />
            <div className="flex flex-row gap-10 mt-10 px-10">
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
