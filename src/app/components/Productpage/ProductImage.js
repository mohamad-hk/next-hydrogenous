"use client";
import { AuthContext } from "@/app/context/AuthContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { CiShare2 } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const ProductImage = ({ image, product_id }) => {
  const { user } = useContext(AuthContext);
  const [copied, setCopied] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const [beWish, setBeWish] = useState(false);

  const handleCopy = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying URL:", error);
    }
  };

  const fetchWish = async (input_params) => {
    try {
      const response = await fetch(
        `https://hydrogenous.vercel.app/api/Product/Wish/GetWish?${input_params}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setIsWish(true);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const setWish = async () => {
    try {
      const response = await fetch(
        "https://hydrogenous.vercel.app/api/Wish/InsertWish",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: user.customer_id,
            product_id: product_id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("مشکلی در ثبت علاقه‌مندی پیش آمده است");
      }

      const responseData = await response.json();
      console.log(responseData);
      setIsWish(true);
    } catch (error) {
      console.error(error);
      alert("خطا در ارسال درخواست علاقه‌مندی");
    }
  };

  const removeWish = async () => {
    try {
      const response = await fetch(
        `https://hydrogenous.vercel.app/api/Product/Wish/DeleteWish?customer_id=${user.customer_id}&product_id=${product_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Removed from wishlist", result);
        setIsWish(false);
      } else {
        console.error("Failed to remove from wishlist:", result.error);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const input_params = new URLSearchParams({
      customer_id: user.customer_id,
      product_id: product_id,
    });

    fetchWish(input_params);
  }, [user, product_id]);

  useEffect(() => {
    if (!isWish && beWish && user) {
      setWish();
    } else if (isWish && !beWish && user) {
      removeWish();
    }
  }, [beWish, user]);

  return (
    <div className="relative">
      <Image
        className="rounded-xl shadow-xl"
        src={`/images/products/${image}`}
        width={500}
        height={500}
        alt="image not found"
      />
      <div className="shadow-md rounded-xl flex flex-col items-center gap-5 p-3 absolute -right-14 top-0 border border-blue-200">
        <CiShare2
          className="cursor-pointer text-2xl hover:text-blue-800 transition-all duration-500 ease-in-out"
          onClick={handleCopy}
        />
        <FaHeart
          onClick={() => setBeWish((prev) => !prev)}
          className={`cursor-pointer text-2xl fill-current ${
            isWish ? "text-red-500" : "text-gray-400"
          } hover:text-danger transition-all duration-500 ease-in-out`}
        />
      </div>
    </div>
  );
};

export default ProductImage;
