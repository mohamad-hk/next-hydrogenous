import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function DELETE(req) {
  console.log(78)
  const { searchParams } = new URL(req.url);
  const ship_id = searchParams.get("ship_id");

  if (!ship_id) {
    return NextResponse.json({ error: "No ship_id provided" }, { status: 400 });
  }

  try {
    const { error } = await supabase
      .from("tbl_shipment")
      .delete()
      .eq("shipment_id", ship_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Shipment deleted successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
