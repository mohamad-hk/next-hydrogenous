import { supabase } from "@/app/utils/client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("post_id");

  try {
    let { data: posts, error } = await supabase
      .from("tbl_posts")
      .select("*")
      .eq("post_id", title);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
