import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const custId = searchParams.get("cust_id");

  try {
    let { data: orders, error } = await supabase.from("tbl_orders").select("*").eq("cust_id",custId);

    return Response.json(orders, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
