import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let t_category = searchParams.get("t_category");
  let m_category = searchParams.get("m_category");

  try {
    let { data: products, error } = await supabase
      .from("tbl_products")
      .select(
        "product_name, product_price, discount_percent, discount_price, product_photo"
      )
      .or(`t_category_id.eq.${t_category},m_category_id.eq.${m_category}`);
    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
