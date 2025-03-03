import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  let category = searchParams.get("category");
  if (category == "ساشه") {
    category = 2;
  } else if (category == "پودر") {
    category = 1;
  } else {
    category = null;
  }
  if (category == 1 || category == 2) {
    try {
      let { data: products, error } = await supabase
        .from("tbl_products")
        .select(
          "product_id,product_name,product_price,discount_percent,discount_price,product_photo"
        )
        .eq("t_category_id", category);
      return Response.json(products, { status: 200 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  } else {
    try {
      let { data: products, error } = await supabase
        .from("tbl_products")
        .select(
          "product_id,product_name,product_price,discount_percent,discount_price,product_photo,t_category_id"
        ).order('t_category_id',{ascending:false});
      return Response.json(products, { status: 200 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
}
