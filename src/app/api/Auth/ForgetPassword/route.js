import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return Response.json({ error: "شماره موبایل الزامی است." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("tbl_customer")
      .select("customer_id, first_name, last_name")
      .eq("phone_number", phone)

    if (error) {
      return Response.json({ error: "خطا در ارتباط با دیتابیس." }, { status: 500 });
    }

    if (!data) {
      return Response.json({ error: "کاربری با این شماره یافت نشد." }, { status: 404 });
    }

    return Response.json(data, { status: 200 });
  } catch (err) {
    return Response.json({ error: "درخواست نامعتبر است." }, { status: 400 });
  }
}
