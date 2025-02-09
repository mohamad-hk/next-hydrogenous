import { supabase } from "@/app/utils/client";

export async function GET() {
  try {
    const { data: features, error } = await supabase.from("tbl_features").select();
    if (error) throw error;

    return Response.json(features, { status: 200 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
