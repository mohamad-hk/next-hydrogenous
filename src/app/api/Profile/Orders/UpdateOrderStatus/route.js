import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function PATCH(req) {
  try {
    const { order_id } = await req.json();

    if (!order_id) {
      return NextResponse.json(
        { error: "order_id is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tbl_orders")
      .update({ status_order: "لغو سفارش" }) 
      .eq("order_id", order_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
