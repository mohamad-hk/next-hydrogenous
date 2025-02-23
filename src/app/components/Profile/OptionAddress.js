"use client";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";

export default function OptionAddress() {
  return (
    <div className="flex flex-row gap-2 justify-end">
      <EditAddress />
      <DeleteAddress />
    </div>
  );
}
