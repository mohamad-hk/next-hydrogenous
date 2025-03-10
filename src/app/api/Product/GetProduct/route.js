import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productName = searchParams.get("product_name");

  const { data: product } = await supabase
    .from("tbl_products")
    .select("*")
    .eq("product_name", productName);
  return Response.json(product, { status: 200 });
}
