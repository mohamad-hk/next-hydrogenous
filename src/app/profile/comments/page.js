"use client";
import { AuthContext } from "@/app/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Divider } from "@heroui/react";
import convertToPersianDate from "@/app/utils/ConvertToPersianDate";
import { LuCircleUser } from "react-icons/lu";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import Link from "next/link";
import fixurl from "@/app/utils/Fixurl";

const ProfileComments = () => {
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);

  const getComments = async (input_params) => {
    try {
      const data = await fetch(
        `http://localhost:3000/api/Profile/Comments?${input_params}`
      );
      const response = await data.json();
      setComments(response);
    } catch (error) {
      console.error("Error fetching", error);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        c_id: user.customer_id,
      });
      getComments(input_params);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col ms-4">
        {comments?.length > 0 ? (
          comments.map((comment, index) => {
            return (
              <>
                <div
                  key={index}
                  className="flex flex-col justify-start gap-3 md:w-[400px] lg:w-[600px] p-5 max-w-[800px] h-[250px] shadow-md rounded-lg "
                >
                  <div className="flex flex-row gap-2 items-center text-xl">
                    <LuCircleUser />
                    <p>{comment.comment_user}</p>
                  </div>
                  <Link
                    className="text-blue-600"
                    href={`/product/${fixurl(
                      comment.tbl_products.product_name
                    )}`}
                  >
                    <p>{comment.tbl_products.product_name}</p>
                  </Link>
                  <div className="text-2xl">
                    <Rater total={5} rating={comment.comment_score} />
                  </div>
                  <p> {comment.comment_text} </p>
                  <div className="flex flex-row items-center gap-2">
                    <p>تاریخ انتشار:</p>
                    <p> {convertToPersianDate(comment.create_comment)}</p>
                  </div>
                </div>
                {index != comments.length - 1 ? (
                  <Divider orientation="horizontal" />
                ) : null}
              </>
            );
          })
        ) : (
          <div className="flex flex-col justify-start gap-5 rounded-md shadow-sm  bg-blue-200 w-full p-4 max-w-[800px] h-[150px] ">
            <p className="font-bold">
              دیدگاه خود را در مورد این محصول ثبت کنید و به دیگران کمک کنید.
            </p>
            <p>
              برای ثبت نظر نیاز به خرید محصول نیست؛ همچنین می‌توانید نظرتان را
              به صورت ناشناس ثبت کنید.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileComments;
