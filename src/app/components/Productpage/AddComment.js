"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
  Textarea,
} from "@heroui/react";
import { useContext, useState } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import CommentStatics from "./CommentStatic";
import { AuthContext } from "@/app/context/AuthContext";
import { toast } from "react-toastify";

const AddComment = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [beuser, setBeuser] = useState(true);
  const { user } = useContext(AuthContext);

  const handleRatingChange = (rate) => {
    setRating(rate);
  };

  const handleform = async (event) => {
    event.preventDefault;

    const temp_user =
      user && beuser ? `${user.first_name} ${user.last_name}` : "نا شناس";

    const input_params = {
      p_id: id,
      content,
      rating,
      user_name: temp_user,
    };
    console.log(input_params);

    try {
      const response = await fetch(
        "https://hydrogenous.vercel.app/api/AddComment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input_params),
        }
      );

      if (!response.ok) {
        throw new Error("مشکلی در ارسال نظر پیش آمده است");
      }
      const responseData = await response.json();

      toast.success("نظر شما ثبت شد");
    } catch (error) {
      toast.error("مشکلی پیش اومده");
    }
    onOpenChange(false);
  };

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  return (
    <>
      <div className="flex flex-col gap-5 shadow-md rounded-2xl p-3 md:max-h-[340px] dark:bg-[#3e5f86]">
        <CommentStatics id={id} />
        <p className="text-center">نظر خود را در مورد این محصول بنویسید</p>
        <Button
          color="success"
          className="text-white"
          onPress={() => handleOpen("2xl")}
        >
          افزودن نظر
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <form onSubmit={handleform} className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Textarea
                      label="توضیحات"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <div className=" custom-rater text-3xl flex flex-row items-center gap-4">
                      <p className="text-lg">امتیاز</p>
                      <Rater
                        total={5}
                        interactive={true}
                        onChange={handleRatingChange}
                      />
                    </div>
                    {user ? (
                      <Checkbox
                        checked={beuser}
                        onChange={() => setBeuser(!beuser)}
                      >
                        {user.first_name + " " + user.last_name}
                      </Checkbox>
                    ) : (
                      <Checkbox defaultSelected isDisabled>
                        کاربر ناشناس
                      </Checkbox>
                    )}
                  </div>
                  <Button
                    color="success"
                    className="text-white"
                    onPress={handleform}
                  >
                    ثبت نظر
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddComment;
