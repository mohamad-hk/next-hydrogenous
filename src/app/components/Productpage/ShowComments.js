"use client";

import { LuCircleUser } from "react-icons/lu";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
// import { SlLike } from "react-icons/sl";
// import { SlDislike } from "react-icons/sl";
import { useEffect, useState } from "react";
import convertToPersianDate from "@/app/utils/ConvertToPersianDate";

const ShowComments = ({ id }) => {
  const input_params = new URLSearchParams({
    p_id: id,
  });
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    const data = await fetch(
      `https://hydrogenous.vercel.app/api/Product/ProductComments/GetComments?${input_params}`
    );
    const response = await data.json();
    setComments(response);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
        <div className="flex flex-col shadow-lg rounded-lg h-fit">
        {comments?.length > 0 ? (
          comments.map((comment, index) => {
            return (
              <>
                <div
                  key={index}
                  className={`flex flex-col justify-start gap-4 md:w-[400px] lg:w-[500px] xl:w-[750px] p-2 max-w-[800px] h-fit  dark:bg-[#3e5f86] rounded-md dark:shadow-md dark:shadow-white
                    ${
                      index !== comments.length - 1
                        ? "border-b border-[#00D1FF]  dark:border-white "
                        : " dark:border-white"
                    }
                  `}
                >
                  <div className="flex flex-row gap-2 items-center text-xl">
                    <LuCircleUser className="text-[#007BFF] dark:text-white" />
                    <p className="text-[#007BFF] dark:text-white">{comment.comment_user}</p>
                  </div>
                  <div className="text-2xl">
                    <Rater total={5} rating={comment.comment_score} />
                  </div>
                  <p className="text-[#333333] dark:text-white"> {comment.comment_text} </p>
                  <p>{convertToPersianDate(comment.create_comment)}</p>

                  {/* <div className="flex flex-row gap-5">
                    <p>این نظر برای شما مفید بود؟</p>
                    <div className="flex flex-row gap-8">
                      <SlDislike className="cursor-pointer" />
                      <SlLike className="cursor-pointer" />
                    </div>
                  </div> */}
                </div>
              </>
            );
          })
        ) : (
          <div className="flex flex-col justify-start gap-5 rounded-md shadow-sm  bg-blue-200 w-full p-4 max-w-[800px] h-[150px] dark:bg-[#3e5f86] dark:text-white ">
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

export default ShowComments;
