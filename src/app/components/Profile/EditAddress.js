"use client";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { useState } from "react";

export default function EditAddress({ id }) {
  const [size, setSize] = useState("");
  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // console.log(id)
  return (
    <>
      <Button
        className="bg-white focus:bg-white"
        onPress={() => handleOpen("3xl")}
      >
        ویرایش آدرس
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <form className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                    <Input
                      label="Email"
                      type="email"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                    <Input
                      label="Email"
                      type="email"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                    <Input
                      label="Email"
                      type="email"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  className="text-white"
                  onPress={onClose}
                >
                  ویرایش
                </Button>
                <Button color="danger" onPress={onClose}>
                  انصراف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
