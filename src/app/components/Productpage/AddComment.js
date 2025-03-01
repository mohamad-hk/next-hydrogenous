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
} from "@heroui/react";
import { useState } from "react";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import CommentStatics from "./CommentStatic";

const AddComment = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [size, setSize] = useState("");
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  return (
    <>
      <div className="flex flex-col gap-5 shadow-md rounded-2xl p-5 max-h-[350px]">
        <CommentStatics id={id} />
        <p>نظر خود را در مورد این محصول بنویسید</p>
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
                <form className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    <Rater total={5} />

                    <Input
                      label="توضیحات"
                      type="textArea"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                    <Checkbox>کاربر ناشناس</Checkbox>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  className="text-white"
                  onPress={onClose}
                >
                  ثبت نظر
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddComment;
