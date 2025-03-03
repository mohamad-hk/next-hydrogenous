"use client";
import { CiMobile2 } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { CgAdd } from "react-icons/cg";
import { Radio, RadioGroup } from "@heroui/react";
import useShipmentStore from "@/app/store/Shipmentidstore";
const ShowAddresses = ({ data }) => {
  const { setShipmentId } = useShipmentStore();
  return (
    <>
      <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-3 lg:gap-x-5  py-10 px-10">
        <RadioGroup orientation="horizontal">
          {data.map((shipment, index) => {
            return (
              <>
                <div className="flex items-start gap-1" key={index}>
                  <Radio
                    className="!items-baseline"
                    onClick={() => setShipmentId(index)}
                    value={index}
                  />
                  <div className="flex flex-col gap-5 rounded-xl shadow-lg p-3 max-w-[500px]">
                    <div className="flex flex-row gap-2">
                      <IoPersonOutline className="text-2xl" />
                      <p>
                        {shipment.f_n_shipment + " " + shipment.l_n_shipment}
                      </p>
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
                </div>
              </>
            );
          })}
        </RadioGroup>
        <div className="relative rounded-xl shadow-lg bg-slate-100 max-w-[500px] h-[200px]">
          <CgAdd className="absolute top-[25%] left-[40%] text-8xl opacity-50" />
        </div>
      </div>
    </>
  );
};

export default ShowAddresses;
