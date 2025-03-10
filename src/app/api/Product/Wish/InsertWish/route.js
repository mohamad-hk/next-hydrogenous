import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const { product_id, customer_id } = await req.json();

    const commentData = {
      product_id: product_id,
      customer_id: customer_id,
    };

    const { data, error } = await supabase
      .from("tbl_wish")
      .insert([commentData]);

    if (error) {
      console.log("خطای دیتابیس:", error);
      return Response.json(
        { error: error.message, details: error },
        { status: 500 }
      );
    }

    return Response.json(data, { status: 200 });
  } catch (err) {
    console.log("error :", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
