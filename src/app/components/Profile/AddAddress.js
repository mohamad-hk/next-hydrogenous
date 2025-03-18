"use client";
import { AuthContext } from "@/app/context/AuthContext";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState, useEffect, useContext } from "react";
import { CgAdd } from "react-icons/cg";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function AddAddress({ refresh }) {
  const [size, setSize] = useState("");
  const [ID, setID] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [landline, setLandline] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.customer_id) {
      setID(user.customer_id);
    }
  }, [user]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await fetch("https://hydrogenous.vercel.app/api/Profile/Shipments/GetCity");
      const data = await response.json();
      setProvinces(data);
    };

    fetchProvinces();
  }, [user]);

  const handleProvinceChange = async (provinceId, provinceName) => {
    setState(provinceName);
    try {
      const response = await fetch(
        `https://hydrogenous.vercel.app/api/Profile/Shipments/GetState?province_id=${provinceId}`
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const addAddress = async () => {
    try {
      const response = await fetch(`https://hydrogenous.vercel.app/api/Profile/Shipments/AddShipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          phone,
          landline,
          address,
          state,
          city,
          zipcode,
          ID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("آدرس جدید با موفقیت اضافه شد");
        mutate(
          `https://hydrogenous.vercel.app/api/Profile/Shipments/GetShipment?cust_id=${user.customer_id}`
        );
        setFirstName("");
        setLastName("");
        setPhone("");
        setLandline("");
        setAddress("");
        setState("");
        setCity("");
        setZipCode("");
        setCities([]);
      } else {
        toast.error("مشکلی پیش اومده");
      }
    } catch (error) {
      toast.error("مشکلی پیش اومده");
    }
    onClose();
  };

  return (
    <>
      <Button
        color="default"
        className="text-white max-w-[500px] h-[300px] relative"
        onPress={() => handleOpen("3xl")}
      >
        <CgAdd className="absolute top-[25%] left-[45%] text-9xl opacity-50" />
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
                      onChange={(e) => setFirstName(e.target.value)}
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

                    <Select
                      label="استان"
                      value={state}
                      onChange={(e) => {
                        const selectedProvince = provinces.find(
                          (p) => p.state_id === Number(e.target.value)
                        );
                        if (!selectedProvince) {
                          console.error("Selected province not found!");
                          return;
                        }
                        handleProvinceChange(
                          selectedProvince.state_id,
                          selectedProvince.state_name
                        );
                      }}
                    >
                      {provinces.map((province) => (
                        <SelectItem
                          key={province.state_id}
                          value={province.state_id}
                        >
                          {province.state_name}
                        </SelectItem>
                      ))}
                    </Select>

                    <Select
                      label="شهر"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      disabled={!state}
                    >
                      {cities.map((cityItem) => (
                        <SelectItem
                          key={cityItem.city_id}
                          value={cityItem.name_city}
                        >
                          {cityItem.name_city}
                        </SelectItem>
                      ))}
                    </Select>

                    <Textarea
                      label="آدرس"
                      placeholder="آدرس خود را وارد کنید"
                      value={address}
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <Input
                      label="کد پستی"
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
                  onPress={addAddress}
                >
                  ثبت آدرس
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
