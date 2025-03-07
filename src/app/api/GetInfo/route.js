import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const custId = searchParams.get("cust_id");

  if (custId) {
    try {
      let { data: shipments, error } = await supabase
        .from("tbl_customer")
        .select("*")
        .eq("customer_id", custId);

      return Response.json(shipments, { status: 200 });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }
}
