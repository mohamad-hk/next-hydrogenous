import { supabase } from "@/app/utils/client";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");
  const { data: user } = await supabase
  .from("tbl_customer")
  .select("customer_id,first_name,last_name")
  .eq("phone_number", phone);
  return Response.json(user, { status: 200 });
}
