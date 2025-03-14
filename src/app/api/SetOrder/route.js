import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function POST(req) {
  const order_code=Date.now()
  try {
    const formData = await req.json();
    const {
      method_sending,
      status_order,
      l_products,
      total_price,
      price_deliver,
      cust_id,
      ship_id,
    } = formData;

    const products = l_products.map((product) => ({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    }));

    const orderData = {
      order_code,
      method_sending,
      status_order,
      total_price,
      price_deliver,
      cust_id,
      ship_id,
      l_products: products, 
    };

    const { data, error } = await supabase.from("tbl_orders").insert([orderData]);

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
