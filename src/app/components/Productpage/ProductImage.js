"use client";
import Image from "next/image";
import { useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
const ProductImage = ({ image }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative">
      <Image
        className="rounded-xl shadow-xl"
        src={`/images/products/${image}`}
        width={500}
        height={500}
        alt="image not found"
      />
      <div className=" shadow-md rounded-xl flex flex-col items-center gap-5 p-3 absolute -right-14 top-0 border border-blue-200">
        <CiShare2
          className="cursor-pointer text-2xl hover:text-blue-800 transition-all duration-500 ease-in-out"
          onClick={handleCopy}
        />
        <IoMdHeartEmpty className="cursor-pointer text-2xl hover:text-danger transition-all duration-500 ease-in-out" />
      </div>
    </div>
  );
};
export default ProductImage;
