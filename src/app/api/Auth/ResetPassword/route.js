import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function PATCH(req) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "شماره تلفن و رمز عبور جدید الزامی است" },
        { status: 400 }
      );
    }

    const updateData = { password: password };

    const { data, error } = await supabase
      .from("tbl_customer")
      .update(updateData)
      .eq("phone_number", phone)
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "کاربری یافت نشد" }, { status: 404 });
    }

    return NextResponse.json({ message: "رمز عبور با موفقیت تغییر کرد", user: data[0] }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
