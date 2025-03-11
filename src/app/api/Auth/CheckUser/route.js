import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const { phone } = await req.json();
    const { data, error } = await supabase
      .from("tbl_customer")
      .select("customer_id")
      .eq("phone_number", phone);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ exists: data.length > 0 }, { status: 200 });
  } catch (err) {
    return Response.json({ error: "خطای سرور در بررسی شماره موبایل" }, { status: 500 });
  }
}
