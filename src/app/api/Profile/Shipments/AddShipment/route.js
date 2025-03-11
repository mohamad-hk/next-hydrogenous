import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const {
      firstname,
      lastname,
      phone,
      landline,
      state,
      city,
      zipcode,
      address,
      ID,
    } = await req.json();

    if (!firstname || !lastname || !phone || !state || !city || !address) {
      return NextResponse.json(
        {
          error:
            "نام، نام خانوادگی، شماره موبایل، استان، شهر و آدرس الزامی هستند.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tbl_shipment")
      .insert([
        {
          f_n_shipment: firstname,
          l_n_shipment: lastname,
          phone_shipment: phone,
          landline_shipment: landline,
          state_shipment: state,
          city_shipment: city,
          zip_code_shipment: zipcode,
          address_shipment: address,
          cust_id:ID
        },
      ])
      .select("shipment_id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 201, shipment_id: data.shipment_id });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
