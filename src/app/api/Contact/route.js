import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const formData = await req.json();
    const { fn, ln, email, subject, message } = formData;

    if (!fn || !ln || !email || !subject || !message) {
      return NextResponse.json({ error: "لطفاً تمام فیلدهای ضروری را پر کنید." }, { status: 400 });
    }

    const { data, error } = await supabase.from("tbl_email").insert([
      { fn, ln, email, subject, message }
    ]);

    if (error) {
      console.error("خطای دیتابیس:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (err) {
    console.error("خطای سرور:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
