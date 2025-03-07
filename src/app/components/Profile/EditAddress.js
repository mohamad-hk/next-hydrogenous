"use client";
import { getShipment } from "@/app/utils/ShipmentService";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@heroui/react";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";

export default function EditAddress({ sh_id }) {
  const [size, setSize] = useState("");
  const [shipments, setShipments] = useState();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [firstname, setFitstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [Address, setAddress] = useState("");

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  useEffect(() => {
    if (isOpen && sh_id) {
      const input_params = new URLSearchParams({
        ship_id: sh_id,
      });

      const fetchData = async () => {
        const data = await getShipment(input_params);
        if (data) {
          setShipments(data);
        }
      };
      fetchData();
    }
  }, [isOpen]);
  const updateData = () => {
    onClose();
  };
  return (
    <>
      <Button
        color="success"
        className="text-white"
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
                      label="نام"
                      type="text"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setFitstName(e.target.value)}
                    />
                    <Input
                      label="نام خانوادگی"
                      type="text"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                      label="شماره موبایل"
                      type="tel"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                      label="کد پستی "
                      type="text"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                    <Textarea
                      label="آدرس"
                      placeholder="آدرس خود را وارد کنید"
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  className="text-white"
                  onPress={() => {
                    updateData();
                  }}
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
