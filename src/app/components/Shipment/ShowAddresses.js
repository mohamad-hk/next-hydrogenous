"use client";
import { CiMobile2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useState } from "react";
import { useShipment } from "@/app/context/ShipmentContext";

const ShowAddresses = ({ data, onChange }) => {
  const [selected, setSelected] = useState(null);
  const { setShipmentId } = useShipment();
  const handleSelect = (id) => {
    setSelected(id);
    if (onChange) onChange(id);
  };

  return (
    <div>
      <p className=" my-5 md:my-0 md:mb-5">یک آدرس انتخاب کنید</p>

      <div className="flex flex-wrap gap-5">
        {data?.map((shipment, index) => (
          <label
            key={shipment.shipment_id ?? index}
            onClick={() => {
              handleSelect(shipment.shipment_id);
              setShipmentId(shipment.shipment_id);
            }}
            className={`relative flex items-start gap-3 rounded-xl shadow-lg p-5 max-w-[500px] w-full 
            transition-all duration-300 cursor-pointer ${
              selected === shipment.shipment_id
                ? "bg-blue-100 shadow-xl scale-105  dark:bg-[#4e76a4]"
                : "bg-white  dark:bg-[#4e76a4]"
            }`}
          >
            <div className="flex flex-col gap-3  dark:text-white">
              <div className="flex flex-row gap-2">
                <IoPersonOutline className="text-2xl" />
                <p>{shipment.f_n_shipment + " " + shipment.l_n_shipment}</p>
              </div>
              <div className="flex flex-row gap-2">
                <CiMobile2 className="text-2xl" />
                <p>{shipment.phone_shipment}</p>
              </div>
              <div className="flex flex-row gap-2">
                <GrLocation className="text-5xl md:text-4xl" />
                <p>{shipment.address_shipment}</p>
              </div>
              <div className="flex flex-row gap-2">
                <MdOutlineLocalPostOffice className="text-2xl" />
                <p>{shipment.zip_code_shipment}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShowAddresses;
