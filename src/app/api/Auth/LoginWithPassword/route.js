import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";
import { JWTgenerate } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { phone, password } = await req.json();
    const { data, error } = await supabase
      .from("tbl_customer")
      .select("customer_id, first_name, last_name, phone_number, password")
      .eq("phone_number", phone)
      .eq("password", password)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: " شماره موبایل یا رمز عبور اشتباه است." }, { status: 400 });
    }

    if (data.password !== password) {
      return NextResponse.json({ error: " شماره موبایل یا رمز عبور اشتباه است." }, { status: 400 });
    }

    const accessToken = await JWTgenerate(data);
    const refreshToken = await JWTgenerate({ ...data, type: "refresh" }, "refresh");

    const cookieStore = await cookies(); 
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

    return NextResponse.json({ success: true, user: data, token: accessToken }, { status: 200 });

  } catch (err) {
    return NextResponse.json(
      { error: " خطای سرور در ورود به سیستم." },
      { status: 500 }
    );
  }
}
