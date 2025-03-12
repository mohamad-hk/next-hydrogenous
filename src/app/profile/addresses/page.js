"use client";

import useSWR, { mutate } from "swr";
import { useContext } from "react";
import { CiMobile2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import OptionAddress from "@/app/components/Profile/OptionAddress";
import { AuthContext } from "@/app/context/AuthContext";
import AddAddress from "@/app/components/Profile/AddAddress";
import Loading from "@/app/components/Loading/Loading";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Addresses = () => {
  const { user } = useContext(AuthContext);

  const {
    data: shipments,
    error,
    isLoading,
  } = useSWR(
    user
      ? `https://hydrogenous.vercel.app/api/Profile/Shipments/GetShipment?cust_id=${user.customer_id}`
      : null,
    fetcher
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-10 px-10">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-5">
          {shipments?.map((shipment, index) => (
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
              <OptionAddress
                sh_id={shipment.shipment_id}
                refreshData={() =>
                  mutate(
                    user
                      ? `https://hydrogenous.vercel.app/api/Product/Shipments/GetShipment?cust_id=${user.customer_id}`
                      : null
                  )
                }
              />
            </div>
          ))}
          <AddAddress
            refreshData={() =>
              mutate(
                user
                  ? `https://hydrogenous.vercel.app/api/Product/Shipments/GetShipment?cust_id=${user.customer_id}`
                  : null
              )
            }
          />
        </div>
      )}
    </div>
  );
};

export default Addresses;
