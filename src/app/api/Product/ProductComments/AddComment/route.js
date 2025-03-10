import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const { p_id, content, rating, user_name } = await req.json();

    const commentData = {
      comment_user: user_name,
      comment_text: content,
      comment_score: Number(rating),
      comment_verify: false,
      product_id: p_id,
    };

    const { data, error } = await supabase.from("tbl_comment").insert([commentData]);

    if (error) {
      console.log("خطای دیتابیس:", error);
      return Response.json({ error: error.message, details: error }, { status: 500 });
    }

    return Response.json(data, { status: 200 });
  } catch (err) {
    console.log("error :", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
