import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: tbl_product, error } = await supabase
      .from("tbl_products")
      .select("product_name");

    return Response.json(tbl_product, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
