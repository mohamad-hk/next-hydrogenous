import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productID = searchParams.get("product_id");
  const customerID = searchParams.get("customer_id");

  if (productID && customerID) {
    const { data: wish } = await supabase
      .from("tbl_wish")
      .select("*")
      .eq("product_id", productID)
      .eq("customer_id", customerID);
    return Response.json(wish, { status: 200 });
  } else {
    const { data:wish } = await supabase
      .from("tbl_wish")
      .select(
        `
    "wish_id",
    tbl_products(
    product_name,product_price,discount_percent,discount_price,product_photo
)
  `
      )

      .eq("customer_id", customerID);

    return Response.json(wish, { status: 200 });
  }
}
