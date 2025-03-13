import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    let { data: mid_category, error } = await supabase
      .from("tbl_mid_category")
      .select("*");

    return Response.json(mid_category, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
