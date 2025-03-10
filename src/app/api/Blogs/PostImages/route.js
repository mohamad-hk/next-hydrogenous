import { supabase } from "@/app/utils/client";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const postID = searchParams.get("post_id");

  try {
    let { data: products, error } = await supabase
      .from("tbl_post_images")
      .select("image_url")
      .eq("post_id", postID);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
