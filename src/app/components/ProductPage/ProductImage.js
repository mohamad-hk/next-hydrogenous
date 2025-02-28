import Image from "next/image";

const ProductImage = ({ image }) => {
  return (
    <Image
      className="rounded-xl shadow-xl"
      src={`/images/products/${image}`}
      width={500}
      height={500}
      alt="image not found"
    />
  );
};
export default ProductImage;
