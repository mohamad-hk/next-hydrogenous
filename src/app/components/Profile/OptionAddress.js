"use client";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./EditAddress";

export default function OptionAddress({ sh_id }) {
  return (
    <div className="flex flex-row gap-2 justify-end">
      <EditAddress sh_id={sh_id} />
      <DeleteAddress sh_id={sh_id} />
    </div>
  );
}
