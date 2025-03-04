"use client";

import useShipmentStore from "@/app/store/Shipmentidstore";
import { CiMobile2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useEffect, useState } from "react";
const ReceiverInfo = () => {
  const { setShipmentId } = useShipmentStore();
  const [shipment, Setshipment] = useState([]);
  const getShipment = async () => {
    const input_params = new URLSearchParams({
      ship_id: id,
    });
    const data = await fetch(
      `https://hydrogenous.vercel.app/api/GetProduct?${input_params}`
    );
    const response = data.json();
    Setshipment(response);
  };
  useEffect(() => {
    getShipment();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-5 rounded-xl shadow-lg p-3 max-w-[500px]">
        <div className="flex flex-row gap-2">
          <IoPersonOutline className="text-2xl" />
          <p>{shipment.f_n_shipment + " " + shipment.l_n_shipment}</p>
        </div>
        <div className="flex flex-row gap-2">
          <CiMobile2 className="text-2xl" />
          <p>{shipment.phone_shipment}</p>
        </div>
        <div className="flex flex-row gap-2">
          <GrLocation className="text-5xl md:text-4xl " />
          <p>{shipment.address_shipment}</p>
        </div>
        <div className="flex flex-row gap-2">
          <MdOutlineLocalPostOffice className="text-2xl" />
          <p>{shipment.zip_code_shipment}</p>
        </div>
      </div>
    </>
  );
};

export default ReceiverInfo;
