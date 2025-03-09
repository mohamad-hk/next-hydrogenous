import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const order_code = searchParams.get("order_code");
  try {
    let { data: status_order, error } = await supabase
      .from("tbl_orders")
      .select("status_order")
      .eq("order_code", order_code);

    return Response.json(status_order, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
