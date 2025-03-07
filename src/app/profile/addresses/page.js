"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CiMobile2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import OptionAddress from "@/app/components/Profile/OptionAddress";
import { AuthContext } from "@/app/context/AuthContext";
const Addresses = () => {
  const [shipments, setShipments] = useState();
  const { user } = useContext(AuthContext);

  const getShipment = async (input_params) => {
    try {
      const data = await fetch(
        `https://hydrogenous.vercel.app/api/Shipments/GetShipment?${input_params}`
      );
      const response = await data.json();
      setShipments(response);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    if (user) {
      const input_params = new URLSearchParams({
        cust_id: user.customer_id,
      });
      getShipment(input_params);
    }
  }, [user]);

  return (
    <>
      <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-5  py-10 px-10">
        {shipments?.map((shipment, index) => {
          return (
            <div
              className="flex flex-col gap-5 rounded-xl shadow-lg p-3 max-w-[500px] max-h-[300px]"
              key={index}
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <IoPersonOutline className="text-2xl" />
                  <p>{shipment.f_n_shipment + " " + shipment.l_n_shipment}</p>
                </div>
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
              <OptionAddress sh_id={shipment.shipment_id} />
            </div>
          );
        })}
        <Link href={"#"} className="h-[300px]">
          <div className="relative rounded-xl shadow-lg bg-slate-100 max-w-[500px] h-[300px]">
            <CgAdd className="absolute top-[25%] left-[40%] text-8xl opacity-50" />
          </div>
        </Link>
      </div>
    </>
  );
};
export default Addresses;
