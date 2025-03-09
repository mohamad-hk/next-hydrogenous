import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/client";

export async function PATCH(req) {
  try {
    const {
      sh_id,
      firstname,
      lastname,
      phone,
      landline,
      state,
      city,
      zipcode,
      address,
    } = await req.json();

    if (!sh_id) {
      return NextResponse.json({ error: "sh_id is required" }, { status: 400 });
    }

    const { data: existingData, error: fetchError } = await supabase
      .from("tbl_shipment")
      .select("*")
      .eq("shipment_id", sh_id);

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    if (!existingData || existingData.length === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    const updateData = {};
    if (firstname) updateData.f_n_shipment = firstname;
    if (lastname) updateData.l_n_shipment = lastname;
    if (phone) updateData.phone_shipment = phone;
    if (landline) updateData.landline_shipment = landline;
    if (state) updateData.state_shipment = state;
    if (city) updateData.city_shipment = city;
    if (zipcode) updateData.zip_code_shipment = zipcode;
    if (address) updateData.address_shipment = address;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ status: 400 });
    }

    const { data, error } = await supabase
      .from("tbl_shipment")
      .update(updateData)
      .eq("shipment_id", sh_id)
      .select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
