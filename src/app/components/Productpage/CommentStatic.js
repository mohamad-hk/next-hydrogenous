"use client";
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

  return (
    <div className="flex flex-col gap-5">
      <Progress color="warning" value={calculatePercentage(Onescore)} />
      <Progress color="warning" value={calculatePercentage(Twoscore)} />
      <Progress color="warning" value={calculatePercentage(Threescore)} />
      <Progress color="warning" value={calculatePercentage(Fourscore)} />
      <Progress color="warning" value={calculatePercentage(Fivescore)} />
    </div>
  );
};

export default CommentStatics;
