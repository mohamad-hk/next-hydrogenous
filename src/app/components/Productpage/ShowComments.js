"use client";

import { LuCircleUser } from "react-icons/lu";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import convertToPersianDate from "@/app/utils/ConvertToPersianDate";

const ShowComments = ({ id }) => {
  const input_params = new URLSearchParams({
    p_id: id,
  });
  const [comments, setComments] = useState();
  const getComments = async () => {
    const data = await fetch(
      `https://hydrogenous.vercel.app/api/GetComments?${input_params}`
    );
    const response = await data.json();
    setComments(response);
  };
  useEffect(() => {
    getComments();
  }, []);
  return (
    <>
      {comments?.map((comment, index) => {
        return (
          <>
            <div
              key={index}
              className="flex flex-col justify-start gap-5 shadow-sm w-full p-2 max-w-[700px]"
            >
              <div className="flex flex-row gap-2 items-center">
                <LuCircleUser />
                <p>{comment.comment_user}</p>
              </div>
              <div>
                <Rater total={5} rating={comment.comment_score} />
              </div>
              <p> {comment.comment_text} </p>
              <p>{convertToPersianDate(comment.create_comment)}</p>

              <div className="flex flex-row gap-5">
                <p>این نظر برای شما مفید بود؟</p>
                <div className="flex flex-row gap-8">
                  <SlDislike className="cursor-pointer" />
                  <SlLike className="cursor-pointer" />
                </div>
              </div>
            </div>
            <Divider orientation="vertical" />
          </>
        );
      })}
    </>
  );
};

export default ShowComments;
