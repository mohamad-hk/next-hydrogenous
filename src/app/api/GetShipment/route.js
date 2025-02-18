import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: shipments, error } = await supabase
      .from("tbl_shipment")
      .select("*")
      .eq("cust_id", "35");

    return Response.json(shipments, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
