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
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

const ProfileComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const getComments = async (input_params) => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Comments?${input_params}`
      );
      const response = await data.json();
      setComments(response);
    } catch (error) {
      console.error("Error fetching", error);
    } finally {
      setLoading(false);
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
      {loading ? (
        <Loading />
      ) : (
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
              <p>تا کنون نظری ثبت نکردید</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileComments;
