"use client";
import PersianNumbers from "@/app/utils/ToPersianNumber";
import { Progress } from "@heroui/react";
import { useEffect, useState } from "react";

const CommentStatics = ({ id }) => {
  const input_params = new URLSearchParams({
    p_id: id,
  });
  const [score, setScore] = useState([]);
  const [Onescore, setOneScore] = useState(0);
  const [Twoscore, setTwoScore] = useState(0);
  const [Threescore, setThreeScore] = useState(0);
  const [Fourscore, setFourScore] = useState(0);
  const [Fivescore, setFiveScore] = useState(0);
  const [total, setTotal] = useState(0);
  const getScore = async () => {
    const data = await fetch(
      `https://hydrogenous.vercel.app/api/GetCommentsScore?${input_params}`
    );
    const response = await data.json();
    setScore(response);
    countscore(response);
  };
  function countscore(response) {
    response.forEach((item) => {
      const scoreValue = Number(item.comment_score);
      console.log(scoreValue);
      setTotal((prev) => prev + scoreValue);
      switch (scoreValue) {
        case 1:
          setOneScore((prev) => prev + 1);
          break;
        case 2:
          setTwoScore((prev) => prev + 1);
          break;
        case 3:
          setThreeScore((prev) => prev + 1);
          break;
        case 4:
          setFourScore((prev) => prev + 1);
          break;
        case 5:
          setFiveScore((prev) => prev + 1);
          break;
        default:
          break;
      }
    });
  }
  useEffect(() => {
    getScore();
  }, []);
  const totalScores = score.length;
  const calculatePercentage = (scoreCount) =>
    totalScores ? (scoreCount / totalScores) * 100 : 0;
  const averageScore = totalScores ? (total / totalScores) * 1 : 0;

  return (
    <>
      <div className="grid grid-cols-[250px_1fr] gap-x-5">
        <div className="flex flex-col gap-5 ">
          <div className="flex flex-row items-center gap-2 ">
            {PersianNumbers(5)}
            <Progress
              color="warning"
              value={calculatePercentage(Fivescore)}
              className="transform -scale-x-100"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            {PersianNumbers(4)}
            <Progress
              color="warning"
              value={calculatePercentage(Fourscore)}
              className="transform -scale-x-100"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            {PersianNumbers(3)}
            <Progress
              color="warning"
              value={calculatePercentage(Threescore)}
              className="transform -scale-x-100"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            {PersianNumbers(2)}
            <Progress
              color="warning"
              value={calculatePercentage(Twoscore)}
              className="transform -scale-x-100"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            {PersianNumbers(1)}
            <Progress
              color="warning"
              value={calculatePercentage(Onescore)}
              className="transform -scale-x-100"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl">{averageScore!=0? PersianNumbers(averageScore):null}</p>
          <p className="text-2xl">{PersianNumbers(totalScores)} نظر</p>
        </div>
      </div>
    </>
  );
};

export default CommentStatics;