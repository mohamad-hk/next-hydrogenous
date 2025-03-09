import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const customerID = searchParams.get("c_id");

  try {
    const { data, error } = await supabase
      .from("tbl_comment")
      .select(
        `
        *,
        tbl_products (product_name)
      `
      )
      .eq("customer_id", customerID);

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
