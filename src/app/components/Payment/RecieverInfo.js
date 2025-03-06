"use client";
import { CiMobile2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { useEffect, useState } from "react";
import { useShipment } from "@/app/context/ShipmentContext";
const ReceiverInfo = () => {
  const { shipmentId } = useShipment();
  const [shipment, setShipment] = useState([]);
  const getShipment = async (sh_id) => {
    try {
      const input_params = new URLSearchParams({
        ship_id: sh_id,
      });

      const response = await fetch(`https://hydrogenous.vercel.app/api/GetShipment?${input_params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setShipment(data);
    } catch (error) {
      console.error("Error fetching shipment:", error);
    }
  };
  useEffect(() => {
    getShipment(shipmentId);
  }, [shipmentId]);
  return (
    <>
      {shipment.map((item) => {
        return (
          <div className="flex flex-col gap-5 rounded-md p-3 ">
            <div className="flex flex-row gap-2">
              <IoPersonOutline className="text-2xl" />
              <p>{item.f_n_shipment + " " + item.l_n_shipment}</p>
            </div>
            <div className="flex flex-row gap-2">
              <CiMobile2 className="text-2xl" />
              <p>{item.phone_shipment}</p>
            </div>
            <div className="flex flex-row gap-2">
              <GrLocation className="text-2xl " />
              <p>{item.address_shipment}</p>
            </div>
            <div className="flex flex-row gap-2">
              <MdOutlineLocalPostOffice className="text-2xl" />
              <p>{item.zip_code_shipment}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ReceiverInfo;
