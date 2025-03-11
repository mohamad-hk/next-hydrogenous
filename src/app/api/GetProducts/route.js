import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);


  let category = searchParams.get("category");
  let price = searchParams.get("price");
  let discount = searchParams.get("discount");
  let flavour = searchParams.get("flavour");
  let exist = searchParams.get("exist");
  const stock=0
  const flavourMap = {
    "پرتغالی": 1,
    "استوایی": 2,
    "کلاسیک": 3,
    "لیمو نعناع": 4,
    "ویژه": 5,
    "توت فرنگی": 6,
    "تمشک": 7
  };

  flavour = flavour ? flavourMap[flavour] || null : null;


  const categoryMap = {
    "ساشه": 2,
    "پودر": 1
  };

  category = category ? categoryMap[category] || null : null;


  try {
    let query = supabase
      .from("tbl_products")
      .select(
        "product_id, product_name, product_price, discount_percent, discount_price, product_photo,stock, t_category_id, m_category_id"
      );

    if (category !== null) {
      query = query.eq("t_category_id", category);
    }
    if (flavour !== null) {
      query = query.eq("m_category_id", flavour);
    }
    if (price) {
      query = query.lte("product_price", Number(price));
    }
    if (discount === "true") {
      query = query.eq("special", true);
    }
    if (exist === "true") {
      query = query.gt("stock", stock);
    }

    query = query.order("t_category_id", { ascending: false });

    let { data: products, error } = await query;

    if (error) {
      console.error("Supabase Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
