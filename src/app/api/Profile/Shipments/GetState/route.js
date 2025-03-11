import { supabase } from "@/app/utils/client";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const provinceId = url.searchParams.get("province_id");

    if (!provinceId) {
      return new Response(
        JSON.stringify({ error: "province_id is required" }),
        {
          status: 400,
        }
      );
    }

    const { data, error } = await supabase
      .from("tbl_city")
      .select("city_id, name_city")
      .eq("state_id", provinceId);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    if (!data || data.length === 0) {
      return new Response(
        JSON.stringify({ error: "No cities found for this province" }),
        {
          status: 404,
        }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
      }
    );
  }
}
