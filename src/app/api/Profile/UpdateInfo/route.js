import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function PATCH(req) {
  try {
    const { cu_id, firstname, lastname,phone ,email, password } = await req.json();

    if (!cu_id) {
      return NextResponse.json({ error: "cu_id is required" }, { status: 400 });
    }

    const { data: existingData, error: fetchError } = await supabase
      .from("tbl_customer")
      .select("*")
      .eq("customer_id", cu_id);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!existingData || existingData.length === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const updateData = {};
    if (firstname) updateData.first_name = firstname;
    if (lastname) updateData.last_name = lastname;
    if (phone) updateData.phone_number = phone;
    if (email) updateData.Email = email;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ status: 400 });
    }

    const { data, error } = await supabase
      .from("tbl_customer")
      .update(updateData)
      .eq("customer_id", cu_id)
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
