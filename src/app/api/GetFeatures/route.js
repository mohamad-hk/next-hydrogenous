import { supabase } from "@/app/utils/client";

export async function GET() {
  console.log("Supabase URL:", supabase.supabaseUrl); // بررسی URL

  try {
    const { data: features, error } = await supabase.from("tbl_features").select();
    if (error) {
      console.error("Supabase Error:", error); // چاپ خطا
      throw error;
    }

    console.log("Fetched Features:", features); // نمایش داده‌های بازیابی شده
    return Response.json(features, { status: 200 });
  } catch (err) {
    console.error("Error:", err.message); // چاپ خطای کلی
    return Response.json({ error: err.message }, { status: 500 });
  }
}
