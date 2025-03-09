import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const order_code = searchParams.get("order_code");
  try {
    const { data, error } = await supabase
      .from("tbl_orders")
      .select(
        `
      "l_products",
      total_price,
      price_deliver,
      order_date,
      method_sending,
      status_order,
      tbl_shipment(
f_n_shipment,
l_n_shipment,
phone_shipment,
landline_shipment,
state_shipment,
city_shipment,
address_shipment,
zip_code_shipment)
    `
      )
      .eq("order_code", order_code)
      .single();

    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
