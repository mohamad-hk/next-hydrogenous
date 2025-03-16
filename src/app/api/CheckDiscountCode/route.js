import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const coupon = searchParams.get("coupon");
  try {
    let { data: discount_value, error } = await supabase
      .from("tbl_discount_code")
      .select("discount_value")
      .eq("discount_code", coupon);

    return Response.json(discount_value, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
