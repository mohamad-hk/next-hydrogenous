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

export default function EditAddress({ sh_id, refresh }) {
  const [size, setSize] = useState("");
  const [shipment, setShipment] = useState();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [firstname, setFitstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");

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
          setShipment(data);
          setFitstName(data[0]?.f_n_shipment);
          setLastName(data[0]?.l_n_shipment);
          setPhone(data[0]?.phone_shipment);
          setLandline(data[0]?.landline_shipment);
          setState(data[0]?.state_shipment);
          setCity(data[0]?.city_shipment);
          setAddress(data[0]?.address_shipment);
          setZipCode(data[0]?.zip_code_shipment);
        }
      };
      fetchData();
    }
  }, [isOpen]);
  const updateData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/Shipments/UpdateShipment",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sh_id,
            firstname,
            lastname,
            phone,
            landline,
            address,
            state,
            city,
            zipcode,
          }),
        }
      );

      console.log(response)
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        console.log("Shipment updated successfully", data);
      } else {
        console.error("Error updating shipment:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    refresh();
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
                      value={firstname}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setFitstName(e.target.value)}
                    />
                    <Input
                      label="نام خانوادگی"
                      type="text"
                      value={lastname}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <Input
                      label="شماره موبایل"
                      type="tel"
                      value={phone}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                      label="شماره تلفن"
                      type="tel"
                      value={landline}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setLandline(e.target.value)}
                    />
                    <Input
                      label="استان "
                      type="text"
                      value={state}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setState(e.target.value)}
                    />
                    <Input
                      label="شهر "
                      type="text"
                      value={city}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <Textarea
                      label="آدرس"
                      placeholder="آدرس خود را وارد کنید"
                      value={address}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <Input
                      label="کد پستی "
                      type="text"
                      value={zipcode}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setZipCode(e.target.value)}
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
