import { supabase } from "@/app/utils/client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("post_title");

  try {
    let { data: products, error } = await supabase
      .from("tbl_posts")
      .select("*")
      .eq("post_title", title);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
