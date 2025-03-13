import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: top_category, error } = await supabase
      .from("tbl_top_category")
      .select("*");

    return Response.json(top_category, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
