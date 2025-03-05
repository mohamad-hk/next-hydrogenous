import { supabase } from "@/app/utils/client";

export async function POST(req) {
  try {
    const { phone } = await req.json();

    const { data: user, error } = await supabase
      .from("tbl_customer")
      .select("customer_id, first_name, last_name")
      .eq("phone_number", phone);

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json(user, { status: 200 });
  } catch (err) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
