import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const product_id = Number(searchParams.get("p_id"));

  const { data: details } = await supabase
    .from("tbl_product_details")
    .select("*")
    .eq("product_id", product_id);
  return Response.json(details, { status: 200 });
}
