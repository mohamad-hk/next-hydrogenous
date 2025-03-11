import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";
import { JWTgenerate } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { firstName, lastName, phone, password } = await req.json();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phone,
      password: password,
    };

    const { data, error } = await supabase
      .from("tbl_customer")
      .insert([userData])
      .select("customer_id, first_name, last_name")
      .single();

    if (error || !data) {
      console.error(" خطای دیتابیس:", error);
      return NextResponse.json(
        { error: "مشکلی در ثبت‌نام رخ داد." },
        { status: 500 }
      );
    }

    const accessToken = await JWTgenerate(data);
    const refreshToken = await JWTgenerate(
      { ...data, type: "refresh" },
      "refresh"
    );

    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json(
      { success: true, user: data, token: accessToken },
      { status: 200 }
    );
  } catch (err) {
    console.error(" خطا در پردازش درخواست:", err);
    return NextResponse.json(
      { error: err.message || "خطای ناشناخته رخ داد" },
      { status: 500 }
    );
  }
}
